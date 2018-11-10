let ias;

describe('InfiniteAjaxScroll', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
      });
    });
  });

  it('should emit a loaded event when loaded', () => {
    const url = 'http://localhost:8080/test/fixtures/default/page2.html';
    const spy = {
      loaded() {}
    };

    cy.spy(spy, 'loaded');

    ias.on('loaded', spy.loaded);

    ias.load(url);

    cy.wait(5000).then(() => {
      expect(spy.loaded).to.have.been.calledOnce;

      // test arguments of loaded event
      expect(spy.loaded).to.have.been.calledWith(
          Cypress.sinon.match.array,
          Cypress.sinon.match(url),
          Cypress.sinon.match.any
      );
    });
  });

  it('should emit a loaded event when loaded (json response)', () => {
    const url = 'http://localhost:8080/test/fixtures/default/page2.json';
    const spy = {
      loaded() {}
    };

    cy.spy(spy, 'loaded');

    // @todo not sure if we should allow this
    ias.options.responseType = 'json';

    ias.on('loaded', spy.loaded);

    ias.load(url);

    cy.wait(5000).then(() => {
      // test arguments of loaded event
      expect(spy.loaded).to.have.been.calledWith(
          Cypress.sinon.match.has("items", Cypress.sinon.match.array)
      );
    });
  });

  it('should not emit a loaded event when 404', () => {
    const spy = {
      loaded() {}
    };

    cy.spy(spy, 'loaded');

    ias.on('loaded', spy.loaded);

    ias.load('http://localhost:8080/test/fixtures/default/page3.html');

    cy.wait(5000).then(() => {
      expect(spy.loaded).to.not.have.been.calledOnce;
    });
  });

  it('should emit a load event when loading', () => {
    const spy = {
      load() {}
    };

    cy.spy(spy, 'load');

    ias.on('load', spy.load);

    ias.load('http://localhost:8080/test/fixtures/default/page2.html');

    cy.wait(100).then(() => {
      expect(spy.load).to.have.been.calledOnce;
    });
  });

  it('should emit a load event before loaded when loading', () => {
    const spy = {
      load() {},
      loaded() {},
    };

    cy.spy(spy, 'load');
    cy.spy(spy, 'loaded');

    ias.on('load', spy.load);
    ias.on('loaded', spy.loaded);

    ias.load('http://localhost:8080/test/fixtures/default/page2.html');

    cy.wait(100).then(() => {
      expect(spy.load).to.have.been.calledBefore(spy.loaded);
    });
  });
});
