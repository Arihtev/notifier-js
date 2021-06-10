const httpErrors = require('http-errors');

const validateContentType = headers => {
  const contentTypeHeader = headers['content-type'] || headers['Content-Type'];

  if (contentTypeHeader !== 'application/json') {
    throw new httpErrors.UnprocessableEntity('Unsupported or undefined content type');
  }
};

const validateSchema = (event) =>
  (schema) => {
    if (event.body) {
      validateContentType(event.headers);
    }

    const { value, error } = schema.validate(event);
    if (error) {
      throw new httpErrors.BadRequest(error.message);
    }
    return value;
  };

module.exports = { validateSchema };
