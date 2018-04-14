const db = require('../db');
const validator = require('validator');

async function EditRecordHandler(ctx, command) {
  const message = ctx.event.message;
  const [edit, id, type, date, time] = command;
  const datetime = date + ' ' + time;
  const errorMsg = validateCommand(command);
  const revertType = type === 'in' ? 'out' : 'in';
  const compare = type === 'in' ? '>' : '<';
  let result = null;
  if (errorMsg) return ctx.sendText(generateErrorMsg(message.user, errorMsg));

  if (id === 'today') {
    if (type === 'out')
      return ctx.sendText(
        generateErrorMsg(message.user, "can't edit today out record!")
      );
    result = await db('records')
      .where({ user: message.user })
      .whereNull('out')
      .update('in', datetime);
  } else {
    result = await db('records')
      .where({ user: message.user, id: id })
      .where(revertType, compare, datetime)
      .update(type, datetime);
  }

  if (!result)
    return ctx.sendText(
      generateErrorMsg(message.user, 'record not found or datetime error')
    );
  return ctx.sendText(
    `<@${
      message.user
    }> update record \`${id}\` \`${type}\` to \`${datetime}\` success`
  );
}

function validateCommand(command) {
  if (command.length !== 5) return 'command invalid';

  const [edit, id, type, date, time] = command;
  const datetime = date + ' ' + time;
  if (!validator.isInt(id) && id !== 'today')
    return 'id must be integer or `today`';
  if (!validator.isIn(type, ['in', 'out'])) return 'type must be in or out';
  if (new Date(datetime).toString() === 'Invalid Date')
    return 'date or time format error\ndate format:`<YYYY-MM-DD>`\ntime format: `<HH:mm:SS>`';
}

function generateErrorMsg(user, msg) {
  return `<@${user}> ${msg} \n \`edit <record_id> <type(in|out)> <date(YYYY-MM-DD)> <time(HH:mm:SS)>\``;
}

module.exports = EditRecordHandler;
