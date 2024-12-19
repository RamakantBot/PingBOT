const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("bot prefix"),
  async execute(interaction) {
    await interaction.reply(`My prefix is "${PREFIX}"`);
  },
};
