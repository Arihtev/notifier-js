const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');

const { list } = require('../../../providers/services');
const conn = require('../../../db/config');
const { Ok } = require('../../../utils/responses');

const handler = middy(async () => {  
  const services = await list()(conn);

  return Ok(services);
});

handler.use([httpJsonBodyParser(), httpErrorHandler()]);

module.exports = { handler };
