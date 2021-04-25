const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');

bot.login('BOT_TOKEN'); //Add your own Discord bot token

const prefix = "/" //Bot command prefix
const CMD = 'ping'; //Command to trigger
let mcIP = 'mc.server.net'; //Add your Minecraft server IP
let mcPort = 25565; //The port of the server, default it 25565
let serverName = 'Minecraft Server'; //Your server name
let serverUrl = "https://minecraft.net"; //Server website
let serverLogo = "https://images-eu.ssl-images-amazon.com/images/I/512dVKB22QL.png"; //Server logo

bot.on('message', message => {

	if (message.content === prefix + CMD) {
		let url = `http://mcapi.us/server/status?ip=${mcIP}&port=${mcPort}`;
		
		(async () => {
			try {
				const { online, players } = await fetch(url).then(response => response.json());

				let status = "Offline"
				let color = 16711680
				if (online) {
					status = "Online";
					color = 65280
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
						"value": `**${players.now}** / **${players.max}**`,
						"inline": true
					}
					],
					"footer": {
					"text": `IP: ${mcIP}, Port: ${mcPort}`
					}
				};
				message.channel.send({ embed });

			} catch (error) {
				console.log(error);
				return message.channel.send('Error while getting Minecraft server status...');
			}
		})();
	};
});

bot.on('ready', () => {
	bot.user.setActivity(prefix + CMD)
});
