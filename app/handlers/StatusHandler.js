const Record = require('../db/record');
const moment = require('moment');
const { DATE_FORMAT } = require('../const');
const formatMsg = require('../utils/formatMsg');
const formatTime = require('../utils/formatTime');

async function StatusHandler(ctx) {
  const message = ctx.event.message;
  const user = message.user;
  let record;
  try {
    record = await Record.getStatus(user);
  } catch (e) {
    console.error(e);
    return ctx.sendText(formatMsg('something went wrong', user));
  }
  if (record) {
    const inTime = moment(record.in);
    const now = moment();
    const durationAsSec = moment.duration(now.diff(inTime)).asSeconds();
    const duration = formatTime(durationAsSec);
    return ctx.sendText(
      formatMsg(
        'your status is `in`\n' +
          `starting at: \`${inTime.format(DATE_FORMAT)}\`\n` +
          `duration: \`${duration}\``,
        user
      )
    );
  }
  return ctx.sendText(formatMsg('your status is `out`', user));
}

module.exports = StatusHandler;
