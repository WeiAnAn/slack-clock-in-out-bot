jest.mock('../../db/record');
jest.mock('../../utils/formatMsg');
const ExportHandler = require('../ExportHandler.js');
const { ContextSimulator } = require('bottender/test-utils');

const simulator = new ContextSimulator({
  platform: 'slack',
});

global.console.error = jest.fn();

const commandHelp =
  'export all: `export`' +
  'export month record: `export month <year> <month>`' +
  'export record in range: `export between <start date(YYYY-MM-DD)> <end date(YYYY-MM-DD)>`';

describe('test ExportHandler', () => {
  test('should return year invalid', async () => {
    const command = 'export month 1 1';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'year invalid\n' + commandHelp;
    await ExportHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should return month invalid', async () => {
    const command = 'export month 2018 0';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'month invalid\n' + commandHelp;
    await ExportHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should return date invalid', async () => {
    const command = 'export between test 2018-04-20';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'date invalid\n' + commandHelp;
    await ExportHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should return date invalid', async () => {
    const command = 'export between 2018-04-20 test';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'date invalid\n' + commandHelp;
    await ExportHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should return command invalid', async () => {
    const command = 'export test 2018-04-20 2018-04-20';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'command invalid\n' + commandHelp;
    await ExportHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });
});
