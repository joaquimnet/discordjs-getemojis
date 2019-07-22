import { EmojiIdentifierResolvable, Message } from 'discord.js';

declare const getEmojis: (
  message: Message
) => EmojiIdentifierResolvable[] | null;

export default getEmojis;
