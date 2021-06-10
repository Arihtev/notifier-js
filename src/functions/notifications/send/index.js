const { SNS, SES, Lambda } = require('aws-sdk');
const notifier = require('./utils');

const parseRecord = ({ Sns: { Message } }) => JSON.parse(Message);

const sns = new SNS({
  endpoint: 'http://localhost:4002',
});

const ses = new SES();

const lambda = new Lambda({
  endpoint: 'http://localhost:3002',
});

const handler = async event => {
  const records = event.Records.map(parseRecord);
  const promises = records.flatMap(r => r.map(async appointment => {
    return notifier(appointment)(sns, ses, lambda);
  }));

  const res = await Promise.all(promises);
  console.log(res);
};

module.exports = { handler };
