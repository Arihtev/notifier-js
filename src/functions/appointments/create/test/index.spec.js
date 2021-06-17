const { handler } = require('../index');
const AppointmentsProvider = require('../../../../providers/appointments');

jest.mock('../../../../providers/appointments');

const appointmentData = {
  serviceId: 1,
  date: '2021-06-16',
  startTime: '10:00',
  endTime: '11:00'
};

const event = {
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.vHJqRFNH8NejUSXQxGJ9kankGAwr7f5ZNcn9xiXeAt0',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(appointmentData)
};

describe('Create appointments handler should', () => {
  it('be defined', () => {
    expect(handler).toBeDefined();
  });

  it('create appointment', async () => {
    AppointmentsProvider.create.mockImplementation(() => () => appointmentData);
    
    const { body, statusCode } = await handler(event);
    
    expect(statusCode).toBe(201);
    const { data } = JSON.parse(body);
    expect(data).toEqual(appointmentData);
  });

  it('throw unauthorized', async () => {
    const event = { headers: {} };

    const { statusCode } = await handler(event);
    expect(statusCode).toBe(401);
  });
});
