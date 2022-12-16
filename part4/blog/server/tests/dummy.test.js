const { dummy } = require('../utils/list_helper');

test('dummy returns one', () => {
  const result = dummy([]);
  expect(result).toBe(1);
});
