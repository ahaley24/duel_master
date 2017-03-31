var Discord = require("discord.js"); //uses discord.js library
const path = require('path');

var playerRoster = 
[
    [,]
];

module.exports = {

    newChar: function(user)
    {
/*        for(var x = 0; x <= playerRoster.length; x++)
        {
            
        }*/
        playerRoster.unshift(user);
        console.log(playerRoster[0])
        return ("The new character is for " + user);
    },

    charCheck: function()
    {
        return (playerRoster[0]);
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