/**
 * Infinite Ajax Scroll v2.0.0
 * A jQuery plugin for infinite scrolling
 * http://infiniteajaxscroll.com
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://infiniteajaxscroll.com/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2014 Webcreate (Jeroen Fiege)
 */

var IASCallbacks = function() {
  this.list = [];
  this.fireStack = [];
  this.isFiring = false;
  this.isDisabled = false;

  /**
   * Calls all added callbacks
   *
   * @private
   * @param args
   */
  this.fire = function(args) {
    var context = args[0],
        deferred = args[1],
        callbackArguments = args[2];
    this.isFiring = true;

    for (var i = 0, l = this.list.length; i < l; i++) {
      if (false === this.list[i].apply(context, callbackArguments)) {
        deferred.reject();
        break;
      }
    }

    this.isFiring = false;

    deferred.resolve();

    if (this.fireStack.length) {
      this.fire(this.fireStack.shift());
    }
  };

  return this;
};

IASCallbacks.prototype = {

  /**
   * Adds a callback
   *
   * @param callback
   * @returns {IASCallbacks}
   */
  add: function(callback) {
    this.list.push(callback);

    return this;
  },

  /**
   * Removes a callback
   *
   * @param callback
   * @returns {IASCallbacks}
   */
  remove: function(callback) {
    var index;

    while( ( index = jQuery.inArray( callback, this.list, index ) ) > -1 ) {
      this.list.splice( index, 1 );
    }

    return this;
  },

  /**
   * Checks if callback is added
   *
   * @param callback
   * @returns {*}
   */
  has: function(callback) {
    return jQuery.inArray(callback, this.list);
  },


  /**
   * Calls callbacks with a context
   *
   * @param context
   * @param args
   * @returns {object|void}
   */
  fireWith: function(context, args) {
    var deferred = $.Deferred();

    if (this.isDisabled) {
      return deferred.reject();
    }

    args = args || [];
    args = [ context, deferred, args.slice ? args.slice() : args ];

    if (this.isFiring) {
      this.fireStack.push(args);
    } else {
      this.fire(args);
    }

    return deferred;
  },

  /**
   * Disable firing of new events
   */
  disable: function() {
    this.isDisabled = true;
  },

  /**
   * Enable firing of new events
   */
  enable: function() {
    this.isDisabled = false;
  }
};
