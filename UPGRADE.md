Upgrade from 2.3.x to 3.0
=========================

Version 3 is a complete overhaul of Infinite Ajax Scroll.

Most important changes:

* Dropped jQuery support
* Dropped extensions architecture
* Switched to NPM package

### Installation

You can use the CDN version by adding this to the `<head>` section:

```markup
<script src="https://unpkg.com/@webcreate/infinite-ajax-scroll@3/dist/infinite-ajax-scroll.min.js"></script>
```

or install from NPM

```bash
$ npm install --save @webcreate/infinite-ajax-scroll
```

and import into your application

```js
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';
```

### Initialisation

We no longer depend on jQuery.

```js
var ias = jQuery.ias({
  container:  '#posts',
  item:       '.post',
  pagination: '#pagination',
  next:       '.next'
});
```

becomes

```javascript
// import if you use the NPM package (not needed if you use CDN)
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

let ias = new InfiniteAjaxScroll('#posts', {
  item: '.post',
  next: '.next',
  pagination: '#pagination'
});
```

### Extensions

Most plugins turned into options. For example the Spinner Extension:

```js
// Add a loader image which is displayed during loading
ias.extension(new IASSpinnerExtension());
```

becomes

```js
let ias = new InfiniteAjaxScroll('#posts', {
  //...
  spinner: '.spinner',
});
```

Where `.spinner` references a html element by class name. You will have to add this element yourself, e.g.

```
<div class="spinner">loading...</div>
```

Use the documentation to learn how to use the new way of using these features:

* Spinner Extension -> [spinner](docs/options.md#spinner) options
* Trigger Extension -> [spinner](docs/options.md#trigger) options

Other extensions are now build-in as events:

* Paging Extension (pageChange event) -> [page](docs/events.md#page) event
* None Left Extension -> [last](docs/events.md#last) event

Finally, the History Extension is dropped entirely.

### Options

* `container` option is renamed to `scrollContainer`
* `delay` option moved to `spinner.delay` option
* `initialize` option is renamed to `bind`

### Methods

* `destroy` method is removed
* `extension` method is removed
* `initialize` method renamed to `bind`
* `reinitialize` method is replaced by `bind` and `unbind`
* `one` method is renamed to `once`

### Events

* `scroll` is renamed to `scrolled`
* `render` is renamed to `append`
* `rendered` is renamed to `appended`
* `noneLeft` is renamed to `last`
* `ready` is removed

Upgrade from 2.2 to 2.3
=======================

* `noneLeft` event is now triggered one page earlier
* `ready` event is now actually triggered at least once

Upgrade from 2.1 to 2.2
=======================

Specific changes for extensions.

* `extension.bind` is now called during `bind` instead of `initialize`
* `extension.unbind` is added and called during `unbind`

Upgrade from 2.0 to 2.1
=======================

* `render` is now triggered before rendering, use `rendered` when rendering is complete
* `load` is now triggered before loading, use `loaded` when loading is complete

Upgrade from 1.x to 2.0
=======================

* `thresholdMargin` option has been replaced with `negativeMargin`
* `loaderDelay` option has been replaced with `delay`
* `trigger` option has been replaced by the IASTriggerExtensions' `text` option
* `loader` option has been replaced by the IASSpinnerExtensions' `html` option
* `noneleft` option has been replaced by the IASNoneLeftExtensions' `text` option
* `scrollContainer` option has been removed. You can now do: `$('<scrollContainer>').ias({...})`
* `onPageChange` option has been replaced by the IASPagingExtensions' `pageChange` event
* `onLoadItems` option has been replaced by the `load` event
* `onRenderComplete` option has been replaced by the `render` event
* `onScroll` option has been replaced by the `scroll` event
* `customLoaderProc` option has been replaced by the IASSpinnerExtensions `html` option
* `customTriggerProc` option has been replaced by the IASTriggerExtensions `html` option
