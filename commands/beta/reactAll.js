import TaskManager from "../../utils/TaskManager.js";
import { log } from "../../utils/functions.js";

// Store active reactAll tasks
export const reactAllTasks = new Map();

export default {
  name: "reactAll",
  aliases: ["reactall", "ra"],
  description: "React to recent messages in the current channel with chosen emoji",
  usage: "reactAll <emoji> | reactAll stop | reactAll status",
  category: "fun",
  type: "both",
  permissions: ["SendMessages", "AddReactions"],
  cooldown: 8,

  async execute(client, message, args) {
    if (!args.length) {
      return message.channel.send(
        "❌ **Please specify an action!**\n" +
          `**Usage:**\n` +
          `• \`${client.prefix}reactAll <emoji>\` - Start reacting\n` +
          `• \`${client.prefix}reactAll stop\` - Stop current task\n` +
          `• \`${client.prefix}reactAll status\` - Show status`
      );
    }

    const subcommand = args[0].toLowerCase();

    if (subcommand === "stop" || subcommand === "end") {
      return this.stopReactAll(client, message);
    }

    if (subcommand === "status" || subcommand === "info") {
      return this.statusReactAll(client, message);
    }

    return this.startReactAll(client, message, args);
  },

  async startReactAll(client, message, args) {
    // Join args in case someone pastes with spaces
    let emoji = args.join("").trim();

    if (!emoji) {
      return message.channel.send("❌ **You must provide an emoji!**\nExample: `reactAll 🔥`");
    }

    // Remove common invisible characters that break reactions
    emoji = emoji
      .replace(/[\uFE0E\uFE0F\u200D\u200B\u200C\u200E\u200F]/g, "") // VS-15/16, ZWJ, ZWNJ, directionals
      .normalize("NFC") // Normalize unicode form
      .trim();

    // Debug what we actually got
    console.log("[reactAll DEBUG] Raw input:", args.join(" "));
    console.log("[reactAll DEBUG] Cleaned emoji:", emoji);
    console.log("[reactAll DEBUG] Length:", emoji.length);
    console.log(
      "[reactAll DEBUG] Codepoints:",
      [...emoji].map(c => "U+" + c.codePointAt(0).toString(16).padStart(4, "0")).join(" ")
    );

    const guildId = message.guild?.id || "dm";
    const channelId = message.channel.id;
    const taskKey = `\( {channelId}: \){guildId}`;

    if (reactAllTasks.has(taskKey)) {
      return message.channel.send("⚠️ **A reactAll task is already running in this channel!** Use `reactAll stop` first.");
    }

    const taskName = `reactAll_${channelId}`;
    const task = TaskManager.createTask(taskName, guildId);

    if (!task) {
      return message.channel.send("❌ **Failed to create reactAll task!**");
    }

    const sessionData = {
      emoji,
      channelId,
      guildId,
      startedBy: message.author.id,
      startedAt: Date.now(),
      reactedCount: 0,
      task,
      isCancelled: false,
    };

    if (task.signal) {
      task.signal.addEventListener("abort", () => {
        sessionData.isCancelled = true;
        reactAllTasks.delete(taskKey);
        if (!task.signal.reason || task.signal.reason !== "completed") {
          log(`reactAll task in channel ${channelId} was cancelled`, "warn");
        }
      });
    }

    reactAllTasks.set(taskKey, sessionData);

    await message.channel.send(
      `🚀 **Started reactAll with ${emoji}!**\n` +
        `Reacting to recent messages in this channel... (this may take a while)`
    );

    log(`Started reactAll with ${emoji} in \( {channelId} ( \){guildId})`, "debug");

    // Run the reacting in background
    this.performReactAll(message.channel, emoji, sessionData, task).catch(err => {
      console.error("[reactAll Background Error]", err);
    });
  },

  async performReactAll(channel, emoji, sessionData, task) {
    const LIMIT = 80;
    let lastId = null;
    let consecutiveErrors = 0;

    while (!task.signal.aborted) {
      try {
        const options = { limit: LIMIT };
        if (lastId) options.before = lastId;

        const messages = await channel.messages.fetch(options);
        if (messages.size === 0) break;

        for (const msg of messages.values()) {
          if (task.signal.aborted) break;

          if (msg.author.id === channel.client.user.id) continue;
          if (msg.system) continue;

          try {
            await msg.react(emoji);
            sessionData.reactedCount++;
            await new Promise(r => setTimeout(r, 950 + Math.random() * 500)); // ~1–1.45s delay
          } catch (e) {
            console.log(`[reactAll] Failed to react to msg ${msg.id}: ${e.message}`);
            if (e.httpStatus === 429) {
              await new Promise(r => setTimeout(r, 10000)); // ratelimit backoff
            }
            if (++consecutiveErrors > 8) {
              throw new Error("Too many consecutive reaction failures");
            }
          }
        }

        lastId = messages.last()?.id;
        if (!lastId) break;

      } catch (err) {
        console.error("[reactAll fetch error]", err.message);
        if (err.httpStatus === 429) {
          await new Promise(r => setTimeout(r, 15000));
        } else {
          break;
        }
      }
    }

    if (!task.signal.aborted) {
      task.stop("completed");
      const duration = Date.now() - sessionData.startedAt;

      channel.send(
        `🏁 **reactAll finished!**\n` +
          `• Emoji: ${emoji}\n` +
          `• Messages reacted: **${sessionData.reactedCount}**\n` +
          `• Duration: ${this.formatDuration(duration)}`
      ).catch(() => {});

      const taskKey = `\( {channel.id}: \){channel.guild?.id || "dm"}`;
      reactAllTasks.delete(taskKey);
      log(`reactAll completed in channel ${channel.id} - ${sessionData.reactedCount} reactions`, "info");
    }
  },

  async stopReactAll(client, message) {
    const guildId = message.guild?.id || "dm";
    const channelId = message.channel.id;
    const taskKey = `\( {channelId}: \){guildId}`;

    if (!reactAllTasks.has(taskKey)) {
      return message.channel.send("❌ **No active reactAll task in this channel!**");
    }

    const session = reactAllTasks.get(taskKey);
    const duration = Date.now() - session.startedAt;

    if (session.task) session.task.stop();

    reactAllTasks.delete(taskKey);

    await message.channel.send(
      `✅ **Stopped reactAll!**\n` +
        `**Duration:** ${this.formatDuration(duration)}\n` +
        `**Messages reacted:** ${session.reactedCount}`
    );

    log(`Stopped reactAll in channel ${channelId}`, "debug");
  },

  async statusReactAll(client, message) {
    const guildId = message.guild?.id || "dm";
    const channelId = message.channel.id;
    const taskKey = `\( {channelId}: \){guildId}`;

    if (!reactAllTasks.has(taskKey)) {
      return message.channel.send("📊 **No active reactAll task in this channel.**");
    }

    const data = reactAllTasks.get(taskKey);
    const duration = Date.now() - data.startedAt;

    await message.channel.send(
      `📈 **Current reactAll status:**\n\n` +
        `• Emoji: **${data.emoji}**\n` +
        `• Messages reacted so far: **${data.reactedCount}**\n` +
        `• Running for: **${this.formatDuration(duration)}**`
    );
  },

  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  },
};
