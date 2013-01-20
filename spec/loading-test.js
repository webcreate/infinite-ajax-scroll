
buster.spec.expose();

buster.assertions.add("greaterThan", {
    assert: function (num, expectedNum) {
        return num > expectedNum;
    }
});

buster.assertions.add("lessThan", {
    assert: function (num, expectedNum) {
        return num < expectedNum;
    }
});

describe("IAS loader", function () {
    before(function() {
        this.timeout = 3000;

        window.scrollTo(0, 0);

        jQuery.ias({
            container : '.listing',
            item: '.post',
            pagination: '#content .navigation',
            next: '.next-posts a',
            loader: '<img src="images/loader.gif"/>',
            loaderDelay: 400,
            history: false
        });
    });

    it("should display for ~400 miliseconds", function() {
        var deferred = when.defer();

        watch('.ias_loader:visible', this.timeout - 500).then(function(time) {
            expect(time).toBeGreaterThan(350);
            expect(time).toBeLessThan(450);
            deferred.resolve();
        });

        scrollDown();

        return deferred.promise;
    });
});