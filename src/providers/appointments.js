const httpErrors = require('http-errors');

const { signalsIntegrityViolation } = require('../utils/errors');

const get = (id) => async (knex) => {
  if (isNaN(id)) {
    throw httpErrors.NotFound();
  }
  const user = await knex('appointments').select('*').where('appointments.id', id).first();
  if (!user) {
    throw httpErrors.NotFound();
  }
  return user;
};

const create = ({ userId, serviceId, date, startTime, endTime }) => async (knex) => {
  try {
    const [appointment] = await knex('appointments').insert({
      userId,
      serviceId,
      date,
      startTime,
      endTime
    }).returning(['id', 'user_id', 'service_id', 'date', 'start_time', 'end_time', 'created_at']);

    return appointment;
  } catch (e) {
    if (signalsIntegrityViolation(e)) {
      throw new httpErrors.UnprocessableEntity(e.detail);
    }
    throw e;
  }
};

// TO DO: trim user data
const list = (opts) => async (knex) => {
  return await knex('appointments')
    .column('appointments.*')
    .column(knex.raw('to_jsonb(users) as user'))
    .column(knex.raw('to_jsonb(services) as service'))
    .leftJoin('users', 'appointments.user_id', 'users.id')
    .leftJoin('services', 'appointments.service_id', 'services.id')
    .modify(qb => {
      if (opts && opts.userId) {
        qb.where({ userId: opts.userId });
      }

      if (opts && opts.serviceId) {
        qb.where({ serviceId: opts.serviceId });
      }

      if (opts && opts.date) {
        qb.where({ date: opts.date });
      }
    })
    .orderBy('appointments.id');
};

module.exports = { get, create, list };
