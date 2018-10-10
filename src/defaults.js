import Emitter from "tiny-emitter";

export default {
  item: '',
  pagination: {},
  next: '',
  responseType: 'document',
  bind: true,
  scrollContainer: window,
  spinner: false,
  emitter: new Emitter(),
};
