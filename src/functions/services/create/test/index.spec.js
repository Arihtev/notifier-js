const { handler } = require('../index');
const ServicesProvider = require('../../../../providers/services');

jest.mock('../../../../providers/services');

const serviceData = {
  name: 'test',
  address: 'test',
  phone: '0899978745',
  email: 'test@email.com'
};

const event = {
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.vHJqRFNH8NejUSXQxGJ9kankGAwr7f5ZNcn9xiXeAt0',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(serviceData)
};

describe('Create service handler should', () => {
  it('be defined', () => {
    expect(handler).toBeDefined();
  });

  it('create service', async () => {
    ServicesProvider.create.mockImplementation(() => () => serviceData);
    
    const { body, statusCode } = await handler(event);
    
    expect(statusCode).toBe(201);
    const { data } = JSON.parse(body);
    expect(data).toEqual(serviceData);
  });
});
