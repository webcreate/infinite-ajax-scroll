import $ from 'tealight';
import Assert from './assert';

export function nextHandler(pageIndex) {
  let ias = this;
  let lastResponse = ias._lastResponse || document;

  let nextEl = $(ias.options.next, lastResponse)[0];

  if (!nextEl) {
    Assert.warn(Assert.singleElement, ias.options.next, 'options.next');

    return;
  }

  let nextUrl = nextEl.href;

  return ias.load(nextUrl)
    .then((data) => {
      lastResponse = ias._lastResponse = data.xhr.response;

      let nextEl = $(ias.options.next, lastResponse)[0];

      return ias.append(data.items)
        .then(() => {
          return !!nextEl;
        })
        .then((hasNextEl) => {
          // only warn for first page, because at some point it's expected that there is no next element
          if (!hasNextEl && pageIndex <= 1 && console && console.warn) {
            console.warn(`Element "${ias.options.next}" not found for "options.next" on "${data.url}"`)
          }

          return hasNextEl;
        });
    });
}
