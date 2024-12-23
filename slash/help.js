const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides assistance and shows available commands."),
  async execute(interaction) {
    const prefixCommands = interaction.client.commands.map(cmd => `${cmd.name}`).join(", ");
    const slashCommands = interaction.client.slashCommands.map(cmd => `/${cmd.data.name}`).join(" ");

    const embed = new EmbedBuilder()
      .setColor("#87ceeb")
      .setTitle("HELP SECTION")
      .addFields(
        { name: `My prefix is "${process.env.PREFIX}"` },
        { name: "Prefix Commands", value: `\`\`\`${prefixCommands}\`\`\`` || "No prefix commands available.", inline: false },
        { name: "Slash Commands", value: `\`\`\`${slashCommands}\`\`\`` || "No slash commands available.", inline: false }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
