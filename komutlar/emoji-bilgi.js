const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let emojiname = args[0];
  const emoji = message.guild.emojis.cache.find(
    doktorbot => doktorbot.name === `${emojiname}`
  );
  if (!emojiname)
    return message.channel.send(
      ":gem: **Emoji ismi yazmalısın** :gem:"
    );
  const doktorbot = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(`${emoji.url}`)
    .addField("Emojinin ismi", `${emojiname}`)
    .addField("Emoji ID", `${emoji.id}`)
    .addField("Link", `${emoji.url}`)
    .setTimestamp();
  message.channel.send(doktorbot);
  console.log(doktorbot);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["emoji-info"],
  permLevel: 0
};

exports.help = {
  name: "emoji-bilgi",
  description: "",
  usage: ""
};