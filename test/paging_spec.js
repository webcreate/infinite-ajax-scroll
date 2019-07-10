let ias;

describe('Paging', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });
    });
  });

  it('should emit a page event when scrolled down', () => {
    const spy = {
      page() {},
    };

    cy.spy(spy, 'page');

    ias.on('page', spy.page);

    cy
      .scrollTo('bottom', {duration: 300})
      .wait(5000) // wait for the page to load
      .then(() => {
        expect(spy.page).to.have.been.calledOnce;
        expect(spy.page).to.have.been.calledWith(
            Cypress.sinon.match.has("pageIndex", Cypress.sinon.match(1))
        );
        expect(spy.page).to.have.been.calledWith(
            Cypress.sinon.match.has("url", Cypress.sinon.match('http://localhost:8080/test/fixtures/default/page2.html'))
        );
        expect(spy.page).to.have.been.calledWith(
            Cypress.sinon.match.has("title", Cypress.sinon.match('Page 2 - Infinite Ajax Scroll'))
        );
        // @todo find out how to test for property "top" greaterThan 0
      });

    cy
      .scrollTo('bottom', {duration: 300})
      .wait(5000) // wait for the page to load
      .then(() => {
        expect(spy.page).to.have.been.calledTwice;
        expect(spy.page).to.have.been.calledWith(
            Cypress.sinon.match.has("pageIndex", Cypress.sinon.match(2))
        );
        expect(spy.page).to.have.been.calledWith(
            Cypress.sinon.match.has("url", Cypress.sinon.match('http://localhost:8080/test/fixtures/default/page3.html'))
        );
        expect(spy.page).to.have.been.calledWith(
            Cypress.sinon.match.has("title", Cypress.sinon.match('Page 3 - Infinite Ajax Scroll'))
        );
        // @todo find out how to test for property "top" greaterThan 0
      });
  });
});

