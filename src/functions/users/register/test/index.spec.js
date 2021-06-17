const { handler } = require('../index');
const UsersProvider = require('../../../../providers/users');

jest.mock('../../../../providers/users');

const sampleData = {
  id: 5,
};

describe('Register handler should', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('be defined', () => {
    expect(handler).toBeDefined();
  });

  it('register user', async () => {
    UsersProvider.create.mockImplementation(() => () => sampleData);

    const { statusCode, body } = await handler({});
    expect(statusCode).toBe(201);
    const { data } = JSON.parse(body);
    expect(data).toEqual(sampleData);
  });
});
