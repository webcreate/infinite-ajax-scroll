Upgrade from 2.0 to 2.x
=======================

* `render` event should be replaced with `rendered`
* `load` event should be replaced with `loaded`

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
