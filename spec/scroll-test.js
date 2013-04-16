
buster.spec.expose();

describe("IAS", function () {
	before(function() {
		this.timeout = 3000;

		window.scrollTo(0, 0);

		jQuery.ias({
			container : '.listing',
			item: '.post',
			pagination: '#content .navigation',
			next: '.next-posts a',
			loader: '<img src="images/loader.gif"/>',
			history: false
		});
	});

	it("should load the next page", function() {
		var deferred = when.defer();

		scrollDown().then(function() {
			wait($.ias.defaults.loaderDelay + 100).then(function() {
				expect($('#post11').length).toEqual(1);
				deferred.resolve();
			});
		});

		return deferred.promise;
	});

	it("should show a loader", function() {
		var deferred = when.defer();

		waitUntil(function() {
			return $('.ias_loader:visible').length > 0;
		}, this.timeout - 50).then(function() {
			expect(true).toEqual(true);
			deferred.resolve();
		});

		scrollDown();

		return deferred.promise;
	});
});
