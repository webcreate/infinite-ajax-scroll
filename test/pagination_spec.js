describe('Pagination', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');
  });

  it('should hide pagination on binded', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        pagination: '.pager',
        bind: false
      });

      cy.get('.pager').should('be.visible')
          .then(() => {
            ias.bind();

            cy.get('.pager').should('not.be.visible');
          });
    });
  });

  it('should restore pagination on unbinded', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        pagination: '.pager',
        bind: false
      });

      ias.bind();

      cy.get('.pager').should('not.be.visible')
          .then(() => {
            ias.unbind();

            cy.get('.pager').should('be.visible');
          });
    });
  });

  it('should not hide pagination when option set to false', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        pagination: false,
        bind: false
      });

      cy.get('.pager')
          .then(() => {
            ias.bind();

            cy.get('.pager').should('be.visible');
          });
    });
  });

  it('should accept an Element', () => {
      cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
        cy.document().then((doc) => {
          let el = doc.querySelector('.pager');

          let ias = new InfiniteAjaxScroll('.blocks', {
            item: '.blocks__block',
            next: '.pager__next',
            pagination: el,
            bind: false
          });

          cy.get('.pager').should('be.visible')
            .then(() => {
              ias.bind();

              cy.get('.pager').should('not.be.visible');
            });
        });
      });
  });

  it('should throw when element not found', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      const subject = {
        ias: () => {
          new InfiniteAjaxScroll('.blocks', {
            item: '.blocks__block',
            next: '.pager__next',
            pagination: '.pager_does_not_exist',
            bind: false
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

});
