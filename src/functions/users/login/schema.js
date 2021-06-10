const Joi = require('joi');

const bodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const schema = Joi.object({
  body: bodySchema,
}).unknown();

module.exports = schema;
