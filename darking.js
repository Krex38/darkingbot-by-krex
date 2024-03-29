const Discord = require("discord.js");
const chalk = require("chalk")
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader.js")(client);
const db = require("quick.db");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const Uptimer = require("csyuptimer")
require('discord-buttons')(client)

//-----------------------------------------------\\
const http = require("http");
const express = require("express");
const app = express();
Uptimer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + "Bot Aktif");
  response.sendStatus(200);
});
app.listen(8000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//-----------------------------------------------\\

const { MessageEmbed } = require('discord.js');
var prefix = "k!";
var moment_tz = require('moment-timezone');

client.on("message", message => {
    let cmd = message.content.split(" ")[0].slice(prefix.length);
    let args = message.content.split(" ").slice(1);
    var yetki = message.member.permissions.has("ADMINISTRATOR");

    const embed = new MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL());
    const LOG_EMBED = new MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL()).setColor("YELLOW").setThumbnail("https://cdn.glitch.com/69e450d8-a7a3-438c-900f-bb67ebdbdb9d%2Fmail.png?v=1623432905977");

    if (cmd == "uyarı") {

        // OTOMATIK KURULUM
        if (!db.fetch(`uyari_sistemi.${message.guild.id}`)) {
            db.set(`uyari_sistemi.${message.guild.id}`, {
                log: null,
                max: 5,
                users: {}
            });
        }

        if (args[0] == "log") {
            if (!yetki) return message.channel.send(embed.setColor("RED").setDescription(`<@${message.author.id}>, bu işlemi yapmak için gerekli yetkin yok!`));

            var kanal = message.mentions.channels.first();
            if (!kanal) return message.channel.send(embed.setColor("RED").setDescription(`<@${message.author.id}>, bir kanal etiketlemen gerekli!`));
            db.set(`uyari_sistemi.${message.guild.id}.log`, kanal.id);
            return message.channel.send(embed.setColor("GREEN").setDescription(`<@${message.author.id}>, log kanalı <#${kanal.id}> olarak ayarlandı!`));
        } else if (args[0] == "ban" && args[1] == "limit") {
            if (!yetki) return message.channel.send(embed.setColor("RED").setDescription(`<@${message.author.id}>, bu işlemi yapmak için gerekli yetkin yok!`));

            var limit = db.fetch(`uyari_sistemi.${message.guild.id}.max`);
            var new_limit = Number(args[2]);
            if (!new_limit || typeof new_limit != "number") return message.channel.send(embed.setColor("RED").setDescription(`<@${message.author.id}>, limit ayarlamak için bir rakam girmen gerekli!`));
            db.set(`uyari_sistemi.${message.guild.id}.max`, new_limit);
            return message.channel.send(embed.setColor("RED").setDescription(`<@${message.author.id}>, uyası sistemi ban limiti ${limit} uyarıdan ${new_limit} uyarıya yükseltildi!`));
        } else if (args[0] == "uyar") {
            if (!yetki) return message.channel.send(embed.setColor("RED").setDescription(`<@${message.author.id}>, bu işlemi yapmak için gerekli yetkin yok!`));

            var user = message.mentions.users.first();
            if (!user) return message.channel.send(embed.setColor("RED").setDescription(`<@${message.author.id}>, bir kullanıcı etiketlemen gerekli!`));
            db.push(`uyari_sistemi.${message.guild.id}.users.${user.id}`, {
                reason: args.length >= 3 ? args.slice(2).join(' ') : 'SEBEP BELIRTILMEMIS',
                moderator: {
                    id: message.author.id,
                    tag: message.author.tag
                },
                date: moment_tz.tz('ASIA/ISTANBUL').format('DD/MM/YYYY HH:mm:ss')
            });
            var limit = db.fetch(`uyari_sistemi.${message.guild.id}.max`) || 0;
            var warns = (db.fetch(`uyari_sistemi.${message.guild.id}.users.${user.id}`) || []).length;
            message.channel.send(embed.setColor("GREEN").setDescription(`<@${message.author.id}>, <@${user.id}> kişisini uyardım! (${warns}${limit == 0 ? '' : `/${limit}`})`));

            var log = db.fetch(`uyari_sistemi.${message.guild.id}.log`);
            if (log) log = client.channels.cache.get(log);
            if (log) log.send(LOG_EMBED.setDescription(`<@${user.id}> kullanıcısı <@${message.author.id}> tarafından uyarıldı, toplam ${warns} uyarısı var${warns >= limit ? ', kullanıcı limiti aştığı için banlandı' : ''}!`));

            if (warns >= limit) return message.guild.members.cache.get(user.id).ban({ reason: "ardaiisteaq @ Uyarı Sistemi ile limit aşıldığı için otomatik banlandı!" });
        } else if (args[0] == "liste") {
            var user = message.mentions.users.first() || message.author;
            var warns = (db.fetch(`uyari_sistemi.${message.guild.id}.users.${user.id}`) || []);
            return message.channel.send(embed.setColor("GREEN").setDescription(`<@${message.author.id}>, <@${user.id}> kullanıcısının uyarıları: (${warns.length})\n\`\`\`\n${warns.length > 0 ? warns.map((e, i) => `${i + 1}. ${e.reason} (${e.moderator.tag} ~ ${e.date})`).join('\n') : "Hiç uyarın yok!"}\n\`\`\``));
        } else {
            return message.channel.send(embed.setColor("GREEN").setDescription(`<@${message.author.id}>, işte uyarı komutları:\n\`\`\`\n${prefix}uyarı ban limit <limit>\n${prefix}uyarı log <#kanal>\n${prefix}uyarı uyar <@kullanıcı>\n${prefix}uyarı liste <@kullanıcı>\n\`\`\``));
        }

    }
});

//--------------------Invite-----------------//

const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(codare => {
      invites[g.id] = codare;
    });
  });
});

client.on("guildMemberAdd", async member => {// chimp#0110
const data = require('quick.db')
const user = client.users.cache.get(member.id);
  
member.guild.fetchInvites().then(async codare => {
let channel = await data.fetch(`kanal.${member.guild.id}`);
if (!channel) return;

const ei = invites[member.guild.id];
invites[member.guild.id] = codare;

const seni_kim_davet_etti = await codare.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
const ben_ettim = member.guild.members.cache.get(seni_kim_davet_etti.inviter.id);

data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, +1);
data.add(`toplambebeğiiiiim.${ben_ettim.id}.${member.guild.id}`, +1);
  
 let zaman = require("moment").duration(new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime())
 if(zaman < 1296000000) { data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
 data.add(`fake.${ben_ettim.id}_${member.guild.id}`, +1); }
  
 data.set(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`, ben_ettim.id);
  
let ölç_bakalım = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`);

let davetsayi;
if(!ölç_bakalım) { davetsayi = 0; } 
else { davetsayi = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`); }
  
if(zaman < 1296000000){
member.guild.channels.cache.get(channel).send(`**${member.user.username}** (**fake**), sunucuya **${ben_ettim.user.tag}** (**${davetsayi}**) sayesinde giriş yaptı.`);
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna sizin sayenizde giriş yaptı.
Kullanıcı fake olduğu için davet sayınız güncellenmedi.`)
} else {
member.guild.channels.cache.get(channel).send(`**${member.user.username}**, sunucuya **${ben_ettim.user.tag}** (**${davetsayi}**)  sayesinde giriş yaptı.`);
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna sizin sayenizde giriş yaptı.
Yeni davet sayınız **${davetsayi}** olarak güncellendi.`)
  }});
});// codare

client.on("guildMemberRemove", async member => {// chimp#0110
const data = require('quick.db')
const user = client.users.cache.get(member.id);
  
member.guild.fetchInvites().then(async codare => {
let channel = await data.fetch(`kanal.${member.guild.id}`);
if (!channel) return;
const seni_kim_davet_etti = await data.fetch(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`);
const ben_ettim = member.guild.members.cache.get(seni_kim_davet_etti);
  
let zaman = require("moment").duration(new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime())

if(zaman < 1296000000){
  data.add(`fake.${ben_ettim.id}.${member.guild.id}`, -1);
  data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
  if(seni_kim_davet_etti) {
  data.delete(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`); }
} else {
  data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
  if(seni_kim_davet_etti) {
  data.delete(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`); } }
  
const davetsayi = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`);
if(zaman < 1296000000){
if(!seni_kim_davet_etti) {
return member.guild.channels.cache.get(channel).send(`**${member.user.username}** (**fake**), sunucudan çıkış yaptı. (davet eden bulunamadı)`);
} else {
member.guild.channels.cache.get(channel).send(`**${member.user.username}** (**fake**), sunucudan çıkış yaptı. Davet eden: ${ben_ettim.user.tag} (**${davetsayi ? davetsayi : '0'}**)`); }
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna siz davet etmiştiniz, şimdi çıkış yaptı.
Kullanıcı fake olduğu için davet sayınız güncellenmeid.`)
} else {
if(!seni_kim_davet_etti) {
return member.guild.channels.cache.get(channel).send(`**${member.user.username}**, sunucudan çıkış yaptı. (davet eden bulunamadı)`); 
} else {
member.guild.channels.cache.get(channel).send(`**${member.user.username}**, sunucudan çıkış yaptı. Davet eden: **${ben_ettim.user.tag}** (**${davetsayi ? davetsayi : '0'}**)`); }
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna siz davet etmiştiniz, şimdi çıkış yaptı.
Yeni davet sayınız **${davetsayi}** olarak güncellendi.`)
}
})
});// codare

//--------------------Invite Son-----------------//
client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.reply(`Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`)
   }
 }
  if(msg.author.id === kisi){

       msg.reply(`Afk'lıktan Çıktınız`)
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});

client.on('messageDelete', async message => {
  if(message.author.bot || !message.content) return;
  require('quick.db').push(message.guild.id, {
    author: message.author,
    authorTAG: message.author.tag,
    authorID: message.author.id,
    authorUSERNAME: message.author.username,
    authorDISCRIMINATOR: message.author.discriminator,
    messageID: message.id,
    messageCHANNEL: message.channel,
    messageCHANNELID: message.channel.id,
    messageCONTENT: message.content,
    messageCREATEDAT: message.createdAt
  });
});


const chatbot = require("smart-chatbot"); 
const chatclient = new chatbot.Client({ secretkey: "661nhs12ch36kt1t70kk1aelxs0tmj8oooj", botname: "20kege", ownername: "Eren" });

client.on("message", async(message) => {
  if(!message || !message.content || !message.author || message.author.bot) return;
  
  if (message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
       let args = message.content.split(" ").slice(1);
       let soru = args.slice(0).join(' ');

       let reply = await chatclient.chat({ 
          message: soru, 
          user: message.author.id,
          language: "tr" // (tr, en)
        });
     message.channel.send(reply);
  }
});

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.TOKEN);

///==========komutlar==========\\\
client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    let songelen =  member.guild.channels.cache.find(x =>(x.name).startsWith("Son Üye • "))
   
    
    if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
      songelen.setName(`Son Üye • ${member.user.username}`)
   } catch(e) { }
  }
})
client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.cache.
    find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).cache.size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
    
   } catch(e) { }
  }
})
client.on('guildMemberAdd', async member => {
  
  let devtr_kod = await db.fetch(`devtr_oto_tag_${member.guild.id}`);
  let devtr1;
  if (devtr_kod == null) devtr1 = member.setNickname(`${member.user.username}`)
  else devtr1 = member.setNickname(`${devtr_kod} ${member.user.username}`)
});
//ototag sistemi //
client.on('guildMemberAdd', async member => {

  

  let emran = await db.fetch(`ototag.${member.guild.id}`);

  let tanersins;

  if (emran == null) tanersins = member.setNickname(`${member.user.username}`)

  else tanersins = member.setNickname(`${emran} ${member.user.username}`)

});
// Reklam Engel //
////reklam-engel

const reklam = [
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".pw",
        ".io",
        ".me",
        ".gg",
        "www.",
        "https",
        "http",
        ".gl",
        ".org",
        ".com.tr",
        ".biz",
        "net",
        ".rf",
        ".gd",
        ".az",
        ".party",
		".gf"
      ];
client.on("messageUpdate", async (old, nev) => {
  
    if (old.content != nev.content) {
    let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
   if (i) {
      
      if (reklam.some(word => nev.content.includes(word))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return ;
       //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
 const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` ${nev.author} , **Mesajını Editleyerek Reklam Yapmaya Çalıştı!**`)
            .addField("Reklamı:",nev)
        
            nev.delete();
            const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` ${nev.author} , **Mesajı Editleyerek Reklam Yapamana İzin Veremem!**`) 
          client.channels.cache.get(y).send(embed)
            nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
          
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {

     
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
         let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);
   
    let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
          if (i) {
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                 if (!msg.member.hasPermission("MANAGE_GUILD")) {
                 //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
     msg.delete({timeout:750});
                    const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` <@${msg.author.id}> , **Bu Sunucuda Reklam Yapmak Yasak!**`)
      msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
                const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` ${msg.author} , **Reklam Yapmaya Çalıştı!**`) .addField("Mesajı:",msg)
               msg.channel.send(embed)
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
         if(!i) return ;
});


//reklam engel son //
//küfür engel //
const küfür = [
        "siktir",
        "fuck",
        "puşt",
        "pust",
        "piç",
        "sikerim",
        "sik",
        "yarra",
        "yarrak",
        "amcık",
        "orospu",
        "orosbu",
        "orosbucocu",
        "oç",
        ".oc",
        "ibne",
        "yavşak",
        "bitch",
        "dalyarak",
        "amk",
        "awk",
        "taşak",
        "taşşak",
        "daşşak",
		"sikm",
		"sikim",
		"sikmm",
		"skim",
		"skm",
		"sg"
      ];
client.on("messageUpdate", async (old, nev) => {
  
    if (old.content != nev.content) {
    let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
   if (i) {
      
      if (küfür.some(word => nev.content.includes(word))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return ;
       //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
 const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` ${nev.author} , **Mesajını Editleyerek Küfür Etmeye Çalıştı!**`)
            .addField("Küfür:",nev)
        
            nev.delete();
            const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` ${nev.author} , **Mesajı Editleyerek Küfür Etmene İzin Veremem!**`) 
          client.channels.cache.get(y).send(embed)
            nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
          
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {

     
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
         let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);
   
    let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
          if (i) {
              if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                 if (!msg.member.hasPermission("MANAGE_GUILD")) {
                 //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
     msg.delete({timeout:750});
                    const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` <@${msg.author.id}> , **Bu Sunucuda Küfür Yasak!**`)
      msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
                const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` ${msg.author} , **Küfür Etmeye Çalıştı!**`) .addField("Mesajı:",msg)
               client.channels.cache.get(y).send(embed)
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
         if(!i) return ;
});

//küfür engel son //
// canvaslı giriş //
client.on("guildMemberRemove", async member => {
  //let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  //const canvaskanal = member.guild.channels.cache.get(resimkanal[member.guild.id].resim);
  
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
  if (!canvaskanal) return;

  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucudan Ayrıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/qUyQWE.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-güle-güle.png"
  );

    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
  
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));

  if (!canvaskanal || canvaskanal ===  undefined) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucuya Katıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/KRIR97.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-hosgeldin.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});
//canvaslı giriş son //


//////////////
//ROL VE KANAL KORUMA
client.on("roleCreate", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Rol`, role.name)
      .addField(`Sonuç`, `Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor("BLACK")
      .addField(`Rolu Açan`, entry.executor.tag)
      .addField(`Açılan Rol`, role.name)
      .addField(`Sonuç`, `Açılan Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelDelete", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Açıldı!`)

      .setColor("BLACK");
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Kanalı Silen`, entry.executor.tag)
      .setColor("BLACK")
      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Silinen Kanal Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelCreate", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Kanalı Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Açılan Kanal Geri Silindi`);
    client.channels.cache.get(kanal).send(embed);
  }
});
// Ban ve Rol Koruma Devam
client.on("guildBanAdd", async (guild, user) => {
  let kontrol = await db.fetch(`dil_${guild.id}`);
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor("BLACK")
      .addField(`Yasaklayan`, entry.executor.tag)
      .addField(`Yasaklanan Kişi`, user.name)
      .addField(
        `Sonuç`,
        `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
      );
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor("BLACK")
      .addField(`Yasaklayan`, entry.executor.tag)
      .addField(`Yasaklanan Kişi`, user.name)
      .addField(
        `Sonuç`,
        `Yasaklayan Kişi Sunucudan Atıldı ve yasaklanan kişinin yasağı kalktı `
      );
    client.channels.cache.get(kanal).send(embed);
  }
});
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor("BLACK")
      .addField(`Silen`, entry.executor.tag)
      .addField(`Silinen Rol`, role.name)
      .addField(`Sonuç`, `Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor("BLACK")
      .addField(`Silen`, entry.executor.tag)
      .addField(`Silinen Rol`, role.name)
      .addField(`Sonuç`, `Silinen Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});
// SAYAÇ SİSTEMİ

client.on("guildMemberAdd", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!kanal) return;
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacHG_${member.guild.id}`);
  ///....

  ///....
  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(
        "`" +
          member.user.username +
          "`**Adlı Kullanıcı Aramıza Katıldı!** `" +
          sayaç +
          "` **Kişi Olmamıza** `" +
          sonuç +
          "` **Kişi Kaldı.** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
  }

  if (member.guild.memberCount == sayaç) {
    return client.channels
      .get(kanal)
      .send(
        ` **Sayaç Sıfırlandı!** \`${member.guild.memberCount}\` **Kişiyiz!**`
      );
    await db.delete(`sayacK_${member.guild.id}`);
    await db.delete(`sayacS_${member.guild.id}`);
    await db.delete(`sayacHG_${member.guild.id}`);
    await db.delete(`sayacBB_${member.guild.id}`);
  }
  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uyetag-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});

client.on("guildMemberRemove", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacBB_${member.guild.id}`);
  if (!kanal) return;
  if (!sayaç) return;
  ///....

  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(
        "`" +
          member.user.username +
          "` **Adlı Kullanıcı Aramızdan Ayrıldı.**`" +
          sayaç +
          "` **Kişi Olmamıza** `" +
          sonuç +
          "` **Kişi Kaldı.** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
  }

  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uye-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});
/// YASAKLI TAG

client.on("guildMemberAdd", async member => {
  let guild = member.guild;
  let user = guild.members.cache.get(member.id);

  const tag = await db.fetch(`banned-tag.${guild.id}`);
  const sayı = await db.fetch(`atıldın.${guild.id}.${user.id}`);
  if (user.user.username.includes(tag)) {
    if (sayı === null) {
      await db.add(`atıldın.${guild.id}.${user.id}`, 1);
      user.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor(guild.name, guild.iconURL)
          .setDescription(
            `Sunucumuzun yasaklı tagında bulunduğunuz için atıldınız, tekrar giriş yapmayı denerseniz **yasaklanacaksınız**!`
          )
      );
      await user.kick();
    }

    if (sayı === 1) {
      await db.delete(`atıldın.${guild.id}.${user.id}`);
      user.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor(guild.name, guild.iconURL)
          .setDescription(
            `Sunucumuzun yasaklı tagında bulunduğunuz için atılmıştınız, tekrar giriş yapmayı denediğiniz için **${guild.name}** sunucusundan kalıcı olarak **yasaklandınız**!`
          )
      );
      await user.ban();
    }
  }
});

//YASAKLI TAG
/// OTOROL SİSTEMİ

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;

  if (!mesaj) {
    client.channels.cache
      .get(kanal)
      .send(
        "" +
          member.user.username +
          "`** HoşGeldin! Otomatik Rolün Verildi Seninle Beraber** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
    return member.roles.add(rol);
  }

  if (mesaj) {
    var mesajs = mesaj
      .replace("-uye-", `${member.user}`)
      .replace("-uyetag-", `${member.user.tag}`)
      .replace("-rol-", `${member.guild.roles.cache.get(rol).name}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.cache.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`);
    member.roles.add(rol);
    return client.channels.cache.get(kanal).send(mesajs);
  }
});

// OTOROL SON


////RESIMLI GUVENLIK////

client.on('guildMemberAdd',async member => {
  let user = client.users.cache.get(member.id);
  let kanal = client.channels.cache.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://i.hizliresim.com/DWmOSd.png')
    const resim2 = await Canvas.loadImage('https://i.hizliresim.com/hIvMtu.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1


     const background = await Canvas.loadImage("https://i.hizliresim.com/qB0nlb.png");
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   if (!kanal) return
       const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'güvenlik.png');
    kanal.send(attachment)
});

///////////RESIMLI GUVENLIK//////////





//////////////EKLENDİM ATİLDİM ////
client.on("guildCreate", async function(guild) {

const owner = client.users.cache.get(guild.ownerID)

const kanal = "963805286781571143" //Eklendim mesajının atılacağı kanal ID'sini giriniz.

const darkcode = new Discord.MessageEmbed()

.setTitle(`Yeni bir sunucuya eklendim`)

.setColor("BLACK")

.addField(`Sunucu Adı`, guild.name)

.addField(`Sunucu Sahibi`, owner.username + "#" +owner.discriminator)

.addField(`Sunucu Üye Sayısı`, guild.memberCount)

client.channels.cache.get(kanal).send({embed: darkcode}).catch(err => console.log("Kanala mesaj atamıyorum!"))

})

//Atıldım

client.on("guildDelete", async function(guild) {

const owner = client.users.cache.get(guild.ownerID)

const kanal = "963805286781571143" //Atıldım mesajının atılacağı kanal ID'sini giriniz.

const darkcode = new Discord.MessageEmbed()

.setTitle(`Bir sunucudan atıldım`)

.setColor("BLACK")

.addField(`Sunucu Adı`, guild.name)

.addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)

.addField(`Sunucu Üye Sayısı`, guild.memberCount)

client.channels.cache.get(kanal).send({embed: darkcode}).catch(err => console.log("Kanala mesaj atamıyorum!"))

})


//////ETIKETLENINCE PREFIX////

client.on("message", msg => {
	//let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
	const westrabumbe = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.setDescription(`Prefixim: ${prefix}\n Yardım için: ${prefix}yardım`)
  if (msg.content.includes(`<@${client.user.id}>`) || msg.content.includes(`<@!${client.user.id}>`)) {
    msg.channel.send(westrabumbe);
  }
});

////////ETIKETLNINCE PREFIX///////  
// az daha araştır 70 de salarız
//// Seviye ///
client.on("message", async msg => {

  if(msg.content.startsWith(prefix)) return;

  const db = require('quick.db');

  var id = msg.author.id;

  var gid = msg.guild.id;

  var xp = await db.fetch(`xp_${id}_${gid}`);

  var lvl = await db.fetch(`lvl_${id}_${gid}`);

  let seviyexp = await db.fetch(`seviyexp${msg.guild.id}`)

  const skanal = await db.fetch(`seviyekanal${msg.guild.id}`)

  let kanal = msg.guild.channels.cache.get(skanal)

  if (msg.author.bot === true) return;

  let seviyeEmbed = new Discord.MessageEmbed()

   seviyeEmbed.setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun!`)

   seviyeEmbed.setFooter(`${client.user.username} | Seviye Sistemi`)

   seviyeEmbed.setColor("RANDOM")

   if(!lvl) {

    db.set(`xp_${id}_${gid}`, 5);

    db.set(`lvl_${id}_${gid}`, 1);

    db.set(`xpToLvl_${id}_${gid}`, 100);

    db.set(`top_${id}`, 1)

    }

  

  let veri1 = [];

  

  if(seviyexp) veri1 = seviyexp

  if(!seviyexp) veri1 = 5

  

  if (msg.content.length > 7) {

    db.add(`xp_${id}_${gid}`, veri1)

  };

  let seviyesınır = await db.fetch(`seviyesınır${msg.guild.id}`)

    let veri2 = [];

  

  if(seviyesınır) veri2 = seviyesınır

  if(!seviyesınır) veri2 = 250

   

  if (await db.fetch(`xp_${id}_${gid}`) > veri2) {

    if(skanal) {

 kanal.send(new Discord.MessageEmbed()

   .setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun:tada:`)

   .setFooter(`${client.user.username} | Seviye Sistemi`)

   .setColor("RANDOM"))

    }

    db.add(`lvl_${id}_${gid}`, 1)

    db.delete(`xp_${id}_${gid}`)};

    db.set(`top_${id}`, Math.floor(lvl+1))

  });

//SEVİYE-ROL-----------------------------------

client.on('message', async message => {

  var id = message.author.id;

  var gid = message.guild.id;

  let rrol = await db.fetch(`rrol.${message.guild.id}`)

  var level = await db.fetch(`lvl_${id}_${gid}`);

  

    if(rrol) {

  rrol.forEach(async rols => {

    var rrol2 = await db.fetch(`rrol2.${message.guild.id}.${rols}`)

    if(Math.floor(rrol2) <= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.add(rols)

    }

     else if(Math.floor(rrol2) >= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.remove(rols)

    }

  })

  }

  

    if(message.content == '!rütbeler') {

    if(!rrol) {

                message.channel.send(new Discord.MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`Herhangi bir rol oluşturulmadı.`))

      

      

      return;

    }

        const { MessageEmbed } = require('discord.js')

      let d = rrol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`rrol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")

    message.channel.send(new MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`${d}`))

  }

  

  

})

client.on('message', async message => {

   var id = message.author.id;

  var gid = message.guild.id;

  let srol = await db.fetch(`srol.${message.guild.id}`)

  var level = await db.fetch(`lvl_${id}_${gid}`);

  if(srol) {

  srol.forEach(async rols => {

    var srol2 = await db.fetch(`srol2.${message.guild.id}.${rols}`)

    if(Math.floor(srol2) <= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.add(rols)

    }

     else if(Math.floor(srol2) >= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.remove(rols)

    }

  })

  }

    if(message.content == '!seviyerolleri' || message.content == "!levelroles") {

    if(!srol) {

                message.channel.send(new Discord.MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`Herhangi bir rol oluşturulmadı.`))

      return;

    }

        const { MessageEmbed } = require('discord.js')

      let d = srol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`srol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")

    message.channel.send(new MessageEmbed()

                      .setColor("RANDOM")

                      //.setColor(message.guild.member(message.author).highestRole.hexColor)

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`${d}`))

  }

  

})
///////mod-log

client.on("messageDelete", async (message) => {

  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(await db.fetch(`log_${message.guild.id}`));

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "")

  log.send(embed)

})

client.on("messageUpdate", async (oldMessage, newMessage) => {

  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Discord.MessageEmbed()

  .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

  .addField("**Eylem**", "Mesaj Düzenleme")

  .addField("**Mesajın sahibi**", `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`)

  .addField("**Eski Mesajı**", `${oldMessage.content}`)

  .addField("**Yeni Mesajı**", `${newMessage.content}`)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`, oldMessage.guild.iconURL())

  .setThumbnail(oldMessage.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

});

client.on("channelCreate", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());

    let kanal;

    if (channel.type === "text") kanal = `<#${channel.id}>`

    if (channel.type === "voice") kanal = `\`${channel.name}\``

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal**", `${kanal}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconUR)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("channelDelete", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconURL)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("roleCreate", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Rol Oluşturma")

.addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("roleDelete", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Rol Silme")

.addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)

.addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiCreate", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Oluşturma")

.addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiDelete", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Silme")

.addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)

.addField("**Silinen emoji**", `${emoji}`)

.setTimestamp()

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {

let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

if (!modlog) return;

const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Güncelleme")

.addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)

.addField("**Güncellenmeden önceki emoji**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)

.addField("**Güncellendikten sonraki emoji**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)

.setThumbnail(oldEmoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Yasaklama")

.addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)

.addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)

.addField("**Yasaklanma sebebi**", `${entry.reason}`)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanRemove", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Yasak kaldırma")

.addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)

.addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)

.setTimestamp()
//DarkCode
.setColor("RANDOM")
//DarkCode
.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)
//DarkCode
//DarkCode
client.channels.cache.get(modlog).send(embed)

})
// mod log son ///

// İnvite Sistemi Beta //
// İnvite Sistemi Son //
// AYARLANABİLİR KAYIT KANAL //
// AYARLANABİLİR KAYIT KANAL //
client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let kanal = db.fetch(`kayıthg_${member.guild.id}`);
  let kayıtçı = db.fetch(`kayıtçırol_${member.guild.id}`);
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const ayyy = moment.duration(kurulus).format("M");
  var kontrol = [];

  if (ayyy < 1) {
    kontrol = "**Şüpheli** <a:ininal_uyar:963740472843579392>";
  }
  if (ayyy > 1) {
    kontrol = "**Güvenilir** <a:gifstoryYesilTik:963738945169031218>";
  }

  if (!kanal) return;

  ///////////////////////

  let randomgif = [ 
             "https://media.discordapp.net/attachments/744976703163728032/751451554132918323/tenor-1.gif", "https://media.discordapp.net/attachments/744976703163728032/751451693992116284/black.gif", "https://media.discordapp.net/attachments/765870655958548490/765871557993824256/tumblr_ozitqtbIIf1tkflzao1_540.gif", "https://media.discordapp.net/attachments/765870655958548490/765871565257965578/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f32622f61352f31312f32626135313161663865.gif"];

  ///////////////////
  const embed = new Discord.MessageEmbed()
    .setColor("36393F")
    .setImage(randomgif[Math.floor(Math.random() * randomgif.length)])
    .setThumbnail(
      user.avatarURL({
        dynamic: true,
        format: "gif",
        format: "png",
        format: "jpg",
        size: 2048
      })
    )

    .setDescription(
      `**Hoşgeldin!** ${
        member.user
      }, seninle beraber **${
        guild.memberCount
      }** kişi olduk! \n Kaydının yapılması için  **İsim** ve **Yaş** Yazman Gerek. \n Hesap Kuruluş: **${moment(
        user.createdAt
      ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
       )}** \n Bu vatandaş: ${kontrol} \n <@&${kayıtçı}> Rolundeki Yetkililer Sizinle İlgilecektir

  `
    );

  
  client.channels.cache.get(kanal).send(embed);
  client.channels.cache.get(kanal).send(`<@&${kayıtçı}>`);
});
//kayıt kanal son //

//kayıt kanal son //

//sa-as

   const saasembed = new Discord.MessageEmbed()
////.setTitle('Bir Gold Üye Belirdi! <a:wavygolduye:742353872013754428>')
.setDescription('Aleyküm Selam. Hoş Geldin! <a:selam:963835199915950160>')
.setTimestamp()
.setFooter('20kege')
.setColor(0x36393E)
   
 client.on("message", async msg => {
  let saas = await db.fetch(`saas_${msg.guild.id}`);
  if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'sa' || msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'sea' || msg.content.toLowerCase() == 'sae' || msg.content.toLowerCase() == 'selamün aleyküm' || msg.content.toLowerCase() == 'saa' || msg.content.toLowerCase() == 'seaa') {
    msg.channel.send(saasembed).then(msg => msg.delete({ timeout: 8000, reason: '.' }));
  }
  }
});

/// ekonomi sistemi

client.emojiler = {
  gold: "963741752194371595", //?PARAM DAKİ ALTIN EMOJİSİ
  paraGitti: "963741031763963914", // X İŞARETİ
  paraGitmedi: "963742052414275584", // TİK İŞARETİ
  paraROZET: "963742314415673344", // PARA İLE ALINAN YILDIRIM ROZET EMOJİSİ
  onayRozet: "963738945169031218", // ONAY ROZETİ
  modRozet: "963742548613009410", // MOD ROZETİ
  yetkiliRozet: "963742597044650045", // YETKİLİ ROZETİ
  destekçiRozet: "963743030307880990",
  evet: "963738945169031218", // TİK İŞARET
  hayır: "963739110634307604", // X İŞARETİ
  acikk: "963743703078436884",
  kapalii: "963743703078436884",
  kendineParaYollama: "963745838893531167", // KENDİNE PARA ATMAYA ÇALIŞANLAR İÇİN SİNİRLİ EMOJİSİ
  konfeti: "963746042401148960", // MESLEK SAHİBİ OLUNCA RENGARENK KONFETİ ATIYOR
  yukleniyor: "963746147149697045", // YÜKLENİYOR EMOJİ İŞTE :D
  sinirli: "963746262270763059", // TİTREYEN SİNİRLİ :D
  mutlu: "963746401869783060", // MUTLU EMOJİ
  rahatsızetme: "963746611798900776"  , // RAHATSIZ ETMEYİN EMOJİSİ
  çevrimiçi: "963743585566621726", // ÇEVRİMİÇİ EMOJİSİ
  yayıncı: "963743585566621726", // YAYINCI EMOJİSİ
  çevrimdışı: "963743703078436884", // ÇEVRİM DIŞI EMOJİSİ
  boşta: "963746928053616671", // BOŞTA EMOJİSİ
  bot: "963747062598500362", // BOT EMOJİSİ
  polis: "963747225769488404", // POLİS EMOJİ
  Yvar: "963738945169031218", // YETKİLERİM KOMUDUNDAKİ TİK İŞARETİ
  Yyok: "963739110634307604", // YETKİLERİM KOMUDUNDAKİ X İŞARETİ
  yan: "963747471807348786", // > GİBİ EMOJİ İŞTE :ç
  kalpSarılmalı: "963747577327648789",
  olumlu: "",
  olumsuz: "",

  // AYARLAR KOMUDUNDAKİ AÇIK KAPALI EMOJİLERİ >>>>>>>>>>>>>>>>>
  kapalıA: "963738945169031218",
  açıkA: "963739110634307604",

  // AÇIK BONUS EMOJİLERİ -------------- >>>>>>>>>>

  açıkB: ":b:", // B
  açıkO: ":o2:", // O
  açıkN: ":regional_indicator_n:", // N
  açıkU: ":regional_indicator_u:", // U
  açıkS: ":regional_indicator_s:", // S

  // KAPALI BONUS EMOJİLERİ ---------------- >>>>>>>>>>>>>

  kapalıO: ":o2:", // O
  kapalıN: ":regional_indicator_n: ", // N
  kapalıU: ":regional_indicator_u:", // U
  kapalıS: ":regional_indicator_s:" // S
};

client.ayarlar = {
  official_sahip: "951175665401614337",
  sahip: "893148229674356806",

  yardimcilar: [""],
  isim: "20kege",
  botD:
    "https://discordapp.com/oauth2/authorize?client_id=952290814271307796&scope=bot&permissions=8",
  prefix: "k!",
};

// spam engel başlangıç

const dctrat = require('dctr-antispam.js'); 

var authors = [];
var warned = [];

var messageLog = [];

client.on('message', async message => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return
const spam = await db.fetch(`spam.${message.guild.id}`);
if(!spam) return;
const maxTime = await db.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await db.fetch(`time.${message.guild.id}.${message.author.id}`);
db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await db.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
  const westraaaaam = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`<@${message.author.id}> , **Bu Sunucuda Spam Yapmak Yasak!**`)
  .setFooter(`Bu mesaj otomatik olarak silinecektir.`)

 message.channel.send(westraaaaam).then(msg => msg.delete({timeout: 1500}));
  return message.delete();
  
}
} else {
db.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
db.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+3000);
setTimeout(() => {
db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
db.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500) // default : 500
}

// spam engel bitiş
});