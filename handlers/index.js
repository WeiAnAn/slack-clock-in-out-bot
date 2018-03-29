const ClockInHandler = require('./ClockInHandler');
const ClockOutHandler = require('./ClockOutHandler');
const ListRecordHandler = require('./ListRecordHandler');
const EditRecordHandler = require('./EditRecordHandler');
const StatusHandler = require('./StatusHandler');
const ExportHandler = require('./ExportHandler');

async function handler(context) {
  if (getChannelName(context) === process.env.CHANNEL) {
    const text = getText(context);
    const command = text.split(' ');
    switch (command[0]) {
      case 'in':
        return await ClockInHandler(context);
      case 'out':
        return await ClockOutHandler(context);
      case 'list':
        return await ListRecordHandler(context, command[1]);
      case 'edit':
        return await EditRecordHandler(context, command);
      case 'status':
        return await StatusHandler(context);
      case 'export':
        return await ExportHandler(context);
    }
  }
}

function getChannelName(context) {
  return context.session.channel.name;
}

function getText(context) {
  return context.event.text;
}

module.exports = handler;
