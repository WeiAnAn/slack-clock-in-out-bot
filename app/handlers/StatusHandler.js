const Record = require('../db/record');
const moment = require('moment');
const { DATE_FORMAT } = require('../const');

async function StatusHandler(ctx) {
  const message = ctx.event.message;
  const records = await Record.getStatus();
  if (records) {
    return ctx.sendText(
      `<@${message.user}> your status is \`in\` when \`${moment(
        records[0].in
      ).format(DATE_FORMAT)}\``
    );
  }
  return ctx.sendText(`<@${message.user}> your status is out`);
}

module.exports = StatusHandler;
