import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

let ias = new InfiniteAjaxScroll('.surface-container', {
  item: '.article',
  next: '.pager__next',
  pagination: '.pager',
  spinner: '.loader'
});

ias.on('last', function() {
  let el = document.querySelector('.no-more');

  el.style.opacity = '1';
});
