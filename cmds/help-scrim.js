module.exports.run = async (bot,message,args) => {

    message.channel.send(`
    **The countdown commands are !Count: to start countdown. !5mc: to inform that 5 minutes are missing for countdown. !vrestart : to restart countdown bot 
    The Start commands are !start that is for the codes: start it after 15 seconds after the end of the count for people with a long time on the loading screen , If you need to do REQ, you must first stop the collector with the command !stopscrim, and you can start the bot again.
	do not execute a !clear because it generates bugs in the bot, in order to make a !clear first you must stop the collector with !stopscrim .
    The Message Channel Commands are !1m or !1m-duos or !1m-squads to inform in the chat that one minute is missing for the match
    !5m or !5m-duos or !5m-squads to inform in the chat that five minutes is missing for the match
    !10m or !10m-duos or !10m-squads to inform in the chat that ten minute is missing for the match
	!notes: command for advertising or any poster needed , to configure it use the command !setnotes
     !auto-start start automatic scrims without having to put any code
     you can start them manually but to save time I already added that I did it automatically
     to stop the automatic scrims you just have to put !auto-stop**`)
        
        
        }
        
        
        module.exports.help = {
            name: "help-scrims"
        }
