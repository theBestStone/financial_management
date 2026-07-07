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

for (const mod of ['module1.26718e59.js', 'module2.d2357efb.js', 'module3.dc4b6e96.js', 'module4.80378ee1.js']) {
  const js = await get(`https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/${mod}`);
  const hits = [...js.matchAll(/623\/new\/expand[^\"']{0,120}/g)].map((m) => m[0]);
  if (hits.length) {
    console.log(mod, [...new Set(hits)].join('\n'));
  }
}
