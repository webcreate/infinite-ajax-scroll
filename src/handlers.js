import {getDistanceToFold} from "./dimensions";

export function scrollHandler() {
  const distance = getDistanceToFold(this.sentinel(), this.scrollContainer);

  this.emitter.emit('scrolled');

  if (distance <= 0) {
    this.emitter.emit('hit', {
      distance
    });
  }
}

export function resizeHandler() {
  const distance = getDistanceToFold(this.sentinel(), this.scrollContainer);

  this.emitter.emit('resized');

  if (distance <= 0) {
    this.emitter.emit('hit', {
      distance
    });
  }
}
