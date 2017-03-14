'use strict';
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const Router = require('koa-router');
const onerror = require('koa-onerror');
const jwt = require('koa-jwt');

const config = require('./config');
const Routers = require('./router');
const models = require('./model');
const errorHandler = require('./middleware/error-handler');


const app = new Koa();

app.init = async () => {
  const connection = await models.DBClient.sync({ force: false });
  if (!connection) {
    console.error('Init DB fail');
  }
  onerror(app);
  app.use(bodyparser());
  app.use(logger());
  app.use(errorHandler());
  app.use(jwt( { secret: config.secret }).unless({ path: [/^\/api\/v1\/auth/]}));

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
