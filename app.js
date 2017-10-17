'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose = require('mongoose');
module.exports = app; // for testing

var config = {
    appRoot: __dirname // required config
};

var db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/HSBC_API_DB');
db.on('error', console.error.bind(console, 'connection error:'));


SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
