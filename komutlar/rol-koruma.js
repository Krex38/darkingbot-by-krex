const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
	 if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komutu kullanabilmek için **Sunucu Sahibi** olmalısın!')
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "k!";
  if (kontrol == "agayokaga") {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Lütfen log kanalını etiketleyiniz!`);
      message.channel.send(embed);
      return;
    }
    db.set(`rolk_${message.guild.id}`, kanal.id);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Rol koruma log kanalı; ${kanal} olarak ayarlandı!`);
    message.channel.send(embed);
    return;
  } else {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Lütfen Bir Log Kanalını Etiketleyiniz`);
      message.channel.send(embed);
      return;
    }
    db.set(`rolk_${message.guild.id}`, kanal.id);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Rol Koruma Log Kanalı; ${kanal} olarak Ayarlandı!`);
    message.channel.send(embed);
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["role-protection"],
  permLevel: 3
};

exports.help = {
  name: "rol-koruma",
  description: "rol-koruma",
  usage: "rol-koruma"
};
