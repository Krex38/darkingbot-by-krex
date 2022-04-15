const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {

  if(!database.fetch('güncellemeler') || database.fetch('güncellemeler').length <= 0) return message.reply('Hiç güncelleme notu eklenmemiş.');
  
  let pages = [];
  let page = 1;
  database.fetch('güncellemeler').sort((a, b) => b.number-a.number).forEach(data => {
    pages.push(new Discord.MessageEmbed()
    .setColor('GOLD')
    .setAuthor('Güncelleme #'+data.number)
    .setDescription(data.title)
               .setFooter('© 𝓓𝓪𝓻𝓴𝓲𝓷𝓰 𝓐𝓵𝓵 𝓡𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. 2022')
    .addField('Açıklama', '・ '+data.description.split('\n').join('\n・ ')));
  });

  message.channel.send(pages[0]).then(m => {
    m.react('⬅').then(() => m.react('➡'));
    const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
    const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

    const backwards = m.createReactionCollector(backwardsFilter, { time: 0 });
    const forwards = m.createReactionCollector(forwardsFilter, { time: 0 });

    forwards.on('collect', (reaction, user) => {
      if(page === pages.length) {
        page = 0;
      };
      page++;
      reaction.users.remove(user.id);
      m.edit(pages[page-1]);
    })
    backwards.on('collect', (reaction, user) => {
      console.log(page);
      if(page <= 1) {
        page = pages.length+1;
      };
      reaction.users.remove(user.id);
      page--;
      m.edit(pages[page-1]);
    })
  });

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['güncelleme'],
  permLevel: 0
};

exports.help = {
  name: 'güncellemeler'
};