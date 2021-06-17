const mockKnex = (data, e) => () => ({
  transaciton: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  first: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
  column: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  modify: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  raw: jest.fn().mockReturnThis(),
  then: jest.fn(function (done) {
    if (e) {
      throw e;
    }
    done(data);
  })
});

module.exports = { mockKnex };