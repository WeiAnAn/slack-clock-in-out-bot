const formatTime = require('../formatTime');

describe('test formatTime util', () => {
  test('should return correct message', () => {
    const SEC_30 = 30;
    const MIN = 60;
    const HOUR = MIN * 60;
    const DAY = HOUR * 24;
    let sec = SEC_30;
    expect(formatTime(sec)).toBe('30s');
    sec = MIN;
    expect(formatTime(sec)).toBe('1m');
    sec = MIN + SEC_30;
    expect(formatTime(sec)).toBe('1m 30s');
    sec = HOUR;
    expect(formatTime(sec)).toBe('1h');
    sec = HOUR + MIN + SEC_30;
    expect(formatTime(sec)).toBe('1h 1m 30s');
    sec = DAY + HOUR + MIN + SEC_30;
    expect(formatTime(sec)).toBe('25h 1m 30s');
  });
});
