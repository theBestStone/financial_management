import fs from 'fs';

const headers = { Referer: 'https://www.efmac.net/', 'User-Agent': 'Mozilla/5.0' };
const js = await (await fetch(
  'https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/entry.97aa7485.js',
  { headers }
)).text();

const urls = new Set();
for (const m of js.matchAll(/https?:\\\/\\\/pcweb\.shanghuiyidisk\.com\\\/[^"'\\]+/g)) {
  urls.add(m[0].replace(/\\\//g, '/'));
}
for (const m of js.matchAll(/pcweb\.shanghuiyidisk\.com\\\/shy\\\/623[^"'\\]+/g)) {
  urls.add('https://' + m[0].replace(/\\\//g, '/'));
}

console.log([...urls].sort().join('\n'));

// known expand from repo
const known = [
  'https://pcweb.shanghuiyidisk.com/shy/623/new/expand/20250414/343ee2ae09a541b18417e3081ba0d4ad/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg',
  'https://pcweb.shanghuiyidisk.com/shy/623/new/expand/20250429/7fd15466e6cb4b5d81a439a5ac5aef4f/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg',
];
for (const u of known) {
  const res = await fetch(u, { headers, method: 'HEAD' });
  console.log('HEAD', res.status, u.slice(-40));
}
