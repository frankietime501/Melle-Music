const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Check the bot\'s latency',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s latency'),
    async execute(client, message, args) {
        const isInteraction = !!message.options;
        const ping = client.ws.ping;
        const msgPing = isInteraction ? 0 : (Date.now() - message.createdTimestamp);
        
        const latencyText = isInteraction 
            ? `### 🏓 Pong!\n> **API Latency:** \`${ping}ms\``
            : `### 🏓 Pong!\n> **API Latency:** \`${ping}ms\`\n> **Message Latency:** \`${msgPing}ms\``;

        const container = new ContainerBuilder().addTextDisplayComponents(
            new TextDisplayBuilder().setContent(latencyText)
        );

        return message.reply({ components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 });
    }
};
