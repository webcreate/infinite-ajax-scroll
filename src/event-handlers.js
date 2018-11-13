export function scrollHandler() {
  this.emitter.emit('scrolled');

  this.measure();
}

export function resizeHandler() {
  this.emitter.emit('resized');

  this.measure();
}
