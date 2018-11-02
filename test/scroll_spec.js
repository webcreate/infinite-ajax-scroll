let ias;

describe('InfiniteAjaxScroll', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html').then(() => {
      cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
        ias = new InfiniteAjaxScroll('.blocks', {
          item: '.blocks__block',
        });
      });
    });
  });

  it('should emit a scrolled event when scrolled', () => {
    const spy = {
      scrolled() {}
    };

    cy.spy(spy, 'scrolled');

    ias.on('scrolled', spy.scrolled);

    cy.scrollTo('bottom', {duration: 300}).then(function() {
      expect(spy.scrolled).to.have.been.called;
    });
  });

  it('should emit a hit event when scrolled to bottom', () => {
    const spy = {
      hit() {}
    };

    cy.spy(spy, 'hit');

    ias.on('hit', spy.hit);

    cy.scrollTo('bottom', {duration: 300});

    cy.wait(200).then(() => {
      expect(spy.hit).to.have.been.called;
    });
  });
});
