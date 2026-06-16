const { ContainerBuilder, TextDisplayBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, SectionBuilder, ThumbnailBuilder, SeparatorBuilder, SeparatorSpacingSize, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    mentionHelp: async (client) => {
        const p = client.config.prefix;
        const container = new ContainerBuilder()
            .addSectionComponents(
                new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`## Hey! I'm **Melle**`),
                        new TextDisplayBuilder().setContent(
                            `> - **Your personal high-fidelity music system**\n\n` +
                            `> **<:music:1508823716585410730> Quick Start**\n` +
                            `└ Type \`/play\` or \`${p}play\` to start music\n\n` +
                            `> **<:navigation:1508823185716678727> Navigation**\n` +
                            `└ Use the Help button to explore all **40+ commands**`
                        )
                    )
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(client.user.displayAvatarURL()))
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
            .addActionRowComponents(
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('help_initial')
                        .setLabel('Help')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setURL('https://discord.gg/q8a22q2y3U')
                        .setLabel('Support')
                        .setStyle(ButtonStyle.Link)
                )
            );

        return {
            content: null,
            embeds: [],
            components: [container.toJSON()],
            flags: MessageFlags.IsComponentsV2
        };
    },

    mainHelp: async (client) => {
        const container = new ContainerBuilder()
            .addSectionComponents(
                new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`##  Melle Help Menu`),
                        new TextDisplayBuilder().setContent(
                            `ㅤ\n` +
                            `› **<:music:1508823716585410730> Music**\n` +
                            `└ *Core playback and audio effects*\n\n` +
                            `› **<a:heart:1508841650108104855> Social & Discovery**\n` +
                            `└ *Playlists, Favorites & smart discovery*\n\n` +
                            `› **<:admin:1508821788229107834>Admin**\n` +
                            `└ *DJ system & developer tools*\n\n` +
                            `› **<:config:1508821841102241932>Utility**\n` +
                            `└ *Bot stats & system information*\n\n` +
                            `*Select a category from the dropdown below.*`
                        )
                    )
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(client.user.displayAvatarURL()))
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
            .addActionRowComponents(
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('help_menu')
                        .setPlaceholder('Choose a category...')
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel('Music')
                                .setDescription('Core playback and audio effects')
                                .setEmoji('<:music:1508823716585410730>')
                                .setValue('help_music'),
                            new StringSelectMenuOptionBuilder()
                                .setLabel('Social & Discovery')
                                .setDescription('Playlists, Favorites and discovery')
                                .setEmoji('<a:heart:1508841650108104855>')
                                .setValue('help_social'),
                            new StringSelectMenuOptionBuilder()
                                .setLabel('Admin')
                                .setDescription('DJ system and developer tools')
                                .setEmoji('<:admin:1508821788229107834>')
                                .setValue('help_admin'),
                            new StringSelectMenuOptionBuilder()
                                .setLabel('Utility')
                                .setDescription('Bot stats and system info')
                                .setEmoji('<:config:1508821841102241932>')
                                .setValue('help_utility')
                        )
                )
            );

        return {
            content: null,
            embeds: [],
            components: [container.toJSON()],
            flags: MessageFlags.IsComponentsV2
        };
    },

    musicHelp: async (client) => {
        const p = client.config.prefix;
        const container = new ContainerBuilder()
            .addSectionComponents(
                new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`### <:music:1508823716585410730> Music Commands`),
                        new TextDisplayBuilder().setContent(
                            `ㅤ\n` +
                            `› **Core Playback**\n` +
                            `└ \`play\`, \`skip\`, \`stop\`, \`pause\`, \`resume\`, \`nowplaying\`, \`join\`, \`leave\`, \`search\`, \`playlofi\`\n` +
                            `└ *Usage:* \`${p}play\` · \`${p}playlofi\`\n\n` +
                            `› **Player Controls**\n` +
                            `└ \`queue\`, \`loop\`, \`shuffle\`, \`volume\`, \`replay\`, \`clear\`, \`move\`, \`remove\`\n` +
                            `└ *Usage:* \`${p}volume 80\`\n\n` +
                            `› **Free Effects**\n` +
                            `└ \`lyrics\`, \`bassboost\`, \`resetfilters\`\n` +
                            `└ *Usage:* \`${p}bassboost high\`\n\n` +
                            `› **⭐ Premium Audio Features**\n` +
                            `└ \`247\` (24/7 playback), \`8d\`, \`nightcore\`, \`vaporwave\`\n` +
                            `└ *Usage:* \`${p}nightcore\``
                        )
                    )
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(client.user.displayAvatarURL()))
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
            .addActionRowComponents(
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('help_main')
                        .setLabel('Back')
                        .setStyle(ButtonStyle.Secondary)
                )
            );

        return {
            content: null,
            embeds: [],
            components: [container.toJSON()],
            flags: MessageFlags.IsComponentsV2
        };
    },

    socialHelp: async (client) => {
        const p = client.config.prefix;
        const container = new ContainerBuilder()
            .addSectionComponents(
                new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`### <a:heart:1508841650108104855> Social & Discovery`),
                        new TextDisplayBuilder().setContent(
                            `ㅤ\n` +
                            `› **Profile & Interaction**\n` +
                            `└ \`profile\`, \`voteskip\`, \`voteclear\`\n` +
                            `└ *Usage:* \`${p}profile\` · \`${p}voteskip\`\n\n` +
                            `› **Personal Library**\n` +
                            `└ \`like\`, \`dislike\`, \`favorites\`, \`playliked\`, \`history\`\n` +
                            `└ *Usage:* \`${p}like\` · \`${p}playliked\`\n\n` +
                            `› **Custom Playlists**\n` +
                            `└ \`playlist create\`, \`playlist add\`, \`playlist play\`, \`playlist list\`\n` +
                            `└ \`playlist view\`, \`playlist remove\`, \`playlist delete\`\n` +
                            `└ *Usage:* \`${p}playlist play <name>\` · \`${p}playlist create <name>\`\n\n` +
                            `› **Smart Discovery**\n` +
                            `└ \`recommend\`, \`similar\`\n` +
                            `└ \`autoplay\` (⭐ Premium)`
                        )
                    )
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(client.user.displayAvatarURL()))
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
            .addActionRowComponents(
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('help_main')
                        .setLabel('Back')
                        .setStyle(ButtonStyle.Secondary)
                )
            );

        return {
            content: null,
            embeds: [],
            components: [container.toJSON()],
            flags: MessageFlags.IsComponentsV2
        };
    },

    adminHelp: async (client) => {
        const p = client.config.prefix;
        const container = new ContainerBuilder()
            .addSectionComponents(
                new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`### <:admin:1508821788229107834>Admin & Developer`),
                        new TextDisplayBuilder().setContent(
                            `ㅤ\n` +
                            `› **DJ System (Moderators)**\n` +
                            `└ \`dj set\`, \`dj reset\`, \`dj list\`, \`dj mode\`\n` +
                            `└ *Usage:* \`${p}dj set @Role\`\n\n` +
                            `› **Billing & Status**\n` +
                            `└ \`premium status\` (Check your current premium tier)\n\n` +
                            `› **👑 Owner/Developer Commands**\n` +
                            `└ \`premium grant/revoke\`, \`noprefix\`, \`eval\`, \`reload\`, \`reboot\`\n` +
                            `└ *Usage:* \`${p}premium grant @User 30d\``
                        )
                    )
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(client.user.displayAvatarURL()))
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
            .addActionRowComponents(
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('help_main')
                        .setLabel('Back')
                        .setStyle(ButtonStyle.Secondary)
                )
            );

        return {
            content: null,
            embeds: [],
            components: [container.toJSON()],
            flags: MessageFlags.IsComponentsV2
        };
    },

    utilityHelp: async (client) => {
        const p = client.config.prefix;
        const container = new ContainerBuilder()
            .addSectionComponents(
                new SectionBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`### <:config:1508821841102241932>Utility Commands`),
                        new TextDisplayBuilder().setContent(
                            `ㅤ\n` +
                            `› **System Information**\n` +
                            `└ \`help\`, \`stats\`, \`ping\`, \`uptime\`, \`nodes\`, \`devs\`\n` +
                            `└ *Usage:* \`${p}stats\`\n\n` +
                            `› **Links & Support**\n` +
                            `└ \`invite\`, \`support\``
                        )
                    )
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(client.user.displayAvatarURL()))
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
            .addActionRowComponents(
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('help_main')
                        .setLabel('Back')
                        .setStyle(ButtonStyle.Secondary)
                )
            );

        return {
            content: null,
            embeds: [],
            components: [container.toJSON()],
            flags: MessageFlags.IsComponentsV2
        };
    }
};
