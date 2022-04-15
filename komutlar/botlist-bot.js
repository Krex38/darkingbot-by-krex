const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(`- HATA -`)
    .setDescription("Lütfen bir seçenek belirtiniz!  \n \n `bot ekle` `bot onayla` `bot reddet` `bot bilgi`")
    .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
if(!args[0]) return message.channel.send(embed).then (message => setTimeout(() => message.delete(), 10000))
if(args[0] == "ekle") {
  let dmtakip = db.fetch(`botlistdmtakip_${message.guild.id}`)
  if(dmtakip == "aktif") {
message.delete()
let kanal = db.fetch(`botlistkanal_${message.guild.id}`)
if(!kanal) return message.channel.send('Botlist kanal ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let yetkilirol = db.fetch(`botlistyetkili_${message.guild.id}`)
if(!yetkilirol) return message.channel.send('Botlist yetkili rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let devrol = db.fetch(`botlistdevrol_${message.guild.id}`)
if(!devrol) return message.channel.send('Botlist devepoler rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let başvurulog = db.fetch(`botlistbaşvurulog_${message.guild.id}`)
if(!başvurulog) return message.channel.send('Botlist başvuru log kanalı ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let log = db.fetch(`botlistlog_${message.guild.id}`)
if(!log) return message.channel.send('Botlist log ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
const kanalhata = new Discord.MessageEmbed()
.setTitle('- HATA -')
.setDescription(':name_badge:  Burası bot ekleme kanalı değil!  :name_badge:')
.setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
if(message.channel.id !== kanal) return message.channel.send(kanalhata).then (message => setTimeout(() => message.delete(), 3500))
let id = args[1]
if(!id) return message.channel.send('Lütfen idi giriniz!').then (message => setTimeout(() => message.delete(), 3500))
let prefix = args[2]
if(!prefix) return message.channel.send('lütfen prefixi giriniz!').then (message => setTimeout(() => message.delete(), 3500))
let dbldurum = args[3]
if(!dbldurum) return message.channel.send('Lütfen dbl durumunu giriniz!').then (message => setTimeout(() => message.delete(), 3500))
db.add(`botlistsıra_${message.guild.id}`, 1)
db.set(`botbaşvuruid_${message.guild.id}.${id}`, message.author.id)
db.set(`botbaşvuruprefix_${message.guild.id}.${id}`, prefix)
db.set(`botbaşvurudbldurum_${message.guild.id}.${id}`, dbldurum)
let sıravar = db.fetch(`botlistsıra_${message.guild.id}`)
if(sıravar == sıravar) {var sıra = sıravar}
if(sıravar == undefined) {var sıra = "sıra yok"}
client.channels.cache.get(log).send(`<@${message.author.id}>, <@&${yetkilirol}>`)
const logembed = new Discord.MessageEmbed()
.setTitle('Bot başvurusu')
.setDescription(` Kalan sıra: ${sıra} \n \n <@${message.author.id}> adlı kişi botu <@${id}> adlı <${id}> ID'li botu ile bot başvurusunda bulundu!`)
.setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
client.channels.cache.get(log).send(logembed)
const başvurulogembed = new Discord.MessageEmbed()
.setTitle(`Bot başvurusu`)
.setDescription(`__**BAŞVURU YAPANIN BİLGİLERİ**__ \n Başvuru yapan: <@${message.author.id}> \n İdi: ${message.author.id} \n \n __**BAŞVURU YAPILAN BOT BİLGİLERİ**__ \n Bot: <@${id}> \n Prefixi: ${prefix} \n Dbl onay durumu: ${dbldurum}

[0 Perm](https://discord.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=0) ╏ [8 Perm](https://discord.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=8)`)
.setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
client.channels.cache.get(başvurulog).send(başvurulogembed)
const embed = new Discord.MessageEmbed()
.setTitle('Dm takip sistemi')
.setDescription(message.guild.name + ` adlı sunucudaki bot başvurunuz alınmıştır.Başvurunuzla ilgili bir gelişme olduğu zaman size buradan bildiride bulunacağım \n \n Eğer anlık bilgi almak istersen k!bot bilgi ${id}`)
message.author.send(embed)
return message.channel.send(new Discord.MessageEmbed)
.setDescription("Başvurunuz Alındı")
.setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
  }
message.delete()
let kanal = db.fetch(`botlistkanal_${message.guild.id}`)
if(!kanal) return message.channel.send('Botlist kanal ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let yetkilirol = db.fetch(`botlistyetkili_${message.guild.id}`)
if(!yetkilirol) return message.channel.send('Botlist yetkili rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let devrol = db.fetch(`botlistdevrol_${message.guild.id}`)
if(!devrol) return message.channel.send('Botlist devepoler rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let başvurulog = db.fetch(`botlistbaşvurulog_${message.guild.id}`)
if(!başvurulog) return message.channel.send('Botlist başvuru log kanalı ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let log = db.fetch(`botlistlog_${message.guild.id}`)
if(!log) return message.channel.send('Botlist log ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
const kanalhata = new Discord.MessageEmbed()
.setTitle('Gece Botlist bot hata')
.setDescription(':name_badge:  Burası bot ekleme kanalı değil!  :name_badge:')
.setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
if(message.channel.id !== kanal) return message.channel.send(kanalhata).then (message => setTimeout(() => message.delete(), 3500))
let id = args[1]
if(!id) return message.channel.send('Lütfen idi giriniz!').then (message => setTimeout(() => message.delete(), 3500))
let prefix = args[2]
if(!prefix) return message.channel.send('lütfen prefixi giriniz!').then (message => setTimeout(() => message.delete(), 3500))
let dbldurum = args[3]
if(!dbldurum) return message.channel.send('Lütfen dbl durumunu giriniz!').then (message => setTimeout(() => message.delete(), 3500))
db.add(`botlistsıra_${message.guild.id}`, 1)
db.set(`botbaşvuruid_${message.guild.id}.${id}`, message.author.id)
db.set(`botbaşvuruprefix_${message.guild.id}.${id}`, prefix)
db.set(`botbaşvurudbldurum_${message.guild.id}.${id}`, dbldurum)
let sıravar = db.fetch(`botlistsıra_${message.guild.id}`)
if(sıravar == sıravar) {var sıra = sıravar}
if(sıravar == undefined) {var sıra = "sıra yok"}
client.channels.cache.get(log).send(`<@${message.author.id}>, <@&${yetkilirol}>`)
const logembed = new Discord.MessageEmbed()
.setTitle('Bot başvurusu')
.setDescription(` Kalan sıra: ${sıra} \n \n <@${message.author.id}> adlı kişi botu <@${id}> adlı botu ile bot başvurusunda bulundu!`)
.setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
client.channels.cache.get(log).send(logembed)
const başvurulogembed = new Discord.MessageEmbed()
.setTitle(`Bot başvurusu`)
.setDescription(`
__**BAŞVURU YAPANIN BİLGİLERİ**__ 
\n Başvuru yapan: <@${message.author.id}> 
\n İdi: ${message.author.id} \n \n 
__**BAŞVURU YAPILAN BOT BİLGİLERİ**__ 
\n Bot: <@${id}> \n Prefixi: ${prefix} 
\n Dbl onay durumu: ${dbldurum} 

`)
.setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
client.channels.cache.get(başvurulog).send(başvurulogembed)
return message.channel.send("**Başvurunuz Alınmştır**") .then (message => setTimeout(() => message.delete(), 8000))

}
if(args[0] == "onayla") {
  let dmtakip = db.fetch(`botlistdmtakip_${message.guild.id}`)
  if(dmtakip == "aktif") {
    let kanal = db.fetch(`botlistkanal_${message.guild.id}`)
    if(!kanal) return message.channel.send('Botlist kanal ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
    let yetkilirol = db.fetch(`botlistyetkili_${message.guild.id}`)
    if(!yetkilirol) return message.channel.send('Botlist yetkili rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
    let devrol = db.fetch(`botlistdevrol_${message.guild.id}`)
    if(!devrol) return message.channel.send('Botlist devepoler rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
    let başvurulog = db.fetch(`botlistbaşvurulog_${message.guild.id}`)
    if(!başvurulog) return message.channel.send('Botlist başvuru log kanalı ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
    let log = db.fetch(`botlistlog_${message.guild.id}`)
    if(!log) return message.channel.send('Botlist log ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
      if(!message.member.roles.cache.has(db.fetch(`botlistyetkili_${message.guild.id}`))) {
        return message.channel.send("Bu Komutu sadece botlist yetkilisi kullanabilir!");
      }
      let pythonic = args[1]
      if(!pythonic) return message.channel.send('Lütfen onaylanacak botun idini belirtin!')
      let sahip = db.fetch(`botbaşvuruid_${message.guild.id}.${pythonic}`)
      if(!sahip) return message.channel.send('Böyle bir bot başvurusu yapılmamış!')
      let sıra = db.fetch(`botlistsıra_${message.guild.id}`)
      if(sıra == undefined) {
      return message.channel.send('Şu anda hiç onaylanacak bot yok!')
      }
    db.set(`botlistonay_${message.guild.id}.${pythonic}`, "onaylandı")
      db.add(`botlistsıra_${message.guild.id}`, -1)
    message.guild.members.cache.get(sahip).roles.add(devrol)
      const logembed = new Discord.MessageEmbed()
      .setTitle(`Bir bot onaylandı`)
      .setDescription(`<@${message.author.id}> adlı yetkili <@${sahip}> adlı kişinin <@${pythonic}> adlı botunu onayladı!`)
      .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
      client.channels.cache.get(log).send(logembed)
      client.channels.cache.get(log).send(`<@${sahip}>, <@${pythonic}>`)
      const onaylandı = new Discord.MessageEmbed()
      .setTitle('Bot başvurusunu onayladınız')
      .setDescription(`<@${message.author.id}> adlı kişi, <@${sahip}> adlı kişinin <@${pythonic}> adlı botunu onayladı!`)
    .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
      const embedd = new Discord.MessageEmbed()
      .setTitle('Botunuz onaylandı!')
      .setDescription(`<@${message.author.id}> adlı yetkili <@${pythonic}> adlı botunuzu onayladı!`)
      .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
      client.users.cache.get(sahip).send(embedd)
      return message.channel.send(onaylandı)
  }
  let kanal = db.fetch(`botlistkanal_${message.guild.id}`)
if(!kanal) return message.channel.send('Botlist kanal ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let yetkilirol = db.fetch(`botlistyetkili_${message.guild.id}`)
if(!yetkilirol) return message.channel.send('Botlist yetkili rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let devrol = db.fetch(`botlistdevrol_${message.guild.id}`)
if(!devrol) return message.channel.send('Botlist devepoler rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let başvurulog = db.fetch(`botlistbaşvurulog_${message.guild.id}`)
if(!başvurulog) return message.channel.send('Botlist başvuru log kanalı ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
let log = db.fetch(`botlistlog_${message.guild.id}`)
if(!log) return message.channel.send('Botlist log ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
  if(!message.member.roles.cache.has(db.fetch(`botlistyetkili_${message.guild.id}`))) {
    return message.channel.send("Bu Komutu sadece botlist yetkilisi kullanabilir!");
  }
  let pythonic = args[1]
  if(!pythonic) return message.channel.send('Lütfen onaylanacak botun idini belirtin!')
  let sahip = db.fetch(`botbaşvuruid_${message.guild.id}.${pythonic}`)
  if(!sahip) return message.channel.send('Böyle bir bot başvurusu yapılmamış!')
  let sıra = db.fetch(`botlistsıra_${message.guild.id}`)
  if(sıra == undefined) {
  return message.channel.send('Şu anda hiç onaylanacak bot yok!')
  }
db.set(`botlistonay_${message.guild.id}.${pythonic}`, "onaylandı")
  db.add(`botlistsıra_${message.guild.id}`, -1)
message.guild.members.cache.get(sahip).roles.add(devrol)
  const logembed = new Discord.MessageEmbed()
  .setTitle(`Bir bot onaylandı`)
  .setDescription(`<@${message.author.id}> adlı yetkili <@${sahip}> adlı kişinin <@${pythonic}> adlı botunu onayladı!`)
  client.channels.cache.get(log).send(logembed)
  client.channels.cache.get(log).send(`<@${sahip}>, <@${pythonic}>`)
  const onaylandı = new Discord.MessageEmbed()
  .setTitle('Bot başvurusunu onayladınız')
  .setDescription(`<@${message.author.id}> adlı kişi, <@${sahip}> adlı kişinin <@${pythonic}> adlı botunu onayladı!`)
  return message.channel.send(onaylandı)

}
if(args[0] == "reddet") {
  let dmtakip = db.fetch(`botlistdmtakip_${message.guild.id}`)
  if(dmtakip == "aktif") {
    let kanal = db.fetch(`botlistkanal_${message.guild.id}`)
    if(!kanal) return message.channel.send('Botlist kanal ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
    let yetkilirol = db.fetch(`botlistyetkili_${message.guild.id}`)
    if(!yetkilirol) return message.channel.send('Botlist yetkili rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
    let devrol = db.fetch(`botlistdevrol_${message.guild.id}`)
    if(!devrol) return message.channel.send('Botlist devepoler rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
    let başvurulog = db.fetch(`botlistbaşvurulog_${message.guild.id}`)
    if(!başvurulog) return message.channel.send('Botlist başvuru log kanalı ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
    let log = db.fetch(`botlistlog_${message.guild.id}`)
    if(!log) return message.channel.send('Botlist log ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
      if(!message.member.roles.cache.has(db.fetch(`botlistyetkili_${message.guild.id}`))) {
        return message.channel.send("Bu Komutu sadece botlist yetkilisi kullanabilir!");
      }
      let pythonic = args[1]
      if(!pythonic) return message.channel.send('Lütfen redddedilecek botun idini belirtin!')
      let sahip = db.fetch(`botbaşvuruid_${message.guild.id}.${pythonic}`)
      if(!sahip) return message.channel.send('Böyle bir bot başvurusu yapılmamış!')
      let sıra = db.fetch(`botlistsıra_${message.guild.id}`)
      if(sıra == undefined) {
      return message.channel.send('Şu anda hiç reddedilcek bot yok!')
      }
    db.set(`botlistonay_${message.guild.id}.${pythonic}`, "reddedildi")
      db.add(`botlistsıra_${message.guild.id}`, -1)
       const logembed = new Discord.MessageEmbed()
      .setTitle(`Bir bot reddedildi`)
      .setDescription(`<@${message.author.id}> adlı yetkili <@${sahip}> adlı kişinin <@${pythonic}> adlı botunu reddetti!`)
      .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
       client.channels.cache.get(log).send(logembed)
      client.channels.cache.get(log).send(`<@${sahip}>, <@${pythonic}>`)
      const onaylandı = new Discord.MessageEmbed()
      .setTitle('Bot başvurusunu reddettiniz')
      .setDescription(`<@${message.author.id}> adlı kişi, <@${sahip}> adlı kişinin <@${pythonic}> adlı botunu reddetti!`)
    .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
      const embedd = new Discord.MessageEmbed()
    .setTitle('Botunuz reddedildi!')
    .setDescription(`<@${message.author.id}> adlı yetkili <@${pythonic}> adlı botunuzu reddetti!`)
      .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
      client.users.cache.get(sahip).send(embedd)
      return message.channel.send(onaylandı)
  };
  let kanal = db.fetch(`botlistkanal_${message.guild.id}`)
  if(!kanal) return message.channel.send('Botlist kanal ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
  let yetkilirol = db.fetch(`botlistyetkili_${message.guild.id}`)
  if(!yetkilirol) return message.channel.send('Botlist yetkili rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
  let devrol = db.fetch(`botlistdevrol_${message.guild.id}`)
  if(!devrol) return message.channel.send('Botlist devepoler rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
  let başvurulog = db.fetch(`botlistbaşvurulog_${message.guild.id}`)
  if(!başvurulog) return message.channel.send('Botlist başvuru log kanalı ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
  let log = db.fetch(`botlistlog_${message.guild.id}`)
  if(!log) return message.channel.send('Botlist log ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
    if(!message.member.roles.cache.has(db.fetch(`botlistyetkili_${message.guild.id}`))) {
      return message.channel.send("Bu Komutu sadece botlist yetkilisi kullanabilir!");
    }
    let pythonic = args[1]
    if(!pythonic) return message.channel.send('Lütfen redddedilecek botun idini belirtin!')
    let sahip = db.fetch(`botbaşvuruid_${message.guild.id}.${pythonic}`)
    if(!sahip) return message.channel.send('Böyle bir bot başvurusu yapılmamış!')
    let sıra = db.fetch(`botlistsıra_${message.guild.id}`)
    if(sıra == undefined) {
    return message.channel.send('Şu anda hiç reddedilcek bot yok!')
    }
  db.set(`botlistonay_${message.guild.id}.${pythonic}`, "reddedildi")
    db.add(`botlistsıra_${message.guild.id}`, -1)
     const logembed = new Discord.MessageEmbed()
    .setTitle(`Bir bot reddedildi`)
    .setDescription(`<@${message.author.id}> adlı yetkili <@${sahip}> adlı kişinin <@${pythonic}> adlı botunu reddetti!`)
    .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
     client.channels.cache.get(log).send(logembed)
    client.channels.cache.get(log).send(`<@${sahip}>, <@${pythonic}>`)
    const onaylandı = new Discord.MessageEmbed()
    .setTitle('Bot başvurusunu reddettiniz')
    .setDescription(`<@${message.author.id}> adlı kişi, <@${sahip}> adlı kişinin <@${pythonic}> adlı botunu reddetti!`)
    .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
    return message.channel.send(onaylandı)
}
if(args[0] == "bilgi") {
  let kanal = db.fetch(`botlistkanal_${message.guild.id}`)
  if(!kanal) return message.channel.send('Botlist kanal ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
  let yetkilirol = db.fetch(`botlistyetkili_${message.guild.id}`)
  if(!yetkilirol) return message.channel.send('Botlist yetkili rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
  let devrol = db.fetch(`botlistdevrol_${message.guild.id}`)
  if(!devrol) return message.channel.send('Botlist devepoler rolü ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
  let başvurulog = db.fetch(`botlistbaşvurulog_${message.guild.id}`)
  if(!başvurulog) return message.channel.send('Botlist başvuru log kanalı ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
  let log = db.fetch(`botlistlog_${message.guild.id}`)
  if(!log) return message.channel.send('Botlist log ayarlanmamış!').then (message => setTimeout(() => message.delete(), 5000))
  let engin = args[1]
  if(!engin) return message.channel.send('Lütfen bir bot id girin!')
  let prefix = db.fetch(`botbaşvuruprefix_${message.guild.id}.${engin}`)
 if(!prefix) return message.channel.send('Böyle bir bot eklenmemiş!')
 let dbldurum =db.fetch(`botbaşvurudbldurum_${message.guild.id}.${engin}`)
 if(!dbldurum) return message.channel.send('Böyle bir bot yok!')
 let sahip = db.fetch(`botbaşvuruid_${message.guild.id}.${engin}`)
 let onaydurumvar = db.fetch(`botlistonay_${message.guild.id}.${engin}`)
 if(onaydurumvar == onaydurumvar) {var durum = onaydurumvar}
 if(onaydurumvar == undefined) {var durum = "onay bekliyor"}
const embed = new Discord.MessageEmbed()
.setTitle(`Bot Bilgi Sistemi`)
.setDescription(`:bust_in_silhouette:   **SAHİP BİLGİLERİ**  :bust_in_silhouette:  \n \n Bot sahibi: <@${sahip}> \n Sahip idi: ${sahip} \n \n :robot:  **BOT BİLGİLERİ**  :robot: \n \n Bot idi: ${engin} \n Bot prefixi: ${prefix} \n Botun dbl durumu: ${dbldurum} \n  Onay durumu: ${durum} \n '[BOT Davet!](https://discord.com/oauth2/authorize?scope=bot&permissions=536870911991&client_id=${engin}&guild_id=${message.guild.id})` ) 
.setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
return message.channel.send(embed)
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bot'
};