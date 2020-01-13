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

// hides an element but also takes transition delay into account
function hideWithTransition(element) {
  return new Promise(function(resolve) {
    element.addEventListener('transitionend', resolve, {once: true});

    element.style.opacity = '0';
  });
}

window.ias = new InfiniteAjaxScroll('.blocks', {
  item: '.blocks__block',
  next: nextHandler,
  spinner: {
    element: '.loader',
    hide: hideWithTransition,
  },
  trigger: {
    element: '.trigger',

    // alternatively we could pass an Element directly
    // element: document.getElementById('btn1'),

    // alternatively we could pass a factory function
    // element: function() {
    //   let el = document.createElement('button');
    //   el.innerText = 'Load More...';
    //   document.querySelector('.status').appendChild(el);
    //
    //   // we have to return the element so IAS can add the necessary event listeners
    //   return el;
    // },

    // first page (pageIndex is -1) is generated, after that we show a load more button
    when: (pageIndex) => pageIndex >= 0,

    // alternative: only show load more button for specific pages
    // when: [2, 4, 6],

    // alternative: only show on even pages
    // when: (pageIndex) => pageIndex % 2 === 0,

    // alternative: only show on uneven pages
    // when: (pageIndex) => pageIndex % 2 !== 0,
  }
});



