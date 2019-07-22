const fs = require('fs');
const path = require('path');

const base = '/❤/g';

const input = fs.readFileSync(path.resolve(__dirname, 'irregulars.txt'), {
  encoding: 'utf-8',
});

const data = input.split('\n');

const piped = data
  .map(emoji => {
    const raw = emoji.split(',')[1];
    return raw.replace(/\*/g, '\\*');
  })
  .join('|');

const regex = base.replace(/❤/g, piped);

const js = `module.exports = () => ${regex};`;

fs.writeFileSync(path.resolve(__dirname, 'irregularsRegex.js'), js, {
  encoding: 'utf-8',
});
