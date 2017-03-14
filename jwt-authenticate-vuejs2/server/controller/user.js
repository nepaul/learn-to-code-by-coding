const joi = require('joi');
const HttpStatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../model');
const config = require('../config');


const UserValidationRule = {
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,30}/)
}

async function create(ctx, next) {
  const validationResult = joi.validate(ctx.request.body, UserValidationRule);
  if (validationResult.error) {
    ctx.throw(HttpStatus.BAD_REQUEST, validationResult.error.details[0].message);
  }

  const res = await User.add(ctx.request.body);
  ctx.body = { id: res.id };
  ctx.status = HttpStatusCodes.CREATED;
}

async function show(ctx, next) {
  const id = ctx.state.user.id;
  const res = await User.findById(id);
  ctx.body = { email: res.email };
  ctx.status = HttpStatusCodes.OK;
}

async function login(ctx, next) {
  const validationResult = joi.validate(ctx.request.body, UserValidationRule);
  if (validationResult.error) {
    ctx.throw(HttpStatusCodes.BAD_REQUEST, validationResult.error.details[0].message);
  }

  const { email, password } = ctx.request.body;
  const user = await User.findByEmail(email);
  if (!user) {
    ctx.throw(HttpStatusCodes.BAD_REQUEST, 'User is not exist');
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    ctx.throw(HttpStatusCodes.BAD_REQUEST, "Password is incorrect");
  }

  const  payload = { id: user.id };
  const token = jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });
  ctx.state.user = user;
  ctx.body = { token: token };
  ctx.status = HttpStatusCodes.OK;
}

module.exports = {
  create,
  show,
  login,
};
