import fs from 'fs';

const headers = { Referer: 'https://www.efmac.net/', 'User-Agent': 'Mozilla/5.0' };
const html = fs.readFileSync('temp_efmac.html', 'utf8');
const entry = html.match(/entry\.([a-f0-9]+)\.js/)?.[1];
const js = await (await fetch(`https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/entry.${entry}.js`, { headers })).text();

for (const fn of ['genSignStr', 'function L3(', 'L3=function', 'wLt=', 'Decrypt(', 'H0=']) {
  let idx = 0;
  let c = 0;
  while ((idx = js.indexOf(fn, idx + 1)) !== -1 && c < 2) {
    console.log('\n===', fn, '===');
    console.log(js.slice(idx, idx + 600));
    c++;
  }
}
