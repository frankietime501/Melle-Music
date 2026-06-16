const { SlashCommandBuilder, ContainerBuilder, SectionBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
    name: 'join',
    description: 'Join your voice channel',
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join your voice channel'),
    async execute(client, message, args) {
        const isInteraction = !!message.options;
        const member = message.member;
        const vc = member.voice.channel;

        const createResponse = (text, isError = false) => {
            const container = new ContainerBuilder().addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`${isError ? '> <:wrong:1508824698169983128> ' : '> <:check:1508822770866327724> '}${text}`)
            );
            return { content: null, embeds: [], components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 };
        };

        if (!vc) return message.reply(createResponse('You need to be in a voice channel.', true));

        let player = client.manager.players.get(message.guild.id);
        if (player) return message.reply(createResponse('I am already in a voice channel.', true));

        player = await client.manager.createPlayer({
            guildId: message.guild.id,
            voiceId: vc.id,
            textId: message.channel.id,
            deaf: true
        });

        message.reply(createResponse(`Joined **${vc.name}**.`));
    }

};
