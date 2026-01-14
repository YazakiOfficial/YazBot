export default {
  name: "roblox",
  aliases: ["rbx", "robloxinfo"],
  description: "Shows Roblox user info + followers",
  usage: ",roblox <username>",
  category: "info",
  cooldown: 12,

  async execute(client, message, args) {
    if (!args.length) {
      return message.reply("Gimme a username bruh 😭");
    }

    const typedUsername = args.join(" ").trim();
    const loading = await message.reply(`🔍 Looking up **${typedUsername}**...`);

    try {
      // Username → User ID
      const idRes = await fetch("https://users.roblox.com/v1/usernames/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernames: [typedUsername],
          excludeBannedUsers: false
        })
      });

      if (!idRes.ok) throw new Error("Username check failed");

      const idData = await idRes.json();

      if (!idData.data?.length) {
        return loading.edit(`❌ **${typedUsername}** not found`);
      }

      const userId = idData.data[0].id;

      // Profile info
      const profileRes = await fetch(`https://users.roblox.com/v1/users/${userId}`);
      if (!profileRes.ok) throw new Error("Couldn't get profile");

      const profile = await profileRes.json();

      // Followers
      const followersRes = await fetch(`https://friends.roblox.com/v1/users/${userId}/followers/count`);
      let followers = "Unknown";
      if (followersRes.ok) {
        const fData = await followersRes.json();
        followers = fData.count?.toLocaleString() || "0";
      }

      const created = `<t:${Math.floor(new Date(profile.created).getTime() / 1000)}:R>`;

      const status = profile.isBanned ? "Banned ❌" : "Active ✅";

      const bio = profile.description?.trim() || "No bio set";

      // Full visible link + decorations
      const response = 
        `✨ **Roblox User: ${typedUsername}** ✨\n` +
        `# [Click here](https://www.roblox.com/users/${userId}/profile)\n` +
        `──────────────────────────────\n` +
        `🆔 **ID:** ${userId}\n` +
        `📅 **Created:** ${created}\n` +
        `👥 **Followers:** ${followers}\n` +
        `🔰 **Status:** ${status}\n` +
        `📝 **Bio:** ${bio}\n` +
        `──────────────────────────────`;

      await loading.edit(response);

    } catch (err) {
      console.error("Roblox error:", err);
      await loading.edit("❌ Something broke... (rate limit, bad username, or Roblox acting up)");
    }
  }
};
