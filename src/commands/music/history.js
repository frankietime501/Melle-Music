const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');
const User = require('../../database/models/user');

module.exports = {
    name: 'history',
    aliases: ['hist'],
    description: 'Show your recently played songs',
    data: new SlashCommandBuilder()
        .setName('history')
        .setDescription('Show your recently played songs'),
    async execute(client, message, args) {
        const isInteraction = !!message.options;
        const user = isInteraction ? message.user : message.author;
        const userData = await User.findOne({ userId: user.id });

        if (!userData || !userData.history || userData.history.length === 0) {
            const errContainer = new ContainerBuilder().addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`> <:wrong:1508824698169983128> No history found.`)
            );
            return message.reply({ components: [errContainer.toJSON()], flags: MessageFlags.IsComponentsV2 });
        }

        let historyText = `### <:lyrics:1508823596082921604> Your History\n`;
        userData.history.reverse().slice(0, 10).forEach((t, i) => {
            historyText += `> \`${i + 1}.\` [${t.title.substring(0, 40)}](${t.uri}) · \`${t.author}\`\n`;
        });

        const container = new ContainerBuilder().addTextDisplayComponents(
            new TextDisplayBuilder().setContent(historyText)
        );

        return message.reply({ components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 });
    }
};
