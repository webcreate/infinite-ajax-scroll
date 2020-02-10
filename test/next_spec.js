let ias;

describe('Next', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');
  });

  it('should emit a next event when scrolled to bottom', () => {
    const spy = {
      hit() {},
      next() {},
    };

    cy.spy(spy, 'hit');
    cy.spy(spy, 'next');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on('hit', spy.hit);
      ias.on('next', spy.next);

      cy
        .scrollTo('bottom', {duration: 300})
        .wait(200)
        .then(() => {
          expect(spy.next).to.have.been.calledOnce;
          // @todo would expect to have `next` called after `hit`,
          //       but this is not supported by tiny-emitter
          // expect(spy.next).to.have.been.calledAfter(spy.hit);

          expect(spy.next).to.have.been.calledWith(
              Cypress.sinon.match.has("pageIndex", Cypress.sinon.match(1))
          );
        });
    });
  });

  it('should emit a next event when next called manually', () => {
    const spy = {
      next() {},
    };

    cy.spy(spy, 'next');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on('next', spy.next);

      ias.next();

      expect(spy.next).to.have.been.calledOnce;
      expect(spy.next).to.have.been.calledWith(
          Cypress.sinon.match.has("pageIndex", Cypress.sinon.match(1))
      );
    });
  });

  it('should call custom next handler', () => {
    const spy = {
      nextHandler() {},
    };

    cy.spy(spy, 'nextHandler');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: spy.nextHandler,
      });

      ias.next();

      expect(spy.nextHandler).to.have.been.calledOnce;
      expect(spy.nextHandler).to.have.been.calledWith(
          Cypress.sinon.match(1) // assert expected pageIndex
      );
    });
  });

  it('should warn when next element not found', () => {
    cy.visit('http://localhost:8080/test/fixtures/default/page1-no-next-el.html');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      cy.window().then((win) => {
        const spy = cy.spy(win.console, 'warn');

        let ias = new InfiniteAjaxScroll('.blocks', {
          item: '.blocks__block',
          next: '.pager__next',
          pagination: '.pager',
          bind: false
        });

        ias.next();

        expect(spy).to.have.been.calledOnce;
      });
    });
  });

  it('should warn when next element not found on page2', () => {
    cy.visit('http://localhost:8080/test/fixtures/default/page1-no-next-el-page2.html');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      cy.window().then((win) => {
        const spy = cy.spy(win.console, 'warn');

        let ias = new InfiniteAjaxScroll('.blocks', {
          item: '.blocks__block',
          next: '.pager__next',
          pagination: '.pager',
          bind: false
        });

        ias.next().then(() => {
          ias.next().then(() => {
            expect(spy).to.have.been.calledOnce;
          });
        });
      });
    });
  });
});
