module.exports = {
  name: "ping",
  description: "pong.",
  execute(message, args) {
 const user = message.mentions.users.first();

    if (user) {
  message.channel.send(`${user} namaskar 🙏`);
    } else {
  const sent_time = Date.now();
      message.reply("pong!").then((msg) => {
   const latency = Date.now() - sent_time;
        message.channel.send(`Latency: ${latency} ms`);
      });
    };
  };
};
