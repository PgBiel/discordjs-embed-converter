const Discord = require("discord.js");
const { MessageEmbed } = Discord;
const { RichEmbed } = Discord;

const mainfunc = function(providedEmbed) {
  if (!(providedEmbed instanceof MessageEmbed)) throw new TypeError("Embed must be an instance of the MessageEmbed class.");
  const result = {};
  for (const prop of Object.keys(providedEmbed)) {
    let thing = providedEmbed[prop];
    if (typeof thing == "object" && !(thing instanceof Array)) {
      result[prop] = {};
      for (const key in thing) {
        if (key !== "embed") result[prop][key] = thing[key];
      }
    } else if (thing instanceof Array) {
      result[prop] = [];
      thing.map(field=>{
        const addedField = result[prop].push({});
        for (const key in field) {
          if (key !== "embed") addedField[key] = field[key];
        }
      });
    } else {
      result[prop] = thing;
    }
  }
  return Object.assign(new RichEmbed(), result);
};

mainfunc.richToMessageEmbed = function(providedEmbed) {
  if (!(providedEmbed instanceof RichEmbed)) throw new TypeError("Embed must be an instance of the RichEmbed class.");
  const result = {};
  for (const prop of Object.keys(providedEmbed)) {
    result[prop] = providedEmbed[prop];
  }
  return new MessageEmbed({client: null}, result);
};

mainfunc.richToMsgEmbed = mainfunc.richToMessageEmbed;

mainfunc.messageEmbedToRich = mainfunc;                                     // yay for circulars
Object.assign(mainfunc.messageEmbedToRich, { msgEmbedToRich: mainfunc });   // heh
mainfunc.msgEmbedToRich = mainfunc.messageEmbedToRich;                      // don't mind me

module.exports = mainfunc;