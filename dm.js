var Discord = require("discord.js"); //uses discord.js library
const path = require('path');
var bot = new Discord.Client();  //initiate new discord Client
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const settings = require("./settings.json");
var newCharFile = require("./newChar.js");

//connect to local DB.
bot.on("ready", () =>
{
    var url = 'mongodb://127.0.0.1:27017/test';
    MongoClient.connect(url, function(err, db) 
    {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        db.close();
    });
});

// Set the prefix
let prefix = "!dm ";

//do this whenever a message occurs.
bot.on("message", msg => 
    {
    //### BASIC SETUP & COMMANDS ### 

        if(!msg.content.startsWith(prefix)) return; // Exit and stop if no prefix.
        
        if(msg.author.bot) return;   // Exit if a bot.

        //detect user and id and display them.
        if(msg.content.toLowerCase() === prefix + "idme")
        {
            msg.channel.sendMessage("The ID of " + msg.author + " is " + msg.author.id);
        }

        //shutdown the bot
        if (msg.content.toLowerCase() === prefix + "shutdown") 
        {
            msg.channel.sendMessage("Shutting down...").then(() => { process.exit(); })
        }

    //### PRIMARY FUNCTIONS ###

        //look for prefix
        if(msg.content.startsWith(prefix))
        {
            //the newChar command to create a new character and/or add a player to the player roster.
            if (msg.content.toLowerCase() === prefix + "newchar")
            {
                //calling a function from other file
                msg.channel.sendMessage(newCharFile.newChar(msg.author.id)); 
                
                //Embeds an Embed from the newChar file.
                //msg.channel.sendEmbed(newCharFile.newCharEmbed, 'There are two menus to choose from.',{ disableEveryone: true });
                return;

            }
            //pull info from playerRoster array.
            if (msg.content.toLowerCase() === prefix + "charcheck")
            {
                msg.channel.sendMessage(newCharFile.charCheck());
            }


        }
    }
)

bot.login(settings.token);