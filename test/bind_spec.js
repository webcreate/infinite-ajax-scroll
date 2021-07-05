import InfiniteAjaxScroll from '../src/infinite-ajax-scroll';
import events from "../src/events";

describe('Bind', () => {
  it('should bind on instantiation by default', () => {
    const container = document.createElement('div');
    container.innerHTML = `<div class="item">1</div>`;

    const ias = new InfiniteAjaxScroll(container, {item: '.item'});

    const spy = {
      onBind() {}
    };

    cy.spy(spy, 'onBind').as('spy');

    ias.on(events.BINDED, spy.onBind);

    cy.get('@spy').should('have.been.calledOnce');
  });

  it('should not bind on instantiation when option.bind is false', () => {
    const container = document.createElement('div');

    const ias = new InfiniteAjaxScroll(container, {bind: false});

    const spy = {
      onBind() {}
    };

    cy.spy(spy, 'onBind').as('spy');

    ias.on(events.BINDED, spy.onBind);

    cy.get('@spy').should('not.have.been.called')
  });

  it('should bind manually', () => {
    const container = document.createElement('div');
    container.innerHTML = `<div class="item">1</div>`;

    const ias = new InfiniteAjaxScroll(container, {bind: false, item: '.item'});

    const spy = {
      onBind() {}
    };

    cy.spy(spy, 'onBind').as('spy');

    ias.on(events.BINDED, spy.onBind);

    ias.bind();

    cy.get('@spy').should('have.been.calledOnce');
  });

  it('should not bind twice', () => {
    const container = document.createElement('div');
    container.innerHTML = `<div class="item">1</div>`;

    const ias = new InfiniteAjaxScroll(container, {bind: false, item: '.item'});

    const spy = {
      onBind() {}
    };

    cy.spy(spy, 'onBind').as('spy');

    ias.on(events.BINDED, spy.onBind);

    ias.bind();
    ias.bind();

    cy.get('@spy').should('have.been.calledOnce');
  });

  it('should unbind', () => {
    const container = document.createElement('div');
    container.innerHTML = `<div class="item">1</div>`;

    const ias = new InfiniteAjaxScroll(container, {item: '.item'});

    const spy = {
      onUnbind() {}
    };

    cy.spy(spy, 'onUnbind').as('spy');

    ias.on(events.UNBINDED, spy.onUnbind);

    ias.unbind();

    cy.get('@spy').should('have.been.calledOnce');
  });

  it('should not unbind when not binded', () => {
    const container = document.createElement('div');

    const ias = new InfiniteAjaxScroll(container, {bind: false});

    const spy = {
      onUnbind() {}
    };

    cy.spy(spy, 'onUnbind').as('spy');

    ias.on(events.UNBINDED, spy.onUnbind);

    ias.unbind();

    cy.get('@spy').should('not.have.been.called');
  });
});
