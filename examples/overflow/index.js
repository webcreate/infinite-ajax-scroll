import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

window.ias1 = new InfiniteAjaxScroll('#overflow1', {
  scrollContainer: '#overflow1',
  item: '.item',
  next: '.pager__next',
  pagination: '#overflow1 .pager',
});

window.ias2 = new InfiniteAjaxScroll('#overflow2', {
  scrollContainer: '#overflow2',
  item: '.item',
  next: '.pager__next',
  pagination: '#overflow2 .pager',
});
