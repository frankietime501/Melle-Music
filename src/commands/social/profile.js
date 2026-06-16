const {
    SlashCommandBuilder,
    ContainerBuilder,
    TextDisplayBuilder,
    MessageFlags,
    ThumbnailBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    SectionBuilder,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder
} = require('discord.js');
const User = require('../../database/models/user');
const Playlist = require('../../database/models/playlist');
const logger = require('../../utils/logger');

// Paste your custom medium-resolution profile banner URL here!
const PROFILE_BANNER_URL = 'https://media.discordapp.net/attachments/1435586388946063485/1508853268040908881/image.png?ex=6a170c9c&is=6a15bb1c&hm=51c35c83fe4cbf8a0764775a2942ff27f7c1a8f9b859a012cab437a0976c00e8&=&format=webp&quality=lossless&width=1330&height=532';


module.exports = {
    name: 'profile',
    aliases: ['pr', 'userinfo', 'me'],
    description: "View a user's high-fidelity music stats and profile",
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription("View a user's high-fidelity music stats and profile")
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose profile you want to view')
                .setRequired(false)),

    async execute(client, message, args) {
        const isInteraction = !!message.options;
        const targetUser = isInteraction
            ? (message.options.getUser('user') || message.user)
            : (message.mentions.users.first() || message.author);

        const guildId = isInteraction ? message.guildId : message.guild.id;

        if (isInteraction) await message.deferReply();

        try {
            // 1. Fetch User Data
            let userData = await User.findOne({ userId: targetUser.id });
            if (!userData) {
                userData = await User.create({ userId: targetUser.id });
            }

            // 2. Fetch Playlists Count
            const playlistCount = await Playlist.countDocuments({ userId: targetUser.id }) || 0;

            // 3. Determine Tier Status
            const isOwner = client.config.owners.includes(targetUser.id);
            const isPremium = client.db.isPremium(null, targetUser.id) || isOwner;
            let tierText = '<:admin:1508821788229107834>**Standard Listener**';

            if (isOwner) {
                tierText = '<:stats:1508824266294951998> **Ghost Byte Studio**';
            } else if (isPremium) {
                if (userData.premiumUntil) {
                    const dateStr = new Date(userData.premiumUntil).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    tierText = `⭐ **Premium Member** *(Expires: ${dateStr})*`;
                } else {
                    tierText = '⭐ **Premium Member** *(Lifetime)*';
                }
            }

            // 4. Calculate top artist
            let topArtistText = '*No data yet*';
            if (userData.topArtists && userData.topArtists.size > 0) {
                const sortedArtists = Array.from(userData.topArtists.entries())
                    .sort((a, b) => b[1] - a[1]);
                if (sortedArtists.length > 0) {
                    topArtistText = `**${sortedArtists[0][0]}** (${sortedArtists[0][1]} plays)`;
                }
            }

            // 5. Calculate top song
            let topSongText = '*No data yet*';
            if (userData.topSongs && userData.topSongs.length > 0) {
                const sortedSongs = [...userData.topSongs].sort((a, b) => b.count - a.count);
                if (sortedSongs.length > 0 && sortedSongs[0].count > 0) {
                    topSongText = `**${sortedSongs[0].title.substring(0, 45)}** (${sortedSongs[0].count} plays)`;
                }
            }

            const likedCount = userData.likedSongs?.length || 0;
            const historyCount = userData.history?.length || 0;

            // 6. Calculate Listener Level Rank
            let rankText = '<:Bronze:1508839811740471317> **Bronze Ear**';
            if (historyCount > 100) rankText = '<:diamond_rank:1508840957334917260> **Diamond Maestro**';
            else if (historyCount > 50) rankText = '<:Goldrank:1508839874982314005> **Gold Audiophile**';
            else if (historyCount > 15) rankText = '<:silver:1508841770165993693> **Silver Groover**';

            // 7. Dynamic VC Now Playing Activity Status
            let liveActivityText = '';
            const player = client.manager.players.get(guildId);
            if (player && player.playing && player.queue.current) {
                const guildObj = isInteraction ? message.guild : message.guild;
                const member = guildObj.members.cache.get(targetUser.id);
                if (member && member.voice.channelId === player.voiceId) {
                    liveActivityText = `\n\n› **Live Activity**\n└ <a:vibe:1508842181517906140> Currently listening to **${player.queue.current.title.substring(0, 45)}**`;
                }
            }

            // 8. Format Recently Played (Last 3 tracks from history)
            let historyText = '*No listening history yet*';
            if (userData.history && userData.history.length > 0) {
                const recent = userData.history.slice(-3).reverse();
                historyText = recent.map((t, i) => {
                    const isLast = i === recent.length - 1;
                    const bullet = isLast ? '└' : '├';
                    const displayTitle = t.title.length > 35 ? `${t.title.substring(0, 35)}...` : t.title;
                    const displayAuthor = t.author.length > 20 ? `${t.author.substring(0, 20)}...` : t.author;
                    return `${bullet} **${displayTitle}** - *${displayAuthor}*`;
                }).join('\n');
            }

            // 9. Build High-Fidelity UI
            const section = new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`##  <@${targetUser.id}>'s Profile`),
                    new TextDisplayBuilder().setContent(
                        `› **Account Tier**\n` +
                        `└ ${tierText}\n\n` +
                        `› **Listener Level**\n` +
                        `└ ${rankText}\n\n` +
                        `› **Library Statistics**\n` +
                        `├ <:file:1508823099896889556> **Playlists:** \` ${playlistCount} \` custom lists\n` +
                        `├ <:hearts:1508840340101005393> **Favorites:** \` ${likedCount} \` saved songs\n` +
                        `└ <a:blackhp:1508841268585824376> **History Size:** \` ${historyCount} \` tracks played\n\n` +
                        `› **Personal Music Charts**\n` +
                        `├ <a:music1:1508841404854698145> **Top Artist:** ${topArtistText}\n` +
                        `└ <a:hizumi_playing:1508841075090133073> **Favorite Song:** ${topSongText}\n\n` +
                        `› **Recent Listening History**\n` +
                        historyText +
                        liveActivityText
                    )
                )
                .setThumbnailAccessory(new ThumbnailBuilder().setURL(targetUser.displayAvatarURL({ dynamic: true })));

            const container = new ContainerBuilder()
                .addSectionComponents(section)
                .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small));

            if (PROFILE_BANNER_URL) {
                container.addMediaGalleryComponents(
                    new MediaGalleryBuilder()
                        .addItems(
                            new MediaGalleryItemBuilder().setURL(PROFILE_BANNER_URL)
                        )
                );
            }

            const res = {
                components: [container.toJSON()],
                flags: MessageFlags.IsComponentsV2,
                allowedMentions: { parse: [] }
            };
            return isInteraction ? message.editReply(res) : message.reply(res);

        } catch (err) {
            logger.error(`Profile Command Error: ${err.stack}`);
            const errRes = {
                components: [new ContainerBuilder().addTextDisplayComponents(new TextDisplayBuilder().setContent(`> <:wrong:1508824698169983128> An error occurred while retrieving the profile.`)).toJSON()],
                flags: MessageFlags.IsComponentsV2,
                ephemeral: true
            };
            return isInteraction ? message.editReply(errRes) : message.reply(errRes);
        }
    }
};
