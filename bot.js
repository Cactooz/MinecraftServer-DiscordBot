const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');

const {prefix, command, token, defaultIP, serverName, serverUrl, serverLogo} = require('./config.json');

bot.login(token);

bot.on('ready', () => {
	console.log(`\n${bot.readyAt} - Bot ready and connected!\nLogged in as ${bot.user.tag} (${bot.user.id}) on ${bot.guilds.cache.size} server(s).`);
	bot.user.setActivity(prefix + command)
});

bot.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (commandName === command) {

		const mcIP = args[0] || defaultIP;
		const mcPort = args[1] || 25565;

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
