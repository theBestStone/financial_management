import fs from 'fs';

const html = fs.readFileSync('temp_https_www_efmac_net_.html', 'utf8');
const payload = html.slice(html.indexOf('window.__NUXT__='));

const keys = [
  'moduleList',
  'homeModule',
  'expandList',
  'slideList',
  'bannerList',
  'articleList',
  'thumb',
  'imagePath',
  'picUrl',
  'cover',
  'flipSpeed',
  'moduleType',
  'viewDisplay',
];

for (const k of keys) {
  const re = new RegExp(k, 'g');
  const matches = [...payload.matchAll(re)];
  if (matches.length) console.log(k, matches.length);
}

// decode unicode urls
const urls = [...payload.matchAll(/https:\\u002F\\u002F[^"\\]+/g)].map((m) =>
  m[0].replace(/\\u002F/g, '/')
);
console.log('\nAll unique URLs:', [...new Set(urls)].length);
[...new Set(urls)].forEach((u) => console.log(u));

// article titles in payload
const titles = [...payload.matchAll(/title:"([^"]{8,120})"/g)].map((m) => m[1]);
console.log('\nTitles sample:');
[...new Set(titles)].slice(0, 20).forEach((t) => console.log('-', t));
