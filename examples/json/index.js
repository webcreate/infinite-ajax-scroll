import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

const template = `<div class="item">
    <a href="#" class="item__link" target="_blank">
      <div class="item__img"><img class="item__img__img" onerror="this.src='https://placehold.co/185x278'" width="185" height="278"/></div>
      <h1 class="item__title"></h1>
      <div class="item__year"></div>
      <div class="item__rating" title="IMDB Rating"></div>
    </a>
  </div>
`;

function createMovieItem(movieData) {
  let item = document.createElement('div');
  item.innerHTML = template.trim();

  item.querySelector('.item__title').innerHTML = movieData.Title;
  item.querySelector('.item__link').href = 'https://www.imdb.com/title/' + movieData.imdbID;
  item.querySelector('.item__year').innerHTML = movieData.Year;
  item.querySelector('.item__rating').innerHTML = movieData.imdbRating;
  item.querySelector('.item__img__img').src = movieData.Poster;

  return item.firstChild;
}

function nextHandler(pageIndex) {
  return fetch('./movies.json')
    .then(response => response.json())
    .then((data) => {
      let frag = document.createDocumentFragment();

      let itemsPerPage = 8;
      let totalPages = Math.ceil(data.length / itemsPerPage);
      let offset = pageIndex * itemsPerPage;

      // walk over the movie items for the current page and add them to the fragment
      for (let i = offset, len = offset + itemsPerPage; i < len; i++) {
        let movie = data[i];

        let item = createMovieItem(movie);

        frag.appendChild(item);
      }

      let hasNextPage = pageIndex < totalPages - 1;

      return this.append(Array.from(frag.childNodes))
        // indicate that there is a next page to load
        .then(() => hasNextPage);
    });
}

window.ias = new InfiniteAjaxScroll('.container', {
  item: '.item',
  next: nextHandler,
  pagination: false,
});
