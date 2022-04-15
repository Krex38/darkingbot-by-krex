const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const { MessageAttachment } = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const prettyMilliseconds = require('pretty-ms');
exports.run = async(client, message, args) => {

    
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Bu Komutu Kullanabilmek İçin \`Yönetici\` yetkisine sahip olmalısın!")

        const yuzdeHesapla = (p1, p2) => {
          const yapilan = p2 - p1;
          return ((yapilan * 100) / p2).toFixed(2)
      };
  
      const yaklasikSure = (count) => {
          const toplamSure = 3000 * count;
          const tahminiSureIng = prettyMilliseconds(toplamSure);
          const tahminiSureTr = tahminiSureIng
              .replace(/s/g, ' saniye')
              .replace(/m/g, ' dakika')
              .replace(/h/g, ' saat')
              .replace(/ms/g, ' milisaniye');
  
  
          return tahminiSureTr;
      };

const bans = message.guild.fetchBans().then(bans => {
  if (bans.size === 0) return message.channel.send(new Discord.MessageEmbed().setColor("#ff1100").setDescription(`❌ Bu sunucuda kimse yasaklanmamış.`))
  
      
  
const onayEmbed = new Discord.MessageEmbed()
                .setFooter(`${message.author.tag} - Onay İşlemi`, message.author.displayAvatarURL())
                .setTimestamp()
                .setColor("#00ccff")
                .addField('Yasağı Kaldırılacak Kişi:', bans.size, true)
                .addField('İşlem Süresi:', yaklasikSure(bans.size), true)
                .addField('İşlemi Onaylıyor Musun?', `Evet: ✅ Hayır: ❌`)
                .setAuthor(`${message.author.username} Herkesin yasağını kaldırmak mı istiyorsun?`, message.author.displayAvatarURL())
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))

                message.channel.send(onayEmbed).then(m => {
                    m.react('✅');
                    m.react('❌');
                    const emojies = ['✅', '❌'];
                    const filter = (reaction, user) => {
                        return emojies.includes(reaction.emoji.name) && message.author.id == user.id;
                    };

                    const collector = m.createReactionCollector(filter, { max: 1, time: 30000 })
                    collector.on('collect', (reaction, user) => {
                        switch (reaction.emoji.name) {
                            case '✅':
                                m.reactions.removeAll();

                                    var islemYapilan = 1, kalanKisi = bans.size;
                                    bans.forEach(b => {
                                    const timeout = setTimeout(() => {
                                      message.guild.members.unban(b.user.id);
                                      m.edit(new Discord.MessageEmbed().setColor("YELLOW").setThumbnail(message.author.displayAvatarURL({dynamic: true})) .setAuthor(`${message.author.username} Herkesin yasağı kaldırılıyor...`, message.author.displayAvatarURL()).addField('Kalan Kişi:', kalanKisi, true).addField('Tamamlanacak Yüzde:', `%${yuzdeHesapla(kalanKisi, bans.size)}`, true).addField('Toplam Süre:', yaklasikSure(bans.size), true).addField(`Kalan Süre:`, `${yaklasikSure(kalanKisi)}`, true).setFooter(`İşlemi Yapan: ${message.author.tag}`, message.author.displayAvatarURL()).setTimestamp())
                                      clearTimeout(timeout)
                                      kalanKisi = kalanKisi - 1;
                                        if (kalanKisi == 0) {
                                            m.edit(new Discord.MessageEmbed().setColor("#49f30f").setDescription(`Toplamda **${bans.size}** üyenin yasağı başarıyla kaldırıldı.`))
                                        }
                                  }, islemYapilan * 1000);
                                  islemYapilan = islemYapilan + 1;
                                });

                                break;
                            case '❌':
                                m.reactions.removeAll();
                                m.edit(new Discord.MessageEmbed().setColor('#ff1100').setDescription(`❌ Ret tepkisine basıldığı için işlem iptal edildi.`));
                                break;
                        };
                    });

                    collector.on('end', collected => {
                        if (collected.size == 0) {
                            m.reactions.removeAll();
                            m.edit(new Discord.MessageEmbed().setColor('#ff1100').setDescription(`❌ 30 saniye içerisinde işlem yapılmadığı için işlem iptal edildi.`));
                        }
                    })
                });
              });
            }
            
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
 };
 
 exports.help = {
 name: 'toplu-unban',
 description: 'Taş kağıt makas oyununu oynar.',
 usage: 'tkm'
 }