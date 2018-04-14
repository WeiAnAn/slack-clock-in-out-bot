const validator = require('validator');
const Record = require('../db/record');
const formatMsg = require('../utils/formatMsg');

async function EditRecordHandler(ctx, command) {
  const message = ctx.event.message;
  const user = message.user;
  const [, id, type, date, time] = command;
  const datetime = date + ' ' + time;
  const errorMsg = validateCommand(command);

  let result = null;
  if (errorMsg) {
    const msg = generateErrorMsg(errorMsg);
    return ctx.sendText(formatMsg(user, msg));
  }

  if (id === 'today') {
    if (type === 'out') {
      const msg = generateErrorMsg("can't edit today out record!");
      return ctx.sendText(formatMsg(msg, user));
    }
    result = await Record.updateToday(user, datetime);
  } else {
    result = await Record.update(id, user, type, datetime);
  }

  if (!result) {
    const msg = generateErrorMsg('record not found or datetime error');
    return ctx.sendText(formatMsg(msg, user));
  }
  return ctx.sendText(
    formatMsg(
      `update record \`${id}\` \`${type}\` to \`${datetime}\` success`,
      user
    )
  );
}

function validateCommand(command) {
  if (command.length !== 5) return 'command invalid';

  const [, id, type, date, time] = command;
  const datetime = date + ' ' + time;
  if (!validator.isInt(id) && id !== 'today')
    return 'id must be integer or `today`';
  if (!validator.isIn(type, ['in', 'out'])) return 'type must be in or out';
  if (new Date(datetime).toString() === 'Invalid Date')
    return 'date or time format error\ndate format:`<YYYY-MM-DD>`\ntime format: `<HH:mm:SS>`';
}

function generateErrorMsg(msg) {
  return `${msg} \n \`edit <record_id|(today)> <type(in|out)> <date(YYYY-MM-DD)> <time(HH:mm:SS)>\``;
}

module.exports = EditRecordHandler;
