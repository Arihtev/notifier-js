const { handler } = require('../index');
const AppointmentsProvider = require('../../../../providers/appointments');

jest.mock('../../../../providers/appointments');

const event = {
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.vHJqRFNH8NejUSXQxGJ9kankGAwr7f5ZNcn9xiXeAt0',
    'Content-Type': 'application/json'
  },
  pathParameters: {
    id: '5',
  }
};

const sampleData = {
  id: 1,
};

describe('Get appointments handler should', () => {
  it('be defined', () => {
    expect(handler).toBeDefined();
  });

  it('get appointment', async () => {
    AppointmentsProvider.get.mockImplementation(() => () => sampleData);

    const { statusCode, body } = await handler(event);
    expect(statusCode).toBe(200);
    const { data } = JSON.parse(body);
    expect(data).toEqual(sampleData);
  });
});
