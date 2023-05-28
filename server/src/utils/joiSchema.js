const Joi = require('joi');

const joiSchema = {
  signup: Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
    phoneNumber: Joi.number().min(11).required(),
  }),
};

module.exports = joiSchema;
