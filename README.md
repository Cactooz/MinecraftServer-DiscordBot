# Minecraft Server Status Discord Bot

This simle Discord bot let's you ping your Minecraft server to see if it's online/offline.

# How to host the bot using Glitch.com

* First of all make an account on [Glitch](glitch.com), using GitHub.
* Then click on **New Project** and then on **hello-express** (simple node app).
* Go up to the right of your screen and click on the profile icon. Disable the option **Refresh App on Changes**.
* Remove the files: **public/client.js**, **public/style.css**, **views/index.html** (and README.md).
* Now remove everything inside of both **package.json** and **server.js**.
* And put this code into **package.json**.
```
{
  "name": "Server-Status",
  "description": "Minecraft-Server-Status",
  "version": "0.0.0",
  "main": "bot.js",
  "scripts": {
    "start": "node bot.js"
  },
  "engines": {
    "node": "8.4.0"
  },
  "dependencies": {
    "request": "^2.88.0",
    "discord": "^0.8.2",
    "discord.js": "^11.4.2"
  }
}
```
* And put this code into **server.js**.
```
const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
 console.log(Date.now() + " Just got pinged!");
 response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
 http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
```
* Then make a new file called **watch.json** and paste this code inside of the file.
```
{
"install": {
 "include": [
   "^package\\.json$",
   "^\\.env$"
 ]
},
"restart": {
 "exclude": [
   "^public/",
   "^dist/"
 ],
 "include": [
   "\\.js$",
   "\\.json"
 ]
},
"throttle": 600000
}
```
This does so the bot will only be updated once per 10 minutes, due to that if your Discord Bot gets pinged 1000+ times per hour then it will change it's token.

* Now, make a new file called **bot.js** and add everything from the **bot.js** file in this repository.

### That should be it, now you just need to configure your **Discord bot token**, **Minecraft server IP**, **Minecraft server port** (and messages if you feel to do that).

## If you want to be extra safe then follow these last steps.

* To make it even more safe, go up to the left of your screen and click at the **Project Options**.
* In there you should see a lock that looks something like this ![lock](https://i.imgur.com/MtiEHlC.png). Click on that so it locks, like this ![locked](https://i.imgur.com/HamDEEC.png).

Done, now only you will be able to view the project, except if you invite anyone else to help you.

## To be even more safe
* Now go into your **.env** file. That looks like this ![.env file](https://i.imgur.com/fwED4kn.png?1) and remove everything inside of it.
* Then add this into that file indsted.
```
BOT_TOKEN=abc123 //change to your Discord bot token
SERVER_IP=mcserver.net //change to your Minecraft server IP
SERVER_PORT=25565 //change to your Minecraft server port
```
* After you have done that then you will need to go into your **bot.js** file and change some stuff.
* The rows **3**, **7** & **8** should be changed to this:

### ROW 3
```
client.login(process.env.BOT_TOKEN);
```
### ROW 7
```
var mcIP = (process.env.SERVER_IP);
```
### ROW 8
```
var mcPort = (process.env.SERVER_PORT);
```
This does so it's only you that can see the Bot Token, Server IP and Server Port.

## Extra

Check out the [wiki](https://github.com/TheCactusMonkey/MinecraftServer-DiscordBot/wiki) for help how to configure your bot using Glitch.com or Heroku.com
