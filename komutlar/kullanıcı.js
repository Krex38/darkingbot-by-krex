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
       .setTitle(`**Darking Bot  Kullanıcı Menüsüne Hoşgeldiniz**`)
        .setDescription(`
  **» ${prefix}avatar** Avatarınızı Atar.
  **» ${prefix}sunucutanıt** Sunucunuzu Tanıtır.
  **» ${prefix}kullanıcı-bilgi** Etiketlediğiniz Kişinin Kullanıcı Bilgisini Gösterir.
  **» ${prefix}kanalbilgi ** Belirtilen Kanal Hakkında Bilgi Verir.
  **» ${prefix}davet** Botu Davet Edersiniz!
  **» ${prefix}korona ** Korona Hakkında Bilgi Alırsınız.
  **» ${prefix}id ** Etiketlediğiniz Kişini İD sini atar.
  **» ${prefix}mcskin ** İsmini Girdiğiniz Skini Fotosunu Atar.
  **» ${prefix}emoji-bilgi** İsmini Yazdığınız Emoji Hakkında Bilgi Alırsınız.
  **» ${prefix}saat ** Saati Gösterir.(Kendinde Bakabilirsin Ama)
  **» ${prefix}say** Sunucuda ki Üye Durumlarını Gösterir.
  **» ${prefix}sunucu-bilgi** Sunucu Hakkın da Bilgi Verir.
  **» ${prefix}sunucu-resim** Sunucunun İconunu Atar.
  **» ${prefix}yetkilerim** Sunucuda ki Yetkilerinizi Gösterir.
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
  aliases: ['kullanıcı'],
  permLevel: 0,
};

exports.help = {
  name: 'kullanıcı',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kullanıcı'
};