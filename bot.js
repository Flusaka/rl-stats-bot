const Discord = require('discord.js');
const client = new Discord.Client();
const token = 


client.on("message", (message) => {
    if(message.author.bot) {
        return;
    }

    const { content, channel } = message;
    if(content === "!rlstats") {
        channel.send("Retrieving stats...");
    }
});

client.login(process.env.TOKEN);