import chalk from 'chalk';
import { log } from '../../utils/functions.js';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.env.HOME || process.env.USERPROFILE, 'YazBot', 'data');
const EGIRL_FILE = path.join(DATA_DIR, 'egirls.js');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load or initialize egirls list (now array of usernames)
let egirls = [];
if (fs.existsSync(EGIRL_FILE)) {
    try {
        const data = await import(`file://\( {EGIRL_FILE}?update= \){Date.now()}`);
        egirls = data.default || [];
        if (!Array.isArray(egirls)) egirls = [];
        log(`Loaded ${egirls.length} egirl username(s) from file`, 'info');
    } catch (err) {
        console.error(chalk.red('[egirl] Failed to load egirls file:'), err);
        egirls = [];
    }
} else {
    saveEgirls();
}

function saveEgirls() {
    const content = `export default ${JSON.stringify(egirls, null, 2)};\n`;
    try {
        fs.writeFileSync(EGIRL_FILE, content, 'utf8');
        log(`Saved egirl list (${egirls.length} entries)`, 'success');
    } catch (err) {
        console.error(chalk.red('[egirl] Failed to save:'), err);
    }
}

export default {
    name: 'egirl',
    description: 'Manage the sacred egirl list ♡',
    aliases: ['eg', 'add egirl', 'remove egirl'],
    usage: '<@user> | list | remove <username>',
    category: 'fun',
    type: 'server_only',
    permissions: ['SendMessages'],
    cooldown: 3,

    execute: async (client, message, args) => {
        try {
            if (message.author.id !== client.user.id) return;

            const subcommand = args[0]?.toLowerCase();

            // ,egirl list
            if (!subcommand || subcommand === 'list') {
                if (egirls.length === 0) {
                    return message.channel.send([
                        '✦・。・゜✭・。・✩・。・✦',
                        '♡ **The egirl list is currently empty** ♡',
                        'Use ,egirl @someone to begin the collection~',
                        '✦・。・゜✭・。・✩・。・✦'
                    ].join('\n'));
                }

                let listText = '';
                egirls.forEach((username, index) => {
                    listText += `◆ ${index + 1}. ${username} ♥\n`;
                });

                return message.channel.send(listText.trim());
            }

            // ,egirl remove <username>   (now takes the username as text, not mention)
            if (subcommand === 'remove') {
                if (args.length < 2) {
                    return message.channel.send('> Please provide the username to remove\n> Example: ,egirl remove shadow_56788');
                }

                const targetUsername = args.slice(1).join(' ');  // allow usernames with spaces if ever needed
                const index = egirls.findIndex(name => name.toLowerCase() === targetUsername.toLowerCase());

                if (index === -1) {
                    return message.channel.send(`> **${targetUsername}** isn't on the list silly~`);
                }

                const removed = egirls.splice(index, 1)[0];
                saveEgirls();

                return message.channel.send([
                    '✦・。・゜✭・。・✩・。・✦',
                    `Removed **${removed}** from the egirl list ฅ(>ω<)ฅ`,
                    `Remaining: ${egirls.length}`,
                    '✦・。・゜✭・。・✩・。・✦'
                ].join('\n'));
            }

            // ,egirl @user (add)
            if (!message.mentions.users.size) {
                return message.channel.send('> You need to mention someone silly~ ,egirl @cutie');
            }

            const target = message.mentions.users.first();
            const targetUsername = target.username;

            if (egirls.some(name => name.toLowerCase() === targetUsername.toLowerCase())) {
                return message.channel.send([
                    '✦・。・゜✭・。・✩・。・✦',
                    `**${targetUsername}** is **already** claimed in the list~ ♡`,
                    '✦・。・゜✭・。・✩・。・✦'
                ].join('\n'));
            }

            egirls.push(targetUsername);
            saveEgirls();

            message.channel.send([
                '✦・。・゜✭・。・✩・。・✦',
                `**${targetUsername}** has been officially added to the egirl list ♡₍ᐢ. ̫ .⑅ᐢ₎`,
                'Use ,egirl list to admire your collection~',
                '✦・。・゜✭・。・✩・。・✦'
            ].join('\n'));

            log(`${message.author.tag} added ${targetUsername} to egirl list`, 'info');

        } catch (error) {
            console.error(chalk.red('[ERROR] egirl command:'), error);
            message.channel.send('> Something broke... oopsie (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)');
        }
    }
};
