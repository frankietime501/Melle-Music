module.exports = {
    formatTime: (ms) => {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

        const mins = hours > 0 ? minutes.toString().padStart(2, '0') : minutes.toString();
        return `${hours > 0 ? hours + ':' : ''}${mins}:${seconds.toString().padStart(2, '0')}`;
    },

    progressBar: (current, total, size = 15) => {
        const progress = Math.round((size * current) / total);
        const emptyProgress = size - progress;

        const progressText = '━'.repeat(progress > 0 ? progress - 1 : 0);
        const headText = progress > 0 ? '⏺' : '';
        const emptyProgressText = '─'.repeat(emptyProgress);

        return `[${progressText}${headText}${emptyProgressText}]`;
    }
};
