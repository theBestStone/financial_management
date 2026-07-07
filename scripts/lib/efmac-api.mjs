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

export function genSignStr(params) {
  const keys = Object.keys(params).sort();
  const parts = [];
  for (const k of keys) {
    const v = params[k];
    if (Number.isNaN(v) || v == null || v === '' || String(v).length === 0 || /^\s*$/.test(String(v))) {
      continue;
    }
    parts.push(`${k}=${typeof v === 'object' ? JSON.stringify(v) : v}`);
  }
  return emojiEncode(parts.join('&'));
}

export const EFMAC_ORIGIN = 'https://www.efmac.net';
export const API_BASE = 'https://pcweb.xiehuiyi.com';
export const SH_ID = 623;
export const SITE_ID = 357;

export async function apiGet(path, params = {}) {
  const ts = Date.now();
  const p = { ...params, shId: SH_ID, siteId: SITE_ID, xhId: SH_ID };
  const sign = CryptoJS.MD5(genSignStr(p) + ts + secret).toString();
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)]))
  );
  const res = await fetch(`${API_BASE}${path}?${qs}`, {
    headers: {
      Referer: `${EFMAC_ORIGIN}/`,
      Origin: EFMAC_ORIGIN,
      sign,
      signTimeStamp: String(ts),
    },
  });
  return res.json();
}

/** 从 API 返回的富文本中提取纯文本段落 */
export function htmlToParagraphs(html = '') {
  if (!html) return [];
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
  return text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}
