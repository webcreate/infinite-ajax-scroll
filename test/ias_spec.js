import InfiniteAjaxScroll from '../src/infinite-ajax-scroll';

describe('InfiniteAjaxScroll', () => {
  it('should return a new instance', () => {
    const ias = new InfiniteAjaxScroll();

    expect(ias).to.exist;

    expect(ias).to.be.instanceOf(InfiniteAjaxScroll);
  })
});
