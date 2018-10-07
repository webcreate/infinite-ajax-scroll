(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.InfiniteAjaxScroll = factory());
}(this, (function () { 'use strict';

	var InfiniteAjaxScroll = function InfiniteAjaxScroll () {};

	return InfiniteAjaxScroll;

})));
