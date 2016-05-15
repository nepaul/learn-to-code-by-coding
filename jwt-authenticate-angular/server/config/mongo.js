'use strict';


var mongoose = require('mongoose');

var config = require('./environment');


exports.connect = function*() {
  if (mongoose.db) {
    yield mongoose.db.disconnect();
  }

  mongoose.db = mongoose.connect(
    config.mongo.url,
    {server: {poolSize: config.mongo.poolSize}});
};
