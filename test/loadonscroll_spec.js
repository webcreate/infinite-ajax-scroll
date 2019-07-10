let ias;

describe('Load on scroll', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html')
  });

  it('should emit a next event when loadOnScroll enabled by default', () => {
    const spy = {
      next() {}
    };

    cy.spy(spy, 'next');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
      });

      ias.on('next', spy.next);

      cy
        .scrollTo('bottom', {duration: 300})
        .wait(200)
        .then(function() {
          expect(spy.next).to.have.been.called;
        });
    });
  });

  it('should emit a next event when loadOnScroll explicitly enabled', () => {
    const spy = {
      next() {}
    };

    cy.spy(spy, 'next');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        loadOnScroll: true
      });

      ias.on('next', spy.next);

      cy
        .scrollTo('bottom', {duration: 300})
        .wait(200)
        .then(() => {
          expect(spy.next).to.have.been.called;
        });
    });
  });

  it('should not emit a next event when loadOnScroll is disabled', () => {
    const spy = {
      next() {}
    };

    cy.spy(spy, 'next');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        loadOnScroll: false
      });

      ias.on('next', spy.next);

      cy
        .scrollTo('bottom', {duration: 300})
        .wait(200)
        .then(() => {
          expect(spy.next).to.not.have.been.called;
        });
    });
  });

  it('can be enabled (enableLoadOnScroll)', () => {
    const spy = {
      next() {}
    };

    cy.spy(spy, 'next');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        loadOnScroll: false
      });

      ias.enableLoadOnScroll();

      ias.on('next', spy.next);

      cy
        .scrollTo('bottom', {duration: 300})
        .wait(200)
        .then(() => {
          expect(spy.next).to.have.been.called;
        });
    });
  });

  it('can be disabled (disableLoadOnScroll)', () => {
    const spy = {
      next() {}
    };

    cy.spy(spy, 'next');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        loadOnScroll: true
      });

      ias.disableLoadOnScroll();

      ias.on('next', spy.next);

      cy
        .scrollTo('bottom', {duration: 300})
        .wait(200)
        .then(() => {
          expect(spy.next).to.not.have.been.called;
        });
    });
  });
});
