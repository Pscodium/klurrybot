var botconfig = require("./botconfig.json");
var Discord = require('discord.js');
var client = new Discord.Client()
var fs = require("fs");
var weather = require('weather-js');



const PREFIX = "p;";


client.commands = new Discord.Collection()





client.on('ready', () => {
  console.log(`Bot logado como ${client.user.tag}!`);
});






fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    var jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
     console.log("Não conseguimos encontrar a pasta Commands.");
     return;
  }
  
 jsfile.forEach((f, i) =>{
    var props = require(`./commands/${f}`);
   console.log(`${f} Carregada!`);
   client.commands.set(props.help.name, props);
  });
});
  











  client.on('message',message =>{
    var prefix = "p;"
    if (!message.guild)return;
    if (message.author.id !== '459128770239135764' && !message.content.startsWith(prefix + 'geral')) return;
    if (message.content.startsWith(prefix + 'geral')){
    var embed = new Discord.RichEmbed()
embed.setTitle('Anúncio Geral do Servidor: '+message.guild.name)
embed.setImage('https://media.giphy.com/media/Basrh159dGwKY/giphy.gif')
// - embed.setThumbnail(message.author.avatarURL) // -imagem do autor
embed.setColor(65535)
// - embed.setThumbnail(message.guild.iconURL) // -imagem do server
embed.setThumbnail('https://media.giphy.com/media/MVRqTDSNEUZHHyQLDH/giphy.gif')
var desc = message.content.split(' ')
desc.shift()
for (var i=0; i  < message.guild.members.size;i++){
    var member = message.guild.members.array()[i]
    embed.setDescription(`${desc.join(' ')}`)
    member.send({embed})
}}})








client.on('message',message =>{
    var prefix = "p;"
    if (!message.guild)return;
    if (message.author.id !== '459128770239135764' && !message.content.startsWith(prefix + 'evento')) return;
    if (message.content.startsWith(prefix + 'evento')){
    var embed = new Discord.RichEmbed()
embed.setTitle('Anúncio de Evento do Servidor: '+message.guild.name)
embed.setImage('https://media.giphy.com/media/Basrh159dGwKY/giphy.gif')
// - embed.setThumbnail(message.author.avatarURL) // -imagem do autor
embed.setColor(65535)
// - embed.setThumbnail(message.guild.iconURL) // -imagem do server
embed.setThumbnail('https://media.giphy.com/media/MVRqTDSNEUZHHyQLDH/giphy.gif')
var desc = message.content.split(' ')
desc.shift()
for (var i=0; i  < message.guild.members.size;i++){
    var member = message.guild.members.array()[i]
    embed.setDescription(`${desc.join(' ')}`)
    member.send({embed})
}}})



client.on('message', msg => {
  var prefix = "p;"
    if (msg.content === prefix + 'ola') {
      msg.reply('Hey, tudo certo?')
    }
});




client.on("message", async message => {
if(message.author.bot) return;
if(message.channel.type === "dm") return;

var prefix = 'p;';
var messageArray = message.content.split(" ");
var msg = messageArray[0];
var args = messageArray.slice(1);

if(msg === prefix + `kick`){

  //p;kick @daeshan floodando

  var kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Usuário não encontrado!");
  var kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Você não pode usar esse comando!");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Essa pessoa não pode ser kickada");

  var kickEmbed = new Discord.RichEmbed()
  .setDescription("**EXPULSO**")
  .setColor("#e56b00")
  .addField("Usuário Expulso:", `${kUser}`)
  .addField("Expulso Por:", `<@${message.author.id}>`)
  .addField("Expulso Em:", message.channel)
  .addField("Horário:", message.createdAt)
  .addField("Razão:", kReason);

  var kickChannel = message.guild.channels.find(`name`, "punições");
  if(!kickChannel) return message.channel.send("Não é possível encontra chat de comandos staff!");

  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);

  return;
}

if(msg === prefix + `ban`){

  var bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Usuário não encontrado!");
  var bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Você não pode usar esse comando!");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Essa pessoa não pode ser Banida!");

  var banEmbed = new Discord.RichEmbed()
  .setDescription("**BANIMENTO**")
  .setColor("#bc0000")
  .addField("Usuário Banido:", `${bUser}`)
  .addField("Banido por:", `<@${message.author.id}>`)
  .addField("Banido no:", message.channel)
  .addField("Horário:", message.createdAt)
  .addField("Razão:", bReason);

  var incidentchannel = message.guild.channels.find(`name`, "punições");
  if(!incidentchannel) return message.channel.send("Não Encontrei o chat de comandos staff.");

  message.guild.member(bUser).ban(bReason);
  incidentchannel.send(banEmbed);


  return;
}


if(msg === prefix + `reporte`){

  //!report @ned this is the reason

  var rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Usuário não encontrado!");
  var rreason = args.join(" ").slice(22);

  var reportEmbed = new Discord.RichEmbed()
  .setDescription("Reportes")
  .setColor("#15f153")
  .addField("Usuário reportado:", `${rUser}`)
  .addField("Reportado por:", `${message.author}`)
  .addField("Canal:", message.channel)
  .addField("Horário:", message.createdAt)
  .addField("Razão:", rreason);

  var reportschannel = message.guild.channels.find(`name`, "punições");
  if(!reportschannel) return message.channel.send("Não foi possível encontrar chat o de reportes.");


  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);

  return;
}




if(msg === prefix + `server`){

  var sicon = message.guild.iconURL;
  var serverembed = new Discord.RichEmbed()
  .setDescription("**INFORMAÇÃO DO SERVER**")
  .setColor("#00FBFF")
  .setThumbnail(sicon)
  .addField("Nome do server:", message.guild.name, true)
  .addField("Membros:", message.guild.memberCount, true)
  .addField("Criado Em:", message.guild.createdAt)
  .addField("Você entrou:", message.member.joinedAt);

  return message.channel.send(serverembed);
}


// ---------- CORES --------------------//



if(msg === prefix + `verde`){

  if(!message.member.roles.some(r=>["Dono", "Admin"].includes(r.name)) )
  return message.reply("Desculpe mas você não tem permissões para usar este comando!");
  var desc = message.content.split(' ').slice(1);
  var sayembed = new Discord.RichEmbed()
  // -.setDescription(`${desc.join(' ')}`)
  .setTitle("Anúncio qualquer de:  " + message.author.username)
  .setDescription(`${desc.join(' ')}`)
  .setColor("#1FFF00");

  return message.channel.send(sayembed);
}


if(msg === prefix + `vermelho`){

  if(!message.member.roles.some(r=>["Dono", "Admin"].includes(r.name)) )
  return message.reply("Desculpe mas você não tem permissões para usar este comando!");
  var desc = message.content.split(' ').slice(1);
  var sayembed = new Discord.RichEmbed()
  // -.setDescription(`${desc.join(' ')}`)
  .setTitle("Anúncio qualquer de:  " + message.author.username)
  .setDescription(`${desc.join(' ')}`)
  .setColor("#FF0000");

  return message.channel.send(sayembed);
}


if(msg === prefix + `amarelo`){

  if(!message.member.roles.some(r=>["Dono", "Admin"].includes(r.name)) )
  return message.reply("Desculpe mas você não tem permissões para usar este comando!");
  var desc = message.content.split(' ').slice(1);
  var sayembed = new Discord.RichEmbed()
  // -.setDescription(`${desc.join(' ')}`)
  .setTitle("Anúncio qualquer de:  " + message.author.username)
  .setDescription(`${desc.join(' ')}`)
  .setColor("#F7FF00");

  return message.channel.send(sayembed);
}

if(msg === prefix + `azul`){

  if(!message.member.roles.some(r=>["Dono", "Admin"].includes(r.name)) )
  return message.reply("Desculpe mas você não tem permissões para usar este comando!");  
  var desc = message.content.split(' ').slice(1);
  var sayembed = new Discord.RichEmbed()
  // -.setDescription(`${desc.join(' ')}`)
  .setTitle("Anúncio qualquer de:  " + message.author.username)
  .setDescription(`${desc.join(' ')}`)
  .setColor("#00ECFF");

  return message.channel.send(sayembed);
}


if(msg === prefix + `rosa`){

  if(!message.member.roles.some(r=>["Dono", "Admin"].includes(r.name)) )
  return message.reply("Desculpe mas você não tem permissões para usar este comando!");  
  var desc = message.content.split(' ').slice(1);
  var sayembed = new Discord.RichEmbed()
  // -.setDescription(`${desc.join(' ')}`)
  .setTitle("Anúncio qualquer de:  " + message.author.username)
  .setDescription(`${desc.join(' ')}`)
  .setColor("#FF00FF");

  return message.channel.send(sayembed);
}




if(msg === prefix + `roxo`){

  if(!message.member.roles.some(r=>["Dono", "Admin"].includes(r.name)) )
  return message.reply("Desculpe mas você não tem permissões para usar este comando!");  
  var desc = message.content.split(' ').slice(1);
  var sayembed = new Discord.RichEmbed()
  // -.setDescription(`${desc.join(' ')}`)
  .setTitle("Anúncio qualquer de:  " + message.author.username)
  .setDescription(`${desc.join(' ')}`)
  .setColor("#8B00FF");

  return message.channel.send(sayembed);
}


if(msg === prefix + `laranja`){

  if(!message.member.roles.some(r=>["Dono", "Admin"].includes(r.name)) )
  return message.reply("Desculpe mas você não tem permissões para usar este comando!");  
  var desc = message.content.split(' ').slice(1);
  var sayembed = new Discord.RichEmbed()
  // -.setDescription(`${desc.join(' ')}`)
  .setTitle("Anúncio qualquer de:  " + message.author.username)
  .setDescription(`${desc.join(' ')}`)
  .setColor("#FFC300");

  return message.channel.send(sayembed);
}


if(msg === prefix + `preto`){

  if(!message.member.roles.some(r=>["Dono", "Admin"].includes(r.name)) )
  return message.reply("Desculpe mas você não tem permissões para usar este comando!");  
  var desc = message.content.split(' ').slice(1);
  var sayembed = new Discord.RichEmbed()
  // -.setDescription(`${desc.join(' ')}`)
  .setTitle("Anúncio qualquer de:  " + message.author.username)
  .setDescription(`${desc.join(' ')}`)
  .setColor("#000000");

  return message.channel.send(sayembed);
}


//-------------CORES---------------//



if(msg === prefix + `bot`){

  var bicon = client.user.displayAvatarURL;
  var infoembed = new Discord.RichEmbed()
  .setDescription("**INFORMAÇÃO DO BOT**")
  .setColor("#5900FF")
  .setThumbnail(bicon)
  .addField("Criador do Bot:", `Pscodium`, true)
  .addField("Nome do bot:", client.user.username, true)
  .addField("Criado Em:", client.user.createdAt);

  return message.channel.send(infoembed);
}


if(msg === prefix + `cores`){

  var bicon = client.user.displayAvatarURL;
  var coresembed = new Discord.RichEmbed()
  .setDescription("**CORES EMBED**")
  .setColor("#FFFFFF")
  .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/b/b4/PIL_Tutorial_-_Pixel_editing_-_example.png')
  .addField("Verde", true)
  .addField("Vermelho", true)
  .addField("Amarelo", true)
  .addField("Azul", true)
  .addField("Rosa", true)
  .addField("Roxo", true)
  .addField("Laranja", true)
  .addField("Preto", true)

  return message.channel.send(coresembed);
}



});





//---------------------------------------



client.on('message', message => {

  var prefix = "p;"
  var sender = message.author; 
  var cont = message.content.slice(prefix.length).split(" "); 
  var messageArray = message.content.split(" ");
  var msg = messageArray[0];
  var args = messageArray.slice(1);








  if (msg.startsWith(prefix + 'clear')) { 
    
    async function purge() {
        message.delete(); 

       
        if (!message.member.roles.find("name", "Dono")) { 
            message.channel.send('Você precisa de permissão para usar este comando.'); 
            return; 
        }

        
        if (isNaN(args[0])) {
            
            message.channel.send('Por favor, use uma quantia. \n Use: ' + prefix + 'clear <quantia>'); 
            
            return;
        }

        const fetched = await message.channel.fetchMessages({limit: args[0]}); 
        console.log(fetched.size + ' Mensagens encontradas, deletando...'); 


        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`)); 

    }

   
    purge(); 

}


















  if (msg.startsWith(prefix + 'clima')) { 
   

    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { 
        if (err) message.channel.send(err);

     
        if (result === 0) {
            message.channel.send('**Por favor, coloque uma localização válida.**') 
            return;
        }


        var current = result[0].current; 
        var location = result[0].location; 

       
        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`) 
            .setAuthor(`Clima em ${current.observationpoint}`) 
            .setThumbnail(current.imageUrl) 
            .setColor(0x00AE86) 
            .addField('Horário',`BRT${location.timezone}`, true) 
            .addField('Escala de grau',location.degreetype, true)
            .addField('Temperatura',`${current.temperature} Graus`, true)
            .addField('Sensação de', `${current.feelslike} Graus`, true)
            .addField('Ventos',current.winddisplay, true)
            .addField('Umidade', `${current.humidity}%`, true)

           
            message.channel.send({embed});
    });
}

});




client.on ("guildMemberAdd", member => {


  var role = member.guild.roles.find("name", "novato");
  member.addRole (role);

  member.guild.channels.get('460134171235450890').send('**' + member.user.username + '**, Entrou no servidor!')

});


client.on("guildMemberRemove", member => {
  
  
  member.guild.channels.get('460134171235450890').send('**' + member.user.username + '**, Saiu do servidor!')


});









client.login('NDU5MTI4NzcwMjM5MTM1NzY0.DgxuYg.Fftx7IdnMQIWoi9WpuDdg2cWj2o')