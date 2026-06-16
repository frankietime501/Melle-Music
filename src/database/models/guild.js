const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    prefix: { type: String, default: null },
    djRole: { type: String, default: null },
    autoplay: { type: Boolean, default: false },
    lastTrack: { type: Object, default: null },
    premium: { type: Boolean, default: false },
    premiumUntil: { type: Date, default: null },
    topArtists: { type: Map, of: Number, default: {} },
    topSongs: [{ title: String, uri: String, count: { type: Number, default: 0 } }]
});

module.exports = mongoose.model('Guild', GuildSchema);
