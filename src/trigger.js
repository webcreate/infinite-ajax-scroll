import extend from "extend";
import Assert from "./assert";
import $ from "tealight";
import * as Events from "./events";

const defaults = {
  element: undefined,
  when: (pageIndex) => true,
  show: (element) => {
    element.style.opacity = '1';
  },
  hide: (element) => {
    element.style.opacity = '0';
  }
};

function expand(options) {
  if (typeof options === 'string' || typeof options === 'function' || (typeof options === 'object' && options.nodeType === Node.ELEMENT_NODE)) {
    options = {
      element: options,
    }
  }

  if (typeof options.element === 'function') {
    options.element = options.element();
  }

  // expand array to a function, e.g.:
  // [0, 1, 2] -> function(pageIndex) { /* return true when pageIndex in [0, 1, 2] */ }
  if (options.when && Array.isArray(options.when)) {
    let when = options.when;
    options.when = function(pageIndex) {
      return when.indexOf(pageIndex) !== -1;
    }
  }

  return options;
}

export default class Trigger {
  constructor(ias, options) {
    // no trigger wanted
    if (options === false) {
      return;
    }

    this.ias = ias;
    this.options = extend({}, defaults, expand(options));

    if (this.options.element !== undefined) {
      Assert.singleElement(this.options.element, 'trigger.element');
    }

    this.element = $(this.options.element)[0]; // @todo should we really cache this?
    this.hideFn = this.options.hide;
    this.showFn = this.options.show;
    this.voter = this.options.when;
    this.showing = undefined;
    this.enabled = undefined;

    ias.on(Events.BINDED, this.bind.bind(this));
    ias.on(Events.UNBINDED, this.unbind.bind(this));
    ias.on(Events.HIT, this.hit.bind(this));
    ias.on(Events.NEXT, (e) => this.ias.once(Events.APPENDED, () => this.update(e.pageIndex)));
  }

  bind() {
    this.hide();
    this.update(this.ias.pageIndex);

    this.element.addEventListener('click', this.clickHandler.bind(this));
  }

  unbind() {
    this.element.removeEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler() {
    this.hide().then(this.ias.next.bind(this.ias));
  }

  update(pageIndex) {
    this.enabled = this.voter(pageIndex);

    if (this.enabled) {
      this.ias.disableLoadOnScroll();
    } else {
      this.ias.enableLoadOnScroll();
    }
  }

  hit() {
    if (!this.enabled) {
      return;
    }

    this.show();
  }

  show() {
    if (this.showing) {
      return;
    }

    this.showing = true;

    return Promise.resolve(this.showFn(this.element));
  }

  hide() {
    if (!this.showing && this.showing !== undefined) {
      return;
    }

    this.showing = false;

    return Promise.resolve(this.hideFn(this.element));
  }
}
