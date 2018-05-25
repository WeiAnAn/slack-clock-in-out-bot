const validator = require('validator');
const moment = require('moment');

function validateCommand({ id, type, date, time }) {
  if (!id || !type || !date || !time)
    throw 'command invalid';

  //validate id
  if (!validator.isInt(id) && id !== 'latest')
    throw 'id must be integer or `latest`';

  //validate today type cannot be out
  // if (id === 'today' && type === 'out') throw "can't edit today out record!";

  //validate type
  if (!validator.isIn(type, ['in', 'out']))
    throw 'type must be in or out';

  //validate date
  if (date === 'today' || date === 'yesterday')
    return;
  if (!moment(date, 'Y-M-D').isValid())
    throw 'invalid date format, must be `<YYYY-MM-DD>`';

  //validate time
  if (!moment(time, 'h:m:s').isValid())
    throw 'invalid time format, must be `<hh:mm:ss>`'
}

module.exports = validateCommand;