'use strict';

var controller = require('./user.controller');


exports.init = function (api) {
  api.post('/auth/login', controller.login);
  api.post('/auth/register', controller.register);

  api.get('/profile', controller.getProfile);
};
