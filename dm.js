var Discord = require("discord.js"); //uses discord.js library
const path = require('path');
var bot = new Discord.Client();  //initiate new discord Client

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://127.0.0.1:27017/test';
var ObjectId = require('mongodb').ObjectID;

const settings = require("./settings.json");
var newCharFile = require("./newChar.js");


//connect to local DB.
bot.on("ready", () =>
{
    //err is node.js boilerplate error function passed in first. db is mongo boilerplate db reference.
    MongoClient.connect(url, function(err, db) 
    {
        //assert.equal compares values of its parameters. comparing null to err, so that if there is no error it is True.
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
    //###### BASIC SETUP & COMMANDS ###### 

        // Exit and stop if no prefix.
        if(!msg.content.startsWith(prefix)) return; 
        
        // Exit if a bot.
        if(msg.author.bot) return;   

        //shutdown the bot. only responds to me.
        if (msg.content.toLowerCase() === prefix + "shutdown") 
        {
            if (msg.author.id !== "197710242551824384" || "283258123882332161")
            {
                msg.channel.sendMessage("Shutting down...").then(() => { process.exit(); })
            }
            else
            {
                msg.channel.sendMessage("Ho ho ho. Ya koo tocha ka poonoo nee sok nyee.")
            }
        }

        //detect user and id and display them.
        if(msg.content.toLowerCase() === prefix + "idme")
        {
            msg.channel.sendMessage("The ID of " + msg.author + " is " + msg.author.id);
        }


    //###### PRIMARY FUNCTIONS ######

        //look for prefix
        if(msg.content.startsWith(prefix))
        {
            //the newChar command to create a new character and/or add a player to the player roster.
/*            if (msg.content.toLowerCase() === prefix + "newchar")
            {
                //Passes author ID to be used by 'user' var in newChar.
                msg.channel.sendMessage(newCharFile.newChar(msg.author.id)); 
                
                //Embeds an Embed from the newChar file.
                //msg.channel.sendEmbed(newCharFile.newCharEmbed, 'There are two menus to choose from.',{ disableEveryone: true });
                return;

            }*/

/*            //pull info from playerRoster array.
            if (msg.content.toLowerCase() === prefix + "charcheck")
            {
                msg.channel.sendMessage(newCharFile.charCheck());
            }*/

            //testing
            if (msg.content.toLowerCase() === prefix + "newchar")
            {

                /*MongoClient.connect(url, function(err, db)
                {
                    assert.equal(null, err);
                    newCharFile.charCheck(db, msg.author.id);
                });*/
                



                    
                    MongoClient.connect(url, function(err, db) 
                    {
                        assert.equal(null, err);
                        newCharFile.newChar(db, msg.author.id, function() 
                        {
                            db.close();
                        });
                    });
                
                    
            }
        }

    }
)

bot.login(settings.token);