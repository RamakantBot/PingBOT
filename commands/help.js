const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Madat karnari command",
  async execute(message, args) {
    const prefixCommands = message.client.commands.map(cmd => `\`\`\`${cmd.name}\`\`\``).join(", ");
    const slashCommands = message.client.slashCommands.map(cmd => `\`\`\`/${cmd.data.name}\`\`\``).join(", ");

    const embed = new EmbedBuilder()
      .setColor("#87ceeb")
      .setTitle("HELP SECTION")      
      .addFields(
        { name: "Prefix Commands", value: prefixCommands || "No prefix commands available.", inline: false },
        { name: "Slash Commands", value: slashCommands || "No slash commands available.", inline: false }
      );
      
    message.channel.send({ embeds: [embed] });
  },
};
