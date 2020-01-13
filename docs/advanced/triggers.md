# Triggers

Instead of loading next pages on scroll you can use a trigger. A trigger is a link or button that has to be clicked before the next page is loaded.

Reasons for a trigger might be:

* To make the footer reachable.
* To ease the load on the server. Users have to click before loading the next page. This adds a natural delay.

First add a button to your document

```html
<button class="load-more">Load More</button>
```

Next add a bit of CSS to make it look nice and hide if from view (opacity 0)

```css
.load-more {
  display: inline-block;
  height: 32px;
  padding: 0 16px;
  border: 1px solid #aaa;
  border-radius: 4px;
  opacity: 0;
  font-family: Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Arial,sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
  color: #555;
  background-color: #fff;
  cursor: pointer;
  transition: opacity .4s;
}

.load-more:hover {
  color: #F63840;
  border: solid 1px #F63840;
}
```

Next configure the trigger.

```javascript
let ias = new InfiniteAjaxScroll(/*..*/, {
  // other options here

  trigger: '.load-more'
});
```

See [trigger options](../options.md#trigger) for information.

[View this behaviour in a live demo](https://infiniteajaxscroll.com/examples/button/)

