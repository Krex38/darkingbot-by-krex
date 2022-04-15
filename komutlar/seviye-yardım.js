const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
const db = require("quick.db");
let botid = ('952290814271307796') 
exports.run = async(client, message, args) => {
 let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "k!"; 
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`**Darking Bot Seviye Menüsüne Hoşgeldiniz**`)
        .setDescription(`
 
  **» ${prefix}seviye** Mevcut Olduğunuz Seviyeyi Gösterir.
  **» ${prefix}seviye-ayarlar** Sunucuda Aktif Olan Seviye Ayarlarını Gösterir.
  **» ${prefix}seviye-rol** İstenilen Seviyeye Gelince Verilecek Rolü Ayarlar.
  **» ${prefix}seviye-sıfırla ** Mevcut Seviye Sistemini Sıfırlar
  **» ${prefix}seviye-sınır ** Maksimum Kazanılanabilecek Seviyeyi Belirler.
  **» ${prefix}seviye-xp ** Bir Mesaj Başına Verilecek Xp yi ayarlar.
  **» ${prefix}seviye-top ** Sunucuda ki En yüksek 5 Kişiyi Gösterir
  **» ${prefix}seviye-rütbeler ** Hangi Seviye de Rol Verilecek Onu Gösterir.
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
  aliases: ['seviye-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'seviye-yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'seviye-yardım'
};