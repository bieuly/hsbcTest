'use strict';
var mongoose = require('mongoose');

var FxRatesSchema = mongoose.Schema({
    currency: String,
    abbr: String,
    buy: Number,
    sell: Number
});

var FxRates = mongoose.model('fxrates', FxRatesSchema);

function findAllFxRates() {
    var promise = FxRates.find(function (err, rates) {
        if (err) return console.error(err);
        console.log("found: " + rates);
    }).exec();

    return promise;

};

function findFxRateAbbr(abbr) {
    var promise = FxRates.findOne({abbr: abbr.toUpperCase()} ,function (err, rate) {
        if (err) return console.error(err);
        console.log("found: " + rate);
    }).exec();

    return promise;
}


module.exports = {
    findAllFxRates: findAllFxRates,
    findFxRateAbbr: findFxRateAbbr
}

