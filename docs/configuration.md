# Configuration

## logger

Configure an event loggers. 

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
