require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const FeatherClient = require('./structures/Client');
const logger = require('./utils/logger');

const client = new FeatherClient();

client.start().catch(err => {
    logger.error(`Failed to start the bot: ${err.stack}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`### 🚨 Unhandled Rejection at: ${promise}\nReason: ${reason?.stack || reason}`);
});

process.on('uncaughtException', (err) => {
    logger.error(`### 💀 Uncaught Exception: ${err.stack || err}`);
});
