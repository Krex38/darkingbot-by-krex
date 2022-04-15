const discord = require('discord.js');
const db = require('quick.db');
exports.run = async(client, message, args) => {
    const embed = new discord.MessageEmbed()
    .setTitle(':tools:  Botlist Ayarlama Komutları  :tools:')
    .setDescription(`:pushpin:  __k!botlist ayarlar__ = Botlist ayarlarını görürsünüz \n \n  :pushpin:  __k!botlist kanal = Botlist kanal ayarlarsınız__ \n \n :pushpin:  __k!botlist devepoler-rol__ = Botlist devepoler rol ayarlarsınız \n \n :pushpin:  __k!botlist yetkili-rol__ = Botlist yetkili rol ayarlarısınız \n \n :pushpin:  __k!botlist log__ = Botlist log ayarlarsınız \n \n :pushpin:  __k!botlist başvuru-log__ = Botlist başvuru log ayarlarsınız \n \n :pushpin:  __k!botlist dm-takip__ = Botlist dm takip sistemini ayarlarsınız`)
    .setTimestamp()
    .setFooter(`${message.author.username} adlı kişi tarafından kullanıldı`)
if(!args[0]) return message.channel.send(embed)
if(args[0] == "kanal") {
let plasmic = message.mentions.channels.first()
const embed = new discord.MessageEmbed()
.setTitle(`- HATA -`)
.setDescription(`Lütfen botlist kanalını belirtiniz!  \n \n **BOTLİST KANALI NEDİR** \n Botlist kanalını ayarlarsanız bot ekleme kanalını ayarlamış olursunuz.`)
.setTimestamp()
.setFooter(`${message.author.username} tarafından kullanıldı`)
if(!plasmic) return message.channel.send(embed)
db.set(`botlistkanal_${message.guild.id}`, plasmic.id)
const abcaklımagelmedinapamisim = new discord.MessageEmbed()
.setTitle(`Başarılı bir şekilde ayarladınız`)
.setDescription(`Az önce botlist kanalını <#${plasmic.id}> olarak ayarlandınız.`)
.setTimestamp()
.setFooter(`${message.author.username} tarafından kullanıldı`)
return message.channel.send(abcaklımagelmedinapamisim)
}
if(args[0] == "developer-rol") {
let plasmic = message.mentions.roles.first()
const embed = new discord.MessageEmbed()
.setTitle(`- HATA -`)
.setDescription(`Lütfen botlist devepoler rolünü belirtiniz! \n \n **BOTLİST DEVELOPER ROLÜ NEDİR** \N Botlist developer rolünü ayarlarsanız botu onaylanan kişilere verilecek rolü ayarlamış olursunuz.`)
.setTimestamp()
.setFooter(`${message.author.username} tarafından kullanıldı`)
if(!plasmic) return message.channel.send(embed)
db.set(`botlistdevrol_${message.guild.id}`, plasmic.id)
const pythonic = new discord.MessageEmbed()
.setTitle(`Başarılı bir şekilde ayarladınız`)
.setDescription(`Az önce botlist developer rolünü <@&${plasmic.id}> olarak ayarladınız.`)
.setTimestamp()
.setFooter(`${message.author.username} tarafından kullanıldı`)
return message.channel.send(pythonic)
}
if(args[0] == "yetkili-rol") {
    let plasmic = message.mentions.roles.first()
    const embed = new discord.MessageEmbed()
    .setTitle(`- HATA -`)
    .setDescription(`Lütfen botlist yetkili rolünü belirtiniz! \n \n **BOTLİST YETKİLİ ROL NEDİR** \n Botlist yetkili rolünü ayarlarsanız botları onaylayacak ve ya reddedecek rolü ayarlarsınız.`)
    .setTimestamp()
    .setFooter(`${message.author.username} tarafından kullanıldı`)
    if(!plasmic) return message.channel.send(embed)
    db.set(`botlistyetkili_${message.guild.id}`, plasmic.id)
    const pythonic = new discord.MessageEmbed()
    .setTitle(`Başarılı bir şekilde ayarladınız`)
    .setDescription(`Az önce botlist yetkili rolünü <@&${plasmic.id}> olarak ayarladınız.`)
    .setTimestamp()
    .setFooter(`${message.author.username} tarafından kullanıldı`)
    return message.channel.send(pythonic)
}
if(args[0] == "dm-takip") {
    const embed = new discord.MessageEmbed()
    .setTitle('- HATA -')
    .setDescription(`Botlist dm takip sistemini açmak isterseniz __!botlist dm-takip aç__ yazınız.Eğer sıfırlamak istiyor iseniz k!botlist sıfırla dm-takip yazıp sıfırlayabilirsiniz. \n \n **BOTLİST DM TAKİP NEDİR** \n Botunu ekleyen kişilerin botlarının durumlarını anlık olarak belirten sistemdir.Kişi botunu ekleyince, yetkili reddedince ve ya onaylayınca dm üzerinden botun kişiye log düşmesini sağlarsınız.`)
    .setTimestamp()
    .setFooter(`${message.author.username} tarafından kullanıldı`)
    if(!args[1]) return message.channel.send(embed)
if(args[1] == "aç") {
    db.set(`botlistdmtakip_${message.guild.id}`, "aktif")
    const embed = new discord.MessageEmbed()
    .setTitle('Başarılı bir şekilde ayarladınız')
    .setDescription(`Az önce botlist dm takip sistemini aktif hale getirdiniz.`)
    .setTimestamp()
    .setFooter(`${message.author.username} tarafından kullanıldı`)
    return message.channel.send(embed)
}
}
if(args[0] == "log") {
let kanal = message.mentions.channels.first()
const embed = new discord.MessageEmbed()
.setTitle('- HATA -')
.setDescription(`Lütfen log kanalını belirtiniz. \n \n **BOTLİST LOG NEDİR** \n Botlist log sistemi botunu eklemek için başvuranların kanal üzerinden anlık durumlarını görmeye yarar.`)
.setTimestamp()
.setFooter(`${message.author.username} tarafından kullanıldı`)
if(!kanal) return message.channel.send(embed)
db.set(`botlistlog_${message.guild.id}`, kanal.id)
const pavyonikab = new discord.MessageEmbed()
.setTitle(`Başarılı bir şekilde ayarladınız`)
.setDescription(`Az önce botlist kanalını <#${kanal.id}> olarak ayarladınız.`)
.setTimestamp()
.setFooter(`${message.author.username} tarafından kullanıldı`)
return message.channel.send(pavyonikab)
}
if(args[0] == "başvuru-log") {
    let kanal = message.mentions.channels.first()
    const embed = new discord.MessageEmbed()
    .setTitle('- HATA -')
    .setDescription(`Lütfen başvuru log kanalını belirtiniz. \n \n **BOTLİST BAŞVURU LOG NEDİR** \n Botlist başvuru log sistemi kişinin girdiği bilgilerin detaylıca atıldığı kanalı ayarlamaya yarar.Sadece yetkililerin görebildiği bir kanala ayarlamanız tavsiye edilir.`)
    .setTimestamp()
    .setFooter(`${message.author.username} tarafından kullanıldı. © 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022`)
    if(!kanal) return message.channel.send(embed)
    db.set(`botlistbaşvurulog_${message.guild.id}`, kanal.id)
    const pavyonikab = new discord.MessageEmbed()
    .setTitle(`Başarılı bir şekilde ayarladınız`)
    .setDescription(`Az önce botlist başvuru log kanalını <#${kanal.id}> olarak ayarladınız.`)
    .setTimestamp()
    .setFooter(`${message.author.username} tarafından kullanıldı. © 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022`)
    return message.channel.send(pavyonikab)
}
if(args[0] == "ayarlar") {
    let logvar = db.fetch(`botlistlog_${message.guild.id}`)
    if(logvar == logvar) {var log = `<#` + logvar + `>`}
    if(logvar == undefined) {var log = "ayarlanmamış"}
    let başvurulogvar = db.fetch(`botlistbaşvurulog_${message.guild.id}`)
    if(başvurulogvar == başvurulogvar) {var başvurulog = `<#` + başvurulogvar + `>`}
    if(başvurulogvar == undefined) {var başvurulog = "ayarlanmamış"}
    let yetkilivar = db.fetch(`botlistyetkili_${message.guild.id}`)
    if(yetkilivar == yetkilivar) {var yetkili = `<@&` + yetkilivar + `>`}
    if(yetkilivar == undefined) {var yetkili = "ayarlanmamış"}
    let devrolvar = db.fetch(`botlistdevrol_${message.guild.id}`)
    if(devrolvar == devrolvar) {var devrol = `<@&` + devrolvar + `>`}
    if(devrolvar == undefined) {var devrol = "ayarlanmamış"}
    let dmtakipvar = db.fetch(`botlistdmtakip_${message.guild.id}`)
    if(dmtakipvar == dmtakipvar) {var dmtakip = "açık"}
    if(dmtakipvar == undefined) {var dmtakip = "kapalı"}
    let kanalvar = db.fetch(`botlistkanal_${message.guild.id}`)
    if(kanalvar == kanalvar) {var kanal = `<#` + kanalvar + `>`}
    if(kanalvar == undefined) {var kanal = "ayarlanmamış"}
    const embed = new discord.MessageEmbed()
.setTitle(`:gear:  ${message.guild.name} adlı sunucunun botlist ayarları  :gear:`)
.setDescription(`:closed_book:  Botlist log: ${log} \n \n :blue_book:  Botlist başvuru log: ${başvurulog} \n \n :bookmark:  Botlist yetkilisi: ${yetkili} \n \n :green_book:  Devepoler rol: ${devrol}  \n \n :orange_book:  Dm takip: ${dmtakip} \n \n :notebook_with_decorative_cover:  Botlist kanalı: ${kanal}`)
    .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
return message.channel.send(embed)
}
if(args[0] == "sıfırla") {
    if(!args[1]) return message.channel.send('Sıfırlanacak şeyi de yazınız: `dm-takip` `kanal` `log` `başvuru-log` `devepoler-rol` `yetkili-rol` `hepsi`')
if(args[1] == "dm-takip"){
    let kontrol = db.fetch(`botlistdmtakip_${message.guild.id}`)
    if(!kontrol) return message.channel.send('Zaten kapalı?')
db.delete(`botlistdmtakip_${message.guild.id}`)
}
if(args[1] == "kanal") {
    let kontrol = db.fetch(`botlistkanal_${message.guild.id}`)
    if(!kontrol) return message.channel.send('Zaten kapalı?')
db.delete(`botlistkanal_${message.guild.id}`)
}
if(args[1] == "log"){
    let kontrol = db.fetch(`botlistlog_${message.guild.id}`)
    if(!kontrol) return message.channel.send('Zaten kapalı?')
db.delete(`botlistlog_${message.guild.id}`)
}
if(args[1] == "başvuru-log") {
    let kontrol = db.fetch(`botlistbaşvurulog_${message.guild.id}`)
  
    if(!kontrol) return message.channel.send('Zaten kapalı?')
db.delete(`botlistbaşvurulog_${message.guild.id}`)
}
if(args[1] == "devepoler-rol") {
    let kontrol = db.fetch(`botlistdevrol_${message.guild.id}`)
    if(!kontrol) return message.channel.send('Zaten kapalı?')
db.delete(`botlistdevrol_${message.guild.id}`)
}
if(args[1] == "yetkili-rol") {
    let kontrol = db.fetch(`botlistyetkili_${message.guild.id}`)
    if(!kontrol) return message.channel.send('Zaten kapalı?')
db.delete(`botlistyetkili_${message.guild.id}`)
}
if(args[1] == "hepsi") {
    let kontrol = db.fetch(`botlistyetkili_${message.guild.id}`)
    if(!kontrol) return message.channel.send('Sistemin tamamı ayarlı değil!')
    let kontroll = db.fetch(`botlistdevrol_${message.guild.id}`)
    if(!kontroll) return message.channel.send('Sistemin tamamı ayarlı değil!')
let kontrolll = db.fetch(`botlistbaşvurulog_${message.guild.id}`)
if(!kontrolll) return message.channel.send('Sistemin tamamı ayarlı değil!')
let kontrollll = db.fetch(`botlistlog_${message.guild.id}`)
if(!kontrollll) return message.channel.send('Sistemin tamamı ayarlı değil!')
let kontrolllll = db.fetch(`botlistkanal_${message.guild.id}`)
if(!kontrolllll) return message.channel.send('Sistemin tamamı ayarlı değil!')
let kontrollllll = db.fetch(`botlistdmtakip_${message.guild.id}`)
if(!kontrollllll) return message.channel.send('Sistemin tamamı ayarlı değil!')
db.delete(`botlistyetkili_${message.guild.id}`)
db.delete(`botlistdevrol_${message.guild.id}`)
db.delete(`botlistbaşvurulog_${message.guild.id}`)
db.delete(`botlistlog_${message.guild.id}`)
db.delete(`botlistkanal_${message.guild.id}`)
db.delete(`botlistdmtakip_${message.guild.id}`)
return message.channel.send('Sistem başarı ile sıfırlandı!')
}
}
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'botlist'
  };