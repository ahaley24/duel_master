var Discord = require("discord.js"); //uses discord.js library
const path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var playerRoster = 
[
    [,]
];

module.exports = {

    newChar: function(user)
    {
        /*for(var x = 0; x <= playerRoster.length; x++)
        {
            
        }*/
        playerRoster.unshift(user);
        console.log(playerRoster[0])
        return ("The new character is for " + user);
    },

    charCheck: function()
    {
        return (playerRoster[0]);
    },

    updateDocument:  function(db, callback) 
    {
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
    }

}

module.exports.newCharEmbed = new Discord.RichEmbed()
  /*
   * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField('Strength', 'Our selection of beers, bottled or on tap. ')
  .addField('Constitution', 'Our selection of liquors and mixed drinks! ');

///////////////////////////////////////////////////////////////////////