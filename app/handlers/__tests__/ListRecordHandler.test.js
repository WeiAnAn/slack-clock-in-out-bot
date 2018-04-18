jest.mock('../../db/record');
jest.mock('../../utils/formatMsg');
const ListRecordHandler = require('../ListRecordHandler.js');
const { ContextSimulator } = require('bottender/test-utils');

const simulator = new ContextSimulator({
  platform: 'slack',
});

global.console.error = jest.fn();

describe('test ListRecordHandler', () => {
  test('should return page error', async () => {
    const command = 'list a';
    const ctx = simulator.createTextContext(command);
    await ListRecordHandler(ctx, command.split(' ')[1]);
    expect(ctx.sendText).toBeCalledWith('page error');
  });

  test('should return your clock in history list page 1', async () => {
    const command = 'list';
    const ctx = simulator.createTextContext(command);
    let expectStr = '';
    for (let i = 20; i > 10; i--) {
      expectStr += `\`id: ${i}\tin: 2018-04-${i} 08:00:00\tout: 2018-04-${i} 18:00:00\`\n`;
    }
    await ListRecordHandler(ctx, command.split(' ')[1]);
    expect(ctx.sendText).toBeCalledWith(
      'your clock in history list page 1\n' + expectStr
    );
  });

  test('should return your clock in history list page 1', async () => {
    const command = 'list 2';
    const ctx = simulator.createTextContext(command);
    let expectStr = '';
    for (let i = 10; i > 0; i--) {
      expectStr =
        expectStr +
        `\`id: ${i}\t` +
        `in: 2018-04-${i.toString().padStart(2, '0')} 08:00:00\t` +
        `out: 2018-04-${i.toString().padStart(2, '0')} 18:00:00\`\n`;
    }
    await ListRecordHandler(ctx, command.split(' ')[1]);
    expect(ctx.sendText).toBeCalledWith(
      'your clock in history list page 2\n' + expectStr
    );
  });

  test('should return something went wrong', async () => {
    const command = 'list';
    const ctx = simulator.createTextContext(command);
    await ListRecordHandler(ctx);
    expect(ctx.sendText).toBeCalledWith('something went wrong');
  });
});
