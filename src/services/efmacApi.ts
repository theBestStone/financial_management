import CryptoJS from 'crypto-js';
import { htmlToParagraphs } from '../utils/htmlToText';

const jG = CryptoJS.enc.Utf8.parse('shy@2019@0701@zp');
const GG = CryptoJS.enc.Utf8.parse('123456');
const secret = CryptoJS.AES.decrypt('wlmj9CKFfuoBSbLRzA4muQ==', jG, {
  iv: GG,
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
}).toString(CryptoJS.enc.Utf8);

const SH_ID = 623;
const SITE_ID = 357;
const API_PREFIX = import.meta.env.DEV ? '/efmac-api' : '/efmac-api';

function emojiEncode(s: string): string {
  return s.replace(
    /(?:\uD83D[\uDE00-\uDE4F])|(?:\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])|(?:\uD83D[\uDE80-\uDEFF])|(?:\uD83C[\uDDE0-\uDDFF])|[\u2600-\u26FF]|[\u2700-\u27BF]|(?:\uD83E[\uDD00-\uDDFF])|(?:\uD83E[\uDE70-\uDEFF])|[\uFE00-\uFE0F]|(?:[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF])|(?:\uD869[\uDF00-\uDFFF]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDDFF])/g,
    ''
  );
}

function genSignStr(params: Record<string, unknown>): string {
  const keys = Object.keys(params).sort();
  const parts: string[] = [];
  for (const k of keys) {
    const v = params[k];
    if (Number.isNaN(v as number) || v == null || v === '' || String(v).length === 0) continue;
    parts.push(`${k}=${typeof v === 'object' ? JSON.stringify(v) : v}`);
  }
  return emojiEncode(parts.join('&'));
}

interface ApiResponse<T> {
  errno: number;
  errmsg?: string;
  data?: T;
}

async function apiGet<T>(path: string, params: Record<string, string | number> = {}): Promise<T | null> {
  const ts = Date.now();
  const p = { ...params, shId: SH_ID, siteId: SITE_ID, xhId: SH_ID };
  const sign = CryptoJS.MD5(genSignStr(p) + ts + secret).toString();
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)]))
  );
  const res = await fetch(`${API_PREFIX}${path}?${qs}`, {
    headers: {
      Referer: 'https://www.efmac.net/',
      Origin: 'https://www.efmac.net',
      sign,
      signTimeStamp: String(ts),
    },
  });
  const json = (await res.json()) as ApiResponse<T>;
  if (json.errno !== 0) return null;
  return json.data ?? null;
}

export interface LiveArticleListItem {
  id: number;
  title: string;
  summary: string;
  categorySn: number;
  categoryName: string;
  parentSn?: number;
  publishTime: string;
  thumb?: string;
  views?: number;
}

export interface LiveArticleDetail {
  id: number;
  title: string;
  summary: string;
  paragraphs: string[];
  categorySn: number;
  categoryName: string;
  publishTime: string;
  author?: string;
  views?: number;
  thumb?: string;
}

interface RawListItem {
  id: string;
  title: string;
  foreword?: string;
  categorySn: number;
  categoryName?: string;
  parentSn?: number;
  publishTime: string;
  thumbImg?: string;
  views?: number;
}

interface RawDetail {
  id: number;
  title: string;
  foreword?: string;
  article?: string;
  content?: string;
  categorySn: number;
  categoryName?: string;
  category?: string;
  publishTime: string;
  source?: string;
  thumbImg?: string;
}

function mapListItem(item: RawListItem): LiveArticleListItem {
  return {
    id: Number(item.id),
    title: item.title,
    summary: item.foreword || '',
    categorySn: item.categorySn,
    categoryName: String(item.categoryName ?? '').split(',')[0],
    parentSn: item.parentSn,
    publishTime: item.publishTime?.slice(0, 10) ?? '',
    thumb: item.thumbImg || undefined,
    views: item.views,
  };
}

function mapDetail(item: RawDetail, views?: number): LiveArticleDetail {
  const paragraphs = htmlToParagraphs(item.article || item.content || item.foreword || '');
  return {
    id: Number(item.id),
    title: item.title,
    summary: item.foreword || paragraphs[0] || '',
    paragraphs,
    categorySn: item.categorySn,
    categoryName: String(item.categoryName ?? item.category ?? '').split(',')[0],
    publishTime: item.publishTime?.slice(0, 10) ?? '',
    author: item.source,
    views,
    thumb: item.thumbImg,
  };
}

export async function fetchArticleList(
  categorySn: number,
  pageNum = 1,
  pageSize = 15
): Promise<{ list: LiveArticleListItem[]; total: number }> {
  const data = await apiGet<{ list: RawListItem[]; total: string | number }>(
    '/pcWeb/infoApp/article/list',
    { categorySns: String(categorySn), pageNum, pageSize }
  );
  if (!data) return { list: [], total: 0 };
  return {
    list: (data.list ?? []).map(mapListItem),
    total: Number(data.total ?? 0),
  };
}

export async function fetchArticleDetail(id: number): Promise<LiveArticleDetail | null> {
  const data = await apiGet<{ detail: RawDetail; views?: number }>(
    '/pcWeb/infoApp/article/detail',
    { id }
  );
  if (!data?.detail) return null;
  return mapDetail(data.detail, data.views);
}
