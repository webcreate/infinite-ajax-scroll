
describe('Trigger', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('http://localhost:8080/test/fixtures/default/page1.html');
  });

  it('should accept a selector', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        trigger: '.trigger',
      });

      cy.get('.trigger').should((el) => expect(el[0]).to.be.eq(ias.trigger.element));
    });
  });

  it('throws when selector not found', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      const subject = {
        ias: () => new InfiniteAjaxScroll('.blocks', {
          item: '.blocks__block',
          next: '.pager__next',
          trigger: '.trigger_not_found',
        })
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

  it('should accept an Element', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      cy.document().then((doc) => {
        let el = doc.getElementById('trigger1');

        let ias = new InfiniteAjaxScroll('.blocks', {
          item: '.blocks__block',
          next: '.pager__next',
          trigger: el,
        });

        cy.get('#trigger1').should((el) => expect(el[0]).to.be.eq(ias.trigger.element));
      });
    });
  });

  it('should accept a factory function', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      cy.document().then((doc) => {
        let ias = new InfiniteAjaxScroll('.blocks', {
          item: '.blocks__block',
          next: '.pager__next',
          trigger: () => {
            let el = doc.createElement('a');
            el.id = 'btn1';
            el.innerText = 'Load More Items';

            doc.body.appendChild(el);

            return el;
          },
        });

        cy.get('#btn1').should((el) => expect(el[0]).to.be.eq(ias.trigger.element));
      });
    });
  });

  it('should hide trigger on bind', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        trigger: '.trigger',
        bind: false,
      });

      cy.get('.trigger').should('be.visible');

      ias.bind();

      cy.get('.trigger').should('have.css', 'opacity', '0');
    });
  });

  it('should show trigger when scrolled to bottom', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        trigger: '.trigger',
      });

      cy.get('.trigger').should('have.css', 'opacity', '0');

      cy.scrollTo('bottom', {duration: 300});

      cy.get('.trigger').should('have.css', 'opacity', '1');
    });
  });

  it('should only show trigger if "when" callback returns true', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        trigger: {
          element: '.trigger',
          when: (pageIndex) => pageIndex === 0
        },
      });

      cy.get('.trigger').should('have.css', 'opacity', '0');

      cy
        // we are on page 0 and scroll to bottom
        .window().scrollTo('bottom', {duration: 300})

        // the trigger should be visible -> we click it
        .get('.trigger')
          .should('have.css', 'opacity', '1')
          .click()
          .should('have.css', 'opacity', '0')

        // now we are on page 1 and scroll down
        .window().scrollTo('bottom', {duration: 300})

        // the trigger should not be visible
        .get('.trigger')
          .should('have.css', 'opacity', '0')
      ;
    });
  });

  it('should load next on click', () => {
    const spy = {
      next() {}
    };

    cy.spy(spy, 'next');

    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      let ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        next: '.pager__next',
        trigger: '.trigger',
      });

      ias.on('next', spy.next);

      cy.scrollTo('bottom', {duration: 300});

      cy.get('.trigger').click().then(() => {
        expect(spy.next).to.have.been.called;
      });
    });
  });

});
