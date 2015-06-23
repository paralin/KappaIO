var fs = require('fs');
var _  = require('lodash');

var emotes = JSON.parse(fs.readFileSync(__dirname+"/../data/emotes.json", "utf8"));
var forbidden = ["nazi", "hitler", "cp", "porn", "child", "fpl", "spoon", "spoon"];

emotes = _.filter(emotes, function(emot){
  return emot && emot[0] === emot[0].toUpperCase() && emot !== emot.toUpperCase();
});


//var emotesLower = [];
//emotes.forEach(function(emot){
//  emotesLower.push(emot.toLowerCase());
//});

var exp = module.exports = {};
exp.count = function(message)
{
  var count = 0;
  if(message){
    emotes.forEach(function(emote){
      var match = message.match(new RegExp("(\\b"+emote+"\\b)", "gi"));
      if(match)
        count += match.length;
    });
  }
  return count;
};

exp.hasForbidden = function(message){
  var lower = message.toLowerCase();
  var has = false;
  forbidden.forEach(function(word){
    if(lower.indexOf(word) != -1) has = true;
  });
  return has;
};

exp.fix = function(message){
  if(message){
    message = message.toLowerCase();

    emotes.forEach(function(emote){
        message = message.replace(new RegExp("(\\b"+emote.toLowerCase()+"\\b)", "g"), emote);
    });

    forbidden.forEach(function(emote){
      message = message.replace(new RegExp("(\\b"+emote+"\\b)", "gi"), emotes[Math.floor(Math.random()*emotes.length)]);
    });

    // collapse whitespaces
    message = message.replace(/\s+/g, " ")
    message[0] = message[0].toUpperCase();
  }

  return message;
};
