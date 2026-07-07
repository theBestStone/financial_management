import https from 'https';
import fs from 'fs';

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { Referer: 'https://www.efmac.net/', 'User-Agent': 'Mozilla/5.0' } }, (r) => {
        let d = '';
        r.on('data', (c) => (d += c));
        r.on('end', () => resolve(d));
      })
      .on('error', reject);
  });
}

const js = await get(
  'https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/index.0a9f615b.js'
);
const urls = [...js.matchAll(/https:\\u002F\\u002Fpcweb\.shanghuiyidisk\.com[^"\\]+/g)].map((m) =>
  m[0].replace(/\\u002F/g, '/')
);
console.log([...new Set(urls)].filter((u) => u.includes('expand') || u.includes('banner')).join('\n'));
