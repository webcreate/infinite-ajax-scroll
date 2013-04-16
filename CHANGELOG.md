

1.0.2 / 2013-02-15
==================

* Corrected some spelling stuff (treshold => threshold) (PR #47 by andyhausmann)

1.0.1 / 2013-02-15
==================

* Fixed Date.now() issue with older IE versions (under IE9) (PR #45 by devloper)

1.0.0 / 2013-01-20
==================

* Added manual trigger (see options triggerPageThreshold and trigger) (issue #43)
* Added loader delay (see option loaderDelay)

0.1.6 / 2012-10-23
==================

* Fixed issue in LoadItems function then the container element was a root element
* Changed indenting to spaces instead of tabs
* Merged pull request #23 from romainhill (scrollContainer option)
* Merged pull request #20 from andyhausmann (customLoaderProc option)
* Merged pull request #31 from appel (noneleft option)

0.1.5 / 2012-03-30
==================

* Changed the IAS loader block to accept general HTML and insert that in the container ".ias_loader" DIV
* Added a an onRenderComplete callback which kicks in once the content has been fully inserted into the DOM.
* Added contributers list to the readme

Attention: This version breaks backward compatibility, as the loader now needs to be a full img tag, instead of only the src.

0.1.4 / 2012-03-12
==================

* Added thresholdMargin option
* Added history option

0.1.3 / 2012-02-17
==================

* Added onLoadItems callback option

Updated documentation with an Advanced Usage section, including on how to integrate Google Analytics.

0.1.2 / 2011-08-08
==================

* Fixed bug causing IAS not working in IE8, thanks to Varun Mishra.

0.1.1 / 2011-06-14
==================

This version adds two major enhancements: a paging module and a history module. The paging module now only gives you the onPageChange callback function and deep linking, but will serve as a base for future updates. You can use the onPageChange callback function to take action when a user scrolls to a certain page. The history module remembers the last page the user was on before clicking on a link. When the user hits the back button, IAS will automatically load the pages up to the last page and automatically scrolls to that page.

* Added paging module
* Added history module
* Added new option onPageChange
* Added changelog file

0.1.0 / 2011-06-06
==================

Initial version of Infinite AJAX Scroll.

* Initial commit
