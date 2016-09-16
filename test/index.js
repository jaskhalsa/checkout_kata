var expect = require('chai').expect;
var Checkout = require('../lib');
var items;
var checkout;
var pricingInfo = require('../config/default.json');
describe('Checkout', function() {
    beforeEach(function() {
        checkout = new Checkout(pricingInfo);
    });

    it('should price 50 for item A', function(done) {
        checkout.scan('A');
        expect(checkout.total()).to.equal(50);
        done();
    });


    it('should scan one at a time', function(done) {
        checkout.scan('A');
        checkout.scan('B');

        var result = checkout.total();

        expect(result).to.equal(80);
        done();
    });


    it('should do special offer 2 for 45 for item B', function(done) {
        checkout.scan('B');
        checkout.scan('B');
        expect(checkout.total()).to.equal(45);
        done();
    });

    it('should apply special offer twice for item A', function(done) {
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        expect(checkout.total()).to.equal(240);
        done();
    });

    it('should add stuff up', function(done) {
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('B');
        checkout.scan('C');
        checkout.scan('B');
        expect(checkout.total()).to.equal(225);
        done();
    });

    it('should not break when scanning nothing', function(done) {
        expect(checkout.total()).to.equal(0);
        done();
    })
});
