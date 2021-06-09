const httpErrors = require('http-errors');

const get = (id) => async (knex) => {
  if (isNaN(id)) {
    throw httpErrors.NotFound();
  }
  const user = await knex('users').select('*').where('users.id', id).first();
  if (!user) {
    throw httpErrors.NotFound();
  }
  return user;
};

const create = ({ firstName, lastName, phone, email }) => async (knex) => {
  return await knex('users').insert({
    firstName,
    lastName,
    phone,
    email,
  });
};

const list = () => async (knex) => {
  return await knex('users').column('users.*').orderBy('id');
};

module.exports = { get, create, list };
