jest.mock('../../db/record');
jest.mock('../../utils/formatMsg');
const EditRecordHandler = require('../EditRecordHandler.js');
const transformDatetime = require('../../utils/transformDatetime');
const { ContextSimulator } = require('bottender/test-utils');

const simulator = new ContextSimulator({
  platform: 'slack',
});

global.console.error = jest.fn();

const commandHelp =
  '`edit <record_id|(today)> <type(in|out)> <date(YYYY-MM-DD)> <time(HH:mm:SS)>`';

describe('test EditRecordHandler', async () => {
  test('should send command invalid', async () => {
    const command = 'edit';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'command invalid\n' + commandHelp;
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should send id must be integer or `latest`', async () => {
    const command = 'edit a in 2018-04-20 08:00:00';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'id must be integer or `latest`\n' + commandHelp;
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should send type must be in or out', async () => {
    const command = 'edit latest test 2018-04-20 08:00:00';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'type must be in or out\n' + commandHelp;
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should send date error\ninvalid date format, must be `<YYYY-MM-DD>`', async () => {
    const command = 'edit latest in 2018-04-35 08:00:00';
    const ctx = simulator.createTextContext(command);
    const expectStr =
      'invalid date format, must be `<YYYY-MM-DD>`\n' +
      commandHelp;
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should send time error\ninvalid time format, must `<hh:mm:ss>`', async () => {
    const command = 'edit latest in 2018-04-30 25:00:00';
    const ctx = simulator.createTextContext(command);
    const expectStr =
      'invalid time format, must be `<hh:mm:ss>`\n' +
      commandHelp;
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should send update record today in', async () => {
    const command = 'edit latest in today 08:00:00';
    const ctx = simulator.createTextContext(command);
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(
      'update record `latest` `in` to `'+ transformDatetime('today', '08:00:00') +'` success'
    );
  });

  test('should send update record latest out', async () => {
    const command = 'edit latest out 2018-04-20 08:00:00';
    const ctx = simulator.createTextContext(command);
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(
      'update record `latest` `out` to `2018-04-20 08:00:00` success'
    );
  });

  test('should send update record', async () => {
    const command = 'edit 1 in 2018-04-20 08:00:00';
    const ctx = simulator.createTextContext(command);
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(
      'update record `1` `in` to `2018-04-20 08:00:00` success'
    );
  });

  test('should send update record', async () => {
    const command = 'edit 1 in 2018-04-20 08:00:00';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'record not found or datetime error\n' + commandHelp;
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should send something went wrong', async () => {
    const command = 'edit 1 in 2018-04-20 08:00:00';
    const ctx = simulator.createTextContext(command);
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith('something went wrong');
  });
});
