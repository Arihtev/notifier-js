const handler = async event => {
  console.log('-----------------------------------------');
  console.log('-               NEW EMAIL               -');
  console.log('-----------------------------------------');
  console.log(event.message);
};

module.exports = { handler };
