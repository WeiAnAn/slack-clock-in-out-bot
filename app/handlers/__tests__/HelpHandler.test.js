jest.mock('../../utils/formatMsg');
const HelpHandler = require('../HelpHandler.js');
const { ContextSimulator } = require('bottender/test-utils');

const simulator = new ContextSimulator({
  platform: 'slack',
});

describe('test help handler', () => {
  test('should return help information', async () => {
    const ctx = simulator.createTextContext('help');
    await HelpHandler(ctx);
    expect(ctx.sendText).toBeCalledWith(
      'you can use those command\n' +
        'clock in:`in`\n' +
        'clock out: `out`\n' +
        'check current status: `status`\n' +
        'list record: `list (<page>)`\n' +
        'edit record: `edit <(record_id|latest)> <type(in|out)> <date(YYYY-MM-DD)> <time(HH:mm:SS)>`\n' +
        'export all record: `export`\n' +
        'export month record: `export month <year> <month>`\n' +
        'export record in range: `export between <start date(YYYY-MM-DD)> <end date(YYYY-MM-DD)>`'
    );
  });
});
