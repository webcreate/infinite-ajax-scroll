# Options

## item

<dl>
    <dt>Type</dt>
    <dd>string|Element</dd>
    <dt>Default</dt>
    <dd>`undefined`</dd>
</dl>

Selector of the item elements that should be appended. These elements should live inside the container element.

## next

<dl>
    <dt>Type</dt>
    <dd>string</dd>
    <dt>Default</dt>
    <dd>`undefined`</dd>
</dl>

Selector of the next link. The `href` attribute will be used for the url of the next page. Only a single element should match this selector.

## pagination

<dl>
    <dt>Type</dt>
    <dd>string|Element</dd>
    <dt>Default</dt>
    <dd>`undefined`</dd>
</dl>

Selector of the element that contains the pagination. This element will be hidden when Infinite Ajax Scroll binds. 

## responseType

<dl>
    <dt>Type</dt>
    <dd>string</dd>
    <dt>Default</dt>
    <dd>`"document"`</dd>
</dl>

Type of response. Can be set to "json".

## bind

Normally Infinite Ajax Scroll binds to the scroll and resize events on document ready. If you want manual control over this behaviour you can set this option to `false`. To bind call the [`bind`](methods.md#bind) method.

## scrollContainer

<dl>
    <dt>Type</dt>
    <dd>string|Element|window</dd>
    <dt>Default</dt>
    <dd>`window`</dd>
</dl>

Set a selector of the element you want to use as a scroll container. Use this if you want infinite scroll inside an overflow element.

## spinner

<dl>
    <dt>Type</dt>
    <dd>string|Object|boolean</dd>
    <dt>Default</dt>
    <dd>`false`</dd>
</dl>

Configures a spinner/loader. By default no spinner is configured. 

You can set a selector to an element you want to display when Infinite Ajax Scroll is loading the next page. 

## logger

Configure an event logger. 

On default events are logged to console (see [src/logger.js](../src/logger.js)):

```js
logger: true
```

To disable the logger you can pass `false`:

```js
logger: false
```

To create your own logger, pass an object:

```js
logger: {
  next: (event) => {
    doSomething(event.pageIndex);
  },
  loaded: (event) => {
    doSomethingElse(event.url);
  }
}
```
