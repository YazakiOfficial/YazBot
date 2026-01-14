import Groq from 'groq-sdk';

export default {
    name: 'talk',
    description: "Enables AI conversation mode — replies to mentions/replies to you using Groq AI (llama-3.1-8b-instant).",
    aliases: ['chat', 'conv'],
    usage: 'Just mention me or reply to my message to start talking!',
    category: 'AI',
    type: 'both',           // Assuming your framework supports non-prefix triggers
    permissions: ['SendMessages'],
    cooldown: 8,            // Slightly higher to avoid rate limits / spam detection
    // This command doesn't use execute() like normal prefix commands — it's event-based
    // So we export a setup function that your main handler can call
    setup: (client) => {
        // We'll attach the listener here (only once when command is loaded)
        client.on('messageCreate', async (message) => {
            // Ignore messages from yourself to prevent loops
            if (message.author.id === client.user.id) return;

            // Safety: ignore if no content
            if (!message.content?.trim()) return;

            // Trigger conditions (customize these!)
            const shouldReply =
                // 1. Someone mentions your account
                message.mentions.has(client.user) ||
                // 2. Someone replies to one of your messages
                (message.reference && message.reference.messageId && 
                 (await message.channel.messages.fetch(message.reference.messageId).catch(() => null))?.author.id === client.user.id);

            if (!shouldReply) return;

            // Optional: ignore bot accounts or webhooks if you want
            if (message.author.bot) return;

            // Typing indicator to look natural ("I'm talking...")
            await message.channel.sendTyping().catch(() => {});

            const groqApiKey = client.config.ai?.groq_api_key;
            if (!groqApiKey) {
                return message.reply('> ❌ Groq API key missing in config.yaml.');
            }

            const groq = new Groq({ apiKey: groqApiKey });

            try {
                // You can improve this by keeping conversation history per channel/user
                // For simplicity, we send just the current message (like the original ask command)
                const chatCompletion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: 'user',
                            content: message.content,
                        },
                    ],
                    model: 'llama-3.1-8b-instant',
                    max_tokens: 1000,   // Lowered a bit for faster replies
                    temperature: 0.9,   // Makes it more conversational / creative
                });

                let response = chatCompletion.choices[0]?.message?.content?.trim();

                if (!response) {
                    return message.reply('> ❌ No response from Groq.');
                }

                // Split long responses (Discord limit 2000 chars)
                if (response.length > 2000) {
                    const chunks = response.match(/[^]{1,2000}/g);
                    for (const chunk of chunks) {
                        await message.channel.send(chunk);
                    }
                } else {
                    await message.reply(response);  // or message.channel.send() if you don't want to @ them
                }

            } catch (error) {
                console.error('Groq error in talk mode:', error);
                await message.reply('> ❌ Error getting AI response. Try again later.');
            }
        });

        console.log('[Talk] AI conversation listener activated — replies on mentions/replies.');
    }
};
