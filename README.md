Infinite Ajax Scroll
====================

Turn your paginated pages into infinite scrolling pages with ease.

Version 1.0.2

Requires jQuery 1.4 or newer.

Licensed under:
MIT License - https://raw.github.com/webcreate/infinite-ajax-scroll/master/MIT-LICENSE.txt

## Requirements

* jQuery 1.4+
* A fully working (server-side) pagination with a 'goto the next page' link

IAS is based on the assumption that you, as a developer, already have taken care for the pagination using a server-side script. What IAS does is loading the next page via AJAX and inserting each individual item into the current page.

## Installation

**...using Bower**

``` sh
$ bower install jquery-ias
```

**...manually**

The pre-build files are in the dist folder.

``` html
<script type="text/javascript" src="dist/jquery.ias.min.js"></script>
```

Optionally add the stylesheet:

``` html
<link rel="stylesheet" type="text/css" href="dist/css/jquery.ias.css" />
```

## Basic usage

``` js
jQuery.ias({
    container : '.listing',
    item: '.post',
    pagination: '#content .navigation',
    next: '.next-posts a',
    loader: '<img src="dist/images/loader.gif"/>'
});
```

You can use IAS multiple times within a single webpage. For example, you can have an IAS definition for paginating blogposts and one for comments.

## Options

### `container`

**Default:** "#container"

Enter the selector of the element containing your items that you want to paginate.

### `item`

**Default:** ".item"

Enter the selector of the element that each item has. Make sure the elements are inside the container element.

### `pagination`

**Default:** "#pagination"

Enter the selector of the element that contains your regular pagination links, like next, previous and the page numbers. This element will be hidden when IAS loads.

### `next`

**Default:** ".next"

Enter the selector of the link element that links to the next page. The href attribute of this element will be used to get the items from the next page. Make sure there is only one(1) element that matches the selector.

### `noneleft`

**Default:** false

Contains the message to be displayed when there are no more pages left to load.

### `loader`

**Default:** `<img src="images/loader.gif"/>`

Enter the url to the loader image. This image will be displayed when the next page with items is loaded via AJAX.

### `loaderDelay`

**Default:** 600

Minimal time (in miliseconds) the loader should be displayed before rendering the items of the next page. Note: This setting will _not_ actually delay the the loading of items itself.

### `triggerPageThreshold`

**Default:** 3

Page number after which a 'Load more items' link is displayed. Users will manually trigger the loading of the next page by clicking this link.

### `trigger`

**Default:** "Load more items"

Text of the manual trigger link.

### `thresholdMargin`

**Default:** 0

On default IAS starts loading new items when you scroll to the latest .item element. The thresholdMargin will be added to the items' offset, giving you the ability to load new items earlier (please note that the margin should be a negative integer for this case).

For example:

Setting a thresholdMargin of -250 means that IAS will start loading 250 pixel _before_ the last item has scrolled into view. A positive margin means that IAS will laod new items N pixels after the last item.

### `history`

**Default:** true

Set this to false to disable the history module.

The IAS history module uses hashes (in the format "#/page/<num>") to remember the last viewed page, so when a visitor hits the back button after visiting an item from that page, it will load all items up to that last page and scrolls it into view. The use of hashes can be problematic in some cases, in which case you can disable this feature.

### `scrollContainer`

**Default:** $(window)

By default, scroll events are listened from the $(window) object. You can use this setting to specify a custom container, for example a div with overflow.

### `beforePageChange`

**Default:** empty function

Event handler. Is called when a user scrolls to another page, but before the new items are loaded.  Returning false will cancel the load; any return value other than false will allow the pagination to proceed as normal.

Parameters:

| *param*      | *description*                                                                      |
|--------------|------------------------------------------------------------------------------------|
| curScrOffset | Current scroll offset of the page                                                  |
| nextPageUrl  | URL of the page that would be loaded if the beforePageChange does not return false |

Example:

``` js
beforePageChange: function(scrollOffset, nextPageUrl) {
    console.log("The user wants to go to the next page, " +
        "but they can't because we return false!");
    return false;
}
```

### `onPageChange`

**Default:** empty function

Event handler. Is called each time the user scrolls to an other page.

Parameters:

| *param*      | *description*                      |
|--------------|------------------------------------|
| pageNum      | Current page number                |
| pageUrl      | Url of the current page            |
| scrollOffset | scroll offset for this page        |

Example:

``` js
onPageChange: function(pageNum, pageUrl, scrollOffset) {
    console.log('Welcome on page ' + pageNum);
}
```

### `onLoadItems`

**Default:** empty function

Event handler. Is called each time new items are loaded.

Parameters:

| *param* | *description*                      |
|---------|------------------------------------|
| items   | array containing the item elements |

Return value:

When you return `false` in the callback, we prevent IAS from automatically insert the loaded items. This can be used to manually insert the items.

Example:

``` js
onLoadItems: function(items) {
    console.log('We loaded ' + items.length + ' items');
}
```

### `onRenderComplete`

**Default:** empty function

Event handler. Is called each time new items have been inserted in the DOM.

This can be useful when you have a javascript function that normally performs some actions on the items in the document.ready event. When loading items from a new page using IAS, the document ready handler isn't called. Use this event instead.

Parameters:

| *param* | *description*                      |
|---------|------------------------------------|
| items   | array containing the item elements |

Example:

``` js
onRenderComplete: function(items) {
    console.log('We rendered ' + items.length + ' items');
}
```

### `customLoaderProc`

**Default:** false

Custom function callback to handle the rendering of the loader yourself.
Per default, the loader will be inserted right after the last item.

Example

``` js
customLoaderProc: function(loader) { console.log(loader); }
```

### `customTriggerProc`

**Default:** false

Custom function callback to handle the rendering of the trigger yourself.
Per default, the trigger will be inserted right after the last item.

Example

``` js
customTriggerProc: function(trigger) { console.log(trigger); }
```

## Advanced usage

### Integrating Google Analytics

You can integrate Google Analytics by using the onPageChange event. Here is an example:

``` js
jQuery.ias({
    container : '.listing',
    item: '.post',
    pagination: '#content .navigation',
    next: '.next-posts a',
    loader: '<img src="images/loader.gif"/>',
    onPageChange: function(pageNum, pageUrl, scrollOffset) {
        // This will track a pageview every time the user
        // scrolls up or down the screen to a different page.
        path = jQuery('<a/>').attr('href',pageUrl)[0].pathname.replace(/^[^\/]/,'/');
        _gaq.push(['_trackPageview', path]);
    }
});
```

### Integrating with jQuery Masonry

Example on how to integrate [jQuery Masonry](http://masonry.desandro.com/).

``` js
jQuery.ias({
    container : '.listing',
    item: '.post',
    pagination: '#content .navigation',
    next: '.next-posts a',
    loader: '<img src="images/loader.gif"/>',
    onLoadItems: function(items) {
        // hide new items while they are loading
        var $newElems = $(items).show().css({ opacity: 0 });
        // ensure that images load before adding to masonry layout
        $newElems.imagesLoaded(function(){
          // show elems now they're ready
          $newElems.animate({ opacity: 1 });
          $('.listing').masonry( 'appended', $newElems, true );
        });
        return true;
    }
});
```

## Customizing

IAS inserts a div element with an image to generate a loader. The div has a class called *ias_loader*. Using this class you can adjust the styling of the loader.

You can also link to an other loader image. Use the *loader* option to link to the right image.

## Issues

If you have any ideas or bugs, please submit them to the GitHub issue tracker at https://github.com/webcreate/infinite-ajax-scroll. We rely on our users for ideas on improvements and bug reports.

## Contributing

### Overview

To contribute to IAS please follow the following steps:

* Install the development tools
* Write the feature/bugfix
* Write tests for the feature/bugfix
* Run tests
* Build
* Update README
* Submit your Pull Request

### Installing development tools

1. Install bower components

    ``` sh
    $ bower install
    ```

2. Install npm modules

    ``` sh
    $ npm install
    ```

### Running tests

Testing is done with [Busterjs](https://github.com/busterjs/buster).

Running tests:

``` sh
$ ./node_modules/.bin/buster server
```

Launch some browsers and connect to http://localhost:1111 and capture them. Then run:

``` sh
$ ./node_modules/.bin/buster test -r specification
```

### Build

Building is done using [Grunt](https://github.com/gruntjs/grunt). To build run:

``` sh
$ ./node_modules/.bin/grunt
```

## Contributors

These people have contributed to IAS. A dollar sign indicates a paided feature request or donation. Between brackets is the part of IAS they have contributed to.

* Varun Mishra (IE8 bugfix)
* Farooq A.Aziz $
* Sascha Oosterbaan $ (onLoadItems)
* Loïc Heroguer $ (thresholdMargin)
* Andy Smith (onRenderComplete, html loader)
* Gilson D'Elrei $
* Andy Hausmann $ (CustomLoaderProc, manual trigger, spelling corrections)
* Romain Hill (scrollContainer)
* Mark van der Waarde (noneleft)
* diesachbearbeiter $ (manual trigger)
* df9web $ (manual trigger)
* devloper (PR #45)
* Yuri Vanin (CustomTriggerProc)

And [others](https://github.com/webcreate/infinite-ajax-scroll/graphs/contributors)...
