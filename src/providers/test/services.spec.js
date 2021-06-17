const ServicesProvider = require('../services');
const { mockKnex } = require('./utils');

const sampleData = {
  id: 5,
};

const createData = {
  ownerId: 1,
  name: 'Service Name',
  address: 'test 34',
  phone: '089898978',
  email: 'test@test.com',
};

describe('Services provider should', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('be defined', () => {
      expect(ServicesProvider).toBeDefined();
    });
  
    it('get service', async () => {
      const knex = mockKnex(sampleData);
  
      const data = await ServicesProvider.get(1)(knex);
      expect(data).toEqual(sampleData);
    });
  
    it('throw not found', async () => {
      const knex = mockKnex(null);
  
      try {
        await ServicesProvider.get(1)(knex);
      } catch (e) {
        expect(e.statusCode).toEqual(404);
      }
    });
  
    it('throw not found on missing entry params', async () => {
      try {
        await ServicesProvider.get({})({});
      } catch (e) {
        expect(e.statusCode).toBe(404);
      }
    });
  });

  describe('CREATE', () => {
    it('create service', async () => {
      const knex = mockKnex([createData]);

      const data = await ServicesProvider.create(createData)(knex);
      expect(data).toBe(createData);
    });

    it('throw on integrity violation', async () => {
      // const knex = () => ({ insert: () => {
      //   throw { code: '23505' };
      // }});
      const error = { code: '23505' };
      const knex = mockKnex({}, error);

      try {
        await ServicesProvider.create(createData)(knex);
      } catch (e) {
        expect(e.statusCode).toBe(422);
      }
    });

    it('throw on other error', async () => {
      const error = { message: 'error' };
      const knex = mockKnex({}, error);

      try {
        await ServicesProvider.create(createData)(knex);
      } catch (e) {
        expect(e.message).toBe('error');
      }
    });
  });

  describe('LIST', () => {
    it('list services', async () => {
      const opts = {};
      const knex = mockKnex([1, 2]);

      const data = await ServicesProvider.list(opts)(knex);
      expect(data.length).toBe(2);
    });
  });
});
