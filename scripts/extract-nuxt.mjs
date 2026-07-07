import fs from 'fs';

const html = fs.readFileSync('temp_home.html', 'utf8');
const start = html.indexOf('window.__NUXT__=');
const end = html.indexOf('</script>', start);
const payload = html.slice(start, end);

const patterns = [
  'flipSpeed',
  'expandList',
  'moduleType',
  'slideImage',
  'imageUrl',
  'articleTitle',
  'articleId',
  'linkUrl',
  'bannerList',
  'homeModule',
];

for (const pat of patterns) {
  let idx = 0;
  let count = 0;
  while ((idx = payload.indexOf(pat, idx)) >= 0 && count < 3) {
    console.log(`\n=== ${pat} #${count + 1} ===`);
    console.log(payload.slice(idx, idx + 300));
    idx += pat.length;
    count++;
  }
}

const urls = [...payload.matchAll(/https:\\u002F\\u002F[^"\\]+/g)].map((m) =>
  m[0].replace(/\\u002F/g, '/')
);
const unique = [...new Set(urls)];
console.log('\n=== Image URLs ===');
unique
  .filter((u) => /expand|banner|\.jpg|\.jpeg|\.png|\.webp|\.svg/i.test(u))
  .forEach((u) => console.log(u));

console.log('\n=== flipSpeed ===');
const flip = payload.match(/flipSpeed:\d+/g);
console.log(flip?.join(', ') ?? 'none');

console.log('\n=== pcWebShow ===');
const show = payload.match(/pcWebShow\w+:(?:true|false)/g);
console.log(show?.join(', ') ?? 'none');
