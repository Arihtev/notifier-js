const { publish } = require('../utils');

describe('Scan schedule utils', () => {
  it('publish to sns', async () => {
    const params = { test: 'test' };
    const mockSns = { publish: (params) => ({
      promise: async () => params,
    }) };

    const res = await publish(params)(mockSns);
    
    console.log(res);
    expect(res).toBe(params);
  });
});