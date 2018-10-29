const Discord = require('discord.js');
const client = new Discord.Client();
client.login(BOT_TOKEN); //add your own Discord bot token

const prefix = "/" //bot command prefix
var request = require('request');
var CMD = 'ping'; //command to trigger
var mcIP = 'mc.hypixel.net'; //add your Minecraft server IP
var mcPort = 25565; //the port of the server, default it 25565

//server ping message
client.on('message', message => {
    if (message.content === prefix + CMD) {
        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            var status = '__Server Status:__ **Minecraft Server** is currently offline';
            if(body.online) {
                status = '__Server Status:__ **Minecraft Server** is **online**  -  ';
                if(body.players.now) {
                    status += '**' + body.players.now + '/' + body.players.max + '** players are online!';
                } else {
                    status += '*Noone are online!*';
                }
            }
            message.channel.send(status);
        });
    }
});

//bot status
bot.user.setStatus('Online')

//bot game displays prefix and command
client.on("ready"), () => {
    client.user.setGame(prefix + CMD)
});
