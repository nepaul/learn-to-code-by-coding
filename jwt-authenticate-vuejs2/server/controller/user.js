const joi = require('joi');
const HttpStatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jwt');

const { User } = require('../model');
const config = require('../config');


const UserValidationRule = {
    email: joi.email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,30}/)
}

async function create(ctx, next) {
  const validationResult = joi.validate(ctx.request.body, UserValidationRule);
  if (validationResult.error) {
    ctx.throw(HttpStatus.BAD_REQUEST, validationResult.error.details[0].message);
  }

  const res = User.add(ctx.request.body);
  ctx.body = { ...res };
  ctx.status = HttpStatusCodes.CREATED;
}

async function show(ctx, next) {
}

async function login(ctx, next) {
  const validationResult = joi.validate(ctx.request.body, UserValidationRule);
  if (validationResult.error) {
    ctx.throw(HttpStatusCodes.BAD_REQUEST, validationResult.error.details[0].message);
  }

  const { email, password } = ctx.request.body;
  const user = User.findByEmail(email);
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
