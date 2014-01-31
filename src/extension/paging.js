/**
 * IAS Paging Extension v1.0.0
 * An IAS extension providing additional events
 * http://github.com/webcreate/infinite-ajax-scroll
 *
 * This extension is part of Infinite AJAX Scroll
 *
 * Copyright 2014 Webcreate (Jeroen Fiege)
 */

var IASPagingExtension = function() {
  this.ias = null;
  this.currentScrollOffset = 0;
  this.pagebreaks = [[0, document.location.toString()]];
  this.lastPageNum = 1;
  this.listeners = {
    pageChange: new IASCallbacks()
  };

  /**
   * Fires pageChange event
   *
   * @param currentScrollOffset
   * @param scrollThreshold
   */
  this.onScroll = function(currentScrollOffset, scrollThreshold) {
    var currentPageNum = this.getCurrentPageNum(currentScrollOffset),
        currentPagebreak = this.getCurrentPagebreak(currentScrollOffset),
        urlPage;

    this.currentScrollOffset = currentScrollOffset;

    if (this.lastPageNum !== currentPageNum) {
      urlPage = currentPagebreak[1];

      this.ias.fire('pageChange', [currentPageNum, currentScrollOffset, urlPage]);
    }

    this.lastPageNum = currentPageNum;
  };

  /**
   * Keeps track of pagebreaks
   *
   * @param url
   */
  this.onNext = function(url) {
    this.pagebreaks.push([this.currentScrollOffset, url]);

    // trigger pageChange and update lastPageNum
    var currentPageNum = this.getCurrentPageNum(this.currentScrollOffset) + 1;

    this.ias.fire('pageChange', [currentPageNum, this.currentScrollOffset, url]);

    this.lastPageNum = currentPageNum;
  };

  return this;
};

/**
 * @public
 */
IASPagingExtension.prototype.bind = function(ias) {
  this.ias = ias;

  ias.on('next', $.proxy(this.onNext, this));
  ias.on('scroll', $.proxy(this.onScroll, this));

  // expose the extensions listeners
  jQuery.extend(ias.listeners, this.listeners);
};

/**
 * Returns current page number based on scroll offset
 *
 * @param {number} scrollOffset
 * @returns {number}
 */
IASPagingExtension.prototype.getCurrentPageNum = function(scrollOffset) {
  for (var i = (this.pagebreaks.length - 1); i > 0; i--) {
    if (scrollOffset > this.pagebreaks[i][0]) {
      return i + 1;
    }
  }

  return 1;
};

/**
 * Returns current pagebreak information based on scroll offset
 *
 * @param {number} scrollOffset
 * @returns {number}|null
 */
IASPagingExtension.prototype.getCurrentPagebreak = function(scrollOffset)
{
  for (var i = (this.pagebreaks.length - 1); i >= 0; i--) {
    if (scrollOffset > this.pagebreaks[i][0]) {
      return this.pagebreaks[i];
    }
  }

  return null;
};
