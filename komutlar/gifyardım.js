const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const talkedRecently = new Set();
let botid = ('952290814271307796') 

exports.run = async(client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "k!";  
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`**Darking Bot  Gif Menüsüne Hoşgeldiniz**`)
        .setDescription(`
 
        **${prefix}gif-ara** Yazdığınız Kelime Hakkında Gif Aratır!
        **${prefix}man-gif** Rastgele Erkek Gifi Atar!
        **${prefix}woman-gif** Rastgele Kadın Gifi Atar!
        **${prefix}couple-gif** Rastgele Sevgili Gifi Atar!
        **${prefix}baby-gif** Rastgele Bebek Gifi Atar!
        **${prefix}animal-gif** <a:sagok:749305875188940983> Rastgele Hayvan Gifi Atar!
        **${prefix}marvel-gif** <a:sagok:749305875188940983> Rastgele Marvel Gifi Atar!
▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»  ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**
**»  ${prefix}prefix-sıfırla __Yazarak Ayarladığınız Prefixi Sıfırlayabilirsiniz.__**

`)
              .addField(`» Darking Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=952290814271307796&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/HxWp87x3gX)`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Gif-menü'],
  permLevel: 0,
};

exports.help = {
  name: 'gif-menü',
  description: 'a!davet-sistemi Menüsü',
  usage: 'gif-menü'
};