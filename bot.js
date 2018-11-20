//Require the discord.js module
const fs = require('fs');
const Discord = require('discord.js');

//Require the config.json file
const { prefix, token } = require('./config.json');

//Create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Checks through all files in the command folder and put all files that end with .js into an array.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    //Set a new item in the Collection
    //With the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

//Login to Discord with your app's token
client.login(token);

//When the client is ready, run this code:
//Triggers when the bot - finishes logging in or - reconnects after disconnecting
client.on('ready', () => {
    console.log(`Bot ready!\nLogged in as ${client.user.tag} (${client.user.id}) on ${client.guilds.size} servers.`);
	client.user.setActivity(`${prefix}help`);
});

client.on('message', message => {

    //Makes sure that the message starts with the prefix and that it's not sent by a bot.
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    //Removes the prefix, extra spaces before and after the message and splitting up the arguments.
    //Using / +/g instead of ' ' makes so there won't be any problems if there are more than 1 space between words in the command.
    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

    //Checks for alias for commands
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

    //Make commands only usable on servers.
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply(`I can't execute that command inside DMs!`);
	}

    //Message author if there are no arguments in the command.
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

    //Checks if the player are on cooldown
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${command.name}\` command again.`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
        message.reply('Error while trying to exectute that command!');
    }

});
