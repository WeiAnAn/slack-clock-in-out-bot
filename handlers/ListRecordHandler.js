const db = require('../db');
const moment = require('moment');
const validator = require('validator');
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

async function ListRecordHandler(ctx, page = '1') {
  const message = ctx.event.message;
  if (!validator.isInt(page))
    return ctx.sendText(`<@${message.user}> page error`);

  const records = await db('records')
    .select('id', 'in', 'out')
    .where({ user: message.user })
    .whereNotNull('out')
    .orderBy('out', 'desc')
    .limit(10)
    .offset((page - 1) * 10);

  const response = records.reduce(
    (prev, record) =>
      prev +
      `\`id: ${record.id}\tin:${moment(record.in).format(
        dateFormat
      )}\tout: ${moment(record.out).format(dateFormat)}\`\n`,
    `<@${message.user}> your clock in history list page ${page}\n`
  );

  return ctx.sendText(response);
}

module.exports = ListRecordHandler;
