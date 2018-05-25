const validator = require("validator");
const moment = require("moment");
const Record = require("../db/record");
const formatMsg = require("../utils/formatMsg");
const validateCommand = require("../utils/commandValidator");
const transformDatetime = require('../utils/transformDatetime');

async function EditRecordHandler(ctx, command) {
  const message = ctx.event.message;
  const user = message.user;
  const [, id, type, date, time] = command;
  try {
    validateCommand({ id, type, date, time });
  } catch (errorMsg) {
    const msg = generateErrorMsg(errorMsg);
    return ctx.sendText(formatMsg(msg, user));
  }

  try {
    const datetime = transformDatetime(date, time);
    let result = null;

    if (id === "latest") {
      result =
        type === "in"
          ? (result = await Record.updateLatestIn(user, datetime))
          : (result = await Record.updateLatestOut(user, datetime));
    } else {
      result = await Record.update(id, user, type, datetime);
    }

    if (!result) {
      const msg = generateErrorMsg("record not found or datetime error");
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
  return ctx.sendText(formatMsg("something went wrong", user));
}

function generateErrorMsg(msg) {
  return `${msg}\n\`edit <record_id|(today)> <type(in|out)> <date(YYYY-MM-DD)> <time(HH:mm:SS)>\``;
}

module.exports = EditRecordHandler;
