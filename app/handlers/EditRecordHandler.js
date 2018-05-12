const validator = require('validator');
const Record = require('../db/record');
const formatMsg = require('../utils/formatMsg');

async function EditRecordHandler(ctx, command) {
  const message = ctx.event.message;
  const user = message.user;
  const [, id, type, date, time] = command;
  const datetime = date + ' ' + time;
  try {
    validateCommand(command);
  } catch (errorMsg) {
    const msg = generateErrorMsg(errorMsg);
    return ctx.sendText(formatMsg(msg, user));
  }

  try {
    let result = null;

    if (id === 'latest') {
      if (type === 'in') result = await Record.updateLatestIn(user, datetime);
      else result = await Record.updateLatestOut(user, datetime);
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
  } catch (e) {
    console.error(e);
  }
  return ctx.sendText(formatMsg('something went wrong', user));
}

function validateCommand(command) {
  //command length should be 5
  if (command.length !== 5) throw 'command invalid';

  const [, id, type, date, time] = command;
  const datetime = date + ' ' + time;

  //validate id
  if (!validator.isInt(id) && id !== 'latest')
    throw 'id must be integer or `latest`';

  //validate today type cannot be out
  // if (id === 'today' && type === 'out') throw "can't edit today out record!";

  //validate type
  if (!validator.isIn(type, ['in', 'out'])) throw 'type must be in or out';

  //validate datetime
  if (new Date(datetime).toString() === 'Invalid Date')
    throw 'date or time format error\ndate format:`<YYYY-MM-DD>`\ntime format: `<HH:mm:SS>`';
}

function generateErrorMsg(msg) {
  return `${msg}\n\`edit <record_id|(today)> <type(in|out)> <date(YYYY-MM-DD)> <time(HH:mm:SS)>\``;
}

module.exports = EditRecordHandler;
