const { handler } = require('../index');
const UsersProvider = require('../../../../providers/users');

jest.mock('../../../../providers/users');

const sampleData = {
  id: 1,
};

describe('List users handler should', () => {
  it('be defined', () => {
    expect(handler).toBeDefined();
  });

  it('list users', async () => {
    UsersProvider.list.mockImplementation(() => () => sampleData);

    const { statusCode, body } = await handler({});
    expect(statusCode).toBe(200);
    const { data } = JSON.parse(body);
    expect(data).toEqual(sampleData);
  });
});
