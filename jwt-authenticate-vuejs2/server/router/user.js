const router = require('koa-router');

const userController = require('../controller/user');

exports.init = (router) => {
  router
  .post('/login', userController.login)
  .get('/users/:id', userController.show)
  .post('/users', userController.create);
}
