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

let scrollListener;
let resizeListener;

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
    this.pageIndex = 0;

    this.pagination = new Pagination(this, this.options.pagination);

    this.on('hit', this.next);

    if (this.options.bind) {
      // @todo on document.ready?
      this.bind();
    }
  }

  bind() {
    if (this.binded) {
      return;
    }

    scrollListener = throttle(scrollHandler, 200).bind(this);
    resizeListener = throttle(resizeHandler, 200).bind(this);

    this.scrollContainer.addEventListener('scroll', scrollListener);
    this.scrollContainer.addEventListener('resize', resizeListener);

    this.binded = true;

    this.emitter.emit('binded');
  }

  unbind() {
    if (!this.binded) {
      return;
    }

    this.scrollContainer.removeEventListener('resize', resizeListener);
    this.scrollContainer.removeEventListener('scroll', scrollListener);

    this.binded = false;

    this.emitter.emit('unbinded');
  }

  next() {
    this.pause();

    let event = {
      pageIndex: this.pageIndex,
    };

    this.emitter.emit('next', event);

    Promise.resolve(this.nextHandler(event.pageIndex))
        .then((result) => {
          if (!result) {
            this.emitter.emit('noneLeft');

            return;
          }

          this.pageIndex++;
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
          }

          // @todo define event variable and pass that around so it can be manipulated

          ias.emitter.emit('loaded', {items, url, xhr});

          resolve({items, url, xhr});
        } else {
          // @todo this console.error the best approach?
          console.error('Request failed');

          reject(xhr);
        }
      };

      // FIXME: make no-caching configurable
      // @see https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
      url = url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();

      xhr.open('GET', url, true);
      xhr.responseType = ias.options.responseType;
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      ias.emitter.emit('load', {url, xhr});

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

    // @todo move fragment creation into executor?
    let insert = document.createDocumentFragment();

    items.forEach((item) => {
      insert.appendChild(item);
    });

    let executor = (resolve) => {
      window.requestAnimationFrame(() => {
        let last = ias.sentinel();
        let sibling = last ? last.nextSibling : null;

        parent.insertBefore(insert, sibling);

        window.requestAnimationFrame(() => {
          // @todo define event variable and pass that around so it can be manipulated
          resolve({items, parent});

          ias.emitter.emit('appended', {items, parent});
        });
      });
    };

    let event = {
      items,
      parent,
      executor,
    };

    ias.emitter.emit('append', event);

    return new Promise(event.executor);
  }

  sentinel() {
    const items = $(this.options.item, this.container);

    if (!items.length) {
      throw new Error(`Item "${this.options.item}" not found`);
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

  measure() {
    if (this.paused) {
      return;
    }

    const distance = getDistanceToFold(this.sentinel(), this.scrollContainer);

    if (distance <= 0) {
      this.emitter.emit('hit', {distance});
    }
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
