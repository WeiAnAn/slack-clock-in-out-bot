const Record = require('../db/record');
const CSV = require('comma-separated-values');
const moment = require('moment');
const formatTime = require('../utils/formatTime');
const fs = require('fs');
const path = require('path');
const { DATE_FORMAT } = require('../const');
const formatMsg = require('../utils/formatMsg');

async function ExportHandler(ctx, command) {
  const message = ctx.event.message;
  const user = message.user;

  try {
    validateCommand(command);
  } catch (errMsg) {
    const msg = generateErrorMsg(errMsg);
    return ctx.sendText(formatMsg(msg, user));
  }

  const type = command[1];
  let records = null;

  try {
    if (type === 'month') {
      const year = command[2];
      const month = command[3];
      const dateStr = year + '-' + convertToMonthStr(month);
      let startDate = moment(dateStr).format(DATE_FORMAT);
      let endDate = moment(dateStr)
        .add(1, 'month')
        .format(DATE_FORMAT);
      records = await Record.findByDateRange(user, startDate, endDate);
    } else if (type === 'between') {
      let startDate = moment(command[2]).format(DATE_FORMAT);
      let endDate = moment(command[3])
        .add(1, 'days')
        .format(DATE_FORMAT);
      records = await Record.findByDateRange(user, startDate, endDate);
    } else {
      records = await Record.findAll(user);
    }
  } catch (e) {
    console.error(e);
    return ctx.sendText(formatMsg('something went wrong', user));
  }

  if (!records.length) {
    return ctx.sendText(
      formatMsg("you didn't have record in this range", user)
    );
  }

  const serializedRecords = serializeRecord(records);
  const username = ctx.session.user.profile.display_name;

  let fileName;
  try {
    fileName = await generateCSV(serializedRecords, username);
  } catch (e) {
    console.error(e);
    return ctx.sendText(formatMsg('something wrong', username));
  }

  return ctx.sendText(
    formatMsg(
      `here is your record\n${process.env.HOST}/public/${fileName}`,
      user
    )
  );
}

function validateCommand(command) {
  if (command.length === 1) return;
  const type = command[1];

  if (type === 'month') {
    const year = command[2];
    const month = command[3];
    if (year.length !== 4) {
      throw 'year invalid';
    }
    if (Number(month) < 1 || Number(month) > 12) throw 'month invalid';
  } else if (type === 'between') {
    const dateStart = command[2];
    const dateEnd = command[3];
    if (
      new Date(dateStart).toString() === 'Invalid Date' ||
      new Date(dateEnd).toString() === 'Invalid Date'
    )
      throw 'date invalid';
  } else throw 'command invalid';
}

function generateErrorMsg(msg) {
  return (
    `${msg}\n` +
    'export all: `export`' +
    'export month record: `export month <year> <month>`' +
    'export record in range: `export between <start date(YYYY-MM-DD)> <end date(YYYY-MM-DD)>`'
  );
}

function convertToMonthStr(month) {
  if (month.length === 2) return month;
  return '0' + month;
}

async function generateCSV(records, username) {
  const csv = new CSV(records, { header: ['in', 'out', 'time'] }).encode();
  const fileName = `${username}-${moment().format('YYYYMMDDHHmmss')}.csv`;
  const filePath = path.resolve('./public', fileName);
  const filePromise = new Promise((resolve, reject) => {
    fs.writeFile(filePath, csv, err => {
      if (err) reject(err);
      resolve(fileName);
    });
  });
  return filePromise;
}

function serializeRecord(records) {
  let totalSec = 0;
  let serializedRecords = records.map(record => {
    const inTime = moment(record.in);
    const outTime = moment(record.out);
    const durationAsSec = moment.duration(outTime.diff(inTime)).asSeconds();
    totalSec += durationAsSec;
    return [
      inTime.format(DATE_FORMAT),
      outTime.format(DATE_FORMAT),
      formatTime(durationAsSec),
    ];
  });
  serializedRecords.push([], ['total time', [], formatTime(totalSec)]);
  return serializedRecords;
}

module.exports = ExportHandler;
