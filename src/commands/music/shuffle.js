const { SlashCommandBuilder, ContainerBuilder, SectionBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    description: 'Shuffle the current queue',
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the current queue'),
    async execute(client, message, args) {
        try {
            const isInteraction = !!message.options;
            const guildId = isInteraction ? message.guildId : message.guild.id;
            const member = message.member;

            const player = client.manager.players.get(guildId);

            const createResponse = (text, isError = false) => {
                const container = new ContainerBuilder().addSectionComponents(
                    new SectionBuilder().addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`${isError ? '> <:wrong:1508824698169983128> ' : '> <:shuffle:1508824057418613009> '}${text}`)
                    )
                );
                return { components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 };
            };

            if (!player) {
                const res = createResponse('<:blacklist:1508822704726216754> There is no music playing.', true);
                return isInteraction ? message.reply(res) : message.reply(res);
            }

            const vc = member.voice.channel;
            if (!vc || vc.id !== player.voiceId) {
                const res = createResponse('<:blacklist:1508822704726216754> You need to be in the same voice channel as the bot.', true);
                return isInteraction ? message.reply(res) : message.reply(res);
            }

            if (!player.queue.length) {
                const res = createResponse('<:blacklist:1508822704726216754> The queue is empty.', true);
                return isInteraction ? message.reply(res) : message.reply(res);
            }

            player.queue.shuffle();
            const res = createResponse('Shuffled the queue.');
            return isInteraction ? message.reply(res) : message.reply(res);
        } catch (err) {
            client.logger.error(`Shuffle Command Error: ${err.stack}`);
        }
    }
};
