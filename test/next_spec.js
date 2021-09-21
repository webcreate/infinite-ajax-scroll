import events from "../src/events";

let ias;

describe('Next', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');
  });

  it('should emit a next event when scrolled to bottom', () => {
    const spies = {
      hit() {},
      next() {},
    };

    cy.spy(spies, 'hit').as('hitSpy');
    cy.spy(spies, 'next').as('nextSpy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on(events.HIT, spies.hit);
      ias.on(events.NEXT, spies.next);

      cy.scrollTo('bottom', {duration: 300});

      cy.get('@nextSpy').should((spy) => {
        expect(spy).to.have.been.calledOnce;
        // @todo would expect to have `next` called after `hit`,
        //       but this is not supported by tiny-emitter
        // expect(spy.next).to.have.been.calledAfter(spy.hit);

        expect(spy).to.have.been.calledWith(
          Cypress.sinon.match.has("pageIndex", Cypress.sinon.match(1))
        );
      });
    });
  });

  it('should emit a next event when next called manually', () => {
    const spies = {
      next() {},
    };

    cy.spy(spies, 'next').as('nextSpy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on(events.NEXT, spies.next);

      ias.next();

      cy.get('@nextSpy').should((spy) => {
        expect(spy).to.have.been.calledOnce;
        expect(spy).to.have.been.calledWith(
            Cypress.sinon.match.has("pageIndex", Cypress.sinon.match(1))
        );
      });
    });
  });

  it('should call custom next handler', () => {
    const spies = {
      nextHandler() {},
    };

    cy.spy(spies, 'nextHandler').as('nextHandlerSpy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: spies.nextHandler,
      });

      ias.next();

      cy.get('@nextHandlerSpy').should((spy) => {
        expect(spy).to.have.been.calledOnce;
        expect(spy).to.have.been.calledWith(
            Cypress.sinon.match(1) // assert expected pageIndex
        );
      });
    });
  });

  it('should warn when next element not found', () => {
    cy.visit('http://localhost:8080/test/fixtures/default/page1-no-next-el.html');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      cy.window().then((win) => {
        cy.spy(win.console, 'warn').as('consoleSpy');

        let ias = new InfiniteAjaxScroll('.blocks', {
          item: '.blocks__block',
          next: '.pager__next',
          pagination: '.pager',
        });

        ias.next();

        cy.get('@consoleSpy').should('have.been.calledOnce');
      });
    });
  });

  it('should warn when next element not found on page2', () => {
    cy.visit('http://localhost:8080/test/fixtures/default/page1-no-next-el-page2.html');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      cy.window().then((win) => {
        cy.spy(win.console, 'warn').as('consoleSpy');

        let ias = new InfiniteAjaxScroll('.blocks', {
          item: '.blocks__block',
          next: '.pager__next',
          pagination: '.pager',
        });

        ias.next().then(() => { ias.next() });

        cy.get('@consoleSpy').should('have.been.calledOnce');
      });
    });
  });

  it('should emit a nexted event when finished', () => {
    const spies = {
      nexted() {},
    };

    cy.spy(spies, 'nexted').as('nextedSpy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on(events.NEXTED, spies.nexted);

      ias.next();

      cy.get('@nextedSpy').should((spy) => {
        expect(spy).to.have.been.calledOnce;
        expect(spy).to.have.been.calledWith(
          Cypress.sinon.match.has("pageIndex", Cypress.sinon.match(1))
        );
      });
    });
  });
});
