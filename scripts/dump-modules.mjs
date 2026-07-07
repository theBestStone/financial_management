import fs from 'fs';
import https from 'https';

const headers = { Referer: 'https://www.efmac.net/', 'User-Agent': 'Mozilla/5.0' };

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

const base = 'https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/';
for (const [name, hash] of [
  ['module12', '826dda6b'],
  ['module2', 'd2357efb'],
  ['default', '69b092c9'],
]) {
  const js = await get(`${base}${name}.${hash}.js`);
  fs.writeFileSync(`temp_${name}.js`, js);
  console.log('\n===', name, js.length, '===');
  for (const pat of ['课题研究', '7751', 'call', 'notice', 'expand', 'imageUrl', 'thumb', 'purpose']) {
    let idx = 0;
    let n = 0;
    while ((idx = js.indexOf(pat, idx)) >= 0 && n < 2) {
      console.log(pat, js.slice(Math.max(0, idx - 60), idx + 120));
      idx += pat.length;
      n++;
    }
  }
}
