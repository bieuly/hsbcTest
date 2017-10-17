'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var fxRatesDao = require('../dao/FxRates')

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
    findAllFxRates: findAllFxRates,
    findFxRateAbbr: findFxRateAbbr,
    convertFx: convertFx
};

function findAllFxRates(req, res) {
  fxRatesDao.findAllFxRates().then(function(result){
      res.json(result);
  })
};

function findFxRateAbbr(req, res) {
    fxRatesDao.findFxRateAbbr(req.swagger.params.abbr.value).then(function(result){
        res.json(result);
    })
};

function convertFx(req, res) {
    var abbr = req.swagger.params.abbr.value;
    var amount = req.swagger.params.amount.value;
    fxRatesDao.findFxRateAbbr(abbr).then(function(rate){
        var buy = amount * rate.buy;
        var sell = amount * rate.sell;
        res.json({
            from: "CAD",
            to: abbr.toUpperCase(),
            buy: buy,
            sell: sell
        });
    })
};