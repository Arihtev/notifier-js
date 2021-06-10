const constructSubject = service => {
  return `Appointment for ${service.name}`;
};

const constructEmail = (startTime, user, service) => {
  return `Hello ${user.firstName},
  
  this is a reminder that you have an appointment today at ${startTime.substring(0, startTime.length - 3)} for ${service.name}!
  
  Best regards,
  Notifier`;
};

const generateParams = ({ startTime, user, service }) => ({
  Destination: {
    ToAddresses: [
      user.email,
    ]
  },
  Message: {
    Body: {
      Text: {
        Charset: 'UTF-8',
        Data: constructEmail(startTime, user, service),
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: constructSubject(service),
    }
  },
  Source: process.env.ADMIN_EMAIL,
});

const sendEmail = appointment => async ses => {
  const params = generateParams(appointment);

  return await ses.sendEmail(params).promise();
};

module.exports = sendEmail;
