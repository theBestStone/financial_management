import fs from 'fs';
import https from 'https';

const headers = { Referer: 'https://www.gov.cn/', 'User-Agent': 'Mozilla/5.0' };

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

function dl(dest, url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        return dl(dest, r.headers.location).then(resolve).catch(reject);
      }
      if (r.statusCode !== 200) return reject(new Error(`${r.statusCode} ${url}`));
      const chunks = [];
      r.on('data', (c) => chunks.push(c));
      r.on('end', () => {
        fs.mkdirSync('public/assets/carousel', { recursive: true });
        fs.writeFileSync(dest, Buffer.concat(chunks));
        resolve(fs.statSync(dest).size);
      });
    }).on('error', reject);
  });
}

const pages = [
  ['agri', 'https://www.gov.cn/yaowen/2026-03/15/content_7034567.htm'],
  ['cpc105', 'https://www.gov.cn/yaowen/liebiao/202607/content_7038001.htm'],
  ['hasina', 'https://www.gov.cn/yaowen/liebiao/202407/content_6962341.htm'],
  ['kenya', 'https://www.gov.cn/yaowen/liebiao/202604/content_7032100.htm'],
  ['union100', 'https://www.gov.cn/yaowen/liebiao/202604/content_7031500.htm'],
];

for (const [name, url] of pages) {
  try {
    const html = await get(url);
    const imgs = [...html.matchAll(/(?:src|href)=\"(\.\/)?(W[0-9]+(?:_ORIGIN)?\.(?:jpg|jpeg|png))\"/gi)].map((m) => m[2]);
    const unique = [...new Set(imgs)];
    console.log(name, url, 'status ok', unique.slice(0, 3));
    if (unique[0]) {
      const base = url.replace(/[^/]+$/, '');
      const imgUrl = base + unique[0];
      const size = await dl(`public/assets/carousel/${name}.jpg`, imgUrl);
      console.log('  saved', size);
    }
  } catch (e) {
    console.log(name, 'fail', e.message);
  }
}
