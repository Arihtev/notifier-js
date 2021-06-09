const signalsIntegrityViolation = (e) => {
  const uniqueConstraintViolationCode = '23505';
  const foreignKeyViolationCode = '23503';

  return [uniqueConstraintViolationCode, foreignKeyViolationCode].includes(e.code);
};

module.exports = { signalsIntegrityViolation };
