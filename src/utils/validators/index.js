const httpErrors = require('http-errors');

const validateSchema = ({ headers, body }) =>
  (schema) => {
    const contentTypeHeader = headers['content-type'] || headers['Content-Type'];

    if (contentTypeHeader !== 'application/json') {
      throw new httpErrors.UnprocessableEntity('Unsupported or undefined content type');
    }
    const { value, error } = schema.validate(body);
    if (error) {
      throw new httpErrors.BadRequest(error.message);
    }
    return value;
  };

module.exports = { validateSchema };
