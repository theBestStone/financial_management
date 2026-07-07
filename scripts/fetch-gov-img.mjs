import fs from 'fs';
import https from 'https';

const headers = { Referer: 'https://www.gov.cn/', 'User-Agent': 'Mozilla/5.0' };

function dl(dest, url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (r) => {
        if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
          return dl(dest, r.headers.location).then(resolve).catch(reject);
        }
        if (r.statusCode !== 200) return reject(new Error(`${r.statusCode} ${url}`));
        const chunks = [];
        r.on('data', (c) => chunks.push(c));
        r.on('end', () => {
          fs.mkdirSync('public/assets', { recursive: true });
          fs.writeFileSync(dest, Buffer.concat(chunks));
          resolve(fs.statSync(dest).size);
        });
      })
      .on('error', reject);
  });
}

const base = 'https://www.gov.cn/yaowen/liebiao/202407/';
for (const [name, file] of [
  ['carousel-main.jpg', 'W020240710725266874504_ORIGIN.jpg'],
  ['photo-report.jpg', 'W020240710725271262085_ORIGIN.jpg'],
]) {
  const size = await dl(`public/assets/${name}`, base + file);
  console.log(name, size);
}
