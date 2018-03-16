<p align="center">
  <a href="https://infiniteajaxscroll.com" target="_blank">
    <img alt="Infinite Ajax Scroll" title="Infinite Ajax Scroll" src="https://infiniteajaxscroll.com/img/infinite-ajax-scroll-mark.svg" width="256">
  </a>
</p>

<h1 align="center">Infinite Ajax Scroll</h1>

Turn your existing pagination into infinite scrolling pages with ease. 

* SEO friendly 🥇
* Doesn't break browsers back button 💯
* Highly customizable through extensions ✨

More features, docs and demos available at: https://infiniteajaxscroll.com/

[![Build Status](https://travis-ci.org/webcreate/infinite-ajax-scroll.png?branch=master)](https://travis-ci.org/webcreate/infinite-ajax-scroll)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/webcreate/infinite-ajax-scroll)

## Installation

Download [jquery-ias.min.js](https://infiniteajaxscroll.com/download.html) (latest).

Include Infinite Ajax Scroll into your html pages.

```html
<script src="jquery-ias.min.js"></script>
```

Include jQuery if you haven't already.

```html
<script   
    src="https://code.jquery.com/jquery-3.2.1.min.js"   
    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="   
    crossorigin="anonymous"></script>
```

## Usage

Infinite Ajax Scroll requires markup similar to this:

```html
<div id="container">
  <div class="post">...</div>
  <div class="post">...</div>
</div>

<div id="pagination">
  <a href="/page1/" class="prev">prev</a>
  <a href="/page3/" class="next">next</a>
</div>
```

Then configure Infinite Ajax Scroll:

```html
<script type="text/javascript">
  var ias = jQuery.ias({
    container:  '#container',
    item:       '.post',
    pagination: '#pagination',
    next:       '#pagination a.next'
  });

  ias.extension(new IASSpinnerExtension());
  ias.extension(new IASTriggerExtension({offset: 2}));
  ias.extension(new IASNoneLeftExtension({text: "You reached the end"}));
  ias.extension(new IASPagingExtension());
  ias.extension(new IASHistoryExtension({prev: '#pagination a.prev'}));
</script>
```

For complete documentation about options and extensions visit https://infiniteajaxscroll.com/docs/.

## Licensing

Infinite Ajax Scroll may be used in commercial projects and applications with the one-time purchase of a commercial license.

https://infiniteajaxscroll.com/docs/license.html

For non-commercial, personal, or open source projects and applications, you may use Infinite Ajax Scroll under the terms of the MIT License. You may use Infinite AJAX Scroll for free.
