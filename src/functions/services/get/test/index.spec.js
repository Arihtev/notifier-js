const { handler } = require('../index');
const ServicesProvider = require('../../../../providers/services');

jest.mock('../../../../providers/services');

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

describe('Get services handler should', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('be defined', () => {
    expect(handler).toBeDefined();
  });

  it('get service', async () => {
    ServicesProvider.get.mockImplementation(() => () => sampleData);

    const { statusCode, body } = await handler(event);
    expect(statusCode).toBe(200);
    const { data } = JSON.parse(body);
    expect(data).toEqual(sampleData);
  });
});
