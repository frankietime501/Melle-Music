const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Get the invite link for Melle',
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Get the invite link for Melle'),
    async execute(client, message, args) {
        const invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;
        
        const container = new ContainerBuilder().addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`###  Invite Melle\n> Add me to your server to enjoy high-quality music!`)
        ).addActionRowComponents(
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel('Invite Now')
                    .setURL(invite)
                    .setStyle(ButtonStyle.Link)
            )
        );

        return message.reply({ components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 });
    }
};
