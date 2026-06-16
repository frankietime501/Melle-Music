const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    tracks: [{
        title: { type: String, required: true },
        author: { type: String, required: true },
        uri: { type: String, required: true },
        identifier: { type: String, required: true },
        thumbnail: { type: String },
        length: { type: Number, default: 0 }
    }],
    createdAt: { type: Date, default: Date.now }
});

// Ensure a user cannot have two playlists with the same name
PlaylistSchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);
