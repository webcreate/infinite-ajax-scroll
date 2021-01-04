describe('Append', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');
  });

  it('should emit an append event when scrolled to bottom', () => {
    const spies = {
      append() {},
    };

    cy.spy(spies, 'append').as('spy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on('append', spies.append);

      cy.scrollTo('bottom', {duration: 300});

      cy.get('@spy').should((spy) => {
        expect(spy).to.have.been.calledOnce;

        expect(spy).to.have.been.calledWith(
          Cypress.sinon.match.has("items", Cypress.sinon.match.array)
        );
        expect(spy).to.have.been.calledWith(
          Cypress.sinon.match.has("parent", Cypress.sinon.match.any) // @todo test for Element
        );
        expect(spy).to.have.been.calledWith(
          Cypress.sinon.match.has("appendFn", Cypress.sinon.match.func)
        );
      })
    });
  });

  it('should emit an appended event when scrolled to bottom', () => {
    const spies = {
      appended() {},
    };

    cy.spy(spies, 'appended').as('spy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on('appended', spies.appended);

      cy.scrollTo('bottom', {duration: 300});

      cy.get('@spy').should((spy) => {
        expect(spy).to.have.been.calledOnce;

        expect(spy).to.have.been.calledWith(
            Cypress.sinon.match.has("items", Cypress.sinon.match.array)
        );
        expect(spy).to.have.been.calledWith(
            Cypress.sinon.match.has("parent", Cypress.sinon.match.any) // @todo test for Element
        );
      })
    });
  });

  it('should emit append and appended events when called manually', () => {
    const spies = {
      append() {},
      appended() {},
    };

    cy.spy(spies, 'append').as('appendSpy');
    cy.spy(spies, 'appended').as('appendedSpy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on('append', spies.append);
      ias.on('appended', spies.appended);

      ias.append([document.createElement('div')]);

      cy.get('@appendSpy').should('have.been.calledOnce');
      cy.get('@appendedSpy').should('have.been.calledOnce');
    });
  });

  it('should emit an appended event after append event', () => {
    const spies = {
      append() {},
      appended() {},
    };

    cy.spy(spies, 'append').as('appendSpy');
    cy.spy(spies, 'appended').as('appendedSpy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on('append', spies.append);
      ias.on('appended', spies.appended);

      ias.append([document.createElement('div')]);

      cy.get('@appendedSpy').should((spy) => {
        expect(spy).to.have.been.calledAfter(spies.append);
      })
    });
  });
});
