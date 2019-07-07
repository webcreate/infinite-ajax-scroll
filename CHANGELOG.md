Changelog
=========

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Complete rewrite of Infinite Ajax Scroll. 

Key features:

- Embraces package managers
- Dropped jQuery dependency
- Vanilla Javascript (ES6)
- New and improved test suites
- New and improved documentation and examples
- Improved developer experience

**This version is incompatible with previous versions.**
Read [UPGRADE.md](UPGRADE.md) for upgrade instructions.

**This version changes the license from MIT to GNU Affero General Public License v3.0.**
See [LICENSE](LICENSE) for more details.

## [2.3.1]

* Fix: noneLeft event not being triggered when there was only one page

## [2.3.0]

* Added new option: `initialize`
* Fix: `ready` event to fire when ready (see commit [f6b44a7](https://github.com/webcreate/infinite-ajax-scroll/commit/f6b44a74e3b87362d0c5b417cf5ba69b6a048bd3))
* Added `ajaxOptions` to `load` event (PR by [campadrenalin](https://github.com/campadrenalin))

## [2.2.3]

* Improved documentation
* Fix: Cannot read property 'Deferred' of undefined (in jQuery noConflict mode) (fixes [#188](https://github.com/webcreate/infinite-ajax-scroll/issues/188), [#271](https://github.com/webcreate/infinite-ajax-scroll/issues/271), [#291](https://github.com/webcreate/infinite-ajax-scroll/issues/291))

## [2.2.2]

* Fix: render callback is not executed when using a custom render function (fixes [#198](https://github.com/webcreate/infinite-ajax-scroll/issues/198))
* Fix: unpredictable behaviour when multiple instances used the same selectors for sub-elements (fixes [#93](https://github.com/webcreate/infinite-ajax-scroll/issues/93))
* Stop ajax responder if instance was destroyed or reinitialized

## [2.2.1]

* Fix: prevent multiple initialisations causing duplicate items (fixes [#175](https://github.com/webcreate/infinite-ajax-scroll/issues/175), [#183](https://github.com/webcreate/infinite-ajax-scroll/issues/183))

## [2.2.0]

* Improved documentation on delay and negativeMargin options
* Added FAQ to support documentation
* Added Wordpress cookbook
* Fix: Maintain history state object when changing pages ([longzheng](https://github.com/longzheng))
* Fix: no longer caching $itemsContainer (fixes [#153](https://github.com/webcreate/infinite-ajax-scroll/issues/153))
* Fix: really destroy instance on destroy method (fixes [#160](https://github.com/webcreate/infinite-ajax-scroll/issues/160))
* Fix: Replaced deprecated size() with .length (fixes [#162](https://github.com/webcreate/infinite-ajax-scroll/issues/162))
* Fix: Reworked binding and unbinding (fixes various issues with unbinding)
* Fix: Bail out when device doesn't support onScroll event (like Opera Mini) (fixes [#146](https://github.com/webcreate/infinite-ajax-scroll/issues/146) by [fflewddur](https://github.com/fflewddur))
* Added reinitialize method

## [2.1.3]

* Bug #152 Improve compatibility support when Prototype is used along with jQuery ([antoinekociuba](https://github.com/antoinekociuba))
* Added docs

## [2.1.2]

* Added `htmlPrev` and `textPrev` options to IASTriggerExtension

## [2.1.1]

* Changed argument of `load` event from url to event object
* Fixed `prev()` return value

## [2.1.0]

* Added History extension
* Added `ready` event
* Added `loaded` event (`load` is now triggered before loading starts)
* Added `rendered` event (`render` is now triggered before rendering starts)
* Added priority to callbacks
* Added `initialize` call for extensions
* Added `one` method

## [2.0.0]

* Completely rewritten
* Extensible through extensions
* Extensible through events
* Added an extensive test suite

[Unreleased]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.3.1...master
[2.3.1]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.2.3...v2.3.0
[2.2.3]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.2.2...v2.2.3
[2.2.2]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.1.3...v2.2.0
[2.1.3]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.1.2...v2.1.3
[2.1.2]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/webcreate/infinite-ajax-scroll/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/webcreate/infinite-ajax-scroll/compare/v1.1.0...v2.0.0
