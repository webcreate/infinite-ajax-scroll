import {getScrollPosition} from './dimensions';
import * as Events from './events'

// @todo 1) verify that this is NOT shared among multiple instances
// @todo 2) fill in these values on bind instead of zeroing them all
let lastScroll = {
  y: 0,
  x: 0,
  deltaY: 0,
  deltaX: 0
};

function calculateScroll(scrollContainer) {
  let scroll = getScrollPosition(scrollContainer);

  scroll.deltaY = scroll.y - (lastScroll ? lastScroll.y : scroll.y);
  scroll.deltaX = scroll.x - (lastScroll ? lastScroll.x : scroll.x);

  lastScroll = scroll;

  return scroll;
}

export function scrollHandler() {
  const scroll = calculateScroll(this.scrollContainer);

  this.emitter.emit(Events.SCROLLED, {scroll});

  this.measure();
}

export function resizeHandler() {
  const scroll = calculateScroll(this.scrollContainer);

  this.emitter.emit(Events.RESIZED, {scroll});

  this.measure();
}
