const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, './irregulars.txt'), {
  encoding: 'utf-8',
});

const data = input.split('\n');

const lines = data
  .map((entry, i, arr) => {
    const emojis = entry.split(',');
    let jsonLine = `  "${emojis[1]}": "${emojis[0]}"`;
    if (arr.length - 1 !== i) jsonLine += ',';
    return jsonLine;
  })
  .join('\n');

const json = `{\n${lines}\n}`;

fs.writeFileSync(path.resolve(__dirname, 'irregulars.json'), json, {
  encoding: 'utf-8',
});
