import fs from 'fs';
import CryptoJS from 'crypto-js';

const jG = CryptoJS.enc.Utf8.parse('shy@2019@0701@zp');
const GG = CryptoJS.enc.Utf8.parse('123456');
const secret = CryptoJS.AES.decrypt('wlmj9CKFfuoBSbLRzA4muQ==', jG, {
  iv: GG, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7,
}).toString(CryptoJS.enc.Utf8);

function genSignStr(params) {
  const keys = Object.keys(params).sort();
  const parts = [];
  for (const k of keys) {
    const v = params[k];
    if (Number.isNaN(v) || v == null || v === '' || String(v).length === 0 || /^\s*$/.test(String(v))) continue;
    parts.push(`${k}=${typeof v === 'object' ? JSON.stringify(v) : v}`);
  }
  return parts.join('&');
}

async function apiGet(path, params) {
  const ts = Date.now();
  const p = { ...params, shId: 623, siteId: 357, xhId: 623 };
  const sign = CryptoJS.MD5(genSignStr(p) + ts + secret).toString();
  const qs = new URLSearchParams(Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)])));
  const res = await fetch(`https://pcweb.xiehuiyi.com${path}?${qs}`, {
    headers: { Referer: 'https://www.efmac.net/', Origin: 'https://www.efmac.net', sign, signTimeStamp: String(ts) },
  });
  return res.json();
}

function parseMemberNames(html) {
  return [...html.matchAll(/<span style="font-size:13px;">([^<]+)<\/span>/g)]
    .map((m) => m[1].trim())
    .filter((n) => n && n !== '......');
}

const carouselIds = '2352421,2351781,2350483,2350541,2344227,2333636';
const photoIds = '2321043,2314461,2303748,2308204,2291995,2286861';

const modulesRes = await apiGet('/pcWeb/infoApp/setting/modules', {});
const modules = modulesRes.data || [];
const adModule = modules.find((m) => m.showType === 9);
const serviceModule = modules.find((m) => m.showType === 11);
const enterpriseModule = modules.find((m) => m.showType === 7);
const memberModule = modules.find((m) => m.showType === 19);

const [carousel, photo, politics, tabs, gallery, standards, activities, periodicals] = await Promise.all([
  apiGet('/pcWeb/infoApp/article/getListByIds', { ids: carouselIds }),
  apiGet('/pcWeb/infoApp/article/getListByIds', { ids: photoIds }),
  apiGet('/pcWeb/infoApp/article/list', { categorySns: '84', pageNum: 1, pageSize: 15 }),
  apiGet('/pcWeb/infoApp/article/list', { categorySns: '1302,1301', pageNum: 1, pageSize: 15 }),
  apiGet('/pcWeb/infoApp/article/list', { categorySns: '80', pageNum: 1, pageSize: 5 }),
  apiGet('/pcWeb/infoApp/article/list', { categorySns: '1353', pageNum: 1, pageSize: 8 }),
  apiGet('/pcWeb/infoApp/article/list', { categorySns: '1354', pageNum: 1, pageSize: 8 }),
  apiGet('/pcWeb/home/periodicals', {}),
]);

const output = {
  fetchedAt: new Date().toISOString(),
  flipSpeed: 3,
  themeWidth: 1300,
  noticeBanner: {
    image: adModule?.settings?.adBanner,
    link: adModule?.settings?.adLink,
  },
  carousel: carousel.data,
  politics: politics.data?.list,
  tabNews: tabs.data?.list,
  photoReport: photo.data,
  gallery: gallery.data?.list,
  standards: standards.data?.list,
  activities: activities.data?.list,
  serviceCenter: serviceModule?.settings?.linkList,
  periodicals: periodicals.data?.list?.slice(0, 2),
  memberPublicity: parseMemberNames(memberModule?.settings?.customerContent || ''),
  enterpriseLogos: (enterpriseModule?.settings?.linkList || []).map((item) => item.logo),
};

fs.writeFileSync('src/data/homeLive.json', JSON.stringify(output, null, 2));
console.log('exported', output.carousel?.length, 'carousel,', output.enterpriseLogos?.length, 'logos');
