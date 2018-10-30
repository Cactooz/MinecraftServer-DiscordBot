const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login('BOT-TOKEN'); //Add your own Discord bot token

const prefix = "!" //Bot command prefix
var request = require('request');
var CMD = 'PING'; //Command to trigger, keep it UPPERCASE!
var mcIP = 'mc.hypixel.net'; //Add your Minecraft server IP
var mcPort = 25565; //The port of the server, default it 25565
var serverName = 'Minecraft Server'; //Your server name
var serverUrl = 'minecraft.net'; //Server website
var serverLogo = 'https://images-eu.ssl-images-amazon.com/images/I/512dVKB22QL.png'; //Server logo
var color = 0xFF0000 //Hex color for the embed, use 0x instead of #

//Server ping message
bot.on('message', message => {

  let msg = message.content.toUpperCase();

  if (message.content === prefix + CMD) {
    var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
    request(url, function (err, response, body) {
      if (err) {
        console.log(err);
        return message.reply('Error getting Minecraft server status...');
      }

      body = JSON.parse(body);
      var status = "Offline"
      if (body.online) {
        status = "Online"
      }

      message.channel.send({
        embed: {
          "author": {
            "name": serverName + "Server Status",
            "url": serverUrl,
            "icon_url": serverLogo
          },
          "color": color,
          "fields": [
            {
              "name": "Status:",
              "value": status
            }
          ],
          "footer": {
            "text": "IP: minecraft.net"
          }
        }
      });
    });
  }
});

//Bot Game: displays prefix and command
bot.on('ready', () => {
  bot.user.setActivity(prefix + CMD)
});
