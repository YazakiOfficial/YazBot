import chalk from 'chalk';
import { log } from '../../utils/functions.js';
import { time } from 'discord.js'; // for pretty timestamps like <t:timestamp:R>

export default {
    name: 'userinfo',
    description: 'Displays very detailed information about a user.',
    aliases: ['ui', 'whois', 'user'],
    usage: '[@user | userID | empty = yourself]',
    category: 'general',
    type: 'all', // or 'server_only' if you prefer
    permissions: ['SendMessages'],
    cooldown: 8,

    /**
     * Execute the userinfo command
     * @param {Client} client - Discord.js client instance
     * @param {Message} message - The message object
     * @param {Array} args - Command arguments
     */
    execute: async (client, message, args) => {
        try {
            let target;

            // ────────────────────────────────────────────────
            //  Target resolution logic
            // ────────────────────────────────────────────────
            if (!args.length) {
                target = message.author;
            } else {
                const input = args[0].replace(/[<@!>&]/g, '');
                try {
                    target = await client.users.fetch(input, { force: true }).catch(() => null);
                    if (!target) {
                        // Try to resolve from guild members if possible
                        if (message.guild) {
                            target = await message.guild.members.fetch(input).then(m => m.user).catch(() => null);
                        }
                    }
                } catch (e) {
                    target = null;
                }
            }

            if (!target) {
                return message.channel.send('> ❌ **Could not find that user.** Try a valid @mention or ID.');
            }

            // ────────────────────────────────────────────────
            //  Gather detailed information
            // ────────────────────────────────────────────────
            const isSelf = target.id === message.author.id;

            const member = message.guild ? message.guild.members.cache.get(target.id) : null;
            const hasGuildInfo = !!member;

            const badges = target.flags?.toArray() || [];
            const badgeEmojis = {
                BugHunterLevel1:     '🪲',
                BugHunterLevel2:     '🐞',
                CertifiedModerator:  '🛡️',
                HypeSquadOnlineHouse1: '🏠1',
                HypeSquadOnlineHouse2: '🏠2',
                HypeSquadOnlineHouse3: '🏠3',
                Hypesquad:           '🎉',
                Partner:             '🤝',
                PremiumEarlySupporter: '🌟',
                Staff:               'Discord Staff',
                VerifiedDeveloper:   '✅ Dev',
                ActiveDeveloper:     '🟢 Dev',
                VerifiedBot:         '🤖',
                BotHTTPInteractionsDisabled: '🔒'
            };

            const displayBadges = badges
                .map(flag => badgeEmojis[flag] || flag)
                .filter(Boolean)
                .join('  ') || 'None';

            const roles = member
                ? member.roles.cache
                    .filter(r => r.id !== message.guild.id)
                    .sort((a, b) => b.position - a.position)
                    .map(r => r.toString())
                : [];
            
            const roleDisplay = roles.length > 0
                ? roles.join(', ')
                : 'None';

            const statusEmoji = {
                online:  '🟢',
                idle:    '🟡',
                dnd:     '⛔',
                offline: '⚫',
                invisible: '⚫'
            }[target.presence?.status || 'offline'] || '⚫';

            const activity = target.presence?.activities?.[0];
            let activityLine = 'None';
            if (activity) {
                if (activity.type === 0) activityLine = `Playing **${activity.name}**`;
                else if (activity.type === 2) activityLine = `Listening to **${activity.details || activity.name}**`;
                else if (activity.type === 3) activityLine = `Watching **${activity.name}**`;
                else if (activity.type === 4) activityLine = `**${activity.state || activity.name}**`;
                else activityLine = activity.name || 'Custom status';
            }

            // ────────────────────────────────────────────────
            //  Build beautiful embed-like message
            // ────────────────────────────────────────────────
            const lines = [
                `> **User Information${isSelf ? ' (You)' : ''}**  ${statusEmoji}`,
                '> ',
                `> **Tag:** ${target.tag}`,
                `> **ID:** \`${target.id}\``,
                `> **Mention:** <@${target.id}>`,
                `> **Created:** ${time(target.createdTimestamp, 'R')} • ${time(target.createdTimestamp, 'D')}`,
                '> ',
                `> **Badges:** ${displayBadges}`,
                `> **Avatar:** \( {target.displayAvatarURL({ dynamic: true, size: 4096 }) ? `[Link]( \){target.displayAvatarURL({ dynamic: true, size: 4096 })})` : 'None'}`,
                target.bannerURL() ? `> **Banner:** [Link](${target.bannerURL({ size: 4096 })})` : null,
                '> ',
                hasGuildInfo ? `> **Joined Server:** ${time(member.joinedTimestamp, 'R')}` : null,
                hasGuildInfo ? `> **Server Booster:** ${member.premiumSince ? `Since ${time(member.premiumSinceTimestamp, 'R')}` : 'No'}` : null,
                hasGuildInfo && member.nickname ? `> **Nickname:** ${member.nickname}` : null,
                '> ',
                hasGuildInfo ? `> **Roles (${roles.length}):** ${roleDisplay}` : null,
                hasGuildInfo ? `> **Highest Role:** ${member.roles.highest?.toString() || 'None'}` : null,
                '> ',
                `> **Status / Activity:** ${activityLine}`,
                target.bot ? `> **Bot Account:** Yes ${target.flags?.has('VerifiedBot') ? '(Verified)' : ''}` : null,
            ].filter(Boolean); // remove null lines

            const userInfoMessage = lines.join('\n');

            await message.channel.send(userInfoMessage).catch(err => {
                log(`Failed to send userinfo: ${err.message}`, 'error');
                return message.channel.send('> ❌ **Failed to send user information.**');
            });

            log(`${message.author.tag} requested userinfo → \( {target.tag} ( \){target.id})`, 'info');

        } catch (error) {
            console.error(chalk.red(`[ERROR] userinfo failed for ${message.author.tag}:`), error);
            return message.channel.send('> ❌ **An error occurred while fetching user information.**').catch(() => {});
        }
    }
};
