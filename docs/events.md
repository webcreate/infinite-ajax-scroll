# Events

Infinite Ajax Scroll provides a wide range of events which we can use to hook into its functionality and customize where needed.

## Working with events

You can bind and unbind to events with the `on`, `once` and `off` methods.

```js
let ias = new InfiniteAjaxScroll('.container', options);

function handler(event) {
  console.log('New items have been appended', event);
}

ias.on('appended', handler);
ias.off('appended', handler);
ias.once('appended', handler);
```

Reference
=========

### binded

This event is triggered when Infinite Ajax Scroll binds to the scroll and resize events of the scroll container. This mostly happens right after the DOM is ready, but this can be configured with the `bind` option. 

### unbinded

Triggered when Infinite Ajax Scroll removed its listeners from the scroll and resize events.

Infinite Ajax Scroll will only unbind when we call the `unbind` method.  

### scrolled

Triggered when the user scrolls inside the scroll container.

property  | type   | description 
--------- | ------ | -------------
scroll    | object | Object with x y coord of the current scroll position

### resized

Triggered when the user resizes the scroll container.  

property  | type   | description 
--------- | ------ | -------------
scroll    | object | Object with x y coord of the current scroll position

### hit

Triggered when the user has hit the scroll threshold for the next page due to scrolling or resizing.  

property  | type  | description 
--------- | ----- | -------------
distance  | int   | The distance to the scroll threshold in pixels

### next

Triggered right after the `hit` event. Indicating that the next page will be loaded.    

property  | type  | description 
--------- | ----- | -------------
pageIndex | int   | The page index of the next page (the page that is about to be loaded)

> pageIndex is zero indexed. This means the index starts at 0 on the first page.

### load

This event is triggered before the next page is requested from the server.    

property  | type           | description 
--------- | -------------- | -------------
url       | string         | The url that is about to be requested
xhr       | XMLHttpRequest | The configured XMLHttpRequest that is going to be used

### loaded

This event is triggered when the next page is requested from the server, right before the items will be appended.    

property  | type           | description 
--------- | -------------- | -------------
items     | array<Element> | Array of items that have loaded and will be appended. These items match the selector given in the `next` option
url       | string         | The url that is about to be requested
xhr       | XMLHttpRequest | The configured XMLHttpRequest that is going to be used

### append

This event is triggered before the items are about to be appended.    

property  | type           | description 
--------- | -------------- | -------------
items     | array<Element> | Array of items that will be appended
parent    | Element        | The element to which the items will be appended
executor  | function       | TBD

### appended

This event is triggered before the items are about to be appended.    

property  | type           | description 
--------- | -------------- | -------------
items     | array<Element> | Array of items that have been appended
parent    | Element        | The element to which the items have been appended

### last

Triggered when the last page is appended. 

### page

Triggered when the user scrolls past a page break. The event provides information about the page in view.

property  | type   | description 
--------- | ------ | -------------
pageIndex | int    | The page index of the current page (not the page that is about to be loaded)
top       | int    | ScrollTop
url       | string | Url of the page
title     | string | Title of the page

> pageIndex is zero indexed. This means the index starts at 0 on the first page.
