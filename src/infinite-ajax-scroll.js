import $ from 'tealight';
import extend from 'extend';
import throttle from 'lodash.throttle';
import defaults from './defaults';
import Assert from './assert';
import {scrollHandler, resizeHandler} from "./event-handlers";
import Emitter from "tiny-emitter";
import {getDistanceToFold} from "./dimensions";
import {nextHandler} from './next-handler';
import Pagination from './pagination';
import Spinner from './spinner';
import Logger from './logger';
import Paging from './paging';
import {appendFn} from './append';
import * as Events from './events';

export default class InfiniteAjaxScroll {
  constructor(container, options = {}) {
    Assert.singleElement(container, 'container');

    this.container = $(container)[0];
    this.options = extend({}, defaults, options);
    this.emitter = new Emitter();
    this.scrollContainer = this.options.scrollContainer;

    if (this.options.scrollContainer !== window) {
      Assert.singleElement(this.options.scrollContainer, 'options.scrollContainer');

      this.scrollContainer = $(this.options.scrollContainer)[0];
    }

    this.nextHandler = nextHandler;
    if (typeof this.options.next === 'function') {
      this.nextHandler = this.options.next;
    }

    this.binded = false;
    this.paused = false;
    this.loadOnScroll = this.options.loadOnScroll;
    this.pageIndex = this.sentinel() ? 0 : -1;
    this.lastDistance = null;

    this.on(Events.HIT, () => {
      if (!this.loadOnScroll) {
        return;
      }

      this.next();
    });

    // initialize extensions
    this.pagination = new Pagination(this, this.options.pagination);
    this.spinner = new Spinner(this, this.options.spinner);
    this.logger = new Logger(this, this.options.logger);
    this.paging = new Paging(this);

    // @todo review this logic when prefill support is added
    this.on(Events.BIND, this.measure);

    if (this.options.bind) {
      // @todo on document.ready? (window.addEventListener('DOMContentLoaded'))
      this.bind();
    }
  }

  bind() {
    if (this.binded) {
      return;
    }

    this._scrollListener = throttle(scrollHandler, 200).bind(this);
    this._resizeListener = throttle(resizeHandler, 200).bind(this);

    this.scrollContainer.addEventListener('scroll', this._scrollListener);
    this.scrollContainer.addEventListener('resize', this._resizeListener);

    this.binded = true;

    this.emitter.emit(Events.BINDED);
  }

  unbind() {
    if (!this.binded) {
      return;
    }

    this.scrollContainer.removeEventListener('resize', this._resizeListener);
    this.scrollContainer.removeEventListener('scroll', this._scrollListener);

    this.binded = false;

    this.emitter.emit(Events.UNBINDED);
  }

  next() {
    this.pause();

    let event = {
      pageIndex: this.pageIndex + 1,
    };

    this.emitter.emit(Events.NEXT, event);

    Promise.resolve(this.nextHandler(event.pageIndex))
        .then((result) => {
          this.pageIndex = event.pageIndex;

          if (!result) {
            this.emitter.emit(Events.LAST);

            return;
          }

          this.resume();
        })
    ;
  }

  load(url) {
    let ias = this;

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
          return;
        }

        if (xhr.status === 200) {
          let items = xhr.response;

          if (ias.options.responseType === 'document') {
            items = $(ias.options.item, xhr.response);
            // @todo assert there actually are items in the response
          }

          ias.emitter.emit(Events.LOADED, {items, url, xhr});

          resolve({items, url, xhr});
        } else {
          // @todo is console.error the best approach?
          console.error('Request failed');

          reject(xhr);
        }
      };

      // FIXME: make no-caching configurable
      // @see https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
      let nocacheUrl = url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();

      xhr.open('GET', nocacheUrl, true);
      xhr.responseType = ias.options.responseType;
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      // @todo define event variable and pass that around so it can be manipulated

      ias.emitter.emit(Events.LOAD, {url, xhr});

      xhr.send();
    });
  }

  /**
   * @param {array<Element>} items
   * @param {Element|null} parent
   */
  append(items, parent) {
    let ias = this;
    parent = parent || ias.container;

    let event = {
      items,
      parent,
      appendFn
    };

    ias.emitter.emit(Events.APPEND, event);

    let executor = (resolve) => {
      window.requestAnimationFrame(() => {
        Promise.resolve(event.appendFn(event.items, event.parent, ias.sentinel())).then(() => {
          resolve({items, parent});
        });
      });
    };

    return (new Promise(executor)).then((event) => {
      ias.emitter.emit(Events.APPENDED, event);
    });
  }

  sentinel() {
    const items = $(this.options.item, this.container);

    if (!items.length) {
      return null;
    }

    return items[items.length-1];
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;

    this.measure();
  }

  enableLoadOnScroll() {
    this.loadOnScroll = true;
  }

  disableLoadOnScroll() {
    this.loadOnScroll = false;
  }

  measure() {
    if (this.paused) {
      return;
    }

    let distance = 0;
    const sentinel = this.sentinel();

    // @todo review this logic when prefill support is added
    if (sentinel) {
      distance = getDistanceToFold(sentinel, this.scrollContainer);
    }

    if (distance <= 0 && (this.lastDistance === null || this.lastDistance > 0)) {
      this.emitter.emit(Events.HIT, {distance});
    }

    this.lastDistance = distance;
  }

  on(event, callback) {
    this.emitter.on(event, callback, this);

    if (event === Events.BINDED && this.binded) {
      callback.bind(this)();
    }
  }

  off(event, callback) {
    this.emitter.off(event, callback, this);
  }

  once(event, callback) {
    this.emitter.once(event, callback, this);

    if (event === Events.BINDED && this.binded) {
      callback.bind(this)();
    }
  }
}
