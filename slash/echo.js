const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Make bot send a message")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Message")
        .setRequired(true)
    ),
  async execute(interaction) {
    
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      await interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
      return;
    } else {
      await interaction.reply({
        content: "Message Sent!",
        ephemeral: true,
      });
    }

    const message = interaction.options.getString("message");
    await interaction.channel.send(message);
  },
};
