const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');

const conn = require('../../../db/config');
const { get } = require('../../../providers/appointment');
const { Ok } = require('../../../utils/responses');

const handler = middy(async event => {
  const id = Number(event.pathParameters.id);
  const appointment = await get(id)(conn);

  return Ok(appointment);
});

handler.use([httpJsonBodyParser(), httpErrorHandler()]);

module.exports = { handler };
