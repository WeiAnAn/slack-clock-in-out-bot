async function handler(context) {
  if (getChannelName(context) === 'hit-card') {
    console.log(context.event.text);
    context.postMessage({
      text: 'Hello!',
      attachments: [
        {
          text: 'Choose a game to play',
          fallback: 'You are unable to choose a game',
          callback_id: 'wopr_game',
          color: '#3AA3E3',
          attachment_type: 'default',
          actions: [
            {
              name: 'game',
              text: 'Chess',
              type: 'button',
              value: 'chess'
            }
          ]
        }
      ]
    });
  }
}

function getChannelName(context) {
  return context.session.channel.name;
}

module.exports = handler;
