const { ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

/**
 * Standard CV2 Response Generator
 * Utilizes VIORA's strict .toJSON() requirement and blockquote indentation for a premium look.
 * Note: ContainerBuilder handles pure text without requiring SectionBuilder/Accessory.
 */
const createCV2Response = (content) => {
    try {
        const container = new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(content || '...')
            );

        return {
            components: [container.toJSON()],
            flags: MessageFlags.IsComponentsV2
        };
    } catch (error) {
        console.error('Error creating CV2 response:', error);
        return { content: content || 'Error creating response' };
    }
};

module.exports = {
    music: (content) => createCV2Response(`> <:music:1508823716585410730> Music | ${content}`),
    success: (content) => createCV2Response(`> <:check:1508822770866327724> | ${content}`),
    error: (content) => createCV2Response(`> <:wrong:1508824698169983128> Error | ${content}`)
};
