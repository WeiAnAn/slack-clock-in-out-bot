const moment = require('moment');
const formatTime = require('../utils/formatTime');
const Record = require('../db/record');
const { DATE_FORMAT } = require('../const');
const formatMsg = require('../utils/formatMsg');

async function ClockOutHandler(ctx) {
  const message = ctx.event.message;
  const user = message.user;
  try {
    const result = await Record.clockOut(user);
    if (!result) return ctx.sendText(formatMsg("you didn't in", user));

    const record = await Record.findLatest(user);

    const inTime = moment(record.in);
    const outTime = moment(record.out);
    const durationTime = moment.duration(outTime.diff(inTime)).asSeconds();
    const msg =
      'out success\n' +
      'record: ' +
      `\`${inTime.format(DATE_FORMAT)}\` ~ ` +
      `\`${outTime.format(DATE_FORMAT)}\`\n` +
      `total time: \`${formatTime(durationTime)}\``;

    return ctx.sendText(formatMsg(msg, user));
  } catch (e) {
    console.error(e);
  }
  return ctx.sendText(formatMsg('something went wrong', user));
}

module.exports = ClockOutHandler;
