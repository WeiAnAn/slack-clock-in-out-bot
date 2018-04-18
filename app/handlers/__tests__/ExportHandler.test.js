jest.mock('../../db/record');
jest.mock('../../utils/formatMsg');
const ExportHandler = require('../ExportHandler.js');
const { ContextSimulator } = require('bottender/test-utils');
const timeMachine = require('timemachine');
process.env.HOST = 'http://localhost';

//mock date
timeMachine.config({
  dateString: 'April 21, 2018 08:00:00',
});

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

  test('export between should return here is your record', async () => {
    const command = 'export between 2018-04-10 2018-04-20';
    const ctx = simulator.createTextContext(command);
    await ExportHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(
      'here is your record\n' +
        'http://localhost/public/spengler-20180421080000.csv'
    );
  });

  test('export month should return here is your record', async () => {
    const command = 'export month 2018 04';
    const ctx = simulator.createTextContext(command);
    await ExportHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(
      'here is your record\n' +
        'http://localhost/public/spengler-20180421080000.csv'
    );
  });

  test('export should return here is your record', async () => {
    const command = 'export';
    const ctx = simulator.createTextContext(command);
    await ExportHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(
      'here is your record\n' +
        'http://localhost/public/spengler-20180421080000.csv'
    );
  });

  test('should return record', async () => {
    const command = 'export';
    const ctx = simulator.createTextContext(command);
    await ExportHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith("you didn't have record in this range");
  });

  test('should return something went wrong', async () => {
    const command = 'export';
    const ctx = simulator.createTextContext(command);
    await ExportHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith('something went wrong');
  });
});
