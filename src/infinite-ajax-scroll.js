import $ from 'tealight';
import extend from 'extend';
import throttle from 'lodash.throttle';
import defaults from './defaults';
import Assert from './assert';
import {scrollHandler} from "./event-handlers";
import Emitter from "tiny-emitter";
import {getDistanceToFold, getRootRect, getScrollPosition} from "./dimensions";
import {nextHandler} from './next-handler';
import Pagination from './pagination';
import Spinner from './spinner';
import Logger from './logger';
import Paging from './paging';
import Trigger from './trigger';
import {appendFn} from './append';
import * as Events from './events';
import ResizeObserverFactory from './resize-observer';
import Prefill from "./prefill";

export default class InfiniteAjaxScroll {
  constructor(container, options = {}) {
    Assert.singleElement(container, 'container');

    this.container = $(container)[0];
    this.options = extend({}, defaults, options);
    this.emitter = new Emitter();

    this.options.loadOnScroll ? this.enableLoadOnScroll() : this.disableLoadOnScroll();
    this.negativeMargin = Math.abs(this.options.negativeMargin);

    this.scrollContainer = this.options.scrollContainer;
    if (this.options.scrollContainer !== window) {
      Assert.singleElement(this.options.scrollContainer, 'options.scrollContainer');

      this.scrollContainer = $(this.options.scrollContainer)[0];
    }

    this.nextHandler = nextHandler;

    if (this.options.next === false) {
      this.nextHandler = function() {}
    } else if (typeof this.options.next === 'function') {
      this.nextHandler = this.options.next;
    }

    this.resizeObserver = ResizeObserverFactory(this, this.scrollContainer);
    this._scrollListener = throttle(scrollHandler, 200).bind(this);

    this.ready = false;
    this.bindOnReady = true;
    this.binded = false;
    this.paused = false;
    this.pageIndex = this.sentinel() ? 0 : -1;

    this.on(Events.HIT, () => {
      if (!this.loadOnScroll) {
        return;
      }

      this.next();
    });

    this.on(Events.SCROLLED, this.measure);
    this.on(Events.RESIZED, this.measure);

    // initialize extensions
    this.pagination = new Pagination(this, this.options.pagination);
    this.spinner = new Spinner(this, this.options.spinner);
    this.logger = new Logger(this, this.options.logger);
    this.paging = new Paging(this);
    this.trigger = new Trigger(this, this.options.trigger);
    this.prefill = new Prefill(this, this.options.prefill);

    // prefill/measure after all plugins are done binding
    this.on(Events.BINDED, this.prefill.prefill.bind(this.prefill));

    let ready = () => {
      if (this.ready) {
        return;
      }

      this.ready = true;

      this.emitter.emit(Events.READY);

      if (this.bindOnReady && this.options.bind) {
        this.bind();
      }
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(ready, 1);
    } else {
      window.addEventListener('DOMContentLoaded', ready);
    }
  }

  bind() {
    if (this.binded) {
      return;
    }

    // If we manually call bind before the dom is ready, we assume that we want
    // to take control over the bind flow.
    if (!this.ready) {
      this.bindOnReady = false;
    }

    this.scrollContainer.addEventListener('scroll', this._scrollListener);
    this.resizeObserver.observe();

    this.binded = true;

    this.emitter.emit(Events.BINDED);
  }

  unbind() {
    if (!this.binded) {
      if (!this.ready) {
        this.once(Events.BINDED, this.unbind);
      }

      return;
    }

    this.resizeObserver.unobserve();
    this.scrollContainer.removeEventListener('scroll', this._scrollListener);

    this.binded = false;

    this.emitter.emit(Events.UNBINDED);
  }

  next() {
    if (!this.binded) {
      if (!this.ready) {
        return this.once(Events.BINDED, this.next);
      }

      return;
    }

    this.pause();

    const pageIndex = this.pageIndex + 1;

    this.emitter.emit(Events.NEXT, {pageIndex: this.pageIndex + 1});

    return Promise.resolve(this.nextHandler(pageIndex))
      .then((hasNextUrl) => {
        this.pageIndex = pageIndex;

        if (!hasNextUrl) {
          this.emitter.emit(Events.LAST);

          return;
        }

        this.resume();
      }).then(() => {
        this.emitter.emit(Events.NEXTED, {pageIndex: this.pageIndex});
      });
  }

  /**
   * @param {string} url
   * @returns {Promise} returns LOADED event on success
   */
  load(url) {
    let ias = this;

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      let loadEvent = {
        url,
        xhr,
        method: 'GET',
        body: null,
        nocache: false,
        responseType: ias.options.responseType,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      };

      // event properties are mutable
      ias.emitter.emit(Events.LOAD, loadEvent);

      let finalUrl = loadEvent.url;
      let method = loadEvent.method;
      let responseType = loadEvent.responseType;
      let headers = loadEvent.headers;
      let body = loadEvent.body;

      if (!loadEvent.nocache) {
        // @see https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
        finalUrl = finalUrl + ((/\?/).test(finalUrl) ? "&" : "?") + (new Date()).getTime();
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
          return;
        }

        if (xhr.status === 0) {
          // weird status happening during Cypress tests
        }
        else if (xhr.status === 200) {
          let items = xhr.response;

          if (responseType === 'document') {
            items = $(ias.options.item, xhr.response);
            // @todo assert there actually are items in the response
          }

          // we don't use a shared loadedEvent variable here, because these values should be immutable

          ias.emitter.emit(Events.LOADED, {items, url: finalUrl, xhr});

          resolve({items, url: finalUrl, xhr});
        } else {
          ias.emitter.emit(Events.ERROR, {url: finalUrl, method, xhr});

          reject(xhr);
        }
      };

      xhr.onerror = function() {
        ias.emitter.emit(Events.ERROR, {url: finalUrl, method, xhr});

        reject(xhr);
      }

      xhr.open(method, finalUrl, true);
      xhr.responseType = responseType;

      for (let header in headers) {
        xhr.setRequestHeader(header, headers[header]);
      }

      xhr.send(body);
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
  }

  enableLoadOnScroll() {
    this.loadOnScroll = true;
  }

  disableLoadOnScroll() {
    this.loadOnScroll = false;
  }

  distance(rootRect, sentinel) {
    const _rootRect = rootRect || getRootRect(this.scrollContainer);

    const _sentinel = sentinel || this.sentinel();

    const scrollPosition = getScrollPosition(this.scrollContainer);

    let distance = getDistanceToFold(_sentinel, scrollPosition, _rootRect);

    // apply negative margin
    distance -= this.negativeMargin;

    return distance;
  }

  measure() {
    if (this.paused) {
      return;
    }

    const rootRect = getRootRect(this.scrollContainer);

    // When the scroll container has no height, this could indicate that
    // the element is not visible (display = none). Without a height
    // we cannot calculate the distance to fold. On the other hand we don't
    // have to, because it's not visible anyway. Our resize observer will
    // monitor the height, once it's greater than 0 everything will resume as normal.
    if (rootRect.height === 0) {
      // @todo DX: show warning in console that this is happening
      return;
    }

    const sentinel = this.sentinel();

    let distance = this.distance(rootRect, sentinel);

    if (distance <= 0) {
      this.emitter.emit(Events.HIT, {distance});
    }
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
    return new Promise((resolve) => {
      this.emitter.once(event, function() { Promise.resolve(callback.apply(this, arguments)).then(resolve) }, this);

      if (event === Events.BINDED && this.binded) {
        callback.bind(this)();
        resolve()
      }
    })
  }
}
