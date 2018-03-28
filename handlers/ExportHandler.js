const db = require('../db');
const CSV = require('comma-separated-values');
const moment = require('moment');
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const formatTime = require('../utils/formatTime');
const fs = require('fs');
const path = require('path');

async function ExportHandler(ctx) {
  const message = ctx.event.message;
  let records = await db('records')
    .where('user', message.user)
    .whereNotNull('out')
    .select('in', 'out')
    .orderBy('out', 'desc');

  let totalSec = 0;

  records = records.map(record => {
    const inTime = moment(record.in),
      outTime = moment(record.out);
    const durationAsSec = moment.duration(outTime.diff(inTime)).asSeconds();
    totalSec += durationAsSec;
    return [
      inTime.format(dateFormat),
      outTime.format(dateFormat),
      formatTime(durationAsSec),
    ];
  });

  records.push([], ['total time', [], formatTime(totalSec)]);

  const csv = new CSV(records, { header: ['in', 'out', 'time'] }).encode();
  const fileName = `${message.user}-${moment().format('YYYYMMDDHHmmss')}.csv`;

  fs.writeFile(path.resolve('./public', fileName), csv, () => {
    return ctx.sendText(
      `<@${message.user}> here is your record\n${
        process.env.HOST
      }/public/${fileName}`
    );
  });
}

module.exports = ExportHandler;
