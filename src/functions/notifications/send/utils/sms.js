const constructMessage = (startTime, user, service) => {
  return `Hello ${user.firstName}, you have an appointment today at ${startTime.substring(0, startTime.length - 3)} for ${service.name}!`;
};

const sendSMS = ({ startTime, user, service }) => async sns => {
  const smsParams = {
    Message: constructMessage(startTime, user, service),
    PhoneNumber: user.phone,
  };

  return await sns.publish(smsParams).promise();
};

module.exports = sendSMS;
