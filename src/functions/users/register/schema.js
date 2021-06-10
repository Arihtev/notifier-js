const Joi = require('joi');

const bodySchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const schema = Joi.object({
  body: bodySchema,
}).unknown();

module.exports = schema;
