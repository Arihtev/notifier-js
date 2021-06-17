// const sendEmail = require('./email');
// const sendSMS = require('./sms');
const lambdaInvocation = require('./demo');

const notifier = appointment => async (sns, ses, lambda) => {
  // TO DO: send notification based on user preferences
  // const promises = [sendEmail(appointment)(ses), sendSMS(appointment)(sns)];
  const promises = [lambdaInvocation(appointment)(lambda)];

  return await Promise.all(promises);
};

module.exports = { notifier };
