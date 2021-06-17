const { handler } = require('../index');
const UsersProvider = require('../../../../providers/users');

jest.mock('../../../../providers/users');

const sampleData = {
  token: 'abc',
};

describe('Login handler should', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('be defined', () => {
    expect(handler).toBeDefined();
  });

  it('login user', async () => {
    UsersProvider.authenticate.mockImplementation(() => () => sampleData);

    const { statusCode, body } = await handler({});
    expect(statusCode).toBe(200);
    const { data } = JSON.parse(body);
    expect(data).toEqual(sampleData);
  });
});
