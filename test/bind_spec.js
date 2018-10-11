import InfiniteAjaxScroll from '../src/infinite-ajax-scroll';

describe('InfiniteAjaxScroll', () => {
  it('should bind on instantiation by default', () => {
    const container = document.createElement('div');

    const ias = new InfiniteAjaxScroll(container);

    const spy = {
      onBind() {}
    };

    cy.spy(spy, 'onBind');

    ias.on('binded', spy.onBind);

    expect(spy.onBind).to.have.been.calledOnce;
  });

  it('should not bind on instantiation when option.bind is false', () => {
    const container = document.createElement('div');

    const ias = new InfiniteAjaxScroll(container, {bind: false});

    const spy = {
      onBind() {}
    };

    cy.spy(spy, 'onBind');

    ias.on('binded', spy.onBind);

    expect(spy.onBind).to.not.have.been.called;
  });

  it('should bind manually', () => {
    const container = document.createElement('div');

    const ias = new InfiniteAjaxScroll(container, {bind: false});

    const spy = {
      onBind() {}
    };

    cy.spy(spy, 'onBind');

    ias.on('binded', spy.onBind);

    ias.bind();

    expect(spy.onBind).to.have.been.calledOnce;
  });

  it('should unbind', () => {
    const container = document.createElement('div');

    const ias = new InfiniteAjaxScroll(container);

    const spy = {
      onUnbind() {}
    };

    cy.spy(spy, 'onUnbind');

    ias.on('unbinded', spy.onUnbind);

    ias.unbind();

    expect(spy.onUnbind).to.have.been.calledOnce;
  });
});
