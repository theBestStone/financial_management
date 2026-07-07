import fs from 'fs';

const headers = {
  Referer: 'https://www.efmac.net/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

const html = await (await fetch('https://www.efmac.net/', { headers })).text();
fs.writeFileSync('temp_efmac.html', html);

const start = html.indexOf('window.__NUXT__=');
const end = html.indexOf('</script>', start);
const payload = html.slice(start, end);

// decode unicode escapes in payload
const decoded = payload.replace(/\\u([0-9a-fA-F]{4})/g, (_, c) =>
  String.fromCharCode(parseInt(c, 16))
);

const urlPatterns = [
  /https:\/\/pcweb\.shanghuiyidisk\.com[^"'\s>)]+/g,
  /thumbUrl[^,]{0,200}/g,
  /articleTitle[^,]{0,200}/g,
  /bannerList[^]]{0,2000}/g,
  /moduleList[^]]{0,2000}/g,
];

for (const re of urlPatterns) {
  const hits = [...decoded.matchAll(re)].map((m) => m[0]);
  if (hits.length) {
    console.log('\n===', re.source.slice(0, 40), 'count:', hits.length, '===');
    hits.slice(0, 15).forEach((h) => console.log(h.slice(0, 300)));
  }
}

// fetch all nuxt chunks referenced
const base = 'https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/';
const chunks = [...html.matchAll(/\/_nuxt\/([a-zA-Z0-9_.-]+\.js)/g)].map((m) => m[1]);
const unique = [...new Set(chunks)];
const allUrls = new Set();

for (const chunk of unique.slice(0, 80)) {
  try {
    const js = await (await fetch(base + chunk, { headers })).text();
    for (const m of js.matchAll(/pcweb\.shanghuiyidisk\.com\/shy\/623[^"'\\]+/g)) {
      allUrls.add('https://' + m[0].replace(/\\u002F/g, '/'));
    }
    for (const m of js.matchAll(/https:\\\/\\\/pcweb\.shanghuiyidisk\.com[^"']+/g)) {
      allUrls.add(m[0].replace(/\\\//g, '/'));
    }
  } catch {}
}

console.log('\n=== CDN from chunks ===');
[...allUrls].sort().forEach((u) => console.log(u.split('?')[0]));
fs.writeFileSync('scripts/efmac-chunk-images.txt', [...allUrls].sort().join('\n'));

// try APIs
const apis = [
  'https://pcweb.xiehuiyi.com/pcWeb/home/getHomePage?shId=623&siteId=0',
  'https://pcweb.xiehuiyi.com/pcWeb/home/getHomeModule?shId=623',
  'https://pcweb.xiehuiyi.com/pcWeb/banner/getBannerList?shId=623&position=1',
  'https://pcweb.xiehuiyi.com/pcWeb/article/getArticleList?shId=623&categorySn=1301&pageNum=1&pageSize=20',
  'https://pcweb.xiehuiyi.com/pcWeb/article/getArticleList?shId=623&categorySn=1302&pageNum=1&pageSize=20',
  'https://pcweb.xiehuiyi.com/pcWeb/article/getArticleList?shId=623&categorySn=1303&pageNum=1&pageSize=20',
];

for (const api of apis) {
  try {
    const res = await fetch(api, { headers });
    const text = await res.text();
    console.log('\nAPI', api, res.status, text.slice(0, 500));
    if (res.ok) fs.writeFileSync(`scripts/api-${api.split('/').pop()?.replace('?', '_')}.json`, text);
  } catch (e) {
    console.log('API fail', api, e.message);
  }
}
