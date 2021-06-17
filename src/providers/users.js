const httpErrors = require('http-errors');

const { generatePassword, validatePassword } = require('../utils/passwords');
const { signalsIntegrityViolation } = require('../utils/errors');
const { signToken } = require('../utils/auth');

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

const create = ({ firstName, lastName, phone, email, password }) => async (knex) => {
  const { hash, salt } = generatePassword(password);

  try {
    const [user] = await knex('users')
      .insert({
        firstName,
        lastName,
        phone,
        email,
        pwhash: hash,
        pwsalt: salt,
      }).returning(['id', 'first_name', 'last_name', 'phone', 'email', 'created_at']);
  
    return user;
  } catch (e) {
    if (signalsIntegrityViolation(e)) {
      throw new httpErrors.UnprocessableEntity(e.detail);
    }
    throw e;
  }
};

const authenticate = ({ email, password }) => async (knex) => {
  // return await knex.transaction(async trx => {
  const user = await knex('users')
    .select('*')
    .where('users.email', email)
    .first();

  if (!user || !validatePassword(password, user.pwhash, user.pwsalt)) {
    throw new httpErrors.UnprocessableEntity('Wrong username or password!');
  }

  const token = signToken(user);
  return token;
  // });
};

const list = () => async (knex) => {
  return await knex('users')
    .column('users.*')
    .orderBy('id');
};

module.exports = { get, create, authenticate, list };
