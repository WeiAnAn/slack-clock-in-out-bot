async function handler(context) {
  if (getChannelName(context) === 'test') {
    const text = getText(context);
    const command = text.split(' ');
    switch (command[0]) {
      case 'in':
        return await context.sendText('you are in');
      case 'out':
        return await context.sendText('you are out');
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
