const env = {
  pg: {
    HOST: process.env.PG_HOST,
    PORT: process.env.PG_PORT || '5432',
    USER: process.env.PG_USER,
    PASSWORD: process.env.PG_PASSWORD,
    DATABASE: process.env.PG_DATABASE,
  }
};

module.exports = { env };
