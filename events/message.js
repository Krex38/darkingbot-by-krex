const ayarlar = require('../ayarlar.json');
const Discord = require("discord.js");
const db = require("quick.db");
let talkedRecently = new Set();
module.exports = async message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, );

  let client = message.client;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);

  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  
  /* if(cmd) kısmının üzerine bunu yazıyorsunuz */
  if(cmd && cmd.help.name !== 'bakım-modu') {
  const neblmölçmedimikamk = await require('quick.db').fetch(client.user.id);
  if(neblmölçmedimikamk == true) {
  var DURATION = require('humanize-duration');
  const chimped = await db.fetch(client.user.id+':)');
  var TIMESTAMP = Date.now() - chimped.time;
  var RESULT = DURATION(TIMESTAMP, { language: 'tr', round: true, conjunction: ', ', serialComma: false });
  message.react('❌');
  return message.reply(`***${client.user.username}*** şu anda bakımda.\nYaklaşık ***${RESULT} önce*** bakıma alınmış.\nBakıma alan: ***${chimped.author.tag}***`);
  };
  };
  
  if (cmd) {
    
    // if (cmd) {
//
// }
// olan yerin arasına eklenmeli.
//
// Sorun olursa sohbetten etiket atarsınız.

if (db.get(`user_${message.author.id}.şartlar`) != 'kabul edilmiş') {
      const warningEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`**Ops! Bu botu kullanabilmek için şartları onaylamanız gerekmektedir.**\n\n**📘** butonuna basarak botun kullanım şartlarına bakabilirsin.`)

      const termsOfService = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`**
      1) Botun Ismini kullanip ayni bot acmak yasaktir.
      2) Bota Lag yedirtecek Komut spam yapmak yasaktir.
      3) Aciklardan faydalanmak yasaktir.
      **`)
      .setTitle(`${client.user.username} | Kullanım Şartları`);

      return message.channel.send(warningEmbed).then(async rifleman => {
        await rifleman.react('📘');
        await rifleman.awaitReactions((youth, anasia) => youth.emoji.name == '📘' && anasia.id == message.author.id, { max: 1 })
        .then(async () => {
          await rifleman.reactions.removeAll();
          await rifleman.edit(termsOfService).then(async leavemealone => {
            await leavemealone.react('✅');
            await leavemealone.awaitReactions((youth, anasia) => youth.emoji.name == '✅' && anasia.id == message.author.id, { max: 1 })
            .then(async () => {
              await leavemealone.reactions.removeAll();
              await rifleman.edit(termsOfService.setDescription('**Kullanım şartlarını kabul ettiniz. Artık botu kullanabilirsiniz!**'));
              await db.set(`user_${message.author.id}.şartlar`, 'kabul edilmiş');
            });
          });
        });
      })
    };
    
    let kanalid = db.get(`kanalkomutucsy_${message.guild.id}`)



if(!message.channel.id == kanalid){


let premium = db.get(`premod_${message.author.id}`)

if(!premium) {

return message.channel.send(`:x: Botun Komutlarını Burda Kullanın <#{kanalid}> :x:`)


}


//embed kodu kullana bilirsiniz

} 
    
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms)
	//
	 let karaliste = db.get(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor(`RED`)
 .setDescription(`**${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.gg/kAzYTDt8B2) gelebilirsin!`)
  if(karaliste) return message.channel.send(westraben)
  }
};