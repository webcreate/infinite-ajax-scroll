<p align="center">
  <a href="https://infiniteajaxscroll.com" target="_blank">
    <img alt="Infinite Ajax Scroll" title="Infinite Ajax Scroll" src="https://infiniteajaxscroll.com/img/infinite-ajax-scroll-mark.svg" width="200">
  </a>
</p>

<h1 align="center">Infinite Ajax Scroll</h1>

Turn your existing pagination into infinite scrolling pages with ease.

* SEO friendly 🥇
* Doesn't break browsers back button 💯
* Highly customizable ✨

More features, documentation and examples available at: https://docs.infiniteajaxscroll.com/

[![Build Status](https://travis-ci.org/webcreate/infinite-ajax-scroll.svg?branch=3.x)](https://travis-ci.org/webcreate/infinite-ajax-scroll) [![npm](https://img.shields.io/npm/v/@webcreate/infinite-ajax-scroll)](https://www.npmjs.com/package/@webcreate/infinite-ajax-scroll)

## Installation

### Use Infinite Ajax Scroll via CDN

Get up and running in no time by linking directly to Infinite Ajax Scroll on [unpkg](https://unpkg.com).

```markup
<script src="https://unpkg.com/@webcreate/infinite-ajax-scroll@^3.0.0-beta.6/dist/infinite-ajax-scroll.min.js"></script>
```

Place this code right before the `</body>` tag on each template or page that you want to use infinite scroll on.

### Manage as a package

Are you using NPM in your projects? You can install and update our package easily.

```bash
$ npm install --save @webcreate/infinite-ajax-scroll
```

## Usage

Infinite Ajax Scroll works on a container with item elements which get appended. A next link is used to determine the next url.

```html
<div class="container">
    <div class="item">...</div>
    <div class="item">...</div>
    <div class="item">...</div>
    ...
</div>

<div class="pagination">
    <a href="page2.html" class="next">Next</a>
</div>
```

Now you can configure Infinite Ajax Scroll:

```javascript
// import if you use the NPM package
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

let ias = new InfiniteAjaxScroll('.container', {
  item: '.item',
  next: '.next',
  pagination: '.pagination'
});
```

Full documentation can be found at https://docs.infiniteajaxscroll.com

## Licensing

Infinite Ajax Scroll is dual licensed:

1. Under the Free Software Foundation’s [GNU AGPL v.3.0](LICENSE); or
2. Under an [Infinite Ajax Scroll Commercial License](https://infiniteajaxscroll.com/licenses/)

Buying a commercial license is mandatory as soon as you develop commercial activities distributing the Infinite Ajax Scroll software inside your product or deploying it on a network without disclosing the source code of your own applications under the AGPL license.

See https://infiniteajaxscroll.com/licenses/ for more details.
