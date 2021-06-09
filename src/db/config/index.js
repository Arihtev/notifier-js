const Knex = require('knex');
const { camelToSnake } = require('../../utils/case-convertors');
const camelize = require('camelize');

const db = Knex({
  client: 'pg',
  connection: {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT ? Number.parseInt(process.env.PG_PORT) : 5432,
    database: process.env.PG_DATABASE,
  },
  pool: {
    min: 0,
  },
  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      return result.map(row => camelize(row));
    } else {
      return camelize(result);
    }
  },
  wrapIdentifier: (value, origImpl) => origImpl(camelToSnake(value)),
  debug: process.env.NODE_ENV === 'development',
});

module.exports = db;
