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

    this.scrollContainer = this.options.scrollContainer;
    this.binded = false;

    if (this.options.bind) {
      // @todo on document.ready?
      this.bind();
    }
  }

  bind() {
    this.binded = true;

    this.emitter.emit('binded');
  }

  unbind() {
    this.binded = false;

    this.emitter.emit('unbinded');
  }

  on(event, callback) {
    this.emitter.on(event, callback, this);

    if (event === 'binded' && this.binded) {
      callback.bind(this)();
    }
  }

  off(event, callback) {
    this.emitter.off(event, callback, this);
  }

  once(event, callback) {
    this.emitter.once(event, callback, this);

    if (event === 'binded' && this.binded) {
      callback.bind(this)();
    }
  }
}
