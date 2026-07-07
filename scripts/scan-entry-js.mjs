import fs from 'fs';

const headers = {
  Referer: 'https://www.efmac.net/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

const base = 'https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/';
const js = await (await fetch(`${base}entry.97aa7485.js`, { headers })).text();

const patterns = [
  /shanghuiyidisk[^"']{0,200}/g,
  /getHome[^"']{0,80}/g,
  /pcWeb\/home[^"']{0,80}/g,
  /expand\/[^"']{0,120}/g,
  /banner[^"']{0,80}/g,
  /xiehuiyi\.com\/pcWeb[^"']{0,100}/g,
];

for (const re of patterns) {
  const hits = [...new Set([...js.matchAll(re)].map((m) => m[0]))];
  if (hits.length) {
    console.log('\n===', re.source.slice(0, 40), 'count', hits.length, '===');
    hits.slice(0, 25).forEach((h) => console.log(h));
  }
}

// decode unicode strings that look like Chinese titles
const zh = [...js.matchAll(/\\u[0-9a-f]{4}(?:\\u[0-9a-f]{4}){4,}/gi)].map((m) => {
  try {
    return JSON.parse(`"${m[0]}"`);
  } catch {
    return null;
  }
}).filter(Boolean);

const newsLike = zh.filter((s) => s.length > 15 && /[\u4e00-\u9fff]/.test(s));
console.log('\n=== Chinese strings (news-like) ===');
[...new Set(newsLike)].slice(0, 30).forEach((s) => console.log(s));
