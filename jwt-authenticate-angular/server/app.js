'use strict';

var co = require('co');
var koa = require('koa');

var config = require('./config/environment');
var mongo = require('./config/mongo');
var koaConfig = require('./config/koa');

var app = koa();

module.exports = app;


app.init = co.wrap(function *() {
  yield mongo.connect();

  koaConfig(app);

  app.listen(config.app.port);
  if ('test' !== config.app.env) {
    console.log('app listening on port ' + config.app.port);
  }
});


if (!module.parent) {
  app.init().catch(function (err) {
    console.error(err.stack);
    process.exit(1);
  });
}
