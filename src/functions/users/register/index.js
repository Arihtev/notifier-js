const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');
const { validateSchema } = require('../../../utils/validators/index');
const { create } = require('../../../providers/users');
const conn = require('../../../db/config');
const schema = require('./schema');
const { Created } = require('../../../utils/responses');

const handler = middy(async (event) => {
  const { body: userData } = validateSchema(event)(schema);
    
  const user = await create(userData)(conn);
  
  return Created(user);
});

handler.use([httpJsonBodyParser(), httpErrorHandler()]);

module.exports = { handler };
