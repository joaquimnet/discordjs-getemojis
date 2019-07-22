const irregularsRegex = require('../util/irregularsRegex');
const irregulars = require('../util/irregulars.json');

describe('Regex tests >>', () => {
  it('contains a valid regex', () => {
    expect(irregularsRegex()).toBeInstanceOf(RegExp);
  });

  it('has a valid json', () => {
    expect(irregulars).toBeDefined();
    expect(irregulars).toBeInstanceOf(Object);
    expect(Object.keys(irregulars).length).toBeGreaterThan(1);
  });

  it('should match the emojis', () => {
    const sample = 'This 🎟 is 🏍 a 🏎 sample 🏔 string';
    expect(sample.match(irregularsRegex())).toEqual(['🎟', '🏍', '🏎', '🏔']);
  });
});
