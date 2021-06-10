const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');

const schema = require('./schema');
const conn = require('../../../db/config');
const { validateSchema } = require('../../../utils/validators/index');
const { authenticate } = require('../../../providers/users');
const { Ok } = require('../../../utils/responses');

const handler = middy(async (event) => {
  const { body: userData } = validateSchema(event)(schema);
    
  const token = await authenticate(userData)(conn);
  
  return Ok(token);
});

handler.use([httpJsonBodyParser(), httpErrorHandler()]);

module.exports = { handler };
