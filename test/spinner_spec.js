describe('Spinner', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');
  });

  it('should hide spinner on bind', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        spinner: '.spinner',
        bind: false
      });

      cy.get('.spinner').should('be.visible')
          .then(() => {
            ias.bind();

            cy.get('.spinner').should('have.css', 'opacity', '0');
          });
    });
  });

  it('should show and hide spinner on next', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        spinner: '.spinner',
      });

      ias.next();

      cy.get('.spinner').should('have.css', 'opacity', '1');

      cy.get('.spinner').should('have.css', 'opacity', '0');
    });
  });

  it('should hide spinner on last', () => {
    cy.visit('http://localhost:8080/test/fixtures/default/page3.html');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        spinner: '.spinner',
      });

      ias.next();

      cy.get('.spinner').should('have.css', 'opacity', '0');
    });
  });

  it('should throw when element not found', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      const subject = {
        ias: () => {
          new InfiniteAjaxScroll('.blocks', {
            item: '.blocks__block',
            next: '.pager__next',
            spinner: '.spinner_does_not_exist'
          });
        }
      };

      const spy = cy.spy(subject, 'ias');

      try {
        subject.ias();
      } catch (e) {
        // noop
      }

      expect(spy).to.have.thrown('Error');
    });
  });

  it('should call custom show and hide handlers', () => {
    const spy = {
      showHandler(element) {
        element.style.display = 'block';
      },
      hideHandler(element) {
        element.style.display = 'none';
      },
    };

    cy.spy(spy, 'showHandler');
    cy.spy(spy, 'hideHandler');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        spinner: {
          element: '.spinner',
          show: spy.showHandler,
          hide: spy.hideHandler,
        }
      });

      ias.next();

      expect(spy.showHandler).to.have.been.calledOnce;
      expect(spy.hideHandler).to.have.been.calledOnce;
    });
  });

  it('should delay', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        spinner: {
          element: '.spinner',
          delay: 4000,
        },
      });

      ias.next();

      // spinner still visible (time elapsed 1000ms)
      cy.wait(1000).then(() => {
        cy.get('.spinner', {timeout: 0}).should('have.css', 'opacity', '1');
      });

      // spinner still visible (time elapsed 2000ms)
      cy.wait(1000).then(() => {
        cy.get('.spinner', {timeout: 0}).should('have.css', 'opacity', '1');
      });

      // spinner no longer visible (time elapsed 4000ms)
      cy.wait(2000).then(() => {
        cy.get('.spinner', {timeout: 0}).should('have.css', 'opacity', '0');
      });
    });
  });
});
