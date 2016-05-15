'use strict';


var path = require('path');


module.exports = {
  app: {
    port: 8888,
    cacheTime: 60 * 1000 /* default caching time (7 days) for static files, calculated in milliseconds */
  },
  mongo: {
    url: 'mongodb://localhost:27017/jwt-auth-ng-dev',
    poolSize: 5
  },
  staticServe: {
    isNeeded: true,
    root: path.join(__dirname, '..', '..', '..', 'client')
  }
};