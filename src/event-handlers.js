import {getScrollPosition} from './dimensions';
import * as Events from './events'

const defaultLastScroll = {
  y: 0,
  x: 0,
  deltaY: 0,
  deltaX: 0
};

function calculateScroll(scrollContainer, lastScroll) {
  let scroll = getScrollPosition(scrollContainer);

  scroll.deltaY = scroll.y - (lastScroll ? lastScroll.y : scroll.y);
  scroll.deltaX = scroll.x - (lastScroll ? lastScroll.x : scroll.x);

  return scroll;
}

export function scrollHandler() {
  let ias = this;
  let lastScroll = ias._lastScroll || defaultLastScroll;

  const scroll = ias._lastScroll = calculateScroll(ias.scrollContainer, lastScroll);

  this.emitter.emit(Events.SCROLLED, {scroll});
}

export function resizeHandler() {
  let ias = this;
  let lastScroll = ias._lastScroll || defaultLastScroll;

  const scroll = ias._lastScroll = calculateScroll(ias.scrollContainer, lastScroll);

  this.emitter.emit(Events.RESIZED, {scroll});
}
