const Discord = require("discord.js");
const { MessageEmbed } = Discord;
const { RichEmbed } = Discord;

const mainfunc = function(providedEmbed) {
  if (!(providedEmbed instanceof MessageEmbed)) throw new TypeError("Embed must be an instance of the MessageEmbed class.");
  const result = {};
  for (const prop of Object.values(providedEmbed)) {
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

mainfunc.RichToMessageEmbed = function(providedEmbed) {
  if (!(providedEmbed instanceof RichEmbed)) throw new TypeError("Embed must be an instance of the RichEmbed class.");
  const result = {};
  for (const prop of Object.values(providedEmbed)) {
    result[prop] = providedEmbed[prop];
  }
  return new MessageEmbed(null, result);
};

mainfunc.RichToMsgEmbed = mainfunc.RichToMessageEmbed;

mainfunc.MessageEmbedToRich = mainfunc;                            // yay for circulars
Object.assign(MessageEmbedToRich, { MsgEmbedToRich: mainfunc });   // heh
mainfunc.MsgEmbedToRich = mainfunc.MessageEmbedToRich;             // don't mind me

module.exports = mainfunc;