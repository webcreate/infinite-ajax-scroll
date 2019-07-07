import $ from 'tealight';
import extend from 'extend';
import Assert from "./assert";

const defaults = {
  element: undefined,
  hide: false
};

function expand(options) {
  if (typeof options === 'string') {
    options = {
      element: options,
      hide: true,
    }
  } else if (typeof options === 'boolean') {
    options = {
      element: undefined,
      hide: options,
    }
  }

  return options;
}

export default class Pagination {
  constructor(ias, options) {
    this.options = extend({}, defaults, expand(options));

    if (!this.options.hide) {
      return;
    }

    Assert.singleElement(this.options.element, 'pagination.element');

    ias.on('binded', this.hide.bind(this));
    ias.on('unbinded', this.restore.bind(this));
  }

  hide() {
    let el = $(this.options.element)[0];

    this.originalDisplayStyle = window.getComputedStyle(el).display;

    el.style.display = 'none';
  }

  restore() {
    let el = $(this.options.element)[0];

    el.style.display = this.originalDisplayStyle;
  }
}
