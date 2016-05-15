'use strict';


var Joi = require('joi');


exports.userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,30}/)
});
