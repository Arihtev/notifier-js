const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');

const { authMiddleware } = require('../../../middlewares');
const schema = require('./schema');
const conn = require('../../../db/config');
const { validateSchema } = require('../../../utils/validators/index');
const { create } = require('../../../providers/services');
const { Created } = require('../../../utils/responses');

const handler = middy(async (event) => {
  const ownerId = event.auth.payload.id;
  const { body: serviceData } = validateSchema(event)(schema);
    
  const service = await create({ ownerId, ...serviceData })(conn);
  
  return Created(service);
});

handler.use([authMiddleware(), httpJsonBodyParser(), httpErrorHandler()]);

module.exports = { handler };
