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

// FIXME this logic should be provided by default
ias.on('page', (e) => {
  document.title = e.title;

  let state = history.state;

  history.replaceState(state, e.title, e.url);
});
