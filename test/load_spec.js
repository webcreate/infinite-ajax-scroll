import * as Events from "../src/events";

let ias;

describe('Load', () => {
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
          Cypress.sinon.match.has("url", Cypress.sinon.match(url))
      );
      expect(spy.loaded).to.have.been.calledWith(
          Cypress.sinon.match.has("items", Cypress.sinon.match.array)
      );
      expect(spy.loaded).to.have.been.calledWith(
          Cypress.sinon.match.has("xhr", Cypress.sinon.match.any)
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

    cy.wait(8000).then(() => {
      // test that the items property contains the json object
      expect(spy.loaded).to.have.been.calledWith(
          Cypress.sinon.match.has("items", Cypress.sinon.match.has("blocks", Cypress.sinon.match.array))
      );
    });
  });

  it('should not emit a loaded event when 404', () => {
    const spy = {
      loaded() {}
    };

    cy.spy(spy, 'loaded');

    ias.on('loaded', spy.loaded);

    ias.load('http://localhost:8080/test/fixtures/default/page404.html');

    cy.wait(5000).then(() => {
      expect(spy.loaded).to.not.have.been.called;
    });
  });

  it('should reject the promise when not 200 status code', () => {
    const spy = {
      fulfilled() {},
      rejected() {},
    };

    cy.spy(spy, 'fulfilled');
    cy.spy(spy, 'rejected');

    ias.load('http://localhost:8080/test/fixtures/default/page404.html')
      .then(spy.fulfilled, spy.rejected)
      .finally(() => {
        expect(spy.fulfilled).to.not.have.been.called;
        expect(spy.rejected).to.have.been.calledOnce;
      })
    ;
  });

  it('allows to modify the url', () => {
    const expectedUrl = 'http://localhost:8080/test/fixtures/default/page2.json';

    const loadFn = function(event) {
      event.url = expectedUrl;
      event.responseType = 'json';
    };

    ias.on(Events.LOAD, loadFn);

    ias.load('http://localhost:8080/test/fixtures/default/page2.html')
      .then((event) => {
        expect(event.url).to.have.string(expectedUrl);

        // assert that is handled and parsed the page2.json page correctly
        expect(event.items).to.have.property("blocks");
      });
  });

  it('allows to modify the method', () => {
    const expectedUrl = 'http://localhost:8080/test/fixtures/default/page2.json';

    const loadFn = function(event) {
      event.url = expectedUrl;
      event.method = 'POST';
    };

    ias.on(Events.LOAD, loadFn);

    ias.load('http://localhost:8080/test/fixtures/default/page2.html')
      .catch((xhr) => {
        // assert we did a POST by checking that it returned 405 Method Not Allowed
        expect(xhr.status).to.eq(405);
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
