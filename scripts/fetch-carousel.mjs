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

const ids = '2352421,2351781,2350483,2350541,2344227,2333636';
for (const key of ['ids', 'id', 'articleIds', 'articleIdList']) {
  const data = await apiGet('/pcWeb/infoApp/article/getListByIds', { [key]: ids });
  console.log(key, data.errno, data.errmsg?.slice(0, 50), Array.isArray(data.data) ? data.data.length : typeof data.data);
  if (data.errno === 0 && data.data?.length) {
    data.data.forEach((a) => console.log(' ', a.title?.slice(0, 50), a.thumbImg?.slice(0, 90)));
  }
}

// politics category 84 via list
for (const sns of ['84', '1303']) {
  const data = await apiGet('/pcWeb/infoApp/article/list', { categorySns: sns, pageNum: 1, pageSize: 15 });
  console.log('\nlist', sns, data.errno, data.data?.list?.length);
  data.data?.list?.slice(0, 5).forEach((a) => console.log(' ', a.title?.slice(0, 55), a.isNew, a.publishTime?.slice(0, 10)));
}

// gallery category 80
const g = await apiGet('/pcWeb/infoApp/article/list', { categorySns: '80', pageNum: 1, pageSize: 5 });
console.log('\ngallery', g.data?.list?.length);
g.data?.list?.forEach((a) => console.log(' ', a.title?.slice(0, 50), a.thumbImg?.slice(0, 90)));
