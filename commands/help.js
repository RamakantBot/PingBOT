const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Madat karnari command",
  async execute(message, args) {
    const prefixCommands = message.client.commands.map(cmd => `\`${cmd.name}\`: ${cmd.description || "JAANKARI UPLABDH NAHI HAI"}`).join("\n");
    const slashCommands = message.client.slashCommands.map(cmd => `\`/${cmd.data.name}\`: ${cmd.data.description || "JAANKARI UPLABDH NAHI HAI"}`).join("\n");

    const embed = new EmbedBuilder()
      .setColor("#87ceeb")
      .setTitle("HELP SECTION")      
      .setDescription("list of all commands")
      .addFields(
        { name: "Prefix Commands", value: prefixCommands || "No prefix commands available.", inline: false },
        { name: "Slash Commands", value: slashCommands || "No slash commands available.", inline: false }
      )
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
      

    message.channel.send({ embeds: [embed] });
  },
};
