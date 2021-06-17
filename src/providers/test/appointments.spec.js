const AppointmentsProvider = require('../appointments');
const { mockKnex } = require('./utils');

const sampleData = {
  id: 5,
};

const createData = {
  userId: 1,
  serviceId: 1,
  date: '2021-11-11',
  startTime: '10:00',
  endTime: '11:00'
};

describe('Appointments provider should', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('be defined', () => {
      expect(AppointmentsProvider).toBeDefined();
    });
  
    it('get appointment', async () => {
      const knex = mockKnex(sampleData);
  
      const data = await AppointmentsProvider.get(1)(knex);
      expect(data).toEqual(sampleData);
    });
  
    it('throw not found', async () => {
      const knex = mockKnex(null);
  
      try {
        await AppointmentsProvider.get(1)(knex);
      } catch (e) {
        expect(e.statusCode).toEqual(404);
      }
    });
  
    it('throw not found on missing entry params', async () => {
      try {
        await AppointmentsProvider.get({})({});
      } catch (e) {
        expect(e.statusCode).toBe(404);
      }
    });
  });

  describe('CREATE', () => {
    it('create appointment', async () => {
      const knex = mockKnex([createData]);

      const data = await AppointmentsProvider.create(createData)(knex);
      expect(data).toBe(createData);
    });

    it('throw on integrity violation', async () => {
      // const knex = () => ({ insert: () => {
      //   throw { code: '23505' };
      // }});
      const error = { code: '23505' };
      const knex = mockKnex({}, error);

      try {
        await AppointmentsProvider.create(createData)(knex);
      } catch (e) {
        expect(e.statusCode).toBe(422);
      }
    });

    it('throw on other error', async () => {
      const error = { message: 'error' };
      const knex = mockKnex({}, error);

      try {
        await AppointmentsProvider.create(createData)(knex);
      } catch (e) {
        expect(e.message).toBe('error');
      }
    });
  });

  // describe('LIST', () => {
  //   it('list appointments', async () => {
  //     const opts = { userId: 1, serviceId: 1, date: '1' };
  //     // const knex = mockKnex([1, 2]);
  //     const knex =  () => ({
  //       // raw: jest.fn().mockReturnThis(),
  //       column: jest.fn(() => ({ column: () => jest.fn(() => ({ raw: () => jest.fn() })) })),
  //       where: jest.fn().mockReturnThis(),
  //       leftJoin: jest.fn().mockReturnThis(),
  //       modify: jest.fn().mockReturnThis(),
  //       orderBy: jest.fn().mockReturnThis(),
  //       then: jest.fn(function (done) {
  //         done([1,2]);
  //       })
  //     });

  //     const data = await AppointmentsProvider.list(opts)(knex);
  //     expect(data.length).toBe(2);
  //   });
  // });
});
