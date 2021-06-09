const Joi = require('joi');

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  // role: Joi.string().valid('admin', 'owner', 'customer')
});

module.exports = schema;
