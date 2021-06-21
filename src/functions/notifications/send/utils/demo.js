const constructMessage = (startTime, user, service) => {
  return `Hello ${user.firstName}, you have an appointment today at ${startTime.substring(0, startTime.length - 3)} for ${service.name}!`;
};

const lambdaInvocation = ({ startTime, user, service }) => async lambda => {
  const params = {
    InvocationType: 'Event',
    FunctionName: 'notifier-backend-dev-demo-notification',
    Payload: JSON.stringify({ message: constructMessage(startTime, user, service) }),
  };
  return await lambda
    .invoke(params)
    .promise();
};

module.exports = lambdaInvocation;
