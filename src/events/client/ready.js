const logger = require('../../utils/logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await client.db.connect();
        logger.info(`Logged in as ${client.user.tag}!`);
        client.user.setStatus('idle');
        client.user.setActivity('!help | @Melle Music', { type: 2 });
    }
};
