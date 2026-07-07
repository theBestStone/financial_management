import fs from 'fs';

const headers = {
  Referer: 'https://www.efmac.net/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

const html = await (await fetch('https://www.efmac.net/', { headers })).text();
fs.writeFileSync('temp_efmac.html', html);

const all = new Set();
for (const m of html.matchAll(/https:\/\/pcweb\.shanghuiyidisk\.com[^"'\s>)]+/gi)) {
  all.add(m[0].replace(/&amp;/g, '&'));
}

const payload = html.slice(html.indexOf('window.__NUXT__='));
for (const m of payload.matchAll(/https:\\u002F\\u002F[^"\\]+/g)) {
  const u = m[0].replace(/\\u002F/g, '/');
  if (u.includes('shanghuiyidisk') || u.includes('.jpg') || u.includes('.png') || u.includes('.jpeg') || u.includes('.svg')) {
    all.add(u);
  }
}

console.log([...all].sort().join('\n'));
fs.writeFileSync('scripts/efmac-images.txt', [...all].sort().join('\n'));

// probe module bundles for expand urls
const base = 'https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/';
const modules = [...html.matchAll(/module(\d+)\.([a-f0-9]+)\.js/g)];
const seen = new Map();
for (const m of modules) seen.set(`module${m[1]}`, m[2]);

for (const [name, hash] of seen) {
  try {
    const js = await (await fetch(`${base}${name}.${hash}.js`, { headers })).text();
    for (const m of js.matchAll(/pcweb\.shanghuiyidisk\.com[^"'\\]+/g)) {
      all.add('https://' + m[0]);
    }
  } catch {}
}

const expand = [...all].filter((u) => u.includes('expand') || u.includes('banner') || u.includes('/pc/'));
console.log('\n=== expand/banner/pc ===');
expand.sort().forEach((u) => console.log(u));
fs.writeFileSync('scripts/efmac-images-all.txt', [...all].sort().join('\n'));
