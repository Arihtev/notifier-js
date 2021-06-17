const publish = params => async sns => {
  return await sns.publish(params).promise();
};

module.exports = { publish };
