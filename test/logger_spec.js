let consoleSpy;

describe('Logger', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');
  });

  it('should use default logger', () => {
    cy.window().then((win) => {
      cy.spy(win.console, "log").as('spy')
    });

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        logger: true
      });
    });

    cy.get('@spy').should((consoleSpy) => {
      expect(consoleSpy).to.have.been.calledWith(
        "Binded event handlers"
      );
    });
  });

  it('should disable the logger', () => {
    cy.window().then((win) => {
      cy.spy(win.console, "log").as('spy')
    });

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        logger: false
      });
    });

    cy.get('@spy').should('not.have.been.called');
  });

  it('should use a custom logger', () => {
    const customLogger = {
      binded: () => {
        /* eslint no-console: "off" */
        console.log('My custom logger for the binded event');
      }
    };

    cy.spy(customLogger, 'binded').as('spy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        logger: customLogger
      });
    });

    cy.get('@spy').should('have.been.calledOnce');
  });

});
