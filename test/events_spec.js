import InfiniteAjaxScroll from '../src/infinite-ajax-scroll';
import Emitter from 'tiny-emitter';

describe('InfiniteAjaxScroll', () => {
  it('should call event listener', () => {
    const emitter = new Emitter();

    const container = document.createElement('div');

    const ias = new InfiniteAjaxScroll(container, {'emitter': emitter});

    const spy = {
      foo() {}
    };

    cy.spy(spy, 'foo');

    ias.on('my-event', spy.foo);

    emitter.emit('my-event', 'data1');
    emitter.emit('my-event', 'data2');

    expect(spy.foo).to.have.been.calledTwice;
  });

  it('should remove event listener', () => {
    const emitter = new Emitter();

    const container = document.createElement('div');

    const ias = new InfiniteAjaxScroll(container, {'emitter': emitter});

    const spy = {
      foo() {}
    };

    cy.spy(spy, 'foo');

    ias.on('my-event', spy.foo);

    emitter.emit('my-event', 'data1');

    ias.off('my-event', spy.foo);

    emitter.emit('my-event', 'data2');

    expect(spy.foo).to.have.been.calledOnce;
  });

  it('should call event listener once', () => {
    const emitter = new Emitter();

    const container = document.createElement('div');

    const ias = new InfiniteAjaxScroll(container, {'emitter': emitter});

    const spy = {
      foo() {}
    };

    cy.spy(spy, 'foo');

    ias.once('my-event', spy.foo);

    emitter.emit('my-event', 'data1');
    emitter.emit('my-event', 'data2');

    expect(spy.foo).to.have.been.calledOnce;
  });
});
