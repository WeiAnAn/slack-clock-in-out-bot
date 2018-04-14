const Record = require('../db/record');

async function ClockInHandler(ctx) {
  const message = ctx.event.message;
  const user = message.user;

  const status = await Record.getStatus(user);

  if (record.length) {
    return ctx.sendText(`<@${user}>you already in!`);
  }

  const id = await clockIn(user);

  if (id[0]) return ctx.sendText(`<@${user}>clock in successful`);
  return ctx.sendText('something went wrong');
}

module.exports = ClockInHandler;
