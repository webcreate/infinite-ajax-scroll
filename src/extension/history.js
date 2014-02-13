/**
 * IAS History Extension
 * An IAS extension to enable browser history
 * http://infiniteajaxscroll.com
 *
 * This file is part of the Infinite AJAX Scroll package
 *
 * Copyright 2014 Webcreate (Jeroen Fiege)
 */

var IASHistoryExtension = function(options) {
  options = $.extend({}, this.defaults, options);

  this.ias = null;
  this.prevSelector = options.prev;
  this.prevUrl = null;
  this.listeners = {
    prev: new IASCallbacks()
  };

  /**
   * @param pageNum
   * @param scrollOffset
   * @param url
   */
  this.onPageChange = function (pageNum, scrollOffset, url) {
    var state = {};

    history.replaceState(state, document.title, url);
  };

  /**
   * @param currentScrollOffset
   * @param scrollThreshold
   */
  this.onScroll = function (currentScrollOffset, scrollThreshold) {
    var prevScrollThreshold = this.getScrollThreshold();

    currentScrollOffset -= this.ias.$scrollContainer.height();

    if (currentScrollOffset <= prevScrollThreshold) {
      this.prev();
    }
  };

  /**
   * Returns the url for the next page
   *
   * @private
   */
  this.getPrevUrl = function(container) {
    if (!container) {
      container = this.ias.$container;
    }

    // always take the last matching item
    return $(this.prevSelector, container).last().attr('href');
  };


  /**
   * Returns scroll threshold. This threshold marks the line from where
   * IAS should start loading the next page.
   *
   * @private
   * @return {number}
   */
  this.getScrollThreshold = function() {
    var firstElement;

    firstElement = this.getFirstItem();

    // if the don't have a first element, the DOM might not have been loaded,
    // or the selector is invalid
    if (0 === firstElement.size()) {
      return -1;
    }

    return (firstElement.offset().top);
  };

  /**
   * Returns the first item currently in the DOM
   *
   * @private
   * @returns {object}
   */
  this.getFirstItem = function() {
    return $(this.ias.itemSelector, this.ias.$itemsContainer.get(0)).first();
  };

  /**
   * Renders items
   *
   * @param items
   */
  this.render = function(items) {
    var firstItem = this.getFirstItem();

    this.ias.fire('render', [items]);

    $(items).hide(); // at first, hide it so we can fade it in later

    firstItem.before(items);

    $(items).fadeIn();
  };

  return this;
};

/**
 * @public
 */
IASHistoryExtension.prototype.initialize = function(ias) {
  this.ias = ias;

  // expose the extensions listeners
  jQuery.extend(ias.listeners, this.listeners);

  this.prevUrl = this.getPrevUrl();
};

IASHistoryExtension.prototype.bind = function(ias) {
  console.log('bind hsitory');

  ias.on('pageChange', $.proxy(this.onPageChange, this));
  ias.on('scroll', $.proxy(this.onScroll, this));
};

/**
 * Load the prev page
 *
 * @public
 */
IASHistoryExtension.prototype.prev = function() {
  var url = this.prevUrl,
      self = this;

  this.ias.unbind();

  if (!url) {
    self.ias.bind();

    return false;
  }

  var promise = this.ias.fire('prev', [url]);

  promise.done(function() {
    self.ias.load(url, function(data, items) {
      self.render(items);

      self.prevUrl = self.getPrevUrl(data);

      self.ias.bind();
    });
  });

  promise.fail(function() {
    self.ias.bind();
  });

  return true;
};

/**
 * @public
 */
IASHistoryExtension.prototype.defaults = {
  prev: ".prev"
};
