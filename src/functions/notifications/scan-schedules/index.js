const { SNS } = require('aws-sdk');

const conn = require('../../../db/config');
const { list } = require('../../../providers/appointments');
const { formatDate } = require('../../../utils/dates');
const { publish } = require('./utils');

const sns = new SNS({
  endpoint: 'http://localhost:4002',
});

const handler = async () => {
  try {
    const date = formatDate(new Date());
    const appointments = await list({ date })(conn);

    if (appointments && appointments.length > 0) {
      await publish({
        TopicArn: process.env.NOTIFICATIONS_ARN,
        Message: JSON.stringify(appointments),
      })(sns);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handler };
