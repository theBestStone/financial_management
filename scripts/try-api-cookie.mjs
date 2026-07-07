import fs from 'fs';

const headers = {
  Referer: 'https://www.efmac.net/',
  Origin: 'https://www.efmac.net',
  'User-Agent': 'Mozilla/5.0',
  Accept: 'application/json, text/plain, */*',
};

// get cookies from homepage
const homeRes = await fetch('https://www.efmac.net/', { headers });
const cookies = homeRes.headers.getSetCookie?.() || [];
const cookie = cookies.map((c) => c.split(';')[0]).join('; ');
console.log('cookies:', cookie);

const bases = [
  'https://pcweb.xiehuiyi.com',
  'https://www.efmac.net',
];

const paths = [
  '/pcWeb/infoApp/setting/modules?shId=623&siteId=357',
  '/pcWeb/infoApp/article/banner?shId=623&siteId=357&position=1',
  '/pcWeb/infoApp/article/list?shId=623&categorySn=1303&pageNum=1&pageSize=15',
  '/pcWeb/infoApp/article/list?shId=623&categorySn=1302&pageNum=1&pageSize=15',
  '/pcWeb/infoApp/article/list?shId=623&categorySn=1301&pageNum=1&pageSize=15',
  '/pcWeb/infoApp/article/detailByCategorySn?shId=623&categorySn=7751',
  '/pcWeb/company/getMemberCompany?shId=623&pageNum=1&pageSize=30',
];

for (const base of bases) {
  for (const path of paths) {
    const url = base + path;
    try {
      const res = await fetch(url, {
        headers: { ...headers, ...(cookie ? { Cookie: cookie } : {}) },
      });
      const text = await res.text();
      console.log('\n', base, path.split('?')[0], res.status, text.slice(0, 300));
      if (res.ok && text.includes('"errno":0') || (res.ok && !text.includes('errno'))) {
        fs.writeFileSync(`scripts/ok-${path.replace(/[?&=]/g, '_')}.json`, text);
      }
    } catch (e) {
      console.log('err', url, e.message);
    }
  }
}

// search entry.js for sign
const html = fs.readFileSync('temp_efmac.html', 'utf8');
const entry = html.match(/entry\.([a-f0-9]+)\.js/)?.[1];
const js = await (await fetch(`https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/entry.${entry}.js`, { headers })).text();
const signIdx = js.indexOf('sign');
console.log('\nsign context:', js.slice(signIdx, signIdx + 500));
