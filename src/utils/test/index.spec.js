const { formatDate } = require('../dates');
const { camelToSnake } = require('../convertors');

describe('Utils should', () => {
  describe('DATES', () => {
    it('format date', () => {
      const year = 2021;
      const month = 1;
      const day = 1;
      const date = new Date(year, month, day);

      const formattedDate = formatDate(date);
      expect(formattedDate).toBe(`${year}-0${month + 1}-0${day}`);
    });
  });

  describe('CONVERTORS', () => {
    it('format date', () => {
      const string = 'testString';
      const convertedString = camelToSnake(string);
      expect(convertedString).toBe('test_string');
    });
  });
});
