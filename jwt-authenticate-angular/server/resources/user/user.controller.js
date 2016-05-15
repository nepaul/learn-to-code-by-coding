'use strict';


var Joi = require('joi');
var bcrypt = require('co-bcrypt');
var jwt = require('koa-jwt');

var config = require('../../config/environment');
var UserModel = require('./user.model').UserModel;
var UserValidation = require('./user.validation');

var userController = {};
module.exports = userController;


userController.login = function *login() {
  var credentials = this.request.body;

  var validateResult = Joi.validate(credentials, UserValidation.userSchema);
  if (validateResult.error) {
    this.throw(400, validateResult.error.details[0].message);
  }

  var user = yield UserModel.findByEmail(credentials.email);
  if (!user) {
    this.throw(400, 'Incorrect e-mail address.');
  }

  var isMatch = yield bcrypt.compare(credentials.password, user.password);
  if (!isMatch) {
    this.throw(400, 'Incorrect password.');
  }

  var payload = {sub: user.id};
  var token = jwt.sign(payload, config.app.secret, {expiresIn: 30 * 24 * 60 * 60});
  this.state.user = user;
  this.body = {token: token};
};


userController.register = function *register() {
  var credentials = this.request.body;

  var validateResult = Joi.validate(credentials, UserValidation.userSchema);
  if (validateResult.error) {
    this.throw(400, validateResult.error.details[0].message);
  }

  var isExist = yield UserModel.findByEmail(credentials.email);
  if (isExist) {
    this.throw(400, 'e-mail address is exist.');
  }
  var salt = yield bcrypt.genSalt(10);
  var hashPassword = yield bcrypt.hash(credentials.password, salt);
  var user = yield UserModel.addUser(credentials.email, hashPassword);

  this.status = 201;
  this.body = {id: user._id};
};


userController.getProfile = function *getProfile() {
  var userID = this.state.user.sub;

  try {
    var profile = yield UserModel.findUserProfileByID(userID);
  } catch(e) {
    // TODO: log
    console.log(e);
  }

  this.body = {profile: profile};
};
