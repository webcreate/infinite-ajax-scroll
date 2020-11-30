import Events from "./events";

export default class Prefill {
  constructor(ias, options) {
    this.ias = ias;
    this.enabled = options;
  }

  prefill() {
    if (!this.enabled) {
      return;
    }

    let distance = this.ias.distance();

    if (distance > 0) {
      return;
    }

    this.ias.emitter.emit(Events.PREFILL);

    return this._prefill().then(() => {
      this.ias.emitter.emit(Events.PREFILLED);

      // @todo reevaluate if we should actually call `measure` here.
      this.ias.measure();
    });
  }

  _prefill() {
    return this.ias.next().then((hasNextUrl) => {
      if (!hasNextUrl) {
        return;
      }

      let distance = this.ias.distance();

      if (distance < 0) {
        return this._prefill();
      }
    });
  }
}
