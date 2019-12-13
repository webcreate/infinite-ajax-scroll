# Overflow

It is possible to have infinite scrolling pages inside an overflow element.

First define a container element.

```html
<div id="scroller">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <!-- more items -->
</div>
```

Then configure the overflow using css. Don't forget to give the element a fixed height.

```css
#scroller {
  overflow: scroll;
  height: 200px;
}
```

Then configure the element as scroll container.

```javascript
let ias = new InfiniteAjaxScroll('#scroller', {
  scrollContainer: '#scroller'
});
```

[View this behaviour in a live demo](https://infiniteajaxscroll.com/examples/overflow/)
