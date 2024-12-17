module.exports = {
  name: "ping",
  description: "PING YO MAMA",
  execute(message, args) {
    
const user = message.mentions.users.first();
    
    if (user) {      
 message.channel.send(`${user} namaskar 🙏`);
     } else {
  message.channel.send("Kya hai?");
    }
  },
};
