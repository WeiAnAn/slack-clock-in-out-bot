require('dotenv').config();
const { SlackBot, MemorySessionStore } = require('bottender');
const { createServer } = require('bottender/express');
const express = require('express');

const config = require('./bottender.config.js').slack;
const handler = require('./handlers');

const bot = new SlackBot({
  accessToken: config.accessToken,
  verificationToken: config.verificationToken,
  sessionStore: new MemorySessionStore(),
});

bot.onEvent(handler);

const server = createServer(bot);

server.use('/public', express.static('public'));

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
