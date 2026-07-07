import fs from 'fs';

const headers = { Referer: 'https://www.efmac.net/', 'User-Agent': 'Mozilla/5.0' };
const html = fs.readFileSync('temp_efmac.html', 'utf8');
const entry = html.match(/entry\.([a-f0-9]+)\.js/)?.[1];
const js = await (await fetch(`https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/entry.${entry}.js`, { headers })).text();

const swStart = js.indexOf('function sw(');
const swEnd = js.indexOf('}function', swStart + 100);
const swCode = js.slice(swStart, swEnd + 1);
fs.writeFileSync('scripts/sw-fn.js', swCode);
console.log('sw length', swCode.length);
console.log(swCode.slice(-200));

// extract H0 genSignStr class methods - find emojiEncode full
const emo = js.indexOf('emojiEncode",value:function');
console.log('\nemoji:', js.slice(emo, emo + 400));

// find Zh function for object check
const genStart = js.indexOf('genSignStr",value:function');
console.log('\ngenSignStr:', js.slice(genStart, genStart + 900));
