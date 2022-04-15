const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../ayarlar.json');
const os = require('os');
let cpuStat = require("cpu-stat");


exports.run = async (client, message) => {
  
   var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();
  
    //--------------------------//
  
    var osBit = await os.arch();
  
    if (osBit === 'x64') osBit = '64 Bit'
    else if (osBit === 'x82') osBit = '32 Bit'
    else osBit = os.arch();
  
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
  
    const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

    let now = new Date().getTime();
    let uptiming = Math.floor((now - client.uptime) / 1000);

    const istatistikozel = new Discord.MessageEmbed()
    .setColor(0x36393F)
.setDescription(`** ${ client.user.username} Istatistik**`)
  .addField(`Bot Sahibi`, `<@893148229674356806> & <@951175665401614337>`, true)
    .addField("Bellek Kullanımı", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  .addField("Sunucu Sayısı", `${client.guilds.cache.size.toLocaleString()}`, true)
  .addField("Toplam Kullanıcı Sayısı", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
  .addField("Kanal Sayısı", `${client.channels.cache.size.toLocaleString()}`, true)
  .addField(`Ne Kadar Süredir Aktif`, `<t:${uptiming}:R>`, true)
  .addField("Ping", `${client.ws.ping}ms`, true)
  .addField("Discord.js Sürümü", `${Discord.version}`, true)
  .addField(`Destek Sunucum`, `[Tıkla](https://discord.gg/HxWp87x3gX)`, true)
  .addField(`Botu Davet Et`, `[Tıkla](https://discord.com/oauth2/authorize?client_id=952290814271307796&scope=bot&permissions=8)`, true)
    .addField('Kullanılan bellek boyutu', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} MB`, true)
        .addField('İşletim sistemi', `${osType} ${osBit}`, true)
        
        .addField('İşlemci', `\`\`\`xl\n${os.cpus().map(i => `${i.model}`)[0]}\n\`\`\``)
  message.channel.send(istatistikozel)
});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['istatistik', 'i', 'istatistikler', 'botbilgi', 'bilgi', 'hakkında', 'bot hakkında', 'bothakkında'],
      kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};