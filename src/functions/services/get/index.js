const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');

const conn = require('../../../db/config');
const { get } = require('../../../providers/services');
const { Ok } = require('../../../utils/responses');

const handler = middy(async event => {
  const id = Number(event.pathParameters.id);
  const user = await get(id)(conn);

  return Ok(user);
});

handler.use([httpErrorHandler()]);

module.exports = { handler };
