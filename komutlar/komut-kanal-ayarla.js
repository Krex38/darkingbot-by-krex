const db = require("quick.db")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
 
  let arg1 = args[0]

  let arg2 = args[1]

  if(!arg1) return message.channel.send('<a:ininal_uyar:963740472843579392> Dur! Bir kanal belirtlemen lazim!')

  db.set(`kanalkomutucsy_${message.guild.id}`, arg1)

  return message.channel.send(`<a:gifstoryYesilTik:963738945169031218> Basariyla Komut Kanali <#{arg1}> Olarak Ayarlandi!`)
}

exports.conf = {
    enabled : true,
    guildOnly : true,
    aliases : ['channelset'],
    permLevel : 0
}

exports.help = {
    name : 'komut-kanal-ayarla',
    description: '',
    usage: ''
}