const Record = require('../db/record');
const moment = require('moment');
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

async function StatusHandler(ctx) {
  const message = ctx.event.message;
  const records = await Record.getStatus();
  if (records) {
    return ctx.sendText(
      `<@${message.user}> your status is \`in\` when \`${moment(
        records[0].in
      ).format(dateFormat)}\``
    );
  }
  return ctx.sendText(`<@${message.user}> your status is out`);
}

module.exports = StatusHandler;
