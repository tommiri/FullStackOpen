const { reverse } = require('../utils/for_testing');

test('Reverse of a', () => {
  const result = reverse('a');

  expect(result).toBe('a');
});

test('Reverse of react', () => {
  const result = reverse('react');

  expect(result).toBe('tcaer');
});

test('Reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias');

  expect(result).toBe('saippuakauppias');
});
