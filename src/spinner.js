import $ from 'tealight';
import extend from 'extend';
import Assert from "./assert";

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
  if (typeof options === 'string') {
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

    Assert.singleElement(this.options.element, 'spinner.element');

    this.element = $(this.options.element)[0]; // @todo should we really cache this?
    this.hideFn = this.options.hide;
    this.showFn = this.options.show;

    ias.on('binded', this.bind.bind(this));
    ias.on('binded', this.hide.bind(this));
  }

  bind() {
    let startTime, endTime, diff, delay, self = this, ias = this.ias;

    ias.on('next', () => {
      startTime = +new Date();

      self.show();
    });

    ias.on('last', () => {
      self.hide();
    });

    // setup delay
    ias.on('append', (event) => {
      endTime = +new Date();
      diff = endTime - startTime;

      delay = Math.max(0, self.options.delay - diff);

      // copy original append function
      let appendFn = event.appendFn;

      // wrap append function with delay
      event.appendFn = (items, parent, last) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            // turn hide function into promise
            Promise.resolve(self.hide()).then(() => {
              appendFn(items, parent, last);

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
