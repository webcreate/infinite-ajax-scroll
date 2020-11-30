let ias;

describe('Resize', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
      });
    });
  });

  it('should emit a resized event when resized', () => {
    const spy = {
      resized() {}
    };

    cy.spy(spy, 'resized');

    ias.on('resized', spy.resized);

    cy.viewport(320, 400);

    cy.wait(2000).then(() => {
      expect(spy.resized).to.have.been.called;
    });
  });

  it('should emit a hit event when resized to bottom', () => {
    const spy = {
      hit() {}
    };

    cy.spy(spy, 'hit');

    ias.on('hit', spy.hit);

    cy.viewport(640, 900);

    cy.wait(200).then(() => {
      expect(spy.hit).to.have.been.called;
    });
  });

  it('should not emit a hit event when unbinded', () => {
    const spy = {
      hit() {}
    };

    cy.spy(spy, 'hit');

    ias.on('hit', spy.hit);

    ias.unbind();

    cy.viewport(640, 900);

    cy.wait(200).then(() => {
      expect(spy.hit).to.not.have.been.called;
    });
  });
});
