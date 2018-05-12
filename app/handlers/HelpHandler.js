const formatMsg = require('../utils/formatMsg');

function HelpHandler(ctx) {
  return ctx.sendText(
    formatMsg(
      'you can use those command\n' +
        'clock in:`in`\n' +
        'clock out: `out`\n' +
        'check current status: `status`\n' +
        'list record: `list (<page>)`\n' +
        'edit record: `edit <(record_id|latest)> <type(in|out)> <date(YYYY-MM-DD)> <time(HH:mm:SS)>`\n' +
        'export all record: `export`\n' +
        'export month record: `export month <year> <month>`\n' +
        'export record in range: `export between <start date(YYYY-MM-DD)> <end date(YYYY-MM-DD)>`',
      ctx.event.message.user
    )
  );
}

module.exports = HelpHandler;
