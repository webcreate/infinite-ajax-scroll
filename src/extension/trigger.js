/**
 * IAS Trigger Extension
 * An IAS extension to show a trigger link to load the next page
 * http://infiniteajaxscroll.com
 *
 * This file is part of the Infinite AJAX Scroll package
 *
 * Copyright 2014 Webcreate (Jeroen Fiege)
 */

var IASTriggerExtension = function(options) {
  options = $.extend({}, this.defaults, options);

  this.ias = null;
  this.html = (options.html).replace('{text}', options.text);
  this.enabled = true;
  this.count = 0;
  this.offset = options.offset;
  this.$triggerNext = null;
  this.$triggerPrev = null;

  /**
   * Shows trigger for next page
   */
  this.showTriggerNext = function() {
    if (!this.enabled) {
      return true;
    }

    if (false === this.offset || ++this.count < this.offset) {
      return true;
    }

    var $trigger = this.$triggerNext || (this.$triggerNext = this.createTrigger(this.next));
    var $lastItem = this.ias.getLastItem();

    $lastItem.after($trigger);
    $trigger.fadeIn();

    return false;
  };

  /**
   * Shows trigger for previous page
   */
  this.showTriggerPrev = function() {
    if (!this.enabled) {
      return true;
    }

    var $trigger = this.$triggerPrev || (this.$triggerPrev = this.createTrigger(this.prev));
    var $firstItem = this.ias.getFirstItem();

    $firstItem.before($trigger);
    $trigger.fadeIn();

    return false;
  };

  /**
   * @param clickCallback
   * @returns {*|jQuery}
   */
  this.createTrigger = function(clickCallback) {
    var uid = (new Date()).getTime(),
        $trigger = $(this.html).attr('id', 'ias_trigger_' + uid);

    $trigger.hide();
    $trigger.on('click', $.proxy(clickCallback, this));

    return $trigger;
  };

  return this;
};

/**
 * @public
 * @param {object} ias
 */
IASTriggerExtension.prototype.bind = function(ias) {
  var self = this;

  this.ias = ias;

  try {
    ias.on('prev', $.proxy(this.showTriggerPrev, this), this.priority);
  } catch (exception) {}

  ias.on('next', $.proxy(this.showTriggerNext, this), this.priority);
  ias.on('rendered', function () { self.enabled = true; }, this.priority);
};

/**
 * @public
 */
IASTriggerExtension.prototype.next = function() {
  this.enabled = false;
  this.ias.unbind();

  if (this.$triggerNext) {
    this.$triggerNext.remove();
    this.$triggerNext = null;
  }

  this.ias.next();
};

/**
 * @public
 */
IASTriggerExtension.prototype.prev = function() {
  this.enabled = false;
  this.ias.unbind();

  if (this.$triggerPrev) {
    this.$triggerPrev.remove();
    this.$triggerPrev = null;
  }

  this.ias.prev();
};

/**
 * @public
 */
IASTriggerExtension.prototype.defaults = {
  text: 'Load more items',
  html: '<div class="ias-trigger" style="text-align: center; cursor: pointer;"><a>{text}</a></div>',
  offset: 0
};

/**
 * @public
 * @type {number}
 */
IASTriggerExtension.prototype.priority = 1000;
