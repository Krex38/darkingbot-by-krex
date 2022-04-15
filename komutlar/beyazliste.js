const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(cclient, message, args) => {

if(message.author.id !== "951175665401614337") if(message.author.id !== "893148229674356806") return message.channel.send("Bu komutu sadece sahiplerim kullanabilir.")

let cuser = message.mentions.users.first() || cclient.users.cache.get(args[0])
if(!cuser) return message.channel.send("Bir kullanıcı belirtmelisin!")

message.channel.send("**"+cuser.tag+"** kullanıcısı başarıyla karalisteden çıkarıldı.")
const westra = new Discord.MessageEmbed()
.setColor(`GREEN`)
.setTimestamp()
.setDescription(`**${cuser.tag}** kullanıcısı karalisteden çıkarıldı.`)
.setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
  cclient.channels.cache.get("964434207915016232").send(westra)
db.delete(`ckaraliste.${cuser.id}`)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'beyazliste',
    description: 'Türkiyenin Saatini Gösterir',
    usage: 'gç'
  };
