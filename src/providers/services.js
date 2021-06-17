const httpErrors = require('http-errors');

const { signalsIntegrityViolation } = require('../utils/errors');

const get = (id) => async (knex) => {
  if (isNaN(id)) {
    throw httpErrors.NotFound();
  }
  const service = await knex('services').select('*').where('services.id', id).first();
  if (!service) {
    throw httpErrors.NotFound();
  }
  return service;
};

const create = ({ ownerId, name, address, phone, email }) => async (knex) => {
  try {
    const [service] = await knex('services').insert({
      ownerId,
      name,
      address,
      phone,
      email,
    }).returning(['id', 'name', 'address', 'phone', 'email', 'owner_id', 'created_at']);

    return service;
  } catch (e) {
    if (signalsIntegrityViolation(e)) {
      throw new httpErrors.UnprocessableEntity(e.detail);
    }
    throw e;
  }
};

const list = () => async (knex) => {
  return await knex('services')
    .column('services.*')
    .orderBy('id');
};

module.exports = { get, create, list };
