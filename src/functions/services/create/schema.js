const Joi = require('joi');

const bodySchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

const schema = Joi.object({
  body: bodySchema,
}).unknown();

module.exports = schema;
