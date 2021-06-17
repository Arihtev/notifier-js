const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');

const conn = require('../../../db/config');
const schema = require('./schema');
const { validateSchema } = require('../../../utils/validators/index');
const { list } = require('../../../providers/appointments');
const { Ok } = require('../../../utils/responses');

const handler = middy(async event => {
  const { queryStringParameters } = validateSchema(event)(schema);
  const appointments = await list(queryStringParameters)(conn);

  return Ok(appointments);
});

handler.use([httpErrorHandler()]);

module.exports = { handler };
