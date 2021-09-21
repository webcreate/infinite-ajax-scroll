import {getRootRect} from "./dimensions";
import * as Events from './events';

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

    ias.on(Events.BINDED, this.binded.bind(this));
    ias.on(Events.NEXT, this.next.bind(this));
    ias.on(Events.SCROLLED, this.scrolled.bind(this));
    ias.on(Events.RESIZED, this.scrolled.bind(this));
  }

  binded() {
    let sentinel = this.ias.sentinel();
    if (!sentinel) {
      return;
    }

    this.pageBreaks.push({
      pageIndex: this.currentPageIndex,
      url: document.location.toString(),
      title: document.title,
      sentinel: this.ias.sentinel()
    });
  }

  next() {
    let url = document.location.toString();
    let title = document.title;

    let loaded = (event) => {
      url = event.url;

      if (event.xhr.response) {
        title = event.xhr.response.title
      }
    };

    this.ias.once(Events.LOADED, loaded);

    this.ias.once(Events.NEXTED, (event) => {
      this.pageBreaks.push({
        pageIndex: event.pageIndex,
        url,
        title,
        sentinel: this.ias.sentinel()
      });

      this.update();

      this.ias.off(Events.LOADED, loaded);
    });
  }

  scrolled(event) {
    this.update(event.scroll.y);
  }

  update(scrollTop) {
    this.currentScrollTop = scrollTop || this.currentScrollTop;

    let pageBreak = getPageBreak(this.pageBreaks, this.currentScrollTop, this.ias.scrollContainer);

    if (pageBreak && pageBreak.pageIndex !== this.currentPageIndex) {
      this.ias.emitter.emit(Events.PAGE, pageBreak);

      this.currentPageIndex = pageBreak.pageIndex;
    }
  }
}
