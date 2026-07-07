import https from 'https';

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

const html = await get('https://www.efmac.net/article/13_1301_0_0.html?shId=623');
const decoded = html.replace(/\\u002F/g, '/');
const urls = [...decoded.matchAll(/https:\/\/pcweb\.shanghuiyidisk\.com[^"'\\)\s]+/g)].map((m) => m[0]);
console.log([...new Set(urls)].join('\n'));
