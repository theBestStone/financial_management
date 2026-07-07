import fs from 'fs';

const html = fs.readFileSync('temp_efmac.html', 'utf8');
const start = html.indexOf('window.__NUXT__=');
const payload = html.slice(start, start + 800000);

const patterns = [
  /shanghuiyidisk\.com[^"'\\]+/g,
  /thumbUrl[^,]{0,120}/g,
  /articleImg[^,]{0,120}/g,
  /coverUrl[^,]{0,120}/g,
];

for (const re of patterns) {
  const hits = [...new Set([...payload.matchAll(re)].map((m) => m[0]))];
  if (hits.length) {
    console.log('\n===', re, '===');
    hits.slice(0, 40).forEach((h) => console.log(h));
  }
}
