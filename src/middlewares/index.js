const httpErrors = require('http-errors');

const { verifyToken } = require('../utils/auth');

// TO DO: Extend middleware. This is just a quick implementation
const authMiddleware = () => ({
  before: async (handler) => {
    const token = handler.event.headers.Authorization;
    if (!token) {
      throw new httpErrors.Unauthorized('Missing token!');
    }
    const payload = verifyToken(token);
    handler.event.auth = { token, payload };
  }
});

module.exports = { authMiddleware };
