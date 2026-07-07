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
for (let i = 1; i <= 28; i++) {
  try {
    const list = fs.readdirSync('.').filter((f) => f.startsWith(`temp_module${i}`));
    if (list.length) continue;
  } catch {}
}

// grep preloaded modules from saved html
const html = fs.readFileSync('temp_https_www_efmac_net_.html', 'utf8');
const modules = [...html.matchAll(/module(\d+)\.([a-f0-9]+)\.js/g)];
const unique = [...new Map(modules.map((m) => [`module${m[1]}`, m[2]])).entries()];

for (const [name, hash] of unique.slice(0, 28)) {
  const url = `${base}${name}.${hash}.js`;
  try {
    const js = await get(url);
    if (/expand|call|notice|7751|课题研究|topCall|purposeImg/i.test(js)) {
      console.log('\n=== HIT', name, hash, '===');
      const imgs = [...js.matchAll(/pcweb\.shanghuiyidisk\.com[^"'\\]+/g)].map((m) => m[0]);
      console.log([...new Set(imgs)].join('\n'));
      const ctx = js.match(/课题研究.{0,120}/);
      if (ctx) console.log('context:', ctx[0]);
    }
  } catch (e) {
    // skip missing modules
  }
}
