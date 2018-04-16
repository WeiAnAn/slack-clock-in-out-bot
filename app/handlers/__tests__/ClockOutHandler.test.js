jest.mock('../../db/record');
jest.mock('../../utils/formatMsg');
const ClockOutHandler = require('../ClockOutHandler.js');
const { ContextSimulator } = require('bottender/test-utils');

const simulator = new ContextSimulator({
  platform: 'slack',
});

global.console.error = jest.fn();

describe('test ClockOutHandler', () => {
  test('should send out success', async () => {
    const ctx = simulator.createTextContext('out');
    const expectStr =
      'out success\n' +
      'record: `2018-04-20 08:00:00` ~ `2018-04-20 18:00:00`\n' +
      'total time: `10h`';
    await ClockOutHandler(ctx);
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should send out success', async () => {
    const ctx = simulator.createTextContext('out');
    await ClockOutHandler(ctx);
    expect(ctx.sendText).toBeCalledWith("you didn't in");
  });

  test('should send something went wrong', async () => {
    const ctx = simulator.createTextContext('out');
    await ClockOutHandler(ctx);
    expect(ctx.sendText).toBeCalledWith('something went wrong');
  });
});
