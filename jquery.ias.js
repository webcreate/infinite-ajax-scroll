/*!
 * Infinite Ajax Scroll, a jQuery plugin 
 * Version v0.1.0
 * http://webcreate.nl/
 *
 * Copyright (c) 2011 Jeroen Fiege
 * Licensed under the MIT License: 
 * http://webcreate.nl/license
 */

(function($) {
	$.ias = function(options) 
	{
		// setup
		var opts = $.extend({}, $.ias.defaults, options);
		
		// initialize
		init();
		
		/**
		 * Initialize scrolling and hide pagination links
		 * 
		 * @return void
		 */
		function init()
		{
			hide_pagination();
			
			$(window).scroll(scroll_handler);
		}
		
		/**
		 * Scroll event handler
		 * 
		 * @return void
		 */
		function scroll_handler()
		{
			scrTop = $(window).scrollTop();
			docHeight = $(document).height();
			wndHeight = $(window).height();
			
			curScrOffset = scrTop + wndHeight;
			
			if (curScrOffset >= get_scroll_treshold()) {
				paginate();
			}
		}
		
		/**
		 * Cancel scrolling
		 * 
		 * @return void
		 */
		function stop_scroll()
		{
			$(window).unbind('scroll', scroll_handler);
		}

		/**
		 * Hide pagination
		 * 
		 * @return void
		 */
		function hide_pagination()
		{
			$(opts.pagination).hide();
		}
		
		/**
		 * Get scroll treshold based on the last item element
		 * 
		 * @return integer treshold
		 */
		function get_scroll_treshold()
		{
			el = $(opts.container).find(opts.item).last();
			
			if (el.size() == 0) return stop_scroll();
			
			treshold = el.offset().top + el.height();
			
			return treshold;
		}
		
		/**
		 * Load the items from the next page.
		 * 
		 * @return void
		 */
		function paginate()
		{
			urlNextPage = $(opts.next).attr("href");
			
			if (!urlNextPage) return stop_scroll();
			
			stop_scroll();
			show_loader();
			
			$.get(urlNextPage, null, function(data) {
				// walk throught the items on the next page
				// and insert after the last item
				$(opts.container, data).find(opts.item).each(function() {
					item = $(this);
					item.hide(); // at first hide it so we can fade it in later
					
					curLastItem = $(opts.container).find(opts.item).last();
					curLastItem.after(item);
					
					item.fadeIn();
				});
				
				// update pagination
				$(opts.pagination).replaceWith($(opts.pagination, data));
				
				remove_loader();
				init();
				
			}, "html");
		}
		
		/**
		 * Return the active loader of creates a new loader
		 * 
		 * @return object loader jquery object
		 */
		function get_loader()
		{
			loader = $(".ias_loader");
			
			if (loader.size() == 0) {
				loader = $("<div class='ias_loader'><img src='"+opts.loader+"'/></div>");
				loader.hide();
			}
			return loader;
		}
		
		/**
		 * Inserts the loader and does a fadeIn.
		 * 
		 * @return void
		 */
		function show_loader(selector)
		{
			loader = get_loader();
			el = $(opts.container).find(opts.item).last();
			
			el.after(loader);
			loader.fadeIn();
		}
		
		/**
		 * Removes the loader.
		 * 
		 * return void
		 */
		function remove_loader()
		{
			loader = get_loader();
			loader.remove();
		}
	};

	/**
	 * Debug to console when available
	 * 
	 * @param object $obj
	 * @return
	 */
	function debug($obj) 
	{
		if (window.console && window.console.log)
			window.console.log($obj);
	};

	// plugin defaults
	$.ias.defaults = {
			container: '#container',
			item: ".item",
			pagination: "#pagination",
			next: ".next",
	};
})(jQuery);