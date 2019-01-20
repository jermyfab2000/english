const Discord = require('discord.js');
const fs = require('fs');
const settings = require('./../settings.json');
const owner = settings.owner;


module.exports.run = async (bot, message, args) => {

    let voice = "531396805217222667";
    let codes = "531420672484835328";
    let general = "531420861488562196";
    let commands = "531419935658999808"

    console.log("Activating Auto Comamand");

    let raw = fs.readFileSync('./roles.json');
    let allowedRoles = JSON.parse(raw);

    let validation = function(serverRoles, userRoles){
     let val = false;
     serverRoles.forEach((role) => {
         userRoles.forEach((usr) => {
                if (role == usr){
                  val = true;
                }
            });
        });
        return val;
    }


    let intro = new Discord.RichEmbed()
        .setTitle("Scrim Will Start Every xx:00 and xx:30 , 24/7")
        .setColor("#00cc00");

        bot.guilds.get(message.guild.id).channels.get(commands).send({embed: intro}).catch((err) => {
            console.log(err);
        });

        let autoScrims = setInterval(() => {
            let time = new Date();
            let min = time.getMinutes();
            let embed = new Discord.RichEmbed()

            if (min === 50 || min === 20){
				embed.setTitle("Next match starts in 10 minutes **Join Countdown!**")
				embed.setColor("#00cc00");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });
            }else if (min === 55 || min === 25){
                embed.setTitle("Next match starts in 5 minutes **Join Countdown!****")
				embed.setColor("#EDFF21");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });
            }else if (min === 59 || min === 29){
                embed.setTitle("Next match starts in 1 minute **Join the countdown channel and make sure your content is loaded!**")
				embed.setColor("#F80000");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });
            
            }else if (min === 00 || min === 30){
                embed.setTitle("The Scrim Already Started, Good Luck __**Remember to put your last 3 digits in #code**__")
				embed.setColor("#00cc00");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });

                bot.guilds.get(message.guild.id).channels.get(commands).send("!count").catch((err) => {
                    console.log(err);
                });

                bot.guilds.get(message.guild.id).channels.get(codes).send("!start").catch((err) => {
                    console.log(err);
                });

            }else if (min === 02 || min === 32){
                embed.setTitle("REQ starts in 1 minute **Join the countdown channel**")
				embed.setColor("#EDFF21");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });
            }else if (min === 03 || min === 33){
                embed.setTitle("REQ starts in 1 minute **Join the countdown channel and make sure your content is loaded**")
				embed.setColor("#F80000");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });
			}else if (min === 04 || min === 34){
                embed.setTitle("The REQ Already Started, Good Luck __**Remember to put your last 3 digits in #code**__")
				embed.setColor("#00cc00");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });

                bot.guilds.get(message.guild.id).channels.get(commands).send("!count").catch((err) => {
                    console.log(err);
                });

                bot.guilds.get(message.guild.id).channels.get(codes).send("!start").catch((err) => {
                    console.log(err);
                });
			
			}
				
            const filter = m => !m.author.bot;
            const collect = bot.guilds.get(message.guild.id).channels.get(commands)
                .createMessageCollector(filter, {time: 60000});

            collect.on('collect', m => {
                if (m.content === "!auto-stop" || m.content === "!auto-start"){
                    if(validation(allowedRoles.roles, m.member.roles.array()) || m.member.id === owner){
                        clearInterval(autoScrims);
                        collect.stop();
                        bot.guilds.get(message.guild.id).channels.get(commands).send("Auto Scrims Detenidas").catch((err) => {
                            console.log(err);
                        });
                    }
                }
            });


        }, 60000);
    
}

module.exports.help = {
    name: "auto-start"
}
