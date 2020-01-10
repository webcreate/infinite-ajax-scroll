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
    const spy = {
      scrolled() {}
    };

    cy.spy(spy, 'scrolled');

    ias.on('scrolled', spy.scrolled);

    cy
      .scrollTo('bottom', {duration: 300})
      .wait(200)
      .then(() => {
        expect(spy.scrolled).to.have.been.calledWith(
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
    const spy = {
      scrolled() {}
    };

    // first scroll down
    cy
      .scrollTo('bottom')
      .wait(300)
      .then(() => {
        cy.spy(spy, 'scrolled');

        ias.on('scrolled', spy.scrolled);

        cy
          .scrollTo(0, 100)
          .wait(200)
          .then(() => {
            expect(spy.scrolled).to.have.been.calledWith(
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
    const spy = {
      hit() {}
    };

    cy.spy(spy, 'hit');

    ias.on('hit', spy.hit);

    cy
      .scrollTo('bottom', {duration: 300})
      .wait(200)
      .then(() => {
        expect(spy.hit).to.have.been.called;
      });
  });

  it('should not emit a hit event when unbinded', () => {
    const spy = {
      hit() {}
    };

    cy.spy(spy, 'hit');

    ias.on('hit', spy.hit);

    ias.unbind();

    cy
      .scrollTo('bottom', {duration: 300})
      .wait(200)
      .then(() => {
        expect(spy.hit).to.not.have.been.called;
      });
  });

  it('should take negativeMargin into account', () => {
    cy.InfiniteAjaxScroll().then((InfiniteAjaxScroll) => {
      const spy = {
        hit() {}
      };

      cy.spy(spy, 'hit');

      // unbind instance from beforeEach step
      ias.unbind();

      ias = new InfiniteAjaxScroll('.blocks', {
        item: '.blocks__block',
        negativeMargin: 200,
      });

      ias.on('hit', spy.hit);

      cy
        // 300 would not be enough without the negative margin
        .scrollTo(0, 300, {duration: 300})
        .wait(200)
        .then(() => {
          expect(spy.hit).to.have.been.called;
        });
    });
  });
});
