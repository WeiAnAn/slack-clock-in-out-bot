function HelpHandler(ctx) {
  return ctx.sendText(`you can use those command
clock in: \`in\`
clock out: \`out\`
check current status: \`status\`
list record: \`list (<page>)\`
export record to csv: \`export\`
edit record: \`edit <(record_id|today)> <type(in|out)> <date(YYYY-MM-DD)> <time(HH:mm:SS)>\`
`);
}

module.exports = HelpHandler;
