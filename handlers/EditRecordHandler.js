const db = require('../db');
const validator = require('validator');

async function EditRecordHandler(ctx, command) {
  const message = ctx.event.message;
  const [edit, id, type, date, time] = command;
  const datetime = date + ' ' + time;
  const errorMsg = validateCommand(command);
  const revertType = type === 'in' ? 'out' : 'in';
  const compare = type === 'in' ? '>' : '<';
  if (errorMsg) return ctx.sendText(generateErrorMsg(message.user, errorMsg));

  const result = await db('records')
    .where({ user: message.user, id: id })
    .where(revertType, compare, datetime)
    .update(type, datetime);

  if (!result)
    return ctx.sendText(
      generateErrorMsg(message.user, 'record not found or datetime error')
    );
  return ctx.sendText(`<@${message.user}> update record ${id} success`);
}

function validateCommand(command) {
  if (command.length !== 5) return 'command invalid';

  const [edit, id, type, date, time] = command;
  const datetime = date + ' ' + time;
  if (!validator.isInt(id)) return 'id must be integer';
  if (!validator.isIn(type, ['in', 'out'])) return 'type must be in or out';
  if (new Date(datetime).toString() === 'Invalid Date')
    return 'date or time format error\ndate format:`<YYYY-MM-DD>`\ntime format: `<HH:mm:SS>`';
}

function generateErrorMsg(user, msg) {
  return `<@${user}> ${msg} \n \`edit <record_id> <type(in|out)> <date(YYYY-MM-DD)> <time(HH:mm:SS)>\``;
}

module.exports = EditRecordHandler;
