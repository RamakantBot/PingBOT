const { Client, GatewayIntentBits, Collection, REST, Routes } = require("discord.js");
const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require('express');

// const uri = process.env.mongoURL;

const BOT_CONFIG = {
  TOKEN: process.env.TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
  PREFIX: "!",
}; 

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.slashCommands = new Collection();

const commandPath = path.join(__dirname, "commands");
if (fs.existsSync(commandPath)) {
  const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`${commandPath}/${file}`);
    client.commands.set(command.name, command);
  }
}

const slashPath = path.join(__dirname, "slash");
if (fs.existsSync(slashPath)) {
  const slashFiles = fs.readdirSync(slashPath).filter(file => file.endsWith(".js"));
  for (const file of slashFiles) {
    const command = require(`${slashPath}/${file}`);
    client.slashCommands.set(command.data.name, command);
  }
}

(async () => {
  const slashCommands = client.slashCommands.map(command => command.data.toJSON());
  const rest = new REST({ version: "10" }).setToken(BOT_CONFIG.TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(BOT_CONFIG.CLIENT_ID), {
      body: slashCommands,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error registering slash commands:", error);
  }
})();

client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);
});


client.on("messageCreate", message => {
   const mention = `<@${client.user.id}>`;

  if (message.content === mention) {
    message.channel.send("Kya Hai?");
    return;
  }

   const prefix = BOT_CONFIG.PREFIX || mention;

if (!(message.content.startsWith(prefix)) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) {
    console.error(`No command matching "${commandName}" was found.`);
    return;
  }

try {
    command.execute(message, args);
  } catch (error) {
    console.error(`Error executing command "${commandName}":`, error);
    message.reply("There was an error executing that command.");
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.slashCommands.get(interaction.commandName);
  if (!command) {
    console.error(`No slash command matching "${interaction.commandName}" was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing slash command "${interaction.commandName}":`, error);
    await interaction.reply({
      content: "There was an error executing this command.",
      ephemeral: true,
    });
  }
});

client.login(BOT_CONFIG.TOKEN);


//Render Pinger
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Jinda hu mai!'));

app.listen(port, () =>
console.log(`${port}`)
);
