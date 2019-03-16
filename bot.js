const Discord = require('discord.js');
const http = require('http');
const client = new Discord.Client();

http.createServer().listen(process.env.PORT);

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