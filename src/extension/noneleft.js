/**
 * IAS None Left Extension
 * An IAS extension to show a message when there are no more pages te load
 * http://infiniteajaxscroll.com
 *
 * This file is part of the Infinite AJAX Scroll package
 *
 * Copyright 2014 Webcreate (Jeroen Fiege)
 */

var IASNoneLeftExtension = function(options) {
  options = $.extend({}, this.defaults, options);

  this.ias = null;
  this.uid = new Date().getTime();
  this.text = options.text;
  this.html = options.html;

  // replace text
  this.html = this.html.replace('{text}', this.text);

  /**
   * Shows none left message
   */
  this.showNoneLeft = function() {
    var $element = $(this.html).attr('id', 'ias_noneleft_' + this.uid);
    var lastItem = this.ias.getLastItem();

    lastItem.after($element);
    $element.fadeIn();
  };

  return this;
};

/**
 * @public
 */
IASNoneLeftExtension.prototype.bind = function(ias) {
  this.ias = ias;

  ias.on('noneLeft', $.proxy(this.showNoneLeft, this));
};

/**
 * @public
 */
IASNoneLeftExtension.prototype.defaults = {
  text: 'You reached the end.',
  html: '<div class="ias-noneleft" style="text-align: center;">{text}</div>'
};
