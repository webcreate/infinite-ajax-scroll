import events from "../src/events";

let ias;

describe('Load on scroll', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html')
  });

  it('should emit a next event when loadOnScroll enabled by default', () => {
    const spies = {
      next() {}
    };

    cy.spy(spies, 'next').as('spy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
      });

      ias.on(events.NEXT, spies.next);

      cy.scrollTo('bottom', {duration: 300});

      cy.get('@spy').should('have.been.called');
    });
  });

  it('should emit a next event when loadOnScroll explicitly enabled', () => {
    const spy = {
      next() {}
    };

    cy.spy(spy, 'next').as('spy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        loadOnScroll: true
      });

      ias.on(events.NEXT, spy.next);

      cy.scrollTo('bottom', {duration: 300});

      cy.get('@spy').should('have.been.called');
    });
  });

  it('should not emit a next event when loadOnScroll is disabled', () => {
    const spies = {
      next() {}
    };

    cy.spy(spies, 'next').as('spy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        loadOnScroll: false
      });

      ias.on(events.NEXT, spies.next);

      cy.scrollTo('bottom', {duration: 300});

      cy.get('@spy').should('not.have.been.called');
    });
  });

  it('can be enabled (enableLoadOnScroll)', () => {
    const spies = {
      next() {}
    };

    cy.spy(spies, 'next').as('spy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        loadOnScroll: false
      });

      ias.enableLoadOnScroll();

      ias.on(events.NEXT, spies.next);

      cy.scrollTo('bottom', {duration: 300});

      cy.get('@spy').should('have.been.called');
    });
  });

  it('can be disabled (disableLoadOnScroll)', () => {
    const spies = {
      next() {}
    };

    cy.spy(spies, 'next').as('spy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        loadOnScroll: true
      });

      ias.disableLoadOnScroll();

      ias.on(events.NEXT, spies.next);

      cy.scrollTo('bottom', {duration: 300});

      cy.get('@spy').should('not.have.been.called');
    });
  });
});
