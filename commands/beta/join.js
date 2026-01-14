export default {
    name: 'join',
    description: 'Joins a server via invite link or code (e.g. discord.gg/abc123 or abc123)',
    aliases: ['summon'],
    usage: '<invite>',
    category: 'Utility',
    type: 'prefix',
    cooldown: 10,
    async execute(client, message, args) {
        if (message.author.id !== client.user.id) return; // Security: only you

        const inviteInput = args[0];
        if (!inviteInput) {
            return message.channel.send('> Usage: `' + client.prefix + 'join <invite link or code>`');
        }

        try {
            // Extract code from full link if provided
            let inviteCode = inviteInput;
            if (inviteInput.includes('discord.gg/') || inviteInput.includes('discord.com/invite/')) {
                inviteCode = inviteInput.split('/').pop().split('?')[0];
            }

            const invite = await client.fetchInvite(inviteCode);

            // Correct method: acceptInvite()
            await invite.acceptInvite();  // or acceptInvite(true) if forcing, but usually not needed

            await message.channel.send(`> ✅ Joined: **${invite.guild?.name || 'Unknown'}** (ID: ${invite.guild?.id || 'N/A'})`);
        } catch (error) {
            console.error('Join error:', error);
            let errMsg = '> ❌ Failed to join.';
            if (error.code === 10006 || error.message.includes('Unknown Invite')) {
                errMsg += ' Invalid or expired invite code.';
            } else if (error.message.includes('captcha') || error.message.includes('update your app')) {
                errMsg += ' Captcha or "update app" block — join manually in browser/app first, then try again.';
            } else if (error.message.includes('token') || error.status === 401) {
                errMsg += ' Token issue — check your token in config.';
            }
            await message.channel.send(errMsg);
        }
    },
};
