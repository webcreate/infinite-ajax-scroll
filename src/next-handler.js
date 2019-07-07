import $ from 'tealight';

let lastResponse = document;
let nextUrl;

export function nextHandler(pageIndex) {
  let ias = this;

  let nextEl = $(ias.options.next, lastResponse)[0];

  if (!nextEl) {
    return;
  }

  nextUrl = nextEl.href;

  return ias.load(nextUrl)
      .then((data) => {
        lastResponse = data.xhr.response;

        let nextEl = $(ias.options.next, lastResponse)[0];

        return ias.append(data.items)
            .then(() => {
              return !!nextEl;
            });
      });
}
