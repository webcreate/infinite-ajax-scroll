import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

let ias = new InfiniteAjaxScroll('#container', {
  item: '.demo',
  next: '.pager__next',
  pagination: '.pager',

  // false so we can bind manually after all images are loaded
  // -- if we didn't wait for images to load, the content would be
  // too short and IAS would try to load the next page right away
  bind: false
});

// manually hide the pagination because IAS isn't binded yet
document.querySelector('.pager').style.display = 'none';

let msnry = new Masonry('#container', {
  // use a selector that we will set later when an image is loaded,
  // so at first Masonry doesn't do anything yet
  itemSelector: '.demo--loaded',
  columnWidth: 24,
});

/**
 * Triggers Masonry layout every time an image loads. Also
 * adds the `demo--loaded` class to make the item visible.
 *
 * Returns a promise so you can act when all images are done loading
 * and the layout update has finished.
 *
 * @param elem
 * @returns {Promise<any>}
 */
function imagesLoadedAndLayout(elem) {
  return new Promise((resolve) => {
    imagesLoaded(elem)
        .on('progress', (imgLoad, e) => {
          e.img.parentNode.classList.add('demo--loaded');
          msnry.appended(e.img.parentNode);
          msnry.layout();
        })
        .on('done', () => {
          msnry.once('layoutComplete', () => {
            resolve();
          });
        });
  });
}

// wait for images to load and for Masonry to layout
// all the items, then bind IAS
imagesLoadedAndLayout('#container').then(() => {
  ias.bind();
});

// wrap the append function so that IAS will wait for all
// images to load before considering the items to be appended
ias.on('append', (event) => {
  let appendFn = event.appendFn;

  event.appendFn = (items, parent, last) => {
    return new Promise((resolve) => {
      appendFn(items, parent, last);

      imagesLoadedAndLayout(items).then(resolve);
    });
  };
});
