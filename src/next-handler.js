import $ from 'tealight';

export function nextHandler(pageIndex) {
  let ias = this;
  let lastResponse = ias._lastResponse || document;

  let nextEl = $(ias.options.next, lastResponse)[0];

  if (!nextEl) {
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
        });
    });
}
