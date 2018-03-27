async function ClockInHandler(ctx) {
  const message = ctx.event.message;
  const record = { in: new Date(), out: null };
  const userState = ctx.state[message.user];

  if (userState) {
    if (!userState.out) {
      return ctx.sendText('you already in!');
    }
  }
  ctx.setState({
    [message.user]: record,
  });
  return ctx.sendText('clock in successful');
}

module.exports = ClockInHandler;
