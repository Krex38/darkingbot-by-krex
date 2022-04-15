const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`**${message.guild.members.cache.random().user.tag}** sunucudaki Ali Vefa sensin.`).setImage('https://66.media.tumblr.com/549f3b58605bf618e2808921b32d54ad/tumblr_pz5uuk53Fg1y4slboo1_250.gifv').setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022'));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = { 
  name: 'alivefa', 
  description: 'Sunucudaki şanslı Ali Vefa\'yı gösterir.',
  usage: 'alivefa',
  kategori: 'kullanıcı'
};