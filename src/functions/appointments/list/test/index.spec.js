const { handler } = require('../index');
const AppointmentsProvider = require('../../../../providers/appointments');

jest.mock('../../../../providers/appointments');

const sampleData = {
  id: 1,
};

describe('List appointments handler should', () => {
  it('be defined', () => {
    expect(handler).toBeDefined();
  });

  it('get appointment', async () => {
    AppointmentsProvider.list.mockImplementation(() => () => [sampleData]);

    const { statusCode, body } = await handler({});
    expect(statusCode).toBe(200);
    const { data } = JSON.parse(body);
    expect(data).toEqual([sampleData]);
  });
});
