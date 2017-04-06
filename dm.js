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
    
    MongoClient.connect(url, function(err, db) 
    {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        db.close();
    });
});

// Set the prefix
let prefix = "!dm ";

/*var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};*/

//do this whenever a message occurs.
bot.on("message", msg => 
    {
    //##### BASIC SETUP & COMMANDS ##### 

        // Exit and stop if no prefix.
        if(!msg.content.startsWith(prefix)) return; 
        
        // Exit if a bot.
        if(msg.author.bot) return;   

        //shutdown the bot
        if (msg.content.toLowerCase() === prefix + "shutdown") 
        {
            msg.channel.sendMessage("Shutting down...").then(() => { process.exit(); })
        }

        //detect user and id and display them.
        if(msg.content.toLowerCase() === prefix + "idme")
        {
            msg.channel.sendMessage("The ID of " + msg.author + " is " + msg.author.id);
        }

    //##### PRIMARY FUNCTIONS #####

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
            //testing
            if (msg.content.toLowerCase() === prefix + "update")
            {
                    
                MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                //insertDocument(db, function() {
                    newCharFile.updateDocument(db, function() {
                    db.close();
                });
                });
                    
            }

        }
    }
)

bot.login(settings.token);