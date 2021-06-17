const { handler } = require('../index');
const sendEmail = require('../utils/email');
const sendSMS = require('../utils/sms');

jest.mock('../../../../providers/appointments');

const appointmentData = {
  startTime: '10:00',
  user: {
    firstName: 'Test',
    email: 'test@email.com',
    phone: '0899123123'
  },
  service: {
    name: 'Test Service'
  }
};

describe('Create appointments handler should', () => {
  it('be defined', () => {
    expect(handler).toBeDefined();
  });

  it('send Email', async () => {
    const mockSes = { sendEmail: (params) => ({
      promise: async () => params,
    }) };

    const { Destination, Message: { Body, Subject } } = await sendEmail(appointmentData)(mockSes);

    expect(Destination.ToAddresses[0]).toBe(appointmentData.user.email);
    expect(Subject.Data).toBe(`Appointment for ${appointmentData.service.name}`);
    expect(Body.Text.Data).toBe(
      `Hello ${appointmentData.user.firstName},\n  \n  this is a reminder that you have an appointment today at 10 for ${appointmentData.service.name}!\n  \n  Best regards,\n  Notifier`
    );
  });

  it('send SMS', async () => {
    const mockSns = { publish: (params) => ({
      promise: async () => params,
    }) };

    const { Message, PhoneNumber } = await sendSMS(appointmentData)(mockSns);

    expect(PhoneNumber).toBe(appointmentData.user.phone);
    expect(Message).toBe(
      `Hello ${appointmentData.user.firstName}, you have an appointment today at 10 for ${appointmentData.service.name}!`
    );
  });
});
