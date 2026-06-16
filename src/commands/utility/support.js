const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');

module.exports = {
    name: 'support',
    description: 'Get the link to the support server',
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Get the link to the support server'),
    async execute(client, message, args) {
        const support = `https://discord.gg/q8a22q2y3U`;
        
        const container = new ContainerBuilder().addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`### <:navigation:1508823185716678727> Support Server\n> Need help or have suggestions? Join our community!`)
        ).addActionRowComponents(
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel('Join Support')
                    .setURL(support)
                    .setStyle(ButtonStyle.Link)
            )
        );

        return message.reply({ components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 });
    }
};
