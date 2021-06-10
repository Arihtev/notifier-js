const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');
/*
  TO DO: Extend module:
    1. Public/Private key pair for secret
    2. Bearer
*/

const secret = 'sh';
const expirationTime = '24h';

const signToken = user => jwt.sign(user, secret, { expiresIn: expirationTime });

const verifyToken = token => jwt.verify(token, secret, function(err, decoded) {
  if (err) {
    throw new httpErrors.Unauthorized(err.message);
  }
  return decoded;
});

module.exports = { signToken, verifyToken };
