# Upward Infinite Scroll

Infinite Ajax Scroll can also be used to load items above the current scroll position. This is useful when you want to load older items first.

*Introduced in Infinite Ajax Scroll 3.1.0*

## Caveats

### Fixed height images

Upward scroll works by calculation screen height and content height. Due to they way browser load content, especially images, this could cause incorrect measurements. This can be solved by using fixed height images.

## Setup

1. Add a previous page link to your pagination.

    ```html
     <div class="pagination">
        <a href="page1.html" class="prev">Prev</a>
        <span class="current">2</span>
        <a href="page3.html" class="next">Next</a>
    </div>
    ```

2. Configure the [`prev`](../options.md#prev) option.

    ```javascript
    // import if you use the NPM package
    import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

    let ias = new InfiniteAjaxScroll('.container', {
      item: '.item',
      next: '.next',
      prev: '.prev',
      pagination: '.pagination'
    });
    ```

## Hook into upward scroll with events

In this example we notify the user about loading the previous page.

```js
ias.on('prev', function(event) {
  // pageIndex is 0-indexed, so we add 1
  alert(`Page ${event.pageIndex+1} is loading...`);
});
ias.on('preved', function(event) {
    alert(`Page ${event.pageIndex+1} is loaded and prepended to the page.`);
});
```

## Inform user about first page reached

In this example we notify the user when the first page is reached.

```javascript
ias.on('first', () => {
  console.log('User has reached the first page');
})
```
