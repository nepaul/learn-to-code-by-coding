'use strict';


var fs = require('fs');

var logger = require('koa-logger');
var jwt = require('koa-jwt');
var bodyParser = require('koa-bodyparser');
var Router = require('koa-router');
var onerror = require('koa-onerror');

var config = require('./environment');


module.exports = function (app) {
  // middleware configuration
  if (config.app.env !== 'production') {
    onerror(app);
  }
  if (config.app.env !== 'test') {
    app.use(logger());
  }
  if (config.staticServe.isNeeded) {
    var serve = require('koa-static');
    app.use(serve(config.staticServe.root));
  } else {
    var cors = require('kcors');
    app.use(cors());
  }
  app.use(bodyParser());
  app.use(jwt({ secret: config.app.secret }).unless({ path: [/^\/api\/auth/]}));

  // mount all the routes defined in resources
  var api = new Router({prefix: '/api'});
  fs.readdirSync('./resources').forEach(function (file) {
    require('../resources/' + file).init(api);
  });
  app
    .use(api.routes())
    .use(api.allowedMethods());

};
