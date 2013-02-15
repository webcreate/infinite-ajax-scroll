
buster.spec.expose();

describe("IAS", function () {
	before(function() {
		this.timeout = 18000;

		window.scrollTo(0, 0);

		jQuery.ias({
			container : '.listing',
			item: '.post',
			pagination: '#content .navigation',
			next: '.next-posts a',
			loader: '<img src="images/loader.gif"/>',
			triggerPageThreshold: 0,
			history: false
		});
	});

	it("should show a 'Load more items' link", function() {
		var deferred = when.defer();

		waitUntil(function() {
			return $('.ias_trigger:visible').length > 0;
		}, this.timeout - 50).then(function() {
			expect(true).toEqual(true);
			deferred.resolve();
		});

		scrollDown();

		return deferred.promise;
	});

	it("should load the next page on click", function() {
		var deferred = when.defer();

		waitUntil(function() {
			return $('.ias_trigger:visible').length > 0;
		}, this.timeout / 2).then(function() {
			clickAndWait('.ias_trigger:visible a', 1000).then(function() {
				expect($('#post11').length).toEqual(1);
				deferred.resolve();
			});
		});

		scrollDown();

		return deferred.promise;
	});

	it("should not show a 'Load more items' link on the final page", function() {
		var deferred = when.defer();

		scrollDown().then(function() {
			return clickAndWait('.ias_trigger:visible a', 1000);
		}).then(scrollDown).then(function() {
			expect($('.ias_trigger:visible').length).toEqual(0);
			deferred.resolve();
		});

		return deferred.promise;
	});
});