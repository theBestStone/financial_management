import fs from 'fs';
import { apiGet, htmlToParagraphs } from './lib/efmac-api.mjs';

const CATEGORY_SNS = [
  84, 1301, 1302, 1353, 1354, 80, 7150, 7151, 7164, 705750, 7255, 7253, 7950,
];

async function fetchCategoryArticles(categorySn, pageNum = 1, pageSize = 50) {
  const res = await apiGet('/pcWeb/infoApp/article/list', {
    categorySns: String(categorySn),
    pageNum,
    pageSize,
  });
  if (res.errno !== 0) {
    console.warn(`category ${categorySn} page ${pageNum}:`, res.errmsg);
    return { list: [], total: 0 };
  }
  return {
    list: res.data?.list ?? [],
    total: Number(res.data?.total ?? 0),
  };
}

async function fetchArticleDetail(id) {
  const res = await apiGet('/pcWeb/infoApp/article/detail', { id });
  if (res.errno !== 0) return null;
  return res.data?.detail ?? null;
}

function mapListItem(item) {
  return {
    id: Number(item.id),
    title: item.title,
    summary: item.foreword || '',
    categorySn: item.categorySn,
    categoryName: String(item.categoryName ?? '').split(',')[0],
    parentSn: item.parentSn,
    publishTime: item.publishTime?.slice(0, 10) ?? '',
    thumb: item.thumbImg || undefined,
    views: item.views ? Number(item.views) : undefined,
  };
}

function mapDetail(item, views) {
  const paragraphs = htmlToParagraphs(item.article || item.content || item.foreword || '');
  return {
    id: Number(item.id),
    title: item.title,
    summary: item.foreword || paragraphs[0] || '',
    paragraphs,
    categorySn: item.categorySn,
    categoryName: String(item.categoryName ?? item.category ?? '').split(',')[0],
    publishTime: item.publishTime?.slice(0, 10) ?? '',
    author: item.source || undefined,
    views: views ?? undefined,
    thumb: item.thumbImg || undefined,
  };
}

const listByCategory = {};
const allListItems = new Map();

for (const categorySn of CATEGORY_SNS) {
  const { list, total } = await fetchCategoryArticles(categorySn);
  listByCategory[categorySn] = { total, items: list.map(mapListItem) };
  list.forEach((item) => allListItems.set(String(item.id), item));
  console.log(`category ${categorySn}: ${list.length}/${total}`);
}

const detailIds = [...allListItems.keys()].slice(0, 80);
const details = {};

for (const id of detailIds) {
  const res = await apiGet('/pcWeb/infoApp/article/detail', { id });
  const detail = res.errno === 0 ? res.data?.detail : null;
  if (detail) {
    details[id] = mapDetail(detail, res.data?.views);
  }
}

const output = {
  fetchedAt: new Date().toISOString(),
  listByCategory,
  details,
};

fs.writeFileSync('src/data/articlesLive.json', JSON.stringify(output, null, 2));
console.log(
  'synced',
  Object.keys(listByCategory).length,
  'categories,',
  Object.keys(details).length,
  'article details'
);
