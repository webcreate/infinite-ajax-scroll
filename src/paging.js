
function getPageBreak(pageBreaks, scrollTop) {
  for (let b = pageBreaks.length - 1; b >= 0; b--) {
    if  (scrollTop >= pageBreaks[b].top) {
      return pageBreaks[b];
    }
  }

  return null;
}

export default class Paging {
  constructor(ias) {
    this.ias = ias;
    this.pageBreaks = [];
    this.currentPageIndex = ias.pageIndex;
    this.currentScrollTop = 0;

    ias.on('binded', this.bind.bind(this));
    ias.on('next', this.next.bind(this));
    ias.on('scrolled', this.scrolled.bind(this));
  }

  bind() {
    this.pageBreaks.push({
      pageIndex: this.currentPageIndex,
      top: 0,
      url: document.location.toString(),
      title: document.title
    });
  }

  next(nextEvent) {
    this.ias.once('loaded', (event) => {
      // @todo event.xhr.response.title only works in case of responseType = "document"s
      this.pageBreaks.push({
        pageIndex: nextEvent.pageIndex,
        top: this.currentScrollTop,
        url: event.url,
        title: event.xhr.response.title
      });
    });
  }

  scrolled(event) {
    this.currentScrollTop = event.scroll.y;

    let pageBreak = getPageBreak(this.pageBreaks, this.currentScrollTop);

    if (pageBreak && pageBreak.pageIndex !== this.currentPageIndex) {
      this.ias.emitter.emit('page', pageBreak);

      this.currentPageIndex = pageBreak.pageIndex;
    }
  }
}
