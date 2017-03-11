const fs = require('fs');

const Router = require('koa-router');

const config = require('../config');


exports.init = () => {
  const router = new Router({ prefix: config.APIPrefix });
  fs.readdirSync('./router').forEach((filename) => {
    console.log(filename);
    if (filename !== 'index.js') {
      require(`./${filename}`).init(router);  // eslint-disable-line global-require
    }
  });
  return router;
};
