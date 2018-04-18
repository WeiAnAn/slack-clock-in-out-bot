jest.mock('../../db/record');
jest.mock('../../utils/formatMsg');
const StatusHandler = require('../StatusHandler.js');
const { ContextSimulator } = require('bottender/test-utils');
const timeMachine = require('timemachine');

//mock date
timeMachine.config({
  dateString: 'April 20, 2018 18:00:00',
});

const simulator = new ContextSimulator({
  platform: 'slack',
});

global.console.error = jest.fn();

describe('test StatusHandler', () => {
  test('should your status is `out`', async () => {
    const ctx = simulator.createTextContext('status');
    await StatusHandler(ctx);
    expect(ctx.sendText).toBeCalledWith('your status is `out`');
  });

  test('should your status is `in`', async () => {
    const ctx = simulator.createTextContext('status');
    await StatusHandler(ctx);
    expect(ctx.sendText).toBeCalledWith(
      'your status is `in`\n' +
        'starting at: `2018-04-20 08:00:00`\n' +
        'duration: `10h`'
    );
  });

  test('should your something went wrong', async () => {
    const ctx = simulator.createTextContext('status');
    await StatusHandler(ctx);
    expect(ctx.sendText).toBeCalledWith('something went wrong');
  });
});
