function HelpHandler(ctx) {
  return ctx.sendText(`you can use those command
clock in: \`in\`
clock out: \`out\`
check current status: \`status\`
list record: \`list (<page>)\`
edit record: \`edit <(record_id|today)> <type(in|out)> <date(YYYY-MM-DD)> <time(HH:mm:SS)>\`
export all record: \`export\`
export month record: \`export month <year> <month>\`
export record in range: \`export between <start date(YYYY-MM-DD)> <end date(YYYY-MM-DD)>\`
`);
}

module.exports = HelpHandler;
