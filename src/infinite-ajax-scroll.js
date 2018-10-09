import $ from 'tealight';
import merge from 'merge-options';
import defaults from './defaults';
import Assert from './assert';

export default class InfiniteAjaxScroll {
  constructor(container, options = {}) {
    Assert.singleElement(container, 'container');

    this.container = $(container)[0];
    this.options = merge(defaults, options);

    if (this.options.scrollContainer !== window) {
      Assert.singleElement(this.options.scrollContainer, 'options.scrollContainer');

      this.options.scrollContainer = $(this.options.scrollContainer)[0];
    }
  }
}
