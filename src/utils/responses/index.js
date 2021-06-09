const generateResponse = (statusCode, data) => {
  return {
    statusCode,
    body: JSON.stringify({
      data,
    }),
  };
};

const Ok = data => {
  const statusCode = 200;
  return generateResponse(statusCode, data);
};

const Created = data => {
  const statusCode = 201;
  return generateResponse(statusCode, data);
};

module.exports = { Ok, Created };
