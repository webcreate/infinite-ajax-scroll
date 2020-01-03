# Options

## item

**Type:** `string|Element`
**Default:** `undefined`
**Required:** yes

Selector of the item elements that should be appended to the container.

{% hint style='info' %}
The item elements should live **inside** the container element.
{% endhint %}

```html
<div class="container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    ...
</div>
```

```javascript
let ias = new InfiniteAjaxScroll('.container', {
  item: '.item'
})
```

## next

**Type:** `string`
**Default:** `undefined`
**Required:** yes

Selector of the next link. The `href` attribute will be used for the url of the next page. Only a single element should match this selector.

```html
<a href="/page/2" class="pager__next">Next</a>
```

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  next: '.pager__next'
})
```

## pagination

**Type:** `boolean|string|Element`
**Default:** `false`
**Required:** no

Selector of the elements that contain the pagination. The elements that match the selector will be hidden when Infinite Ajax Scroll binds.

```html
<div class="pager" id="pager1">
    <span class="pager__current">1</span>
    <a href="/page/2" class="pager__page">2</a>
    <a href="/page/3" class="pager__page">3</a>
    <a href="/page/2" class="pager__next">Next</a>
</div>
```

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  // pass pagination as selector:
  pagination: '.pager',

  // or pass pagination as Element:
  pagination: document.getElementById('pager1'),

  // or pass false explicitly to disable automatic hiding:
  pagination: false,
})
```

## responseType

**Type:** `string`
**Default:** `"document"`
**Required:** no

Type of response. Can be set to "json".

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  responseType: 'json'
})
```

See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType) for available values.

## bind

**Type:** `boolean`
**Default:** `false`
**Required:** no

Normally Infinite Ajax Scroll binds to the scroll and resize events on document ready. If you want manual control over this behaviour you can set this option to `false`. To bind call the [`bind`](methods.md#bind) method.

## scrollContainer

**Type:** `string|Element|window`
**Default:** `window`
**Required:** no

Set a selector of the element you want to use as a scroll container. Use this if you want infinite scroll inside an overflow element.

Note: Only a single element should match the selector.

```html
<div id="scroller">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
</div>
```

```javascript
let ias = new InfiniteAjaxScroll('#scroller', {
  scrollContainer: '#scroller'
})
```

[Read more about scrolling inside an element](advanced/overflow.md)

## spinner

**Type:** `string|Object|boolean`
**Default:** `false`
**Required:** no

Configures a spinner/loader. By default no spinner is configured.

You can set a selector to an element you want to display when Infinite Ajax Scroll is loading the next page.

```html
<div class="spinner">Loading...</div>
```

```js
let ias = new InfiniteAjaxScroll(/*..*/, {
  spinner: '.spinner'
})
```

You can also set advanced spinner options.

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  spinner: {
    element: '.spinner', // element
    delay: 600, // delay in milliseconds
    show: function(element) {},
    hide: function(element) {}
  }
})
```

## logger

**Type:** `Object|boolean`
**Default:** `Object` (see [src/logger.js](../src/logger.js))
**Required:** no

Configure an event logger.

On default events are logged to console (see [src/logger.js](../src/logger.js)):

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  logger: true
})
```

To disable the logger you can pass `false`:

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  logger: false
})
```

To create your own logger, pass an object:

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  logger: {
    next: (event) => {
      doSomething(event.pageIndex);
    },
    loaded: (event) => {
      doSomethingElse(event.url);
    }
  }
})
```

## loadOnScroll

**Type:** `boolean`
**Default:** `true`
**Required:** no

Configures if the next/previous page should automatically be loaded when the users scrolls to the bottom or the top of the page.

When `loadOnScroll` is disabled the [`hit`](events.md#hit) event is still emitted, allowing you to manually trigger the next/prev page (for example by calling [`next`](methods.md#next)).

Use can use [`enableLoadOnScroll`](methods.md#enableloadonscroll) and [`disableLoadOnScroll`](methods.md#disableloadonscroll) to configure this setting on runtime.

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  loadOnScroll: false
})

// the hit event is still emitted, allowing to manually load the next page
ias.on('hit', (event) => {
  ias.next();
})
```
