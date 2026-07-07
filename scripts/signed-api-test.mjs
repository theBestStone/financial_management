import fs from 'fs';
import CryptoJS from 'crypto-js';

const jG = CryptoJS.enc.Utf8.parse('shy@2019@0701@zp');
const GG = CryptoJS.enc.Utf8.parse('123456');
const secret = CryptoJS.AES.decrypt('wlmj9CKFfuoBSbLRzA4muQ==', jG, {
  iv: GG,
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
}).toString(CryptoJS.enc.Utf8);

function emojiEncode(s) {
  return s.replace(
    /(?:\uD83D[\uDE00-\uDE4F])|(?:\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])|(?:\uD83D[\uDE80-\uDEFF])|(?:\uD83C[\uDDE0-\uDDFF])|[\u2600-\u26FF]|[\u2700-\u27BF]|(?:\uD83E[\uDD00-\uDDFF])|(?:\uD83E[\uDE70-\uDEFF])|[\uFE00-\uFE0F]|(?:[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF])|(?:\uD869[\uDF00-\uDFFF]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDDFF])/g,
    ''
  );
}

function genSignStr(params) {
  const keys = Object.keys(params).sort();
  const parts = [];
  for (const k of keys) {
    const v = params[k];
    if (Number.isNaN(v) || v == null || v === '' || String(v).length === 0 || /^\s*$/.test(String(v))) continue;
    if (typeof v === 'object') parts.push(`${k}=${JSON.stringify(v)}`);
    else parts.push(`${k}=${v}`);
  }
  return emojiEncode(parts.join('&'));
}

function md5(str) {
  return CryptoJS.MD5(str).toString();
}

async function apiGet(path, params) {
  const ts = Date.now();
  const p = { ...params, shId: 623, siteId: 357, xhId: 623 };
  const sign = md5(genSignStr(p) + ts + secret);
  const qs = new URLSearchParams(Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)])));
  const url = `https://pcweb.xiehuiyi.com${path}?${qs}`;
  const res = await fetch(url, {
    headers: {
      Referer: 'https://www.efmac.net/',
      Origin: 'https://www.efmac.net',
      sign,
      signTimeStamp: String(ts),
    },
  });
  return res.json();
}

const tests = [
  ['/pcWeb/infoApp/setting/modules', {}],
  ['/pcWeb/infoApp/article/banner', { position: 1 }],
  ['/pcWeb/infoApp/article/list', { categorySn: 1303, pageNum: 1, pageSize: 15 }],
  ['/pcWeb/infoApp/article/list', { categorySn: 1302, pageNum: 1, pageSize: 15 }],
  ['/pcWeb/infoApp/article/list', { categorySn: 1301, pageNum: 1, pageSize: 15 }],
  ['/pcWeb/company/getMemberCompany', { pageNum: 1, pageSize: 30 }],
];

for (const [path, params] of tests) {
  const data = await apiGet(path, params);
  console.log(path, data.errno, (data.errmsg || '').slice(0, 40), JSON.stringify(data.data || data.result || data.list || data).slice(0, 200));
  if (data.errno === 0) {
    fs.writeFileSync(`scripts/signed-${path.replace(/\//g, '_')}.json`, JSON.stringify(data, null, 2));
  }
}

console.log('secret', secret);
