import {getRootRect} from "./dimensions";

function getPageBreak(pageBreaks, scrollTop, scrollContainer) {
  let rootRect = getRootRect(scrollContainer);
  let scrollBottom = scrollTop + rootRect.height;

  for (let b = pageBreaks.length - 1; b >= 0; b--) {
    let bottom = pageBreaks[b].sentinel.getBoundingClientRect().bottom + scrollTop;

    if (scrollBottom > bottom) {
      let x = Math.min(b + 1, pageBreaks.length - 1);

      return pageBreaks[x];
    }
  }

  return pageBreaks[0];
}

export default class Paging {
  constructor(ias) {
    this.ias = ias;
    this.pageBreaks = [];
    this.currentPageIndex = ias.pageIndex;
    this.currentScrollTop = 0;

    ias.on('binded', this.binded.bind(this));
    ias.on('next', this.next.bind(this));
    ias.on('scrolled', this.scrolled.bind(this));
  }

  binded() {
    this.pageBreaks.push({
      pageIndex: this.currentPageIndex,
      url: document.location.toString(),
      title: document.title,
      sentinel: this.ias.sentinel()
    });
  }

  next(nextEvent) {
    this.ias.once('loaded', (event) => {
      // @todo event.xhr.response.title only works in case of responseType = "document"

      this.ias.once('appended', () => {
        this.pageBreaks.push({
          pageIndex: nextEvent.pageIndex,
          url: event.url,
          title: event.xhr.response.title,
          sentinel: this.ias.sentinel()
        });

        this.update();
      })
    });
  }

  scrolled(event) {
    this.update(event.scroll.y);
  }

  update(scrollTop) {
    this.currentScrollTop = scrollTop || this.currentScrollTop;

    let pageBreak = getPageBreak(this.pageBreaks, this.currentScrollTop, this.ias.scrollContainer);

    if (pageBreak && pageBreak.pageIndex !== this.currentPageIndex) {
      this.ias.emitter.emit('page', pageBreak);

      this.currentPageIndex = pageBreak.pageIndex;
    }
  }
}
