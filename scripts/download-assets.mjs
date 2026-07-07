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
  ['public/assets/notice-banner-bg.jpg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/87fdb9006508456f95d724f2befde5ef_home.jpg'],
  ['public/assets/float-sidebar.jpg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/87fdb9006508456f95d724f2befde5ef_home.jpg?imageView2/2/w/1920|imageMogr2/auto-orient|imageMogr2/format/webp'],
  ['public/assets/carousel-xi.jpg', 'https://pcweb.shanghuiyidisk.com/shy/623/new/expand/20250414/343ee2ae09a541b18417e3081ba0d4ad/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg'],
  ['public/assets/carousel-2.jpeg', 'https://pcweb.shanghuiyidisk.com/shy/623/new/expand/20250429/7fd15466e6cb4b5d81a439a5ac5aef4f/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg'],
  ['public/assets/party-banner.jpg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/87fdb9006508456f95d724f2befde5ef_home.jpg'],
  ['public/assets/photo-report.jpeg', 'https://pcweb.shanghuiyidisk.com/shy/623/new/expand/20250414/343ee2ae09a541b18417e3081ba0d4ad/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg'],
  ['public/assets/page-bg.png', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/293acc8a4ca34d86a6cd27f7fdb17165_home.png'],
  ['public/assets/qr-mina.png', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/33a834b90b1f41af87d7f0362fe3f00d_home.png'],
  ['public/assets/qr-service.jpg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/cad191bcf52d4f9eaebdd7c1006d25a0_home.jpg'],
  ['public/assets/qr-sub.jpeg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/c9e5bc13ae634d10b39dfd7963cc7c3f_home_snapshot.jpeg'],
  ['public/assets/qr-tiktok.jpeg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/8405fd6373c84ba0afe1626c1ebab8da_home_snapshot.jpeg'],
];

for (const [dest, url] of files) {
  try {
    console.log('OK', await dl(dest, url));
  } catch (e) {
    console.log('FAIL', dest, e.message);
  }
}

const purpose = await new Promise((resolve, reject) => {
  https
    .get(
      'https://pcweb.shanghuiyidisk.com/shy/623/fullInput/txt/20260206/a8d5cf4dd3164cdb87511438b4c8a887/fullInput-1770346116838.txt',
      { headers },
      (r) => {
        let d = '';
        r.on('data', (c) => (d += c));
        r.on('end', () => resolve(d));
      }
    )
    .on('error', reject);
});
console.log('purpose snippet:', purpose.slice(0, 500));
