/* eslint no-undef: "off" */
if (window.InfiniteAjaxScroll) {
  window.ias = new InfiniteAjaxScroll('.blocks', {
    item: '.blocks__block',
    next: '.pager__next',
    pagination: '.pager',
    spinner: '.spinner',
  });
}
