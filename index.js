const { Client, GatewayIntentBits, Collection, REST, Routes } = require("discord.js");
const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require('express');

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
  if (!message.content.startsWith(BOT_CONFIG.PREFIX) || message.author.bot) return;

  const args = message.content.slice(BOT_CONFIG.PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) {
    console.error(`No command matching "${commandName}" was found.`);
    return;
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(`Error executing prefix command "${commandName}":`, error);
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
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
