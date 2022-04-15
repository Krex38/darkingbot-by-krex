const westra = require('discord.js')
const westraclient = new westra.Client()
const westraembed = new westra.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Selam!\n **Darking** Botu Ekleyerek Bize Destek Sağlayabilirsiniz.\nBotu Eklemek İçin [BURAYA](https://discord.com/oauth2/authorize?client_id=952290814271307796&scope=bot&permissions=8) Tıkla!`)
exports.run = async (westraclient, message, args) => {
	message.channel.send(westraembed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["davetet"],
    permLevel: 0,
}
exports.help = {
    name: 'bot-davet',
    description: 'Sunuzunuzu Tanıtmak İçin En Uygun Kod!',
    usage: 'sunucutanıt'
}