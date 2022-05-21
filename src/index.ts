import DiscordJS, { Intents } from "discord.js";
import { ServerService } from "./services/server-service";
import { readFileSync } from 'fs';

require('dotenv').config({ path: '../.env' });

const channelId = "974594707550265344";
const blacklistPath = "BLACKLIST_FILE_PATH";

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    console.log("The bot is online.");
});

client.on("messageCreate", async (message) => {
    if (!message.author.bot && message.channelId === channelId) {
        const serverService = new ServerService();
        switch (message.content) {
            case ".tc":
                const tcStatus = await serverService.getTCStatus();
                message.reply({ content: '```' + tcStatus + '```' });
                break;
            case ".top":
                const topServerStatus = await serverService.getTopServerStatus();
                message.reply({ content: '```' + topServerStatus + '```' });
                break;
            case ".b":
                let fileText = readFileSync(blacklistPath, "utf-8");
                if (fileText.length != 0) {
                    const charPosition = fileText.indexOf("=");
                    fileText = fileText.substring(charPosition - 10).trimEnd();
                    message.reply({ content: '```' + fileText + '```' });
                }
                break
        }
    }
});

client.login(process.env.BOT_TOKEN);