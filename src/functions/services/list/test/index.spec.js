const { handler } = require('../index');
const ServicesProvider = require('../../../../providers/services');

jest.mock('../../../../providers/services');

const sampleData = {
  id: 1,
};

describe('List services handler should', () => {
  it('be defined', () => {
    expect(handler).toBeDefined();
  });

  it('list services', async () => {
    ServicesProvider.list.mockImplementation(() => () => sampleData);

    const { statusCode, body } = await handler({});
    expect(statusCode).toBe(200);
    const { data } = JSON.parse(body);
    expect(data).toEqual(sampleData);
  });
});
