const Discord = require ('discord.js');
const Listing = require ('./../modules/Listing');
const fs = require('fs');
const settings = require('./../settings.json');
const owner = settings.owner;

module.exports.run = async (bot, message, args) => {
   let roles = message.guild.roles;
   let scrimmers = message.guild.roles.find( r => r.name === "Player");
   let snipeChannel = message.channel;
   const filter = m => !m.author.bot;
   let game = new Listing();

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

   let editLast3 = null;

   let startMessage = new Discord.RichEmbed()
        .setAuthor("PRO AM SCRIMS", "https://i.imgur.com/7dJzeoT.png")
        .setThumbnail("https://i.imgur.com/eR5D1t0.png")
        .setURL("https://discord.gg/TKHtJft")
        .setDescription(`__**Multiplatform Scrims**__
Server: ** US-East **
Instructions:
-Load content.
- Wait in the countdown channel 
-When listening to the countdown, give it to the __**GO**__
- In case you’re on PS4/Xbox, ready with a mouse 
- Type the last three digits of your in game code in __**#code.**__`)
        .setImage("https://i.imgur.com/7dJzeoT.png")
        .setColor("#8600b3")
        .setFooter("Dev By !Fabian Araya (Xccursed_CR)", "https://i.imgur.com/ADnSULk.jpg");
        
    
    message.channel.send({embed: startMessage});    
    
    let time = 30;
    let editTime = "";

    let timeEmbed = new Discord.RichEmbed()
        .setTitle("**Next Match In...**")
        .setDescription(time + "Minutes")
        .setColor("#8600b3");
        

    setTimeout(async () => {
        editTime = await message.channel.send({embed: timeEmbed}).catch( (err) => {
            console.log("You can not edit");
        });
    }, 10);    

    let timeInterval = setInterval (() => {
        if (time ===1){
            time -=1;
            timeEmbed.setDescription(time + "Minutes");
            clearInterval(timeEmbed);
        }else {
            time -=1;
            timeEmbed.setDescription(time + "Minutes");
        }

        editTime.edit({embed: timeEmbed}).catch((err) =>{
            console.log("You can not edit");
            clearInterval(timeInterval);
        })
    },60000);

    let last3 = new Discord.RichEmbed()
        .setTitle ("**Servers**")
        .setColor ("#8600b3")
    
    setTimeout(async () => {
        editLast3= await message.channel.send({embed: last3});
    }, 10);
    
    const collector =snipeChannel.createMessageCollector(filter, {time: 180000});
	snipeChannel.overwritePermissions(
        scrimmers,
        { "SEND_MESSAGES": true}
    )

    collector.on('collect', m => {

        console.log(`Collected ${m.content} | ${m.author}`);       
        
        if (validation(allowedRoles.roles,m.member.roles.array()) || m.member.id === owner){
            if (m.content === "!start" || m.content === "!stopscrim"){
                collector.stop();
                console.log("Collector Stoped");
                return;
            }
        }   
        if (game.data.length ===0 && m.content.length === 3){
            game.addID(m.content.toUpperCase(), m.author);
        }else if (m.content.length === 3){
            if (game.userPresent(m.author)){
                game.deleteUserEntry(m.author);
                if (game.idPresent(m.content.toUpperCase())){
                    game.addUser(m.content.toUpperCase(), m.author);
                }else {
                     game.addID(m.content.toUpperCase(), m.author);
                }
            } else {
                if (game.idPresent(m.content.toUpperCase())){
                    game.addUser(m.content.toUpperCase(), m.author);
                }else {
                    game.addID(m.content.toUpperCase(), m.author);
                }
            }
        }

    game.sort();

    let str = "";
    last3 = new Discord.RichEmbed()
        .setTitle("**SERVERS**")
        .setColor("#8600b3")

    for (var i =0; i < game.data.length; i++){
        str = "";
        for (var j = 0; j < game.data[i].users.length ; j++){
            str += game.data[i].users[j] + "\n";
        }
        last3.addField(`${game.data[i].id.toUpperCase()} - ${game.data[i].users.length} Players` , str, true);
    }    

    editLast3.edit({embed: last3}).catch((err) => {
        console.log("error You can not edit");
    });

    if (m.deletable){
        m.delete().catch((err) => {
            console.log("You can not Delete");
            console.log(err);
        });
    }

    });

    collector.on('end', collected => {

        console.log(`Collected ${collected.size} items`);
        let endMessage = new Discord.RichEmbed()
			.setAuthor("Pro Am", "https://i.imgur.com/7dJzeoT.png")
			.setColor("0x00AE86")
            .setDescription("No More Codes Accepted At This Point. Good Luck")
            .setFooter("Chat Lock" , "https://i.imgur.com/iGo7XPH.png")
		message.channel.send({embed: endMessage});
		snipeChannel.overwritePermissions(
            scrimmers,
            { "SEND_MESSAGES": false}
        );
        console.log("Collector Stoped");
    });    
		
}






module.exports.help = {
    name: "start"
}