const { SlashCommandBuilder, ContainerBuilder, SectionBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
    name: 'leave',
    aliases: ['dc', 'disconnect'],
    description: 'Leave the voice channel',
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave the voice channel'),
    async execute(client, message, args) {
        const isInteraction = !!message.options;
        const guildId = isInteraction ? message.guildId : message.guild.id;
        const player = client.manager.players.get(guildId);
        const createResponse = (text, isError = false) => {
            const container = new ContainerBuilder().addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`${isError ? '> <:wrong:1508824698169983128> > ' : '> <:check:1508822770866327724> '}${text}`)
            );
            return { components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 };
        };

        if (!player) return message.reply(createResponse('<:blacklist:1508822704726216754> I am not in a voice channel.', true));

        player.data.manualDisconnect = true;
        player.destroy();
        message.reply(createResponse('Left the voice channel.'));
    }
};
