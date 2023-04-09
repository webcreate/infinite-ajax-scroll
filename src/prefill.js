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

    this.ias.emitter.emit(Events.PREFILL);

    return Promise.all([this._prefillNext(), this._prefillPrev()]).then(() => {
      this.ias.emitter.emit(Events.PREFILLED);

      // @todo reevaluate if we should actually call `measure` here.
      this.ias.measure();
    });
  }

  _prefillNext() {
    let distance = this.ias.distance();

    if (distance > 0) {
      return;
    }

    return this.ias.next()
      .then((hasNextUrl) => {
        if (!hasNextUrl) {
          return;
        }

        let distance = this.ias.distance();

        if (distance < 0) {
          return this._prefillNext();
        }
      })
    ;
  }

  _prefillPrev() {
    if (!this.ias.options.prev) {
      return;
    }

    return this.ias.prev();
  }
}
