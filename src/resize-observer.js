/* eslint no-console: "off" */
import {getRootRect} from "./dimensions";
import throttle from "lodash.throttle";
import {resizeHandler} from "./event-handlers";

const NativeResizeObserver = window.ResizeObserver;

class EventListenerResizeObserver {
  constructor(el, listener) {
    this.el = el;
    this.listener = listener;
  }

  observe() {
    this.el.addEventListener('resize', this.listener);
  }

  unobserve() {
    this.el.removeEventListener('resize', this.listener);
  }
}

class NativeWrapperResizeObserver {
  constructor(el, listener) {
    this.el = el;
    this.listener = listener;
    this.ro = new NativeResizeObserver(this.listener);
  }

  observe() {
    this.ro.observe(this.el);
  }

  unobserve() {
    this.ro.unobserve();
  }
}

class PollingResizeObserver {
  constructor(el, listener) {
    this.el = el;
    this.listener = listener;
    this.interval = null;
    this.lastHeight = null;
  }

  pollHeight() {
    let height = Math.trunc(getRootRect(this.el).height);

    if (this.lastHeight !== null && this.lastHeight !== height) {
      this.listener();
    }

    this.lastHeight = height;
  }

  observe() {
    this.interval = setInterval(this.pollHeight.bind(this), 200);
  }

  unobserve() {
    clearInterval(this.interval);
  }
}

export default function ResizeObserverFactory(ias, el) {
  let listener = throttle(resizeHandler, 200).bind(ias);

  if (el === window) {
    return new EventListenerResizeObserver(el, listener);
  }

  if (NativeResizeObserver) {
    return new NativeWrapperResizeObserver(el, listener);
  }

  if (console && console.warn) {
    console.warn('ResizeObserver not supported. Falling back on polling.');
  }

  return new PollingResizeObserver(el, listener);
}
