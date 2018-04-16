jest.mock('../../db/record');
jest.mock('../../utils/formatMsg');
const EditRecordHandler = require('../EditRecordHandler.js');
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

  test('should send id must be integer or `today`', async () => {
    const command = 'edit a in 2018-04-20 08:00:00';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'id must be integer or `today`\n' + commandHelp;
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test("should send can't edit today out record!", async () => {
    const command = 'edit today out 2018-04-20 08:00:00';
    const ctx = simulator.createTextContext(command);
    const expectStr = "can't edit today out record!\n" + commandHelp;
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should send type must be in or out', async () => {
    const command = 'edit today test 2018-04-20 08:00:00';
    const ctx = simulator.createTextContext(command);
    const expectStr = 'type must be in or out\n' + commandHelp;
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should send date or time format error\ndate format:`<YYYY-MM-DD>`\ntime format: `<HH:mm:SS>`', async () => {
    const command = 'edit today in 2018-04-35 08:00:00';
    const ctx = simulator.createTextContext(command);
    const expectStr =
      'date or time format error\ndate format:`<YYYY-MM-DD>`\ntime format: `<HH:mm:SS>`\n' +
      commandHelp;
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(expectStr);
  });

  test('should send update record today', async () => {
    const command = 'edit today in 2018-04-20 08:00:00';
    const ctx = simulator.createTextContext(command);
    await EditRecordHandler(ctx, command.split(' '));
    expect(ctx.sendText).toBeCalledWith(
      'update record `today` `in` to `2018-04-20 08:00:00` success'
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
