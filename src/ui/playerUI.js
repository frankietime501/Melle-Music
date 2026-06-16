const {
    ContainerBuilder,
    TextDisplayBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MessageFlags,
    ActionRowBuilder,
    SectionBuilder,
    ThumbnailBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');
const { formatTime } = require('../utils/formatters');
const metadata = require('../utils/metadata');

module.exports = {
    createPlayerEmbed: (player) => {
        try {
            const track = player.queue.current;
            if (!track) return null;

            const total = track.length || 0;
            const title = metadata.cleanTitle(track.title);
            const shortTitle = metadata.truncate(title, 40);
            const author = metadata.cleanAuthor(track.author);
            const thumb = metadata.getHighResThumbnail(track.thumbnail);
            const requester = track.requester || { displayName: 'System', username: 'System', id: '0' };

            const paused = !player.playing;

            const container = new ContainerBuilder()
                .addSectionComponents(
                    new SectionBuilder()
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent(`## <a:vinyl:1508840610247868616> Now playing - ${shortTitle}`),
                            new TextDisplayBuilder().setContent(
                                `> - **Artist:** \`${author}\`\n` +
                                `> - **Duration:** \`${formatTime(total)}\`\n` +
                                `> - **Requester:** [${requester.displayName || requester.username}](https://discord.com/users/${requester.id})`
                            )
                        )
                        .setThumbnailAccessory(new ThumbnailBuilder().setURL(thumb))
                )
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
                .addActionRowComponents(
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('previous').setEmoji('<:backward:1508821467557531811>').setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setCustomId('play_pause').setEmoji(paused ? '<:play:1508823431146115163>' : '<:pause:1508823803944501388>').setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setCustomId('stop').setEmoji('<:stop:1508824557048299652>').setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setCustomId('skip').setEmoji('<:forward:1508822988647301150>').setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setCustomId('loop').setEmoji('<:update:1508822601722499142>').setStyle(ButtonStyle.Secondary)
                    )
                );

            return {
                content: null,
                embeds: [],
                components: [container.toJSON()],
                flags: MessageFlags.IsComponentsV2
            };
        } catch (error) {
            console.error('Error in createPlayerEmbed:', error);
            return null;
        }
    }
};
