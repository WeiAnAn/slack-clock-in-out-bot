const db = require('../db');
const moment = require('moment');
const formatTime = require('../utils/formatTime');
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

async function ClockOutHandler(ctx) {
  const message = ctx.event.message;
  const result = await db('records')
    .where({ user: message.user })
    .whereNull('out')
    .update({ out: new Date() });

  if (result) {
    const record = await db('records')
      .where({ user: message.user })
      .orderBy('out', 'desc')
      .first('in', 'out');

    const inTime = moment(record.in);
    const outTime = moment(record.out);
    const durationTime = moment.duration(outTime.diff(inTime)).asSeconds();

    return ctx.sendText(
      `out success
record: \`${inTime.format(dateFormat)}\` ~ \`${outTime.format(dateFormat)}\`
total time: \`${formatTime(durationTime)}\``
    );
  }
  return ctx.sendText("you didn't in");
}

module.exports = ClockOutHandler;
