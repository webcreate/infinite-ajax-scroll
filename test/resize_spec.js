import events from "../src/events";

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
    const spies = {
      resized() {},
    }

    cy.spy(spies, 'resized').as('spy');

    ias.on(events.RESIZED, spies.resized);

    cy.viewport(320, 400);

    cy.get('@spy').should('have.been.called');
  });

  it('should emit a hit event when resized to bottom', () => {
    const spies = {
      hit() {},
    }

    cy.spy(spies, 'hit').as('spy');

    ias.on(events.HIT, spies.hit);

    cy.viewport(640, 900);

    cy.get('@spy').should('have.been.called');
  });

  it('should not emit a hit event when unbinded', () => {
    const spies = {
      hit() {},
    }

    cy.spy(spies, 'hit').as('spy');

    ias.on(events.HIT, spies.hit);

    ias.unbind();

    cy.viewport(640, 900);

    cy.get('@spy').should('not.have.been.called');
  });
});
