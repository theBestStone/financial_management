import fs from 'fs';

const headers = { Referer: 'https://www.efmac.net/', 'User-Agent': 'Mozilla/5.0' };
const html = fs.readFileSync('temp_efmac.html', 'utf8');
const entry = html.match(/entry\.([a-f0-9]+)\.js/)?.[1];
const js = await (await fetch(`https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/entry.${entry}.js`, { headers })).text();

for (const fn of ['function L3', 'L3=', 'function I3', 'I3=', 'function sw', 'sw=', 'function kZ', 'kZ=']) {
  const idx = js.indexOf(fn);
  if (idx >= 0) {
    console.log('\n===', fn, '===');
    console.log(js.slice(idx, idx + 800));
  }
}

// also search sw( pattern near MD5
const swIdx = js.indexOf('function sw(');
console.log('\nsw fn:', js.slice(swIdx, swIdx + 400));
