import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

window.ias = new InfiniteAjaxScroll('.surface-container', {
  item: '.article',
  next: '.pager__next',
  pagination: '.pager',
  spinner: '.loader'
});

ias.on('last', function() {
  let el = document.querySelector('.no-more');

  el.style.opacity = '1';
});

// update title and url then scrolling through pages
ias.on('page', (e) => {
  document.title = e.title;

  let state = history.state;

  history.replaceState(state, e.title, e.url);
});
