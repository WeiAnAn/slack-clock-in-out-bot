async function ClockOutHandler(ctx) {
  const message = ctx.event.message;
  const userState = ctx.state[message.user];
  if (userState && !userState.out) {
    const record = { ...userState, out: new Date() };
    ctx.setState({
      [message.user]: record,
    });
    return ctx.sendText(`out success, record: ${JSON.stringify(record)}`);
  }
  return ctx.sendText("you didn't in");
}

module.exports = ClockOutHandler;
