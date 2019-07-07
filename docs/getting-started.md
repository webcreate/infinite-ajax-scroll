# Getting started

First make sure that Infinite Ajax Scroll is [installed](installation.md) and included on every page where you need infinite scrolling functionality.

## Definitions/concepts

Infinite Ajax Scroll works with a few concepts:

**Container**: This is an element in which child elements (items) will be appended. This is usually a `div`, `ul` or `table` tag, but can be anything.

**Items**: These are elements that live inside the container. This can be `div`'s, `li`'s, `article`, table rows (`tr`) or anything else. Important is that the elements are a direct child of the container. Items for the next page will be inserted after the last item inside the container.

**Pagination**: This is the element that contains your pagination links, like next and previous page. Infinite Ajax Scroll will automatically hide this element.

**Next**: this element (`a` tag) is the link to the next page. The href is used to load the next page in the background and append the items.

## Markup

Given the above definitions, our minimal markup would be similar to this:

```html
<div class="container">
    <div class="item">...</div>
    <div class="item">...</div>
    <div class="item">...</div>
</div>

<div class="pagination">
    <a href="page2.html" class="next">Next</a>
</div>
```

> Important to notice: every next page has to follow the same markup.

## Javascript

Given the above markup, we need to instruct Infinite Ajax Scroll which element is what.

```javascript
// import if you use the NPM package
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

let ias = new InfiniteAjaxScroll('.container', {
  item: '.item',
  next: '.next',
  pagination: '.pagination'
});
```

This will enable infinite scroll in it's most basic form. When you scroll down, the next page is loaded through an ajax request and new items are appended to the container.
