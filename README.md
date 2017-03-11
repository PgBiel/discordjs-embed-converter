# discordjs-embed-converter

## Install

`npm install discordjs-embed-converter`

## Usage
### MessageEmbed to RichEmbed
Requiring this directly gives a function that can convert MessageEmbeds to RichEmbeds. Example:

```js
const MsgEmbedToRich = require("discordjs-embed-converter");
MsgEmbedToRich(someMessageEmbed);
```

Or, if you think that is too vague or something, it also has a circular named MsgEmbedToRich.

```js
const MsgEmbedToRich = require("discordjs-embed-converter").MsgEmbedToRich;
// or
const { MsgEmbedToRich } = require("discordjs-embed-converter");
```

### The other way around

There is also a property of the requiring named RichToMsgEmbed, which can convert RichEmbeds to MessageEmbed, however note that it will lose its `.message` property.

```js
const RichToMsgEmbed = require("discordjs-embed-converter").RichToMsgEmbed;
// or
const { RichToMsgEmbed } = require("discordjs-embed-converter");
```

then:

```js
RichToMsgEmbed(SomeRichEmbed);
```
