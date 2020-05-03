/* eslint no-console: "off" */
import $ from 'tealight';

export default {
  singleElement(elementOrSelector, property) {
    const $element = $(elementOrSelector);

    if ($element.length > 1) {
      throw new Error(`Expected single element for "${property}"`);
    }

    if ($element.length === 0) {
      throw new Error(`Element "${elementOrSelector}" not found for "${property}"`);
    }
  },
  anyElement(elementOrSelector, property) {
    const $element = $(elementOrSelector);

    if ($element.length === 0) {
      throw new Error(`Element "${elementOrSelector}" not found for "${property}"`);
    }
  },
  warn(fn, ...args) {
    try {
      fn(...args)
    } catch (e) {
      if (console && console.warn) {
        console.warn(e.message)
      }
    }
  }
}
