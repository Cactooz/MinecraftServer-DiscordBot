const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login('BOT_TOKEN'); //Add your own Discord bot token

const prefix = "/" //Bot command prefix
var request = require('request');
var CMD = 'ping'; //Command to trigger
var mcIP = 'mc.server.net'; //Add your Minecraft server IP
var mcPort = 25565; //The port of the server, default it 25565
var serverName = 'Minecraft Server'; //Your server name
var serverUrl = "https://minecraft.net"; //Server website
var serverLogo = "https://images-eu.ssl-images-amazon.com/images/I/512dVKB22QL.png"; //Server logo

bot.on('message', message => {

  if (message.content === prefix + CMD) {
    var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
    request(url, function (err, response, body) {
      if (err) {
        console.log(err);
        return message.reply('Error getting Minecraft server status...');
      }
      
      body = JSON.parse(body);
      var status = "Offline"
      var color = 16711680
      if (body.online) {
        status = "Online";
        color = 65280
      }
      var players = 0
      if (body.players.now) {
        players += body.players.now;
      }
      else {
        players += 0
      }
      
      const embed = {
        "author": {
          "name": serverName + " Server Status",
          "url": serverUrl,
          "icon_url": serverLogo
        },
        "color": color,
        "fields": [
          {
            "name": "Status:",
            "value": status,
            "inline": true
          },
          {
            "name": "Players Online:",
            "value": "**" + body.players.now + "** / **" + body.players.max + "**",
            "inline": true
          }
        ],
        "footer": {
          "text": "IP: " + mcIP
        }
      };
      message.channel.send({ embed });
    });
  };
});

bot.on('ready', () => {
  bot.user.setActivity(prefix + CMD)
});

