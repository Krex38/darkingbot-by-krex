const ayarlar = require('../ayarlar.json');
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    function sayac(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var saniye = Math.floor( (t/1000) % 60 );
        var dakika = Math.floor( (t/1000/60) % 60 );
        var saat = Math.floor( (t/(1000*60*60)) % 24 );
        var gun = Math.floor( t/(1000*60*60*24) );
        return {'toplam': t,'gun': gun, 'saat': saat, 'dakika': dakika, 'saniye': saniye };
      };    
      
    var gn = new Date();
    var son = 'January 1 ' + (gn.getFullYear() + 1) + " 00:00:00";
    if (gn.getMonth() == 0 && gn.getDate() == 1) {
        son = 'January 1 ' + (gn.getFullYear()) + " 00:00:00";
    };
        var t = sayac(son);
        message.channel.send(new Discord.MessageEmbed().setDescription(`Gün: ${t.gun}, Saat: ${t.saat}, Dakika: ${t.dakika}, Saniye: ${t.saniye}`))
        if(t.total<=0){
            message.channel.send(new Discord.MessageEmbed().setDescription(`HAPPY NEW YEAR, NoName.txt`)) 
        }

};

  

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yeni-yil'],
  permLevel: `Yetki gerekmiyor.`
};
exports.help = {
  name: 'newyear',
  category: "eğlence",
  description: 'İstediğiniz bir kişi ile düello atarsınız!',
  usage: 'duello <@kullanıcı>'
};