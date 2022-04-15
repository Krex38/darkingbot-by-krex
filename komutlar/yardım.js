const disbut = require("discord-buttons")
const Discord = require("discord.js")
exports.run = async (client, message, args) => {
  if (message.author.bot) return;
        message.channel.send(`Data loading...`).then(async msj => {
            const botPing = (msj.createdTimestamp - message.createdTimestamp);
            msj.delete();
        const btn1 = new disbut.MessageMenuOption()
            .setLabel('Bot Hakkında')
            .setDescription("Bot hakkında kısmı")
            .setValue('1').setEmoji("869707733509746718")
        const btn2 = new disbut.MessageMenuOption()
            .setLabel('Moderasyon Komutları')
            .setDescription(`Komutları gösterir.`)
            .setValue('2').setEmoji("869707733685927936")
        const btn = new disbut.MessageMenuOption()
            .setLabel('Eğlence Komutları 1')
            .setDescription(`Komutları gösterir.`)
            .setValue('3').setEmoji("869707733685927936")
        
const menu = new disbut.MessageMenu()
        .addOptions(btn1, btn2, btn)
        .setMaxValues(1)
        .setMinValues(1)
        .setID("menu")

const hakkında = new Discord.MessageEmbed()
            .setTitle('Bot Hakkında')
            .setDescription(`>>> Merhaba, aşağıdaki menüden komutlara ulaşabilirsin.**`)
            .setImage(`https://media.discordapp.net/attachments/951825022371115008/964535124173672488/standard.gif`)
        
const embed1 = new Discord.MessageEmbed()
            .setTitle('Komutlar')
            .setDescription("Aşağıda botun sahip olduğu komutların bir listesi bulunmaktaıdır.")
            .addFields(
                {name: `⚙️Sunucu Komutları⚙️`, value:`**Aşağıda genel komutlar bulunmaktadır**`, inline: false},
                {name: `⚙️**Komut**`, value:`>>> Komut açıklaması `, inline: false},
                {name: `⚙️**Komut**`, value:`>>> Komut açıklaması`, inline: false}
                )
            .setTimestamp()
            .setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({dynamic: true}))
            const embed = new Discord.MessageEmbed()
            .setTitle('Komutlar')
            .setDescription("Aşağıda botun sahip olduğu komutların bir listesi bulunmaktaıdır.")
            .addFields(
                {name: `🎃Eğlence Komutları🎃`, value:`**Aşağıda eğlence komutları bulunmaktadır**`, inline: false},
                {name: `🎃**Komut**`, value:`>>> Komut açıklaması.`, inline: false},
                {name: `🎃**Komut**`, value:`>>> Komut açıklaması`, inline: false}
                )
            .setTimestamp()
            .setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({dynamic: true}))
        
        let msg = await message.channel.send({ embed: hakkında, component: menu })

const filter = (menu) => menu.clicker.user.id === message.author.id; //user filter (author only)
        const collector = message.createMenuCollector(filter, { time: 120000 });
        client.on("clickMenu", menu => {
            if(menu.clicker.id !== message.author.id) return;
            menu.reply.defer();
            if (menu.values[0] === '1') {
           //kod ekleyebilirsiniz
                   msg.edit({
                    embed: hakkında,
                })
            }
            if (menu.values[0] === '2') {
              //kod ekleyebilirsiniz
                     msg.edit({
                    embed: embed1,
                })
            }
            if (menu.values[0] === '3') {
              //kod ekleyebilirsiniz
                msg.edit({
                    embed: embed,
                })
            }
})
        })
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["y","help","h"]
}
exports.help = {
    name: "yardım",
    description: "Gelişmiş Yardım",
    usage: "<prefix>yardım",
}