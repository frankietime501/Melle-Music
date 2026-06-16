/**
 * High-performance metadata cleaning for elite music display
 */
module.exports = {
    cleanTitle: (title) => {
        if (!title) return 'Unknown Title';
        return title
            .replace(/\[.*?\b(Official|Video|Audio|Lyrics|Lyric|HD|4K|Full|Clip|Lyrical)\b.*?\]/gi, '')
            .replace(/\(.*?\b(Official|Video|Audio|Lyrics|Lyric|HD|4K|Full|Clip|Lyrical)\b.*?\)/gi, '')
            .replace(/\|\s*(Full\s*Song|Full\s*Audio|Official|Video|Lyrical|HD|4K).*$/gi, '')
            .replace(/｜\s*(Full\s*Song|Full\s*Audio|Official|Video|Lyrical|HD|4K).*$/gi, '')
            .replace(/—\s*(Full\s*Song|Full\s*Audio|Official|Video|Lyrical|HD|4K).*$/gi, '')
            .replace(/\s*-\s*Topic\s*$/i, '')
            .split(/\||｜|—|-|丨/)[0]
            .trim() || title.trim() || 'Unknown Title';
    },

    cleanAuthor: (author) => {
        if (!author) return 'Unknown Artist';
        return author
            .replace(/\s*-\s*Topic\s*$/i, '')
            .replace(/VEVO|Music|Official|Recordings|Records/gi, '')
            .trim() || author.trim() || 'Unknown Artist';
    },

    getHighResThumbnail: (url) => {
        if (!url || typeof url !== 'string' || !url.startsWith('http')) return 'https://i.imgur.com/8QpZ6uS.png';
        if (url.includes('i.ytimg.com') || url.includes('img.youtube.com')) {
            const id = url.match(/vi\/([^\/]+)\//)?.[1];
            if (id) return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
        }
        return url;
    },

    getMediumThumbnail: (url) => {
        if (!url || typeof url !== 'string' || !url.startsWith('http')) return 'https://i.imgur.com/8QpZ6uS.png';
        if (url.includes('i.ytimg.com') || url.includes('img.youtube.com')) {
            const id = url.match(/vi\/([^\/]+)\//)?.[1];
            if (id) return `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
        }
        return url;
    },

    truncate: (str, len = 40) => {
        if (!str) return '';
        return str.length > len ? str.substring(0, len - 3) + '...' : str;
    }
};
