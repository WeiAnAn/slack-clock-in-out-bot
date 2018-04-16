jest.mock('../../db/record');
jest.mock('../../utils/formatMsg');
const ClockInHandler = require('../ClockInHandler');
const { ContextSimulator } = require('bottender/test-utils');

const simulator = new ContextSimulator({
  platform: 'slack',
});

global.console.error = jest.fn();

describe('test ClockInHandler', () => {
  test('should send clock in successful', async () => {
    const context = simulator.createTextContext('in');
    await ClockInHandler(context);
    expect(context.sendText).toBeCalledWith('clock in successful');
  });

  test('should send you already in!', async () => {
    const context = simulator.createTextContext('in');
    await ClockInHandler(context);
    expect(context.sendText).toBeCalledWith('you already in!');
  });

  test('should send something went wrong', async () => {
    const context = simulator.createTextContext('in');
    await ClockInHandler(context);
    expect(context.sendText).toBeCalledWith('something went wrong');
  });

  test('should throw error', async () => {
    const context = simulator.createTextContext('in');
    await ClockInHandler(context);
    expect(context.sendText).toBeCalledWith('something went wrong');
  });
});
