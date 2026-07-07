import fs from 'fs';

const headers = { Referer: 'https://www.efmac.net/', 'User-Agent': 'Mozilla/5.0' };
const html = fs.readFileSync('temp_efmac.html', 'utf8');
const entry = html.match(/entry\.([a-f0-9]+)\.js/)?.[1];
const js = await (await fetch(`https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/entry.${entry}.js`, { headers })).text();

const needles = ['Qm=', 'function Qm', 'sign=', 'sign:', 'timestamp', 'nonce', 'MD5', 'sha256', 'crypto'];
for (const n of needles) {
  let idx = 0;
  let count = 0;
  while ((idx = js.indexOf(n, idx + 1)) !== -1 && count < 2) {
    console.log('\n---', n, '---');
    console.log(js.slice(Math.max(0, idx - 100), idx + 300));
    count++;
  }
}

// find class Va axios interceptor
const vaIdx = js.indexOf('class extends Va');
console.log('\nVa class:', js.slice(vaIdx, vaIdx + 1500));
