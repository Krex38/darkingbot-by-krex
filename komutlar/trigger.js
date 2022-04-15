const Discord = require('discord.js');
const canvacord = require("canvacord");

exports.run = async (client, message, args) => {

  const member = message.mentions.members.first() || 
  message.guild.members.cache.get(args[0]) || 
  message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || 
  message.member;
  let avatar = member.user.displayAvatarURL({
    dynamic: false,
    format: "png"
  });

  const embed = new Discord.MessageEmbed()
    .setDescription('Loading..')
    .setTimestamp()
  let messages = await message.channel.send(embed)
  let image = await canvacord.Canvas.trigger(avatar);
  let attachment = new Discord.MessageAttachment(image, " triggered.gif")
  return message.channel.send({ files: [attachment] }).then(messages.delete())

}


exports.conf = {
  aliases: ['trigger'],
  permLevel: 0,
  kategori: "Eğlence",
};

exports.help = {
  name: 'Trigger',
  description: 'İstediğiniz kullanıcıya trigger effecti ekler.',
  usage: 'trigger <etiket veya isim>',
};