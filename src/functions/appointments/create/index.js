const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');

const conn = require('../../../db/config');
const schema = require('./schema');
const { validateSchema } = require('../../../utils/validators/index');
const { create } = require('../../../providers/appointments');
const { authMiddleware } = require('../../../middlewares');
const { Created } = require('../../../utils/responses');

const handler = middy(async (event) => {
  const userId = event.auth.payload.id;
  const { body: appointmentData } = validateSchema(event)(schema);
    
  const appointment = await create({ userId, ...appointmentData })(conn);
  
  return Created(appointment);
});

handler.use([authMiddleware(), httpJsonBodyParser(), httpErrorHandler()]);

module.exports = { handler };
