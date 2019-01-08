# Options

## item

**Type:** `string|Element`   
**Default:** `undefined`   
**Required:** yes

Selector of the item elements that should be appended to the container. These elements should live inside the container element.

```html
<div class="container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    ...
</div>
```

```javascript
item: '.item'
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
next: '.pager__next'
```

## pagination

**Type:** `string|Element`   
**Default:** `undefined`    
**Required:** no   

Selector of the element that contains the pagination. This element will be hidden when Infinite Ajax Scroll binds.

```html
<div class="pager">
    <span class="pager__current">1</span>
    <a href="/page/2" class="pager__page">2</a>
    <a href="/page/3" class="pager__page">3</a>
    <a href="/page/2" class="pager__next">Next</a>
</div>
```

```javascript
pagination: '.pager'
```

## responseType

**Type:** `string`   
**Default:** `"document"`   
**Required:** no   

Type of response. Can be set to "json".

```javascript
responseType: 'json'
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
scrollContainer: '#scroller'
```

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
spinner: '.spinner'
```

You can also set advanced spinner options.

```javascript
spinner: {
  element: '.spinner', // element
  delay: 600, // delay in milliseconds
  show: function(element) {},
  hide: function(element) {}
}
```

## logger

**Type:** `Object|boolean`    
**Default:** `Object` (see [src/logger.js](../src/logger.js))    
**Required:** no   

Configure an event logger.

On default events are logged to console (see [src/logger.js](../src/logger.js)):

```javascript
logger: true
```

To disable the logger you can pass `false`:

```javascript
logger: false
```

To create your own logger, pass an object:

```javascript
logger: {
  next: (event) => {
    doSomething(event.pageIndex);
  },
  loaded: (event) => {
    doSomethingElse(event.url);
  }
}
```

