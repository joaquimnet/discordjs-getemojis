const emojiRegex = require('emoji-regex');
const irregularsRegex = require('./util/irregularsRegex');
const irregulars = require('./util/irregulars.json');

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

/**
 * Extracts the emojis from a message
 * @param {message} A Discord.Message
 * @returns {Array} An array of emojis
 */
const getEmojis = (message) => {
  const { content } = message;
  const result = [];
  // Normal emojis
  const normalEmojis = content.match(emojiRegex());
  if (normalEmojis) {
    // for (const emoji of normalEmojis) {
    normalEmojis.forEach((emoji) => {
      result.push(emoji);
    });
  }
  // Text emojis e.g ♥ ✂ 🗨
  const textEmojis = content.match(irregularsRegex());
  if (textEmojis) {
    textEmojis.forEach((emoji) => {
      result.push(irregulars[emoji.trim()]);
    });
  }
  // Guild emojis
  let guildEmojis = content.match(/:[_a-zA-Z0-9]*>/g);
  if (guildEmojis) {
    guildEmojis = guildEmojis.map(e => e.substring(1, e.length - 1));
    guildEmojis.forEach((e) => {
      const guildEmoji = message.guild.emojis.get(e);
      if (guildEmoji) result.push(guildEmoji);
    });
  }
  // Attempt to sort the results if its not null
  if (result) {
    const query = message.content;
    result.sort((a, b) => {
      const irregularA = getKeyByValue(irregulars, a);
      const irregularB = getKeyByValue(irregulars, b);
      const index1 = irregularA || a;
      const index2 = irregularB || b;
      return query.indexOf(index1) - query.indexOf(index2);
    });
  }
  return result;
};

module.exports = getEmojis;
