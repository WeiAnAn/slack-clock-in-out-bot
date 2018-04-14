const Record = require('../db/record');
const moment = require('moment');
const validator = require('validator');
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

async function ListRecordHandler(ctx, page = '1') {
  const message = ctx.event.message;
  const user = message.user;
  if (!validator.isInt(page))
    return ctx.sendText(`<@${message.user}> page error`);

  const records = await Record.getList(user, page);

  const recordList = records.reduce(
    (prev, record) =>
      prev +
      `\`id: ${record.id}\t` +
      `in:${moment(record.in).format(dateFormat)}\t` +
      `out: ${moment(record.out).format(dateFormat)}\`\n`,
    `<@${message.user}> your clock in history list page ${page}\n`
  );

  return ctx.sendText(recordList);
}

module.exports = ListRecordHandler;
