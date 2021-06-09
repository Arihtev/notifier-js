const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
// const httpErrors = require('http-errors');
const httpErrorHandler = require('@middy/http-error-handler');
const { list } = require('../../../db/repositories/users');
const conn = require('../../../db/config');
const { Ok } = require('../../../utils/responses');

const handler = middy(async () => {  
  const users = await list()(conn);

  return Ok(users);
});

handler.use([httpJsonBodyParser(), httpErrorHandler()]);

module.exports = { handler };
