# Options

## item

**Type:** `string|Element`<br>
**Default:** `undefined`<br>
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

**Type:** `string`<br>
**Default:** `undefined`<br>
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

**Type:** `boolean|string|Element`<br>
**Default:** `false`<br>
**Required:** no

Selector of the elements that contain the pagination. The elements that match the selector will be hidden (`element.style.display` -> none) when Infinite Ajax Scroll binds.

The pagination elements will be restored (`element.style.display` -> original value) when [`unbind`](./methods.md#unbind) is called.

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

**Type:** `string`<br>
**Default:** `"document"`<br>
**Required:** no

Type of response. Can be set to "json".

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  responseType: 'json'
})
```

See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType) for available values.

## bind

**Type:** `boolean`<br>
**Default:** `false`<br>
**Required:** no

By default Infinite Ajax Scroll binds to the scroll and resize events on document ready. If you want manual control over this behaviour you can set this option to `false`. To bind call the [`bind`](methods.md#bind) method.

## scrollContainer

**Type:** `string|Element|window`<br>
**Default:** `window`<br>
**Required:** no

Set a selector of the element you want to use as a scroll container. Use this if you want infinite scroll inside an overflow element.

Note: Only a single element should match the selector.

```html
<div id="scroller">
    <div class="container">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
    </div>
</div>
```

```javascript
let ias = new InfiniteAjaxScroll('.container', {
  scrollContainer: '#scroller'
})
```

[Read more about scrolling inside an element](advanced/overflow.md)

## negativeMargin

**Type:** `int` (pixels)<br>
**Default:** `0`<br>
**Required:** no

By default Infinite Ajax Scroll starts loading new items when the user scrolls to the bottom of the last item. The negativeMargin (in pixels) will be subtracted from the items' offset, allowing you to load new pages sooner.

{% hint style='info' %}
This value is always transformed to a positive integer (a value of `-100` will behave the same as `100`)
{% endhint %}

{% hint style='warning' %}
User experience can degrade when new pages are loaded too quickly without visual feedback. Use with caution.
{% endhint %}

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  // start loading the next page when the user scrolls to (or passed) 400px before the end of the last item
  negativeMargin: 400
})
```

## spinner

**Type:** `string|Element|Object|boolean`<br>
**Default:** `false`<br>
**Required:** no

Configures a spinner/loader. By default no spinner is configured.

You can set a selector to an element you want to display when Infinite Ajax Scroll is loading the next page.

```html
<div id="spinner1" class="spinner">Loading...</div>
```

```js
let ias = new InfiniteAjaxScroll(/*..*/, {
  spinner: '.spinner',

  // alternatively we can pass an Element
  spinner: document.getElementById('spinner1'),
})
```

You can also set advanced spinner options.

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  spinner: {
    // element to show as spinner
    element: '.spinner',

    // delay in milliseconds
    // this is the minimal time the loader should be displayed. If loading takes longer, the spinner
    // will be shown for the duration of the loading. If the loading takes less then this duration,
    // say 300ms, then the spinner is still shown for 600ms.
    delay: 600,

    // this function is called when the button has to be shown
    show: function(element) {
      element.style.opacity = '1'; // default behaviour
    },

    // this function is called when the button has to be hidden
    hide: function(element) {
      element.style.opacity = '0'; // default behaviour
    }
  }
})
```

[View the use of a spinner in a live demo](https://infiniteajaxscroll.com/examples/articles/)

## trigger

**Type:** `string|Element|Object|boolean`<br>
**Default:** `false`<br>
**Required:** no

Configures a trigger. By default no trigger is configured.

You can use the selector of an element you want to use as a trigger.

```html
<button id="trigger1" class="trigger">Load more</button>
```

```js
let ias = new InfiniteAjaxScroll(/*..*/, {
  trigger: '.trigger',

  // alternatively we can pass an Element
  trigger: document.getElementById('trigger1'),

  // we can also pass a factory function to create an Element
  trigger: function() {
    let el = document.createElement('button');
    el.innerText = 'Load More...';
    document.querySelector('.some_parent_class').appendChild(el);

    // we have to return the element so IAS can add the necessary event listeners
    return el;
  },
})
```

We can also set advanced trigger options.

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  trigger: {
    // element to show as trigger
    element: '.trigger',

    // pass a function which returns true which determines if the load more button should be shown
    when: function(pageIndex) {
      return true;  // default behaviour (always show a trigger)
    },

    // this function is called when the button has to be shown
    show: function(element) {
      element.style.opacity = '1'; // default behaviour
    },

    // this function is called when the button has to be hidden
    hide: function(element) {
      element.style.opacity = '0'; // default behaviour
    }
  }
})
```

[View the use of a button in a live demo](https://infiniteajaxscroll.com/examples/button/)

## logger

**Type:** `Object|boolean`<br>
**Default:** `Object` (see [src/logger.js](../src/logger.js))<br>
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

**Type:** `boolean`<br>
**Default:** `true`<br>
**Required:** no

Configures if the next/previous page should automatically be loaded when the users scrolls to the bottom or the top of the page.

When `loadOnScroll` is disabled the [`hit`](events.md#hit) event is still emitted, allowing you to manually trigger the next/prev page (for example by calling [`next`](methods.md#next)).

We can use [`enableLoadOnScroll`](methods.md#enableloadonscroll) and [`disableLoadOnScroll`](methods.md#disableloadonscroll) to configure this setting on runtime.

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  loadOnScroll: false
})

// the hit event is still emitted, allowing to manually load the next page
ias.on('hit', (event) => {
  ias.next();
})
```

## prefill

**Type:** `boolean`<br>
**Default:** `true`<br>
**Required:** no

When enabled, and the content is shorter than the scroll container, Infinite Ajax Scroll will load the next page(s) until the content is taller than the scroll container. When
disabled the responsibility to load the next page is in the hands of the developer. This can be done by calling [`next`](methods.md#next) manually.

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  prefill: false
})

// load first page
// notice: even with the first page loaded, the content could still be too short. In that case keep calling `next()` until there is scroll bar.
ias.next();
```

We can listen to the [`prefill`](events.md#prefill) and [`prefilled`](events.md#prefilled) events to act on respectively the start and finish of the prefill action.
