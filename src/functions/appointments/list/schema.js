const Joi = require('joi');

const queryParamsSchema = Joi.object({
  userId: Joi.number(),
  serviceId: Joi.number(),
  date: Joi.string().pattern(new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)),
}).allow(null);

const schema = Joi.object({
  queryStringParameters: queryParamsSchema,
}).unknown();

module.exports = schema;
