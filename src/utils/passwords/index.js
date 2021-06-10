const crypto = require('crypto');


const generatePassword = function(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt };
};

const validatePassword = function(password, pwhash, salt) {
  const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return pwhash === newHash;
};

module.exports = { generatePassword, validatePassword };
