const router = require('koa-router');

const userController = require('../controller/user');

exports.init = (router) => {
  router
  .post('/auth/login', userController.login)
  .post('/auth/register', userController.create)
  .get('/users/:id', userController.show)

}
