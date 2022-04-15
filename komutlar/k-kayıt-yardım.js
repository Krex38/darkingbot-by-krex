const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db =  require("quick.db");
const talkedRecently = new Set();

let botid = ('952290814271307796') 
exports.run = async(client, message, args) => {
 let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "k!";
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`**20kege Bot Kayıt Menüsüne Hoşgeldiniz**`)
        .setDescription(`
 
  **» ${prefix}alınacak-rol** Kayıt Edilen Kişiden Alınacak Rolü Ayarlar.
  **» ${prefix}alınacak-rol sıfırla ** Kayıt Edilen Kişiden Alınacak Rolü Sıfırlar.
  **» ${prefix}kayıt-kanal** Kayıtın Yapılacağı Kanalı Belirlersiniz.
  **» ${prefix}kayıt-kanal sıfırla** Kayıtın Yapılacağı Kanalı Sıfırlarsınız.
  **» ${prefix}kayıt-hg ** Gelen Kullanıcılara Kayıt Bilgisi Verir.
  **» ${prefix}kayıt-hg sıfırla ** Kayıt Hg sistemini sıfırlar.
  **» ${prefix}kayıt-yetkili** Kayıt Edebilecek Yetkiyi Ayarlar.
  **» ${prefix}kayıt-yetkili sıfırla** Kayıt Edebilecek Yetkiyi Sıfırlar.
  **» ${prefix}erkek-rol ** Kayıt Edilince Verilecek Erkek Rolü Ayarlar.
  **» ${prefix}erkek-rol sıfırla ** Kayıt Edilince Verilecek Erkek Rolünü Sıfırlar.
  **» ${prefix}kız-rol** Kayıt Edilince Verilecek Kız Rolü Ayarlar.
  **» ${prefix}kız-rol sıfırla** Kayıt Edilince Verilecek Kız Rolünü Sıfırlar.
  **» ${prefix}erkek ** Erkekleri Kayıt Etmeye Yarar.
  **» ${prefix}kız ** Kızları Kayıt Etmeye Yarar.
▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»  ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**
**»  ${prefix}prefix-sıfırla __Yazarak Ayarladığınız Prefixi Sıfırlayabilirsiniz.__**

`)
               .addField(`» 20kege Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=952290814271307796&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/HxWp87x3gX)`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayıt-sistemi'],
  permLevel: 0,
};

exports.help = {
  name: 'kayıt-sistemi',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kayıt-sistemi'
};