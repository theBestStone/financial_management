import fs from 'fs';
import https from 'https';

const headers = { Referer: 'https://www.efmac.net/', 'User-Agent': 'Mozilla/5.0' };

function dl(dest, url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return dl(dest, res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) return reject(new Error(`${url} -> ${res.statusCode}`));
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          fs.mkdirSync('public/assets', { recursive: true });
          fs.writeFileSync(dest, Buffer.concat(chunks));
          resolve(`${dest} (${fs.statSync(dest).size})`);
        });
      })
      .on('error', reject);
  });
}

const files = [
  ['public/assets/banner-04.jpg', 'https://pcweb.shanghuiyidisk.com/shy/0/pcweb/banner/banner_04.jpg'],
  ['public/assets/carousel3.jpeg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/293acc8a4ca34d86a6cd27f7fdb17165_home.png'],
  ['public/assets/carousel4.jpeg', 'https://pcweb.shanghuiyidisk.com/shy/623/new/expand/20250414/343ee2ae09a541b18417e3081ba0d4ad/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg'],
  ['public/assets/carousel5.jpeg', 'https://pcweb.shanghuiyidisk.com/shy/623/new/expand/20250429/7fd15466e6cb4b5d81a439a5ac5aef4f/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg'],
];

for (const [dest, url] of files) {
  try {
    console.log('OK', await dl(dest, url));
  } catch (e) {
    console.log('FAIL', dest, e.message);
  }
}
