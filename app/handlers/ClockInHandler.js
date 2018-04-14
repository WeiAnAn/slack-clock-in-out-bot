const Record = require('../db/record');
const formatMsg = require('../utils/formatMsg');

async function ClockInHandler(ctx) {
  const message = ctx.event.message;
  const user = message.user;

  const status = await Record.getStatus(user);

  if (status) {
    return ctx.sendText(formatMsg('you already in!', user));
  }

  const id = await Record.clockIn(user);

  if (id[0]) return ctx.sendText(formatMsg('clock in successful', user));
  return ctx.sendText(formatMsg('something went wrong', user));
}

module.exports = ClockInHandler;
