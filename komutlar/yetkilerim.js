const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

exports.run = (client, msg, args) => {


let x;
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    let x7;
    let x8;
    let x9;
    let x10;
    let x11;
    
    //yönetici
    if (msg.member.hasPermission("ADMINISTRATOR")) x = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("ADMINISTRATOR")) x = "<:mcno:963739110634307604>"
    
    //Denetim kaydı
    if (msg.member.hasPermission("VIEW_AUDIT_LOG")) x2 = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("VIEW_AUDIT_LOG")) x2 = "<:mcno:963739110634307604>"
    
    //Sunucuyu yönet
    if (msg.member.hasPermission("MANAGE_GUILD")) x3 = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("MANAGE_GUILD")) x3 = "<:mcno:963739110634307604>"
    
    //Rolleri yönet
    if (msg.member.hasPermission("MANAGE_ROLES")) x4 = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("MANAGE_ROLES")) x4 = "<:mcno:963739110634307604>"
    
    //Kanalları yönet
    if (msg.member.hasPermission("MANAGE_CHANNELS")) x5 = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) x5 = "<:mcno:963739110634307604>"
    
    //üyeleri at
    if (msg.member.hasPermission("KICK_MEMBERS")) x6 = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("KICK_MEMBERS")) x6 = "<:mcno:963739110634307604>"
    
    //üyeleri yasakla
    if (msg.member.hasPermission("BAN_MEMBERS")) x7 = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("BAN_MEMBERS")) x7 = "<:mcno:963739110634307604>"
    
    //mesajları yönet
    if (msg.member.hasPermission("MANAGE_MESSAGES")) x8 = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) x8 = "<:mcno:963739110634307604>"
    
    //kullanıcı adlarını yönet
    if (msg.member.hasPermission("MANAGE_NICKNAMES")) x9 = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("MANAGE_NICKNAMES")) x9 = "<:mcno:963739110634307604>"
    
    //emojileri yönet
    if (msg.member.hasPermission("MANAGE_EMOJIS")) x10 = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("MANAGE_EMOJIS")) x10 = "<:mcno:963739110634307604>"
    
    //webhookları yönet
    if (msg.member.hasPermission("MANAGE_WEBHOOKS")) x11 = "<a:gifstoryYesilTik:963738945169031218>"
    if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) x11 = "<:mcno:963739110634307604>"
     const embed = new Discord.MessageEmbed()
  .setColor('GREEN')
    .setDescription(` ${x} Yönetici \n${x2} Denetim Kaydını Görüntüle\n ${x3} Sunucuyu Yönet \n${x4} Rolleri Yönet \n${x5} Kanalları Yönet \n${x6} Üyeleri At \n${x7} Üyeleri Yasakla \n${x8} Mesajları Yönet \n${x9} Kullanıcı Adlarını Yönet \n${x10} Emojileri Yönet \n${x11} Webhook'ları Yönet`);
 msg.channel.send(embed);

  
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkilerim'],
  permLevel: 0,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'yetkilerim',
  description: 'Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.',
  usage: 'yetkilerim'
};