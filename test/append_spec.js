describe('Append', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');
  });

  it('should emit an append event when scrolled to bottom', () => {
    const spy = {
      append() {},
    };

    cy.spy(spy, 'append');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on('append', spy.append);

      cy
        .scrollTo('bottom', {duration: 300})
        .wait(200)
        .then(() => {
          expect(spy.append).to.have.been.calledOnce;

          expect(spy.append).to.have.been.calledWith(
              Cypress.sinon.match.has("items", Cypress.sinon.match.array)
          );
          expect(spy.append).to.have.been.calledWith(
              Cypress.sinon.match.has("parent", Cypress.sinon.match.any) // @todo test for Element
          );
          expect(spy.append).to.have.been.calledWith(
              Cypress.sinon.match.has("appendFn", Cypress.sinon.match.func)
          );
        });
    });
  });

  it('should emit an appended event when scrolled to bottom', () => {
    const spy = {
      appended() {},
    };

    cy.spy(spy, 'appended');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on('appended', spy.appended);

      cy
        .scrollTo('bottom', {duration: 300})
        .wait(200)
        .then(() => {
          expect(spy.appended).to.have.been.calledOnce;

          expect(spy.appended).to.have.been.calledWith(
              Cypress.sinon.match.has("items", Cypress.sinon.match.array)
          );
          expect(spy.appended).to.have.been.calledWith(
              Cypress.sinon.match.has("parent", Cypress.sinon.match.any) // @todo test for Element
          );
        });
    });
  });

  it('should emit append and appended events when called manually', () => {
    const spy = {
      append() {},
      appended() {},
    };

    cy.spy(spy, 'append');
    cy.spy(spy, 'appended');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on('append', spy.append);
      ias.on('appended', spy.appended);

      ias.append([document.createElement('div')]);

      cy.wait(200).then(() => {
        expect(spy.append).to.have.been.calledOnce;
        expect(spy.appended).to.have.been.calledOnce;
      });
    });
  });

  it('should emit an append event before appended event', () => {
    const spy = {
      append() {},
      appended() {},
    };

    cy.spy(spy, 'append');
    cy.spy(spy, 'appended');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
      });

      ias.on('append', spy.append);
      ias.on('appended', spy.appended);

      ias.append([document.createElement('div')]);

      cy.wait(200).then(() => {
        expect(spy.append).to.have.been.calledBefore(spy.appended);
      });
    });
  });
});
