client.on("message", function(message) {
    if (message.author.equals(client.user)) return;
  
    if (!message.content.startsWith(PREFIX)) return;
  
    var args = message.content.substring(PREFIX.length).split(" ");
  
    switch (args[0].toUpperCase()) {
      case "PING":
          message.channel.sendMessage('Pong!');
          break;
      case "EMBED":
          var embed = new Discord.RichEmbed()
              .addField("hey bro", "faz sol", true)
              .addField("hey bro", "faz sol", true)
              .addField("hey bro", "faz sol")
  
          message.channel.sendEmbed(embed);
          break;
      default:
          message.channel.sendMessage("Comando inválido!")
          break;
  
    }
  });