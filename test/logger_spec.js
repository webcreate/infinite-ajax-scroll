let consoleSpy;

describe('Logger', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');
  });

  it('should use default logger', () => {
    cy.window().then((win) => {
      consoleSpy = cy.spy(win.console, "log")
    });

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        logger: true
      });

      expect(consoleSpy).to.have.been.calledOnce;
      expect(consoleSpy).to.have.been.calledWith(
          "Binded event handlers"
      );
    });
  });

  it('should disable the logger', () => {
    cy.window().then((win) => {
      consoleSpy = cy.spy(win.console, "log")
    });

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        logger: false
      });

      expect(consoleSpy).to.not.have.been.called;
    });
  });

  it('should use a custom logger', () => {
    const logger = {
      binded: () => {
        console.log('My custom logger for the binded event');
      }
    };

    cy.spy(logger, 'binded');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        logger: logger
      });

      expect(logger.binded).to.have.been.calledOnce;
    });
  });

});
