import {getScrollPosition} from './dimensions';

export function scrollHandler() {
  let scroll = getScrollPosition(this.scrollContainer);

  this.emitter.emit('scrolled', {scroll});

  this.measure();
}

export function resizeHandler() {
  let scroll = getScrollPosition(this.scrollContainer);

  this.emitter.emit('resized', {scroll});

  this.measure();
}
