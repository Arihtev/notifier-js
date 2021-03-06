const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');


const conn = require('../../../db/config');
const { authMiddleware } = require('../../../middlewares');
const { get } = require('../../../providers/users');
const { Ok } = require('../../../utils/responses');

const handler = middy(async event => {
  const id = Number(event.pathParameters.id);
  const user = await get(id)(conn);

  return Ok(user);
});

handler.use([authMiddleware(), httpErrorHandler()]);

module.exports = { handler };
