module.exports = {
  name: "ping",
  description: "PING YO MAMA",
  execute(message, args) {
    const user = message.mentions.users.first();

    if (user) {
      message.channel.send(`${user}`);
    } else {
      const sentMessage = Date.now();
      message.reply("pong!").then(() => {
        const latency = Date.now() - sentMessage;
        message.channel.send(`Latency: ${latency} ms`);
      });
    }
  },
};
