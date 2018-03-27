require('dotenv').config();
const { SlackBot } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config.js').slack;
const handler = require('./handler');

const bot = new SlackBot({
  accessToken: config.accessToken,
  verificationToken: config.verificationToken,
});

bot.onEvent(handler);

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
