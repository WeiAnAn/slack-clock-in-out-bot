const Record = require('../db/record');
const CSV = require('comma-separated-values');
const moment = require('moment');
const formatTime = require('../utils/formatTime');
const fs = require('fs');
const path = require('path');
const { DATE_FORMAT } = require('../const');

async function ExportHandler(ctx, command) {
  const message = ctx.event.message;
  const user = message.user;
  const errMsg = validateCommand(command);
  if (errMsg) {
    return ctx.sendText(generateErrorMsg(message.user, errMsg));
  }
  const type = command[1];
  let records = null;
  if (type === 'month') {
    const year = command[2];
    const month = command[3];
    const dateStr = year + '-' + convertToMonthStr(month);
    let startDate = moment(dateStr);
    let endDate = moment(dateStr).add(1, 'month');
    records = await Record.findByDateRange(user, startDate, endDate);
  } else if (type === 'between') {
    let startDate = moment(command[2]);
    let endDate = moment(command[3]).add(1, 'days');
    records = await Record.findByDateRange(user, startDate, endDate);
  } else {
    records = await Record.findAll(user);
  }
  let totalSec = 0;

  records = records.map(record => {
    const inTime = moment(record.in),
      outTime = moment(record.out);
    const durationAsSec = moment.duration(outTime.diff(inTime)).asSeconds();
    totalSec += durationAsSec;
    return [
      inTime.format(DATE_FORMAT),
      outTime.format(DATE_FORMAT),
      formatTime(durationAsSec),
    ];
  });

  if (records.length === 0) {
    return ctx.sendText("you didn't have record in this range");
  }

  records.push([], ['total time', [], formatTime(totalSec)]);

  const csv = new CSV(records, { header: ['in', 'out', 'time'] }).encode();
  const fileName = `${ctx.session.user.profile.display_name}-${moment().format(
    'YYYYMMDDHHmmss'
  )}.csv`;

  fs.writeFile(path.resolve('./public', fileName), csv, () => {
    return ctx.sendText(
      `<@${message.user}> here is your record\n${
        process.env.HOST
      }/public/${fileName}`
    );
  });
}

function validateCommand(command) {
  if (command.length === 1) return;
  const type = command[1];

  if (type === 'month') {
    const year = command[2];
    const month = command[3];
    if (year.length !== 4) {
      return 'year invalid';
    }
    if (Number(month) < 1 || Number(month) > 12) return 'month invalid';
  } else if (type === 'between') {
    const dateStart = command[2];
    const dateEnd = command[3];
    if (
      new Date(dateStart).toString() === 'Invalid Date' ||
      new Date(dateEnd).toString() === 'Invalid Date'
    )
      return 'date invalid';
  } else return 'command invalid';
}

function generateErrorMsg(user, msg) {
  return (
    `<@${user}> ${msg} \n` +
    'export all: `export`' +
    'export month record: `export month <year> <month>`' +
    'export record in range: `export between <start date(YYYY-MM-DD)> <end date(YYYY-MM-DD)>`'
  );
}

function convertToMonthStr(month) {
  if (month.length === 2) return month;
  return '0' + month;
}

module.exports = ExportHandler;
