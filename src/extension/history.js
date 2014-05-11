/**
 * IAS History Extension
 * An IAS extension to enable browser history
 * http://infiniteajaxscroll.com
 *
 * This file is part of the Infinite AJAX Scroll package
 *
 * Copyright 2014 Webcreate (Jeroen Fiege)
 */

var IASHistoryExtension = function (options) {
  options = $.extend({}, this.defaults, options);

  this.ias = null;
  this.prevSelector = options.prev;
  this.prevUrl = null;
  this.listeners = {
    prev: new IASCallbacks()
  };

  /**
   * @private
   * @param pageNum
   * @param scrollOffset
   * @param url
   */
  this.onPageChange = function (pageNum, scrollOffset, url) {
    var state = {};

    if (!window.history || !window.history.replaceState) {
      return;
    }

    history.replaceState(state, document.title, url);
  };

  /**
   * @private
   * @param currentScrollOffset
   * @param scrollThreshold
   */
  this.onScroll = function (currentScrollOffset, scrollThreshold) {
    var firstItemScrollThreshold = this.getScrollThresholdFirstItem();

    if (!this.prevUrl) {
      return;
    }

    currentScrollOffset -= this.ias.$scrollContainer.height();

    if (currentScrollOffset <= firstItemScrollThreshold) {
      this.prev();
    }
  };

  /**
   * Returns the url for the next page
   *
   * @private
   */
  this.getPrevUrl = function (container) {
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
  this.getScrollThresholdFirstItem = function () {
    var $firstElement;

    $firstElement = this.ias.getFirstItem();

    // if the don't have a first element, the DOM might not have been loaded,
    // or the selector is invalid
    if (0 === $firstElement.size()) {
      return -1;
    }

    return ($firstElement.offset().top);
  };

  /**
   * Renders items
   *
   * @private
   * @param items
   * @param callback
   */
  this.renderBefore = function (items, callback) {
    var ias = this.ias,
        $firstItem = ias.getFirstItem(),
        count = 0;

    ias.fire('render', [items]);

    $(items).hide(); // at first, hide it so we can fade it in later

    $firstItem.before(items);

    $(items).fadeIn(400, function () {
      if (++count < items.length) {
        return;
      }

      ias.fire('rendered', [items]);

      if (callback) {
        callback();
      }
    });
  };

  return this;
};

/**
 * @public
 */
IASHistoryExtension.prototype.initialize = function (ias) {
  var self = this;

  this.ias = ias;

  // expose the extensions listeners
  jQuery.extend(ias.listeners, this.listeners);

  // expose prev method
  ias.prev = function() {
    return self.prev();
  };

  this.prevUrl = this.getPrevUrl();
};

/**
 * Bind to events
 *
 * @public
 * @param ias
 */
IASHistoryExtension.prototype.bind = function (ias) {
  var self = this;

  ias.on('pageChange', $.proxy(this.onPageChange, this));
  ias.on('scroll', $.proxy(this.onScroll, this));
  ias.on('ready', function () {
    var currentScrollOffset = ias.getCurrentScrollOffset(ias.$scrollContainer),
        firstItemScrollThreshold = self.getScrollThresholdFirstItem();

    currentScrollOffset -= ias.$scrollContainer.height();

    if (currentScrollOffset <= firstItemScrollThreshold) {
      self.prev();
    }
  });
};

/**
 * Load the prev page
 *
 * @public
 */
IASHistoryExtension.prototype.prev = function () {
  var url = this.prevUrl,
      self = this,
      ias = this.ias;

  if (!url) {
    return false;
  }

  ias.unbind();

  var promise = ias.fire('prev', [url]);

  promise.done(function () {
    ias.load(url, function (data, items) {
      self.renderBefore(items, function () {
        self.prevUrl = self.getPrevUrl(data);

        ias.bind();

        if (self.prevUrl) {
          self.prev();
        }
      });
    });
  });

  promise.fail(function () {
    ias.bind();
  });

  return true;
};

/**
 * @public
 */
IASHistoryExtension.prototype.defaults = {
  prev: ".prev"
};
