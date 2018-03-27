const ClockInHandler = require('./ClockInHandler');
const ClockOutHandler = require('./ClockOutHandler');

async function handler(context) {
  if (getChannelName(context) === 'test') {
    const text = getText(context);
    const command = text.split(' ');
    switch (command[0]) {
      case 'in':
        return await ClockInHandler(context);
      case 'out':
        return await ClockOutHandler(context);
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
