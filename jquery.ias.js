/*!
 * Infinite Ajax Scroll, a jQuery plugin
 * Version v0.1.6
 * http://webcreate.nl/
 *
 * Copyright (c) 2011-2012 Jeroen Fiege
 * Licensed under the MIT License:
 * http://webcreate.nl/license
 */

(function($) {
    $.ias = function(options)
    {
        // setup
        var opts             = $.extend({}, $.ias.defaults, options);
        var util             = new $.ias.util();                                // utilities module
        var paging           = new $.ias.paging(opts.scrollContainer);          // paging module
        var hist             = (opts.history ? new $.ias.history() : false);    // history module
        var _self            = this;

        // initialize
        init();

        /**
         * Initialize
         *
         * - tracks scrolling through pages
         * - remembers current page with the history module
         * - setup scroll event and hides pagination element
         * - loads and scrolls to previous page when we have something in our history
         *
         * @return self
         */
        function init()
        {
            // track page number changes
            paging.onChangePage(function(pageNum, scrollOffset, pageUrl) {
                if (hist) hist.setPage(pageNum, pageUrl);

                // call onPageChange event
                opts.onPageChange.call(this, pageNum, pageUrl, scrollOffset);
            });

            // setup scroll and hide pagination
            reset();

            // load and scroll to previous page
            if (hist && hist.havePage()) {
                stop_scroll();

                pageNum = hist.getPage();

                util.forceScrollTop(function() {
                    if (pageNum > 1) {
                        paginateToPage(pageNum);

                        curTreshold = get_scroll_treshold(true);
                        $("html,body").scrollTop(curTreshold);
                    }
                    else {
                        reset();
                    }
                });
            }

            return _self;
        }

        /**
         * Reset scrolling and hide pagination links
         *
         * @return void
         */
        function reset()
        {
            hide_pagination();

            opts.scrollContainer.scroll(scroll_handler);
        }

        /**
         * Scroll event handler
         *
         * @return void
         */
        function scroll_handler()
        {
            // the way we calculate if have to load the next page depend on which container we have
            if (opts.scrollContainer == $.ias.defaults.scrollContainer){
                scrTop = opts.scrollContainer.scrollTop();
            } else{
                scrTop = opts.scrollContainer.offset().top;
            }

            wndHeight = opts.scrollContainer.height();

            curScrOffset = scrTop + wndHeight;

            if (curScrOffset >= get_scroll_treshold()) {
                paginate(curScrOffset);
            }
        }

        /**
         * Cancel scrolling
         *
         * @return void
         */
        function stop_scroll()
        {
            opts.scrollContainer.unbind('scroll', scroll_handler);
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
         * @param boolean pure indicates if the tresholdMargin should be applied
         * @return integer treshold
         */
        function get_scroll_treshold(pure)
        {
            el = $(opts.container).find(opts.item).last();

            if (el.size() == 0) return 0;

            treshold = el.offset().top + el.height();

            if (!pure)
                treshold += opts.tresholdMargin;

            return treshold;
        }

        /**
         * Load the items from the next page.
         *
         * @param int curScrOffset current scroll offset
         * @param function onCompleteHandler callback function
         * @return void
         */
        function paginate(curScrOffset, onCompleteHandler)
        {
            urlNextPage = $(opts.next).attr("href");
            if (!urlNextPage) return stop_scroll();

            if (opts.beforePageChange && $.isFunction(opts.beforePageChange)) {
              if (opts.beforePageChange(curScrOffset, urlNextPage) === false) return;
            }

            paging.pushPages(curScrOffset, urlNextPage);

            stop_scroll();
            show_loader();

            loadItems(urlNextPage, function(data, items) {
                // call the onLoadItems callback
                result = opts.onLoadItems.call(this, items);

                if (result !== false) {
                    $(items).hide();  // at first, hide it so we can fade it in later

                    // insert them after the last item with a nice fadeIn effect
                    curLastItem = $(opts.container).find(opts.item).last();
                    curLastItem.after(items);
                    $(items).fadeIn();
                }

                // update pagination
                $(opts.pagination).replaceWith($(opts.pagination, data));

                remove_loader();
                reset();

                // call the onRenderComplete callback
                opts.onRenderComplete.call(this, items);

                if (onCompleteHandler) onCompleteHandler.call(this);
            });
        }

        /**
         * Loads items from certain url, triggers
         * onComplete handler when finished
         *
         * @param string     the url to load
         * @param function    the callback function
         * @return void
         */
        function loadItems(url, onCompleteHandler)
        {
            var items = [];

            $.get(url, null, function(data) {
                // walk through the items on the next page
                // and add them to the items array
                container = $(opts.container, data).eq(0);
                if (0 == container.length) {
                    // incase the element is a root element (body > element),
                    // try to filter it
                    container = $(data).filter(opts.container).eq(0);
                }

                if (container) {
                    container.find(opts.item).each(function() {
                        items.push(this);
                    });
                }

                if (onCompleteHandler) onCompleteHandler.call(this, data, items);
            }, "html");
        }

        /**
         * Paginate to a certain page number.
         *
         * - keeps paginating till the pageNum is reached
         *
         * @return void
         */
        function paginateToPage(pageNum)
        {
            curTreshold = get_scroll_treshold(true);

            if (curTreshold > 0) {
                paginate(curTreshold, function() {
                    stop_scroll();

                    if ((paging.getCurPageNum(curTreshold) + 1) < pageNum) {
                        paginateToPage(pageNum);

                        $("html,body").animate({"scrollTop": curTreshold}, 400, "swing");
                    }
                    else {
                        $("html,body").animate({"scrollTop": curTreshold}, 1000, "swing");

                        reset();
                    }
                });
            }
        }

        /**
         * Return the active loader or creates a new loader
         *
         * @return object loader jquery object
         */
        function get_loader()
        {
            loader = $(".ias_loader");

            if (loader.size() == 0) {
                loader = $("<div class='ias_loader'>"+opts.loader+"</div>");
                loader.hide();
            }
            return loader;
        }

        /**
         * Inserts the loader and does a fadeIn.
         *
         * @return void
         */
        function show_loader()
        {
            loader = get_loader();

            if (opts.customLoaderProc !== false) {
                opts.customLoaderProc(loader);
            } else {
                el = $(opts.container).find(opts.item).last();
                el.after(loader);
                loader.fadeIn();
            }
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
        scrollContainer: $(window),
        item: '.item',
        pagination: '#pagination',
        next: '.next',
        loader: '<img src="images/loader.gif"/>',
        tresholdMargin: 0,
        history : true,
        onPageChange: function() {},
        beforePageChange: function() {},
        onLoadItems: function() {},
        onRenderComplete: function() {},
        customLoaderProc: false
    };

    // utility module
    $.ias.util = function()
    {
        // setup
        var wndIsLoaded = false;
        var forceScrollTopIsCompleted = false;
        var self = this;

        // initialize
        init();

        /**
         * Initialize
         *
         * @return void
         */
        function init()
        {
            $(window).load(function () {
                wndIsLoaded = true;
            });
        }

        /**
         * Force browsers to scroll to top.
         *
         * - When you hit back in you browser, it automatically scrolls
         *   back to the last position. There is no way to stop this
         *   in a nice way, so this function does it the hard way.
         *
         * @param function onComplete callback function
         * @return void
         */
        this.forceScrollTop = function(onCompleteHandler)
        {
            $("html,body").scrollTop(0);

            if (!forceScrollTopIsCompleted) {
                if (!wndIsLoaded) {
                    setTimeout(function() {self.forceScrollTop(onCompleteHandler); }, 1);
                } else {
                    onCompleteHandler.call();
                    forceScrollTopIsCompleted = true;
                }
            }
        };
    };

    // paging module
    $.ias.paging = function()
    {
        // setup
        var pagebreaks = [[0, document.location.toString()]];
        var changePageHandler = function() {};
        var lastPageNum = 1;

        // initialize
        init();

        /**
         * Initialize
         *
         * @return void
         */
        function init()
        {
            $(window).scroll(scroll_handler);
        }

        /**
         * Scroll handler
         *
         * - Triggers changePage event
         *
         * @return void
         */
        function scroll_handler()
        {
            scrTop = $(window).scrollTop();
            wndHeight = $(window).height();

            curScrOffset = scrTop + wndHeight;

            curPageNum = getCurPageNum(curScrOffset);
            curPagebreak = getCurPagebreak(curScrOffset);

            if (lastPageNum != curPageNum) {
                changePageHandler.call(this, curPageNum, curPagebreak[0]/*scrOffset*/, curPagebreak[1]/*urlPage*/); // @todo fix for window height
            }

            lastPageNum = curPageNum;
        }

        /**
         * Returns current page number based on scroll offset
         *
         * @param int scroll offset
         * @return int current page number
         */
        function getCurPageNum(scrollOffset)
        {
            for(i=(pagebreaks.length-1);i>0;i--) {
                if (scrollOffset > pagebreaks[i][0]) {
                    return i + 1;
                }
            }
            return 1;
        }

        /**
         * Public function for getCurPageNum
         *
         * @return int current page number
         */
        this.getCurPageNum = function(scrollOffset)
        {
            return getCurPageNum(scrollOffset);
        };

        /**
         * Returns current pagebreak information based on scroll offset
         *
         * @param int scroll offset
         * @return array pagebreak information
         */
        function getCurPagebreak(scrollOffset)
        {
            for(i=(pagebreaks.length-1);i>=0;i--) {
                if (scrollOffset > pagebreaks[i][0]) {
                    return pagebreaks[i];
                }
            }
            return null;
        };

        /**
         * Sets onchangePage event handler
         *
         * @param function event handler
         * @return void
         */
        this.onChangePage = function(fn)
        {
            changePageHandler = fn;
        };

        /**
         * pushes the pages tracker
         *
         * @param int scroll offset for the new page
         * @return void
         */
        this.pushPages = function(scrollOffset, urlNextPage)
        {
            pagebreaks.push([scrollOffset, urlNextPage]);
        };
    };

    // history module
    $.ias.history = function()
    {
        // setup
        var isPushed = false;
        var isHtml5 = false;

        // initialize
        init();

        /**
         * Initialize
         *
         * @return void
         */
        function init()
        {
            isHtml5 = !!(window.history && history.pushState && history.replaceState);
            isHtml5 = false; // html5 functions disabled due to problems in chrome
        };

        /**
         * Sets page to history
         *
         * @return void;
         */
        this.setPage = function(pageNum, pageUrl)
        {
            this.updateState({page : pageNum}, "", pageUrl);
        };

        /**
         * Checks if we have a page set in the history
         *
         * @return bool returns true when we have a previous page, false otherwise
         */
        this.havePage = function()
        {
            return (this.getState() != false);
        };

        /**
         * Gets the previous page from history
         *
         * @return int page number of previous page
         */
        this.getPage = function()
        {
            if (this.havePage()) {
                stateObj = this.getState();
                return stateObj.page;
            }
            return 1;
        };

        /**
         * Returns current state
         *
         * @return object stateObj
         */
        this.getState = function()
        {
            if (isHtml5) {
                stateObj = history.state;
                if (stateObj && stateObj.ias) return stateObj.ias;
            }
            else {
                haveState = (window.location.hash.substring(0, 7) == "#/page/");
                if (haveState) {
                    pageNum = parseInt(window.location.hash.replace("#/page/", ""));
                    return { page : pageNum };
                }
            }

            return false;
        };

        /**
         * Pushes state when not pushed already, otherwise
         * replaces the state.
         *
         * @param obj stateObj
         * @param string title
         * @param string url
         * @return void
         */
        this.updateState = function(stateObj, title, url)
        {
            if (isPushed) {
                this.replaceState(stateObj, title, url);
            }
            else {
                this.pushState(stateObj, title, url);
            }
        };

        /**
         * Pushes state to history.
         *
         * @param obj stateObj
         * @param string title
         * @param string url
         * @return void
         */
        this.pushState = function(stateObj, title, url)
        {
            if (isHtml5) {
                history.pushState({ ias : stateObj }, title, url);
            }
            else {
                hash = (stateObj.page > 0 ? "#/page/" + stateObj.page : "");
                window.location.hash = hash;
            }

            isPushed = true;
        };

        /**
         * Replaces current history state.
         *
         * @param obj stateObj
         * @param string title
         * @param string url
         * @return void
         */
        this.replaceState = function(stateObj, title, url)
        {
            if (isHtml5) {
                history.replaceState({ ias : stateObj }, title, url);
            }
            else {
                this.pushState(stateObj, title, url);
            }
        };
    };
})(jQuery);
