import $ from 'tealight';
import Assert from './assert';

export function prevHandler(pageIndex) {
  let ias = this;
  let lastResponse = document; // TODO: evaluate if this is correct

  let prevEl = $(ias.options.prev, lastResponse)[0];

  if (!prevEl) {
    Assert.warn(Assert.singleElement, ias.options.prev, 'options.prev');

    return;
  }

  let prevUrl = prevEl.href;

  return ias.load(prevUrl)
    .then((data) => {
      lastResponse = data.xhr.response;

      let prevEl = $(ias.options.prev, lastResponse)[0];

      return ias.prepend(data.items)
        .then(() => !!prevEl) // TODO: evaluate if this makes sense
    });
}
