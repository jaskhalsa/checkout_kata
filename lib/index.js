var _ = require('lodash');

function Checkout(pricingInfo) {
    this.checkoutItemList = [];
    this.pricingInfo = pricingInfo;
}

Checkout.prototype.scan = function(itemname) {
    this.checkoutItemList.push(itemname);
};

Checkout.prototype.total = function() {
    var getSum = function(numberOfItem, itemInfo) {
        if (itemInfo.specialOffers) {
            var specialOffersToApply = Math.floor(numberOfItem / itemInfo.specialOffers.count);
            return specialOffersToApply * itemInfo.specialOffers.price + (numberOfItem % itemInfo.specialOffers.count) * itemInfo.value;
        }
        return itemInfo.value * numberOfItem;
    }

    var getCountOfItem = function(item,checkoutItemList) {
        return _.filter(checkoutItemList, function(entry) {
            return entry === item
        }).length;
    }

    var itemForSale = Object.keys(this.pricingInfo);
    var sum = 0;
    for (var i = 0; i < itemForSale.length; i++) {
        if (_.indexOf(this.checkoutItemList, itemForSale[i]) > -1) {
            sum += getSum(getCountOfItem(itemForSale[i], this.checkoutItemList), this.pricingInfo[itemForSale[i]]);
        }
    }

    return sum;
}

module.exports = Checkout;