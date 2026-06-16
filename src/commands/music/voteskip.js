const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
    name: 'voteskip',
    description: 'Vote to skip the current song',
    data: new SlashCommandBuilder()
        .setName('voteskip')
        .setDescription('Vote to skip the current song'),
    async execute(client, message, args) {
        const isInteraction = !!message.options;
        const guildId = isInteraction ? message.guildId : message.guild.id;
        const user = isInteraction ? message.user : message.author;
        const player = client.manager.players.get(guildId);
        const createErr = (text) => ({
            components: [new ContainerBuilder().addTextDisplayComponents(new TextDisplayBuilder().setContent(`> <:wrong:1508824698169983128> ${text}`)).toJSON()],
            flags: MessageFlags.IsComponentsV2
        });

        if (!player) return message.reply(createErr('No music playing.'));

        const vc = message.member.voice.channel;
        if (!vc || vc.id !== player.voiceId) return message.reply(createErr('Join the bot\'s VC first.'));

        const members = vc.members.filter(m => !m.user.bot).size;
        const required = Math.ceil(members / 2);

        let votes = player.data.votes || [];
        if (votes.includes(user.id)) return message.reply(createErr('Already voted!'));

        votes.push(user.id);
        player.data.votes = votes;

        if (votes.length >= required) {
            player.skip();
            player.data.votes = [];
            const container = new ContainerBuilder().addTextDisplayComponents(new TextDisplayBuilder().setContent(`> <:check:1508822770866327724> Skip vote passed! Skipping song...`));
            return message.reply({ components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 });
        } else {
            const container = new ContainerBuilder().addTextDisplayComponents(new TextDisplayBuilder().setContent(`> <a:Thunder:1508839561726267523> Vote added: \`${votes.length}/${required}\``));
            return message.reply({ components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 });
        }
    }
};
