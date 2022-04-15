import $ from 'tealight';
import Assert from './assert';

export function prevHandler(pageIndex) {
  let ias = this;
  let prevEl = ias._prevEl || $(ias.options.prev, document)[0];

  if (!prevEl) {
    Assert.warn(Assert.singleElement, ias.options.prev, 'options.prev');

    return;
  }

  let prevUrl = prevEl.href;

  return ias.load(prevUrl)
    .then((data) => {
      let prevEl = ias._prevEl = $(ias.options.prev, data.xhr.response)[0];

      return ias.prepend(data.items)
        .then(() => !!prevEl) // TODO: evaluate if this makes sense
    });
}
