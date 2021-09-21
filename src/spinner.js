import $ from 'tealight';
import extend from 'extend';
import Assert from "./assert";
import * as Events from './events';

const defaults = {
  element: undefined,
  delay: 600,
  show: (element) => {
    element.style.opacity = '1';
  },
  hide: (element) => {
    element.style.opacity = '0';
  }
};

function expand(options) {
  if (typeof options === 'string' || (typeof options === 'object' && options.nodeType === Node.ELEMENT_NODE)) {
    options = {
      element: options,
    }
  }

  return options;
}

export default class Spinner {
  constructor(ias, options) {
    // no spinner wanted
    if (options === false) {
      return;
    }

    this.ias = ias;
    this.options = extend({}, defaults, expand(options));

    if (this.options.element !== undefined) {
      Assert.singleElement(this.options.element, 'spinner.element');
    }

    this.element = $(this.options.element)[0]; // @todo should we really cache this?
    this.hideFn = this.options.hide;
    this.showFn = this.options.show;

    ias.on(Events.BINDED, this.bind.bind(this));
    ias.on(Events.BINDED, this.hide.bind(this));
  }

  bind() {
    let startTime, endTime, diff, delay, self = this, ias = this.ias;

    ias.on(Events.NEXT, () => {
      startTime = +new Date();

      self.show();
    });

    ias.on(Events.LAST, () => {
      self.hide();
    });

    // setup delay
    ias.on(Events.APPEND, (event) => {
      endTime = +new Date();
      diff = endTime - startTime;

      delay = Math.max(0, self.options.delay - diff);

      const _appendFn = event.appendFn.bind({});

      event.appendFn = function(items, parent, last) {
        return new Promise(function (resolve) {
          setTimeout(function() {
            self.hide().then(function() {
              _appendFn(items, parent, last);
              resolve();
            });
          }, delay);
        });
      };
    });
  }

  show() {
    return Promise.resolve(this.showFn(this.element));
  }

  hide() {
    return Promise.resolve(this.hideFn(this.element));
  }
}
