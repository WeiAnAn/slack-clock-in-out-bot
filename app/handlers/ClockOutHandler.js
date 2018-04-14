const moment = require('moment');
const formatTime = require('../utils/formatTime');
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const Record = require('../db/record');

async function ClockOutHandler(ctx) {
  const message = ctx.event.message;
  const user = message.user;
  const result = await Record.clockOut(user);

  if (result) {
    const record = await Record.findLatest(user);

    const inTime = moment(record.in);
    const outTime = moment(record.out);
    const durationTime = moment.duration(outTime.diff(inTime)).asSeconds();

    return ctx.sendText(
      `<@${message.user}>out success
record: \`${inTime.format(dateFormat)}\` ~ \`${outTime.format(dateFormat)}\`
total time: \`${formatTime(durationTime)}\``
    );
  }
  return ctx.sendText(`<@${message.user}>you didn't in`);
}

module.exports = ClockOutHandler;
