const HttpStatus = require("http-status-codes");
const validator = require("joi");

const service = require("../service/user");

async function showPlayer(ctx, next) {
  const res = await service.showPlayer(ctx.state.user.sub);
  ctx.body = res;
  ctx.status = !!res ? HttpStatus.OK : HttpStatus.NO_CONTENT;
}

async function createPlayer(ctx, next) {
  const validationRule = {
    email: validator.string().required(),
    name: validator.string(),
    gender: validator.string(),
    phone: validator.string(),
    QQ: validator.string(),
  };
  const validationResult = validator.validate(ctx.request.body, validationRule);
  if (validationResult.error) {
    ctx.throw(
      HttpStatus.BAD_REQUEST,
      validationResult.error.details[0].message
    );
  }

  const userID = ctx.state.user.sub;
  const reqParams = Object.assign(ctx.request.body, { userID });
  const res = await service.createPlayer(reqParams);

  ctx.body = { id: res };
  ctx.status = HttpStatus.CREATED;
}

async function showUser(ctx, next) {
  const res = await service.showUser(ctx.state.user.sub);
  ctx.body = res;
  ctx.status = !!res ? HttpStatus.OK : HttpStatus.NO_CONTENT;
}

async function createUser(ctx, next) {
  const { email } = ctx.request.body;
  const validationResult = validator
    .string()
    .email()
    .required()
    .validate(email);
  if (validationResult.error) {
    ctx.throw(
      HttpStatus.BAD_REQUEST,
      validationResult.error.details[0].message
    );
  }

  const userID = ctx.state.user.sub;
  const res = await service.createUser({ userID, email });

  ctx.body = { user: res };
  ctx.status = HttpStatus.CREATED;
}

module.exports = {
  showPlayer,
  createPlayer,
  showUser,
  createUser,
};
