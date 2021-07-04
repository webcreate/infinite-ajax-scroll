import events from "../src/events";

let ias;

describe('Scroll', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html')

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
      });
    });
  });

  it('should emit a scrolled event when scrolled down', () => {
    const spies = {
      scrolled() {}
    };

    cy.spy(spies, 'scrolled').as('spy');

    ias.on(events.SCROLLED, spies.scrolled);

    cy.scrollTo('bottom', {duration: 300});

    cy.get('@spy').should((spy) => {
      expect(spy).to.have.been.calledWith(
        Cypress.sinon.match(function(event) {
          expect(event.scroll.y).to.be.greaterThan(0, 'scroll.y');
          expect(event.scroll.x).to.be.equal(0, 'scroll.x');
          expect(event.scroll.deltaY).to.be.greaterThan(0, 'scroll.deltaY');
          expect(event.scroll.deltaX).to.be.equal(0, 'scroll.deltaX');

          return true;
        })
      );
    });
  });

  it('should emit a scrolled event when scrolled up', () => {
    const spies = {
      scrolled() {}
    };

    // first scroll down
    cy
      .scrollTo('bottom')
      .wait(300)
      .then(() => {
        cy.spy(spies, 'scrolled').as('spy');

        ias.on(events.SCROLLED, spies.scrolled);

        cy.scrollTo(0, 100);

        cy.get('@spy').should((spy) => {
          expect(spy).to.have.been.calledWith(
            Cypress.sinon.match((event) => {
              expect(event.scroll.y).to.be.greaterThan(0, 'scroll.y');
              expect(event.scroll.x).to.be.equal(0, 'scroll.x');
              expect(event.scroll.deltaY).to.be.lessThan(0, 'scroll.deltaY'); // should be negative
              expect(event.scroll.deltaX).to.be.equal(0, 'scroll.deltaX');

              return true;
            })
          );
        });
      });
  });

  it('should emit a hit event when scrolled to bottom', () => {
    const spies = {
      hit() {}
    };

    cy.spy(spies, 'hit').as('spy');

    ias.on(events.HIT, spies.hit);

    cy.scrollTo('bottom', {duration: 300});

    cy.get('@spy').should('have.been.called');
  });

  it('should not emit a hit event when unbinded', () => {
    const spies = {
      hit() {}
    };

    cy.spy(spies, 'hit').as('spy');

    ias.on(events.HIT, spies.hit);

    ias.unbind();

    cy.scrollTo('bottom', {duration: 300});

    cy.get('@spy').should('not.have.been.called');
  });

  it('should take negativeMargin into account', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      const spies = {
        hit() {}
      };

      cy.spy(spies, 'hit').as('spy');

      // unbind instance from beforeEach step
      ias.unbind();

      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        negativeMargin: 200,
      });

      ias.on(events.HIT, spies.hit);

      // 300 would not be enough without the negative margin
      cy.scrollTo(0, 300, {duration: 300});

      cy.get('@spy').should('have.been.called');
    });
  });
});
