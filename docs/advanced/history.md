# History

## Updating url and title

When users are scrolling through pages we can update the browser url and page title. This allows the current page to be shared or bookmarked.

We can achieve this by listening for the [`page`](events.md#page) event. The page event contains the `url` and `title` of the current page in view.

The [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) can be used to update the url.

```javascript
ias.on('page', (event) => {
  // update the title
  document.title = event.title;

  // update the url
  let state = history.state;
  history.replaceState(state, event.title, event.url);
});
```

[View this behaviour in a live demo](https://infiniteajaxscroll.com/examples/articles/)

## Loading previous pages

{% hint style='working' %}
This feature is still work in progress
{% endhint %}
