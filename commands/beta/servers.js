import { log } from "../../utils/functions.js";

export default {
  name: "servers",
  aliases: ["servers", "guilds", "myservers"],
  description: "Shows all your servers with total members & roles",
  usage: "servers",
  category: "info",
  type: "both",
  permissions: ["SendMessages"],
  cooldown: 5,

  async execute(client, message, args) {
    try {
      const userGuilds = client.guilds.cache.filter(guild =>
        guild.members.cache.has(message.author.id)
      );

      if (userGuilds.size === 0) {
        return message.channel.send("❌ **You aren't in any servers yet!** 🌌");
      }

      const sortedGuilds = [...userGuilds.values()].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      let response = `✨ **Your Servers** (${sortedGuilds.length}) ✨\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
      let count = 0;

      for (const guild of sortedGuilds) {
        count++;

        const totalMembers = guild.memberCount;
        const totalRoles = guild.roles.cache.size - 1; // exclude @everyone

        response += `**${count}. ${guild.name}** 🌟\n` +
                    `   🆔  **${guild.id}**\n` +
                    `   👥  **${totalMembers.toLocaleString()}** members\n` +
                    `   🎭  **${totalRoles.toLocaleString()}** roles\n` +
                    `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

        // Split if message is getting too long
        if (response.length > 1800) {
          await message.channel.send(response);
          response = "";
        }
      }

      if (response.length > 0) {
        await message.channel.send(response);
      }

      log(`Listed ${sortedGuilds.length} servers (simple view) for ${message.author.tag}`, "info");

    } catch (err) {
      console.error("Servers command error:", err);
      await message.channel.send("❌ **Oops... something went wrong!** Please try again later.");
    }
  },
};
