const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login('BOT_TOKEN'); //Add your own Discord bot token

const prefix = "/" //Bot command prefix
var request = require('request');
var CMD = 'PING'; //Command to trigger, keep it UPPERCASE!
var serverName = 'Minecraft Server'; //Your server name

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
      var status = '__Server Status:__ **' + serverName + '** is currently offline';
      if (body.online) {
        status = '__Server Status:__ **' + serverName + '** is **online**  -  ';
        if (body.players.now) {
          status += '**' + body.players.now + '/' + body.players.max + '** players are online!';
        } else {
          status += '*Noone are online!*';
        }
      }
      message.channel.send(status);
    });
  }
});

bot.on('ready', () => {
  client.user.setActivity(prefix + CMD)
});
