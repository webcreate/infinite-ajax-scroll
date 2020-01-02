# Events

Infinite Ajax Scroll provides a wide range of events which we can use to hook into its functionality and customize where needed.

## Working with events

You can bind and unbind to events with the `on`, `once` and `off` methods.

```javascript
let ias = new InfiniteAjaxScroll('.container', options);

function handler(event) {
  console.log('New items have been appended', event);
}

ias.on('appended', handler);
ias.off('appended', handler);
ias.once('appended', handler);
```

## Reference

### binded

This event is triggered when Infinite Ajax Scroll binds to the scroll and resize events of the scroll container. This mostly happens right after the DOM is ready, but this can be configured with the `bind` option.

### unbinded

Triggered when Infinite Ajax Scroll removed its listeners from the scroll and resize events.

Infinite Ajax Scroll will only unbind when we call the `unbind` method.

### scrolled

Triggered when the user scrolls inside the scroll container.

| property | type | description |
| :--- | :--- | :--- |
| scroll.y | integer | Current vertical scroll position from the top of the page (can be negative) |
| scroll.x | integer | Current horizontal scroll position from the left of the page (can be negative) |
| scroll.deltaY | integer | Delta between current vertical scroll position and previous position |
| scroll.deltaX | integer | Delta between current horizontal scroll position and previous position |

The delta values can be used to determine the scroll direction. A positive value means scrolling down (deltaY) or to the right (deltaX). A negative value means the opposite direction.

### resized

Triggered when the user resizes the scroll container.

| property | type | description |
| :--- | :--- | :--- |
| scroll | object | Object with x y coord of the current scroll position |

### hit

Triggered when the user has hit the scroll threshold for the next page due to scrolling or resizing.

| property | type | description |
| :--- | :--- | :--- |
| distance | int | The distance to the scroll threshold in pixels |

### next

Triggered right after the `hit` event. Indicating that the next page will be loaded.

| property | type | description |
| :--- | :--- | :--- |
| pageIndex | int | The page index of the next page (the page that is about to be loaded) |

> pageIndex is zero indexed. This means the index starts at 0 on the first page.

### load

This event is triggered before the next page is requested from the server.

| property | type | description |
| :--- | :--- | :--- |
| url | string | The url that is about to be requested |
| xhr | XMLHttpRequest | The configured XMLHttpRequest that is going to be used |

### loaded

This event is triggered when the next page is requested from the server, right before the items will be appended.

| property | type | description |
| :--- | :--- | :--- |
| items | array | Array of items that have loaded and will be appended. These items match the selector given in the `next` option |
| url | string | The url that is about to be requested |
| xhr | XMLHttpRequest | The configured XMLHttpRequest that is going to be used |

### append

This event is triggered before the items are about to be appended.

| property | type | description |
| :--- | :--- | :--- |
| items | array | Array of items that will be appended |
| parent | Element | The element to which the items will be appended |
| appendFn | function | Function used to append items to the container |

See [src/append.js](../src/append.js) for the default append function.

### appended

This event is triggered after the items have been appended.

| property | type | description |
| :--- | :--- | :--- |
| items | array | Array of items that have been appended |
| parent | Element | The element to which the items have been appended |

### last

Triggered when the last page is appended.

```javascript
ias.on('last', () => {
  console.log('Users has reached the last page');
})
```

[Read more on how we can inform the user about reaching the last page](advanced/last-page-message.md)

### page

Triggered when the user scrolls past a page break. The event provides information about the page in view.

| property | type | description |
| :--- | :--- | :--- |
| pageIndex | int | The page index of the current page |
| url | string | Url of the page |
| title | string | Title of the page |
| sentinel | Element | Sentinel element. Element used to determine on which page the user is |

> pageIndex is zero-based. This means the index starts at 0 on the first page.

One use case for this event is to update the browser url and title:

```javascript
ias.on('page', (event) => {
  // update the title
  document.title = event.title;

  // update the url
  let state = history.state;
  history.replaceState(state, event.title, event.url);
})
```

[View this behaviour in a live demo](https://infiniteajaxscroll.com/examples/articles/)
