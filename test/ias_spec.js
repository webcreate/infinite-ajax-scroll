import InfiniteAjaxScroll from '../src/infinite-ajax-scroll';

describe('InfiniteAjaxScroll', () => {
  it('should return a new instance with selector', () => {
    document.body.innerHTML = `
        <div class="container"></div>
    `;

    const ias = new InfiniteAjaxScroll('.container');

    expect(ias).to.exist;

    expect(ias).to.be.instanceOf(InfiniteAjaxScroll);
  });

  it('should return a new instance with HTMLElement', () => {
    let div = document.createElement('div');

    const ias = new InfiniteAjaxScroll(div);

    expect(ias).to.exist;

    expect(ias).to.be.instanceOf(InfiniteAjaxScroll);
  });

  it('should throw error when container selector is ambiguous', () => {
    document.body.innerHTML = `
        <div class="container"></div>
        <div class="container"></div>
    `;

    expect(() => {
      new InfiniteAjaxScroll('.container');
    }).to.throw();
  });

  it('should throw error when container selector is not found', () => {
    expect(() => {
      new InfiniteAjaxScroll('.non_existing_class')
    }).to.throw();
  });

  it('should throw error when scrollContainer selector is not found', () => {
    expect(() => {
      let container = document.createElement('div');

      new InfiniteAjaxScroll(container, {'scrollContainer': '.scroller'});
    }).to.throw();
  });

  it('should throw error when scrollContainer selector is ambiguous', () => {
    document.body.innerHTML = `
      <div class="scroller"></div>
      <div class="scroller"></div>
    `;

    let container = document.createElement('div');

    expect(() => {
      new InfiniteAjaxScroll(container, {'scrollContainer': '.scroller'});
    }).to.throw();
  });
});
