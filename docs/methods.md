# Methods

## bind

This will bind Infinite Ajax Scroll to the scroll and resize events of the scroll container.

## unbind

This will unbind Infinite Ajax Scroll from the scroll and resize events of the scroll container.

## next

This will load the next page manually.

## load

This wil load an url and returns a promise.

| argument | type | description |
| :--- | :--- | :--- |
| url | string | Url to load |

## append

Use this method to append an array of items to the container.

It will return a promise.

| argument | type | description |
| :--- | :--- | :--- |
| items | array | Array of element to append to the container |
| parent | Element\|null | Container to append to. When none given it falls back to the configured container |

## enableLoadOnScroll

Enables the [`loadOnScroll`](options.md#loadonscroll) setting on runtime.

## disableLoadOnScroll

Disables the [`loadOnScroll`](options.md#loadonscroll) setting on runtime.
