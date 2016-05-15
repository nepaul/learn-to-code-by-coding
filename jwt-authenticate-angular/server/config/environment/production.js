'use strict';

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    cacheTime:  7 * 24 * 60 * 60 * 1000
  },
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/jwt-auth-ng'
  },
  staticServe: {
    isNeeded: true,
    root: path.join('..', '..', '..', 'client'),
    opts: {
      maxage: 7 * 24 * 60 * 60 * 1000,
      gzip: true
    }
  }
};