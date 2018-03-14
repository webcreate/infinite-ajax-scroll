describe("auto initialize", function () {
  before(function() {
    this.timeout = 10000;

    window.scrollTo(0, 0);
  });

  after(function() {
    jQuery.ias('destroy');
  });

  it("should initialize", function() {
    var deferred = when.defer();
    var spy = this.spy();

    var ias = jQuery.ias({
      container : '.listing',
      item: '.post',
      pagination: '.navigation',
      next: '.next-posts a'
    });

    ias.on('ready', spy);

    wait(300).then(function() {
      expect(spy).toHaveBeenCalledOnce();

      deferred.resolve();
    });

    return deferred.promise;
  });

  it("should not initialize", function() {
    var deferred = when.defer();
    var spy = this.spy();

    var ias = jQuery.ias({
      container : '.listing',
      item: '.post',
      pagination: '.navigation',
      next: '.next-posts a',
      initialize: false
    });

    ias.on('ready', spy);

    wait(300).then(function() {
      expect(spy).not.toHaveBeenCalled();

      deferred.resolve();
    });

    return deferred.promise;
  });
});
