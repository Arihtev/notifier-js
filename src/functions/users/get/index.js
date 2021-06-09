const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');
const { get } = require('../../../db/repositories/users');
const conn = require('../../../db/config');
const { Ok } = require('../../../utils/responses');

const handler = middy(async event => {
  const id = Number(event.pathParameters.id);
  const user = await get(id)(conn);

  return Ok(user);
});

handler.use([httpJsonBodyParser(), httpErrorHandler()]);

module.exports = { handler };
