const formatMsg = require('../formatMsg');

describe('test formatMsg util', () => {
  test('should return correct message', () => {
    const msg = 'this is test message';
    const user = 'test';
    const expected = '<@test> this is test message';
    const formatted = formatMsg(msg, user);
    expect(formatted).toBe(expected);
  });
});
