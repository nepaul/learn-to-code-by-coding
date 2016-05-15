'use strict';

var path = require('path');
var _ = require('lodash');


var baseConfig = {
  app: {
    root: path.normalize(__dirname + '/../../..'),
    env: process.env.NODE_ENV || 'development',
    secret: process.env.SECRET || '\x80\x7f\x10\xca\xc0\xa1:\x04x\xd1\xdfc\xb5\x17\xe8=@\xe8\xc0\xf2\x1bl/\xb5'
  }
};


module.exports = _.merge(baseConfig, require('./' + baseConfig.app.env + '.js') || {});
