module.exports = {
    name: 'status',
    description: 'Ping a Minecraft Server',
    cooldown: 30,
    usage: '<IP> <Port>',
    aliases: ['serverstatus', 'mcserver', 'mcstatus', 'mcping'],
    execute(message, args) {
      const request = require('request');
      let serverName = 'Minecraft Server'; //Change predefined server name
      let serverUrl = 'https://minecraft.net'; //Change predefined website
      let serverLogo = "https://images-eu.ssl-images-amazon.com/images/I/512dVKB22QL.png"; //Change predefined logo
  
      let mcIP = args[0] || 'mc.minecraft.net'; //Change predefined ip
      let mcPort = args[1] || 25565; //Change predefined port
      let url = `http://mcapi.us/server/status?ip=${mcIP}&port=${mcPort}`
      
      request(url, function (error, response, body) {
        if (error) {
          console.log(error);
          return message.channel.send('Error while getting Minecraft server status...');
        }
  
        body = JSON.parse(body);
        let status = 'Offline'
        let color = 16711680
        let players = 0
        if (body.online) {
          status = 'Online';
          color = 65280
        }
        if (body.players.now) {
          players += body.players.now;
        }
        else {
          players += 0
        }
  
        const embed = {
          "author": {
            "name": `${serverName} Server Status`,
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
              "value": `**${body.players.now}** / **${body.players.max}**`,
              "inline": true
            }
          ],
          "footer": {
            "text": `IP: ${mcIP} ${mcPort}`
          }
        };
        message.channel.send({ embed });
      });
  
    },
  };
