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

const js = await get('https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/index.0a9f615b.js');
fs.writeFileSync('temp_index.js', js);

for (const pat of ['topCall', 'callBanner', 'notice', '7751', '课题研究', 'purpose', 'expand', 'fullInput']) {
  const i = js.indexOf(pat);
  if (i >= 0) console.log('\n', pat, js.slice(i, i + 180));
}

const urls = [...js.matchAll(/https:\\u002F\\u002Fpcweb\.shanghuiyidisk\.com[^"'\\]+/g)].map((m) =>
  m[0].replace(/\\u002F/g, '/')
);
console.log('\nCDN urls:', [...new Set(urls)].slice(0, 30).join('\n'));

const txt = await get(
  'https://pcweb.shanghuiyidisk.com/shy/623/fullInput/txt/20260206/a8d5cf4dd3164cdb87511438b4c8a887/fullInput-1770346116838.txt'
);
console.log('\nfullInput:', txt.slice(0, 800));
