const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
    name: 'uptime',
    description: 'Check how long the bot has been online',
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Check how long the bot has been online'),
    async execute(client, message, args) {
        const startTime = Math.floor((Date.now() - client.uptime) / 1000);

        const container = new ContainerBuilder().addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`### <a:heart:1508841650108104855> Uptime\n> Melle has been online since <t:${startTime}:R>`)
        );

        return message.reply({ components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 });
    }
};
