const router = require('koa-router');

const userController = require('../controller/user');

exports.init = (router) => {
  router
  .post('/users', userController.create);
}
