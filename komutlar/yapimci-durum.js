const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    let user = client.users.cache.get("893148229674356806");
    let emoj;
    let durum;
  if(user.presence.status === "online"){
       durum = "Şu anda online! Mesaj atabilirsin!"
       emoj = "<:online:963743585566621726>"
    } else if (user.presence.status === "dnd"){
       durum = "Lütfen rahatsız etmeyin."
       emoj = "<:durum_rahatsizetmeyin:963746611798900776>"
    } else if(user.presence.status === "offline"){
       durum = "Şu anda çevrimdışı. Mesajınızı bırakabilirsiniz."
       emoj = "<:offline:963743703078436884>"
    } else if(user.presence.status === "idle"){
       durum = "Boş boş geziyor. Hızlı cevap almanız yüksek ihtimal... :D"
       emoj = "<:durum_bosta:963746928053616671>"
    }
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Geliştirici Bilgileri`, client.user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL({dynamic: true}))
    .addFields(
        {name: `>>> Bot Geliştiricisi:`, value:`<:developer:963751635417448488> ${user.tag}`, inline: false},
        {name: ">>> Durum:", value:`${emoj} ${durum}`, inline: false},
    )
    message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: []
  }
  exports.help = {
      name: "yapımcı-durum",
      description: "covid-19",
      usage: "aşı olun :)",
  }