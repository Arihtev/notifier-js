const Joi = require('joi');

const bodySchema = Joi.object({
  serviceId: Joi.number().required(),
  // YYYY-MM-DD
  date: Joi.string().pattern(new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)).required(),
  // HH:MM
  startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
});

const schema = Joi.object({
  body: bodySchema,
}).unknown();


module.exports = schema;
