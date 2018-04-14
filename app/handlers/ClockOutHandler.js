const moment = require('moment');
const formatTime = require('../utils/formatTime');
const Record = require('../db/record');
const { DATE_FORMAT } = require('../const');
const formatMsg = require('../utils/formatMsg');

async function ClockOutHandler(ctx) {
  const message = ctx.event.message;
  const user = message.user;
  const result = await Record.clockOut(user);

  if (result) {
    const record = await Record.findLatest(user);

    const inTime = moment(record.in);
    const outTime = moment(record.out);
    const durationTime = moment.duration(outTime.diff(inTime)).asSeconds();
    const msg =
      'out success\n' +
      'record:' +
      `\`${inTime.format(DATE_FORMAT)}\` ~ \`${outTime.format(DATE_FORMAT)}\`` +
      `total time: \`${formatTime(durationTime)}\``;
    return ctx.sendText(formatMsg(msg, user));
  }
  return ctx.sendText(formatMsg("you didn't in", user));
}

module.exports = ClockOutHandler;
