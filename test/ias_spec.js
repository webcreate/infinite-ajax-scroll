import InfiniteAjaxScroll from '../src/infinite-ajax-scroll';

describe('Constructor', () => {
  it('should return a new instance with selector', () => {
    document.body.innerHTML = `
        <div class="container"><div class="item">1</div></div>
    `;

    const ias = new InfiniteAjaxScroll('.container', {item: '.item'});

    expect(ias).to.exist;

    expect(ias).to.be.instanceOf(InfiniteAjaxScroll);
  });

  it('should return a new instance with HTMLElement', () => {
    const div = document.createElement('div');
    div.innerHTML = `<div class="item">1</div>`;

    const ias = new InfiniteAjaxScroll(div, {item: '.item'});

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
    }).to.throw('Expected single element for "container"');
  });

  it('should throw error when container selector is not found', () => {
    expect(() => {
      new InfiniteAjaxScroll('.non_existing_class')
    }).to.throw('Element ".non_existing_class" not found for "container"');
  });

  it('should throw error when scrollContainer selector is not found', () => {
    expect(() => {
      const container = document.createElement('div');

      new InfiniteAjaxScroll(container, {'scrollContainer': '.scroller'});
    }).to.throw('Element ".scroller" not found for "options.scrollContainer"');
  });

  it('should throw error when scrollContainer selector is ambiguous', () => {
    document.body.innerHTML = `
      <div class="scroller"></div>
      <div class="scroller"></div>
    `;

    const container = document.createElement('div');

    expect(() => {
      new InfiniteAjaxScroll(container, {'scrollContainer': '.scroller'});
    }).to.throw('Expected single element for "options.scrollContainer"');
  });
});
