const logger = require('../utils/logger');
const metadata = require('../utils/metadata');
const resolver = require('../utils/resolver');

const autoplayLocks = new Set();

module.exports = {
    handleAutoplay: async (client, player) => {
        if (!player.data.autoplay) return null;
        if (autoplayLocks.has(player.guildId)) return null;

        const lastTrack = player.data.lastTrack;
        if (!lastTrack) return null;

        autoplayLocks.add(player.guildId);

        try {
            let nextTrack = null;

            // Session history to avoid loops
            if (!player.data.autoplayHistory) player.data.autoplayHistory = [];
            player.data.autoplayHistory.push(lastTrack.identifier);
            if (player.data.autoplayHistory.length > 20) player.data.autoplayHistory.shift();

            // Strategy 1: YouTube Mix (Radio) - This is what makes VIORA's autoplay "good"
            if (lastTrack.uri && (lastTrack.uri.includes('youtube.com') || lastTrack.uri.includes('youtu.be'))) {
                const videoId = lastTrack.uri.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/)?.[1];
                if (videoId) {
                    const mixUrl = `https://www.youtube.com/watch?v=${videoId}&list=RD${videoId}`;
                    const result = await client.manager.search(mixUrl, { requester: { username: 'Autoplay', id: '0' } });

                    if (result && result.tracks && result.tracks.length > 1) {
                        nextTrack = result.tracks.find(t =>
                            t.identifier !== lastTrack.identifier &&
                            !player.data.autoplayHistory.includes(t.identifier)
                        );
                    }
                }
            }

            // Strategy 2: Vibe-Based Discovery (Spotify AI Recommendations)
            if (!nextTrack) {
                try {
                    const spotify = require('../utils/spotify');
                    const recommendations = await spotify.getRecommendedVibe(lastTrack.title, lastTrack.author);
                    
                    if (recommendations && recommendations.length > 0) {
                        // Pick a random track from recommendations to keep it fresh
                        const rec = recommendations[Math.floor(Math.random() * recommendations.length)];
                        const result = await client.manager.search(`${rec.title} ${rec.author}`, { requester: { username: 'Autoplay', id: '0' } });
                        
                        if (result && result.tracks && result.tracks.length > 0) {
                            nextTrack = result.tracks[0];
                            logger.info(`Autoplay: Found similar vibe track "${nextTrack.title}" via Spotify AI`);
                        }
                    }
                } catch (e) {
                    logger.error(`Autoplay Strategy 2 (Vibe) failed: ${e.message}`);
                }
            }

            // Strategy 3: Fast Related Search (VIORA Style Fallback)
            if (!nextTrack) {
                const query = `${metadata.cleanTitle(lastTrack.title)} related`;
                const result = await client.manager.search(query, { requester: { username: 'Autoplay', id: '0' } });

                if (result && result.tracks && result.tracks.length > 0) {
                    nextTrack = result.tracks.find(t =>
                        t.identifier !== lastTrack.identifier &&
                        !player.data.autoplayHistory.includes(t.identifier)
                    ) || result.tracks[0];
                }
            }

            // Strategy 3: Learned Taste (New)
            if (!nextTrack) {
                try {
                    const Guild = require('../database/models/guild');
                    const guildData = await Guild.findOne({ guildId: player.guildId });
                    
                    if (guildData && guildData.topArtists) {
                        const artists = Array.from(guildData.topArtists.keys());
                        if (artists.length > 0) {
                            const randomArtist = artists[Math.floor(Math.random() * artists.length)];
                            const res = await client.manager.search(`${randomArtist} top songs`, { requester: { username: 'Autoplay', id: '0' } });
                            if (res && res.tracks.length > 0) {
                                nextTrack = res.tracks[Math.floor(Math.random() * Math.min(res.tracks.length, 5))];
                            }
                        }
                    }
                } catch (e) {
                    logger.error(`Autoplay Strategy 3 (Taste) failed: ${e.message}`);
                }
            }

            if (nextTrack) {
                // Elite Cleaning & Metadata Wash
                await resolver.washTrack(nextTrack);

                logger.info(`Autoplay: Resolved track "${nextTrack.title}" for ${player.guildId}`);
                return nextTrack;
            }

            return null;
        } catch (error) {
            logger.error(`Autoplay error: ${error.message || JSON.stringify(error)}`);
            return null;
        } finally {
            autoplayLocks.delete(player.guildId);
        }
    }
}
