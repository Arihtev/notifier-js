const { SNS } = require('aws-sdk');

const conn = require('../../../db/config');
const { list } = require('../../../providers/appointments');
const { formatDate } = require('../../../utils/dates');

const sns = new SNS({
  endpoint: 'http://localhost:4002',
});

const publish = params => async sns => {
  return await sns.publish(params).promise();
};

const handler = async () => {
  const date = formatDate(new Date());
  const appointments = await list({ date })(conn);
  
  await publish({
    TopicArn: process.env.NOTIFICATIONS_ARN,
    Message: JSON.stringify(appointments),
  })(sns);
};

module.exports = { handler };
