const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

const createMsg = (text) => ({
    content: null,
    embeds: [],
    components: [new ContainerBuilder().addTextDisplayComponents(new TextDisplayBuilder().setContent(text)).toJSON()],
    flags: MessageFlags.IsComponentsV2
});

module.exports = {
    name: 'replay',
    description: 'Restart the current track from the beginning',
    data: new SlashCommandBuilder()
        .setName('replay')
        .setDescription('Restart the current track from the beginning'),
    async execute(client, message, args) {
        const isInteraction = !!message.options;
        const guildId = isInteraction ? message.guildId : message.guild.id;
        const player = client.manager.players.get(guildId);
        if (!player || !player.queue.current) return message.reply(createMsg('> <:wrong:1508824698169983128> There is no music playing.'));

        const vc = message.member.voice.channel;
        if (!vc || vc.id !== player.voiceId) return message.reply(createMsg('> <:wrong:1508824698169983128> You need to be in the same voice channel as the bot.'));

        player.seek(0);
        message.reply(createMsg('> <:check:1508822770866327724> Restarted the current track.'));
    }
};
