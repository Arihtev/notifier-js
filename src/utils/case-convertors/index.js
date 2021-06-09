const camelToSnake = (str) => {
  return str.replace(/[A-Z]/g, group => `_${group.toLowerCase()}`);
};

module.exports = { camelToSnake };
