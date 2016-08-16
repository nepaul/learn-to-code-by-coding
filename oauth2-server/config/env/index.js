'use strict';

var path = require('path');
var _ = require('lodash');


var baseConfig = {
  app: {
    root: path.join(__dirname, '..', '..', '..'),
    env: process.env.NODE_ENV || 'development',
    scret: process.env.SCRET || 'ce6da7fe1957b2e2f816654df2927e89e30133a7d254f6a6'
  }
};

module.exports = _.merge(baseConfig, require('./' + baseConfig.app.env) || {});
