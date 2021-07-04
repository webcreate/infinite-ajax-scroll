import * as Events from "../src/events";
import events from "../src/events";

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
    const spies = {
      loaded() {}
    };

    cy.spy(spies, 'loaded').as('spy');

    ias.on(events.LOADED, spies.loaded);

    ias.load(url);

    cy.get('@spy').should((spy) => {
      expect(spy).to.have.been.calledOnce;

      // test arguments of loaded event
      expect(spy).to.have.been.calledWith(
          Cypress.sinon.match.has("url", Cypress.sinon.match(url))
      );
      expect(spy).to.have.been.calledWith(
          Cypress.sinon.match.has("items", Cypress.sinon.match.array)
      );
      expect(spy).to.have.been.calledWith(
          Cypress.sinon.match.has("xhr", Cypress.sinon.match.any)
      );
    })
  });

  it('should emit a loaded event when loaded (json response)', () => {
    const url = 'http://localhost:8080/test/fixtures/default/page2.json';
    const spies = {
      loaded() {}
    };

    cy.spy(spies, 'loaded').as('spy');

    // @todo not sure if we should allow this
    ias.options.responseType = 'json';

    ias.on(events.LOADED, spies.loaded);

    ias.load(url);

    cy.get('@spy').should((spy) => {
      // test that the items property contains the json object
      expect(spies.loaded).to.have.been.calledWith(
          Cypress.sinon.match.has("items", Cypress.sinon.match.has("blocks", Cypress.sinon.match.array))
      );
    });
  });

  it('should not emit a loaded event when 404', () => {
    const spies = {
      loaded() {}
    };

    cy.spy(spies, 'loaded').as('spy');

    ias.on(events.LOADED, spies.loaded);

    ias.load('http://localhost:8080/test/fixtures/default/page404.html');

    cy.get('@spy').should('not.have.been.called');
  });

  it('should reject the promise when not 200 status code', () => {
    const spies = {
      fulfilled() {},
      rejected() {},
    };

    const fulfilled = cy.spy(spies, 'fulfilled');
    const rejected = cy.spy(spies, 'rejected');

    ias.load('http://localhost:8080/test/fixtures/default/page404.html')
      .then(spies.fulfilled, spies.rejected)
      .finally(() => {
        expect(fulfilled).not.to.be.called;
        expect(rejected).to.be.calledOnce;
      });
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
    const spies = {
      load() {}
    };

    cy.spy(spies, 'load').as('spy');

    ias.on(events.LOAD, spies.load);

    ias.load('http://localhost:8080/test/fixtures/default/page2.html');

    cy.get('@spy').should('have.been.calledOnce');
  });

  it('should emit a loaded event after load when loading', () => {
    const spies = {
      load() {},
      loaded() {},
    };

    cy.spy(spies, 'load').as('loadSpy');
    cy.spy(spies, 'loaded').as('loadedSpy');

    ias.on(events.LOAD, spies.load);
    ias.on(events.LOADED, spies.loaded);

    ias.load('http://localhost:8080/test/fixtures/default/page2.html');

    cy.get('@loadedSpy').should((spy) => {
      expect(spy).to.have.been.calledAfter(spies.load);
    })
  });

  it('should emit an error event when 404', () => {
    const spies = {
      error() {}
    };

    cy.spy(spies, 'error').as('spy');

    ias.on(events.ERROR, spies.error);

    ias.load('http://localhost:8080/test/fixtures/default/page404.html');

    cy.get('@spy').should('not.have.been.called');
  });
});
