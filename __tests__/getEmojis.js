const getEmojis = require('..');

function buildMessageObject(str, gEmojis) {
  return {
    content: str,
    guild: {
      emojis: new Map(gEmojis),
    },
  };
}

describe('Emoji extraction tests >> ', () => {
  const testString = 'I used to be an adventurer like you. 😎 But then I took an arrow in the knee. 😳 😔\n'
    + "We need to have a chat. 🗨 But bring your umbrella. ☂ It's cloudy outside. 🌥\n"
    + 'I have a cool dog! <:CoolDog:555>';

  it('can extract regular emojis', () => {
    const message = buildMessageObject(testString);
    const expected = ['😎', '😳', '😔'];
    expect(getEmojis(message)).toEqual(expect.arrayContaining(expected));
  });

  it('can extract irregular emojis', () => {
    const message = buildMessageObject(testString);
    const expected = [':speech_left:', ':umbrella2:', ':white_sun_cloud:'];
    expect(getEmojis(message)).toEqual(expect.arrayContaining(expected));
  });

  it('can extract guild emojis', () => {
    const message = buildMessageObject(testString, [['555', 'CoolDog']]);
    const expected = ['CoolDog'];
    expect(getEmojis(message)).toEqual(expect.arrayContaining(expected));
  });

  it('can extract all emojis', () => {
    const message = buildMessageObject(testString, [['555', 'CoolDog']]);
    const expected = [
      '😎',
      '😳',
      '😔',
      ':speech_left:',
      ':umbrella2:',
      ':white_sun_cloud:',
      'CoolDog',
    ];
    expect(getEmojis(message)).toEqual(expected);
  });
});
