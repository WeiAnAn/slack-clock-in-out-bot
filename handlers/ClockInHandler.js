const db = require('../db');

async function ClockInHandler(ctx) {
  const message = ctx.event.message;
  const userState = ctx.state[message.user];

  const record = await db('records')
    .where({
      user: message.user,
    })
    .whereNull('out');

  if (record.length) {
    return ctx.sendText('you already in!');
  }

  const result = await db('records').insert({
    user: message.user,
    in: new Date(),
  });

  if (result[0]) return ctx.sendText('clock in successful');
  return ctx.sendText('something went wrong');
}

module.exports = ClockInHandler;
