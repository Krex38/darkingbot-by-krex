const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let replies = ["https://cdn.discordapp.com/attachments/694694493525377035/737302021295833109/GIF-200727_113742.gif","https://cdn.discordapp.com/attachments/694694493525377035/737302739444301824/wqeqw.gif","https://cdn.discordapp.com/attachments/694694493525377035/737303378173886554/a_14254a7b0842b2a7f32a19cb34028da4.gif","https://cdn.discordapp.com/attachments/694694493525377035/737302765520551946/a_dfda87717edc3a1ee1057aec5304f082.gif","https://cdn.discordapp.com/attachments/694694493525377035/737310262906060810/image0.gif","https://cdn.discordapp.com/attachments/694694493525377035/737310178180989009/image0.gif","https://cdn.discordapp.com/attachments/694694493525377035/737310007929864252/image0.gif","https://cdn.discordapp.com/attachments/694694493525377035/737300958031380549/a_e052cc1eb09b212fa6b4c3644450b154.gif","https://cdn.discordapp.com/attachments/694694493525377035/737301552750002226/rosiegif4.gif","https://cdn.discordapp.com/attachments/694694493525377035/737301660455534642/GIF.6.gif","https://cdn.discordapp.com/attachments/694694493525377035/737301813912666145/gif_342.gif","https://cdn.discordapp.com/attachments/694694493525377035/737301817615974471/GIF.5.gif","https://cdn.discordapp.com/attachments/694694493525377035/737301870971846687/gif_346.gif","https://cdn.discordapp.com/attachments/694694493525377035/737301916379381790/gif_335.gif","https://cdn.discordapp.com/attachments/694694493525377035/737021018333249546/Lorie10.gif","https://cdn.discordapp.com/attachments/694694493525377035/737021142547693618/a_3a35e998e21a471ca9999b2e78051d53.gif","https://cdn.discordapp.com/attachments/694694493525377035/737036899612360774/a_0edcde786dca1aa7cb3caf12af732bc5.gif","https://media.discordapp.net/attachments/751141849116180540/751348238975500298/8.gif","https://media.discordapp.net/attachments/751141849116180540/751348183980048404/6.gif","https://media.discordapp.net/attachments/751141849116180540/751348161825603614/5.gif","https://media.discordapp.net/attachments/751141849116180540/751348075829657690/3.gif","https://media.discordapp.net/attachments/751141849116180540/751348050517164062/2.gif","https://media.discordapp.net/attachments/751141849116180540/751347998033707018/1.gif","https://media.discordapp.net/attachments/751141849116180540/751201790803968061/a_34f12bfd7791cdec1317da8aa21590ce.gif","https://media.discordapp.net/attachments/751141849116180540/751195560265908254/w_20.gif","https://media.discordapp.net/attachments/751141849116180540/751195550791237703/w_19.gif","https://media.discordapp.net/attachments/751141849116180540/751195533774684160/w_21.gif","https://media.discordapp.net/attachments/751141849116180540/751193678911111178/w_15.gif","https://media.discordapp.net/attachments/751141849116180540/751193673848586371/w_13.gif","https://media.discordapp.net/attachments/751141849116180540/751193510597886054/w_16.gif","https://media.discordapp.net/attachments/751141849116180540/751193493359296523/w_18.gif","https://media.discordapp.net/attachments/751141849116180540/751193404532064437/w_12.gif","https://media.discordapp.net/attachments/751141849116180540/751189686529294477/ados_w5_2.gif","https://media.discordapp.net/attachments/751141849116180540/751189534791827576/ados_w2.gif","https://media.discordapp.net/attachments/751141849116180540/751189244088942603/ados_w5.gif","https://media.discordapp.net/attachments/751141849116180540/751189205681569942/ados_w4.gif","https://media.discordapp.net/attachments/751141849116180540/751189167282847874/ados_w7.gif","https://media.discordapp.net/attachments/751141849116180540/751348261343723520/9.gif","https://media.discordapp.net/attachments/751141849116180540/751379648100958248/0d31124e6990f607959db79111fb8163.gif","https://media.discordapp.net/attachments/751141849116180540/751378935786504323/b8143951b7c0815fb25d3089d104a313.gif","https://media.discordapp.net/attachments/751141849116180540/751378934955900928/717aacd2e5a130d8826cfa76031d932c.gif","https://media.discordapp.net/attachments/751141849116180540/751378934192406548/fcf6c0fa40e97898c1e653e0f05accbd.gif","https://media.discordapp.net/attachments/751141849116180540/751378933286699028/3176e8e54324fb86064f22b6db71ffdc.gif?width=432&height=492","https://media.discordapp.net/attachments/751141849116180540/751378932468547594/0002a6c3ff5889af2a420706353ad685.gif","https://media.discordapp.net/attachments/751141849116180540/751378931483017306/6ef7043c1eaa43bab5058564e9152ac6.gif","https://media.discordapp.net/attachments/751141849116180540/751378930614665247/462f0ac5df83ee37ddd54d094c73eddd.gif","https://media.discordapp.net/attachments/751141849116180540/751356772211490856/a_b6380b4473b669dd402e709382bd2527.gif","https://media.discordapp.net/attachments/751141849116180540/751355936223789066/a_a254d1bb3b3822077f7c45003abe005f.gif","https://media.discordapp.net/attachments/751141849116180540/751348319866978314/11.gif","https://media.discordapp.net/attachments/751141849116180540/751348284039102515/10.gif","https://media.discordapp.net/attachments/751141849116180540/751409167620767804/tenor.gif"];
    let result = Math.floor((Math.random() * replies.length));
    let gifembed = new Discord.MessageEmbed()
        .setTitle(" Woman Gif;")
        .setColor("BLACK")
        .setFooter(`${message.author.tag} `, message.author.avatarURL)
        .setImage(replies[result]);
    message.channel.send(gifembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gif-woman','woman-gif','gifwoman','womangif'],
  permLevel: 0
};

exports.help = {
  name: 'woman',
  description: 'Rastgele gif atar.',
  usage: 'woman'
};