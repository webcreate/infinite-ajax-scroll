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
  this.uid = new Date().getTime();
  this.text = options.text;
  this.html = options.html;
  this.enabled = true;

  // replace text
  this.html = this.html.replace('{text}', this.text);

  /**
   * Shows trigger
   */
  this.showTrigger = function() {
    if (!this.enabled) return true;

    var trigger = this.getTrigger() || this.createTrigger();
    var lastItem = this.ias.getLastItem();

    lastItem.after(trigger);
    trigger.fadeIn();

    return false;
  };

  /**
   * Removes trigger
   */
  this.removeTrigger = function() {
    if (this.hasTrigger()) {
      this.getTrigger().remove();
    }
  };

  /**
   * @returns {jQuery|*|jQuery}
   */
  this.getTrigger = function() {
    var trigger = $('#ias_trigger_' + this.uid);

    if (trigger.size() > 0) {
      return trigger;
    }

    return false;
  };

  /**
   * @returns {jQuery|*|jQuery}
   */
  this.hasTrigger = function() {
    var trigger = $('#ias_trigger_' + this.uid);

    return (trigger.size() > 0);
  };

  /**
   * @returns {*|jQuery}
   */
  this.createTrigger = function() {
    var trigger = $(this.html).attr('id', 'ias_trigger_' + this.uid);

    trigger.hide();
    trigger.on('click', $.proxy(this.next, this));

    return trigger;
  };

  return this;
};

/**
 * @public
 */
IASTriggerExtension.prototype.bind = function(ias) {
  var self = this;
  this.ias = ias;

  this.ias.on('next', $.proxy(this.showTrigger, this));
  this.ias.on('render', function () {
    self.enabled = true;
  });
};

/**
 * @public
 */
IASTriggerExtension.prototype.next = function() {
  this.enabled = false;
  this.ias.unbind();

  this.removeTrigger();

  this.ias.next();
};

/**
 * @public
 */
IASTriggerExtension.prototype.defaults = {
  text: 'Load more items',
  html: '<div class="ias-trigger" style="text-align: center; cursor: pointer;"><a>{text}</a></div>'
};
