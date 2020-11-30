describe('Prefill', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1-no-content.html');
  });

  it('does not prefill when disabled', () => {
    const spy = {
      prefill() {},
    };

    cy.spy(spy, 'prefill');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        trigger: '.trigger',
        bind: false,
        prefill: false,
      });

      ias.on('prefill', spy.prefill);

      ias.bind();

      cy
        .wait(200)
        .then(() => {
          expect(spy.prefill).to.have.been.not.called;
      });
    });
  });

  it('prefills when enabled', () => {
    const spy = {
      prefill() {},
    };

    cy.spy(spy, 'prefill');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        trigger: '.trigger',
        prefill: true,
        bind: false,
      });

      ias.on('prefill', spy.prefill);

      ias.bind();

      cy
        .wait(200)
        .then(() => {
          expect(spy.prefill).to.have.been.calledOnce;
        });
    });
  });
});
