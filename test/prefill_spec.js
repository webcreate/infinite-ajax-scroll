describe('Prefill', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1-no-content.html');
  });

  it('does not prefill when disabled', () => {
    const spies = {
      prefill() {},
    };

    cy.spy(spies, 'prefill').as('spy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        trigger: '.trigger',
        bind: false,
        prefill: false,
      });

      ias.on('prefill', spies.prefill);

      ias.bind();

      cy.get('@spy').should('not.have.been.called');
    });
  });

  it('prefills when enabled', () => {
    const spies = {
      prefill() {},
    };

    cy.spy(spies, 'prefill').as('spy');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        trigger: '.trigger',
        prefill: true,
        bind: false,
      });

      ias.on('prefill', spies.prefill);

      ias.bind();

      cy.get('@spy').should('have.been.calledOnce');
    });
  });
});
