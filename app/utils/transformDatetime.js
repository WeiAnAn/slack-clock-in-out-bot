const moment = require('moment');

function transformDatetime(date, time) {
  let newDate;
  switch(date) {
    case 'today':
      newDate = moment().format("YYYY-MM-DD");
      break;
    case 'yesterday':
      newDate = moment().subtract(1, 'd').format('YYYY-MM-DD');
      break;
    default:
      newDate = date;
  }
  return `${newDate} ${time}`;
}

module.exports = transformDatetime;