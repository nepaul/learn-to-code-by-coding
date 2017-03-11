'use strict';
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const Router = require('koa-router');
const onerror = require('koa-onerror');

const config = require('./config');
const Routers = require('./router');


const app = new Koa();
app.init = async () => {
  onerror(app);
  app.use(bodyparser());
  app.use(logger());

  const router = Routers.init();
  app
    .use(router.routes())
    .use(router.allowedMethods());
};

if (!module.parent) {
  app.init()
    .then(() => {
      const httpServer = app.listen(config.port);
      httpServer.on('listening', () => {
      const addr = httpServer.address();
      const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
      console.info(`listening on ${bind}`);
      })
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    })
}


module.exports = app;
