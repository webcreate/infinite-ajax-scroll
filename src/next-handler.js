import $ from 'tealight';

export function nextHandler(pageIndex) {
  if (!this.lastResponse) {
    this.lastResponse = document;
  }
  let nextUrl;
  let ias = this;

  let nextEl = $(ias.options.next, this.lastResponse)[0];

  if (!nextEl) {
    return;
  }

  nextUrl = nextEl.href;

  return ias.load(nextUrl)
      .then((data) => {
        this.lastResponse = data.xhr.response;

        let nextEl = $(ias.options.next, this.lastResponse)[0];

        return ias.append(data.items)
            .then(() => {
              return !!nextEl;
            });
      });
}
