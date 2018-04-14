const db = require('../db');
const moment = require('moment');
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

async function StatusHandler(ctx) {
  const message = ctx.event.message;
  const records = await db('records')
    .where('user', message.user)
    .whereNull('out')
    .select('in');
  if (records.length) {
    return ctx.sendText(
      `<@${message.user}> your status is \`in\` when \`${moment(
        records[0].in
      ).format(dateFormat)}\``
    );
  }
  return ctx.sendText(`<@${message.user}> your status is out`);
}

module.exports = StatusHandler;
