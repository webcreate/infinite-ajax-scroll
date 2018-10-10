import $ from 'tealight';
import merge from 'merge-options';
import defaults from './defaults';
import Assert from './assert';

export default class InfiniteAjaxScroll {
  constructor(container, options = {}) {
    Assert.singleElement(container, 'container');

    this.container = $(container)[0];
    this.options = merge(defaults, options);
    this.emitter = this.options.emitter;

    if (this.options.scrollContainer !== window) {
      Assert.singleElement(this.options.scrollContainer, 'options.scrollContainer');

      this.options.scrollContainer = $(this.options.scrollContainer)[0];
    }
  }

  on(event, callback) {
    this.emitter.on(event, callback, this);
  }

  off(event, callback) {
    this.emitter.off(event, callback, this);
  }

  once(event, callback) {
    this.emitter.once(event, callback, this);
  }
}
