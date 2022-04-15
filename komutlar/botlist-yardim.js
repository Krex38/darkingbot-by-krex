const Discord = require('discord.js');
exports.run = async (client, message, args) => {
const embed = new Discord.MessageEmbed()
.setTitle(':pencil:  Yardım Menüsü  :pencil:')
.setDescription(`:book:  __**ANA KOMUTLAR**__  :book:\n \n :pushpin:  __k!bot ekle__ = Bot eklersiniz \n \n:pushpin:  __k!bot onayla__ = Bot onaylarsınız \n \n:pushpin:  __!bot reddet__ = Bot reddedersiniz \n \n:pushpin:  __k!bot bilgi__ = Bot hakkında bilgi alırsınız \n \n :tools:  __**AYARLAMA KOMUTLARI**__  :tools: \n \n:pushpin:  __k!botlist ayarlar__ = Botlist ayarlarını görürsünüz \n \n  :pushpin:  __k!botlist kanal = Botlist kanal ayarlarsınız__ \n \n :pushpin:  __k!botlist developer-rol__ = Botlist developer rol ayarlarsınız \n \n :pushpin:  __k!botlist yetkili-rol__ = Botlist yetkili rol ayarlarısınız \n \n :pushpin:  __k!botlist log__ = Botlist log ayarlarsınız \n \n :pushpin:  __k!botlist başvuru-log__ = Botlist başvuru log ayarlarsınız \n \n :pushpin:  __k!botlist dm-takip__ = Botlist dm takip sistemini ayarlarsınız`)
.setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'botlist-yardım'
};