const router = require('koa-router');

const userController = require('../controller/user');

exports.init = (router) => {
  router
  .post('/auth/sessions', userController.login)
  .post('/auth/users', userController.create)
  .get('/users', userController.show)
}
