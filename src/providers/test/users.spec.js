const UsersProvider = require('../users');
const { mockKnex } = require('./utils');
const { generatePassword } = require('../../utils/passwords');

const sampleData = {
  id: 5,
};

const createData = {
  firstName: 'Test',
  lastName: 'Testev',
  phone: '08978789',
  email: 'test@email.com',
  password: 'test1234'
};

describe('Users provider should', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('be defined', () => {
      expect(UsersProvider).toBeDefined();
    });
  
    it('get user', async () => {
      const knex = mockKnex(sampleData);
  
      const data = await UsersProvider.get(1)(knex);
      expect(data).toEqual(sampleData);
    });
  
    it('throw not found', async () => {
      const knex = mockKnex(null);
  
      try {
        await UsersProvider.get(1)(knex);
      } catch (e) {
        expect(e.statusCode).toEqual(404);
      }
    });
  
    it('throw not found on missing entry params', async () => {
      try {
        await UsersProvider.get({})({});
      } catch (e) {
        expect(e.statusCode).toBe(404);
      }
    });
  });

  describe('CREATE', () => {
    it('create user', async () => {
      const knex = mockKnex([createData]);

      const data = await UsersProvider.create(createData)(knex);
      expect(data).toBe(createData);
    });

    it('throw on integrity violation', async () => {
      const error = { code: '23505' };
      const knex = mockKnex({}, error);

      try {
        await UsersProvider.create(createData)(knex);
      } catch (e) {
        expect(e.statusCode).toBe(422);
      }
    });

    it('throw on other error', async () => {
      const error = { message: 'error' };
      const knex = mockKnex({}, error);

      try {
        await UsersProvider.create(createData)(knex);
      } catch (e) {
        expect(e.message).toBe('error');
      }
    });
  });

  describe('AUTHENTICATE', () => {
    const authData = { email: 'test', password: 'test' };

    it('authenticate user', async () => {
      const { hash, salt } = generatePassword('test');
      const userData = { ...authData, pwhash: hash, pwsalt: salt };
      const knex = mockKnex(userData);

      const data = await UsersProvider.authenticate(authData)(knex);
      expect(typeof data).toBe('string');
    });

    it('throw on invalid credentials', async () => {
      const knex = mockKnex(null);

      try {
        await UsersProvider.authenticate(authData)(knex);
      } catch (e) {
        expect(e.statusCode).toBe(422);
      }
    });
  });

  describe('LIST', () => {
    it('list users', async () => {
      const opts = {};
      const knex = mockKnex([1, 2]);

      const data = await UsersProvider.list(opts)(knex);
      expect(data.length).toBe(2);
    });
  });
});

// const { create } = require('../users');

// // const conn = require('../db/config');

// // const userData = {
// //   firstName: 'Test',
// //   lastName: 'Testov',
// //   phone: '0899777888',
// //   email: 'test.testov@test.com',
// //   password: 'test1234'
// // };

// describe('Create competitors handler', () => {
//   // beforeAll(async () => {
//   //   await conn('users').delete();
//   // });

//   // afterAll(async () => {
//   //   await conn.destroy();
//   // });

//   it('should be defined', () => {
//     expect(create).toBeTruthy();
//   });
  
//   // it('should create user', async () => {
//   //   const user = await create(userData)(conn);

//   //   expect(user).toEqual(expect.objectContaining({
//   //     id: expect.any(Number),
//   //     createdAt: expect.any(Date),
//   //     ...user,
//   //   }));
//   // });
// });
