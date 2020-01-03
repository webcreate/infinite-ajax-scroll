import $ from 'tealight';
import extend from 'extend';
import Assert from "./assert";
import * as Events from './events';

const defaults = {
  element: undefined,
  hide: false
};

function expand(options) {
  if (typeof options === 'string' || (typeof options === 'object' && options.nodeType === Node.ELEMENT_NODE)) {
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

    Assert.anyElement(this.options.element, 'pagination.element');

    ias.on(Events.BINDED, this.hide.bind(this));
    ias.on(Events.UNBINDED, this.restore.bind(this));
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
