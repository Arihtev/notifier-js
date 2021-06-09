const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpErrors = require('http-errors');
const httpErrorHandler = require('@middy/http-error-handler');
const { validateSchema } = require('../../../utils/validators/index');
const { create } = require('../../../db/repositories/users');
const conn = require('../../../db/config');
const schema = require('./schema');
const { signalsIntegrityViolation } = require('../../../utils/errors');

const handler = middy(async (event) => {
  try {
    const userData = validateSchema(event)(schema);
    
    const user = await create(userData)(conn);
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        user,
      }),
    };    
  } catch (e) {
    if (signalsIntegrityViolation(e)) {
      throw new httpErrors.UnprocessableEntity();
    }
  }
});

handler.use([httpJsonBodyParser(), httpErrorHandler()]);

module.exports = { handler };
