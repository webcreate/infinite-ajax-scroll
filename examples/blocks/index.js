import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

let nextHandler = function(pageIndex) {
  let frag = document.createDocumentFragment();
  let limit = 72;
  let offset = pageIndex * limit;

  for (let i = offset, len = offset + limit; i < len; i++) {
    let block = frag.appendChild(document.createElement('div'));

    block.id = 'block' + (i + 1);
    block.classList.add('blocks__block');
    block.innerHTML = i + 1;
  }

  return this.append(Array.from(frag.childNodes))
      // indicate that there is a next page to load
      .then(() => true);
};

window.ias = new InfiniteAjaxScroll('.blocks', {
  item: '.blocks__block',
  next: nextHandler,
  spinner: '.loader'
});
