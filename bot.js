const { Client, Attachment } = require('discord.js');
const Http = require('http');
const webshot = require('webshot');
const client = new Client();
const fs = require('fs');

Http.createServer().listen(process.env.PORT);

const sendStats = (channel, username, platform) => {
    const config = {
        windowSize: {
            width: 1920,
            height: 1080
        },
        renderDelay: 1000,
        timeout: 30000,
        captureSelector: '.card-table-container'
    }
    const url = `https://rocketleague.tracker.network/profile/steam/${username}`;
    const filename = `${username}_${Date.now().toString()}.png`;

    webshot(url, filename, config, (err) =>  {
        const attachment = new Attachment(filename, filename);
        channel.send(attachment).then(() => {
            fs.unlink(filename, () => {});
        });
    });
}

client.on("message", (message) => {
    if(message.author.bot) {
        return;
    }

    const { content, channel } = message;
    if(content.startsWith("!rlstats")) {
        const params = content.split(' ').slice(1);
        console.log(content);
        channel.send("Retrieving stats...");
        
        sendStats(channel, params[0]);
    }
});

client.login(process.env.TOKEN);