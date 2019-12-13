# Last page message

When your pages are finite, it is best practise to inform the user that the last page was hit.

First add an element to your document with the message you want to show.

```html
<div class="no-more">No more pages</div>
```

Next add a bit of CSS to hide the element on default:

```css
.no-more {
  opacity: 0;
}
```

Then listen for the [`last`](../events.md#last) event and show to element.

```javascript
let ias = new InfiniteAjaxScroll(/* config */);

ias.on('last', function() {
  let el = document.querySelector('.no-more');

  el.style.opacity = '1';
})
```

[View this behaviour in a live demo](https://infiniteajaxscroll.com/examples/articles/)
