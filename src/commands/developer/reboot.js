const { ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
    name: 'reboot',
    aliases: ['restart'],
    description: 'Restart the bot process (Developer Only)',
    async execute(client, message, args) {
        if (!client.config.owners.includes(message.author.id)) {
            const errContainer = new ContainerBuilder().addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`> <:wrong:1508824698169983128> This command is restricted to bot developers.`)
            );
            return message.reply({ components: [errContainer.toJSON()], flags: MessageFlags.IsComponentsV2 });
        }

        const container = new ContainerBuilder().addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`> <a:black_update:1500921989248979115> Rebooting bot... Process will exit and be restarted by PM2/System.`)
        );

        await message.reply({ components: [container.toJSON()], flags: MessageFlags.IsComponentsV2 });
        
        client.logger.info(`Reboot initiated by ${message.author.tag} (${message.author.id})`);
        
        // Wait a moment for the message to send
        setTimeout(() => {
            process.exit(0);
        }, 1000);
    }
};
