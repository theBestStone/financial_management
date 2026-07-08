import { useEffect, useState } from 'react';
import {
  fetchArticleDetail,
  fetchArticleDetailByCategorySn,
  fetchArticleList,
  type LiveArticleDetail,
  type LiveArticleListItem,
} from '../services/efmacApi';
import articlesCache from '../data/articlesLive.json';
import { getStaticCategoryDetail, getStaticCategoryList } from '../data/staticPages';

interface CachedCategory {
  total: number;
  items: LiveArticleListItem[];
}

function getCachedList(categorySn: number): LiveArticleListItem[] {
  const staticList = getStaticCategoryList(categorySn);
  if (staticList) return staticList;

  const bucket = (articlesCache.listByCategory as Record<string, CachedCategory>)[String(categorySn)];
  return bucket?.items ?? [];
}

function getCachedDetail(id: number): LiveArticleDetail | undefined {
  const raw = (articlesCache.details as Record<string, LiveArticleDetail>)[String(id)];
  if (!raw?.title) return undefined;
  return raw;
}

function getCachedDetailByCategory(categorySn: number): LiveArticleDetail | undefined {
  const staticDetail = getStaticCategoryDetail(categorySn);
  if (staticDetail) return staticDetail;

  const raw = (articlesCache.detailsByCategory as Record<string, LiveArticleDetail> | undefined)?.[
    String(categorySn)
  ];
  if (!raw?.title) return undefined;
  return raw;
}

export function useArticleList(categorySn: number, page = 1, pageSize = 10) {
  const staticList = getStaticCategoryList(categorySn);
  const cached = staticList ?? getCachedList(categorySn);
  const pagedCached = staticList ? staticList.slice((page - 1) * pageSize, page * pageSize) : cached;
  const [articles, setArticles] = useState<LiveArticleListItem[]>(pagedCached);
  const [total, setTotal] = useState(cached.length);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const staticItems = getStaticCategoryList(categorySn);
    if (staticItems) {
      setArticles(staticItems.slice((page - 1) * pageSize, page * pageSize));
      setTotal(staticItems.length);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    fetchArticleList(categorySn, page, pageSize)
      .then(({ list, total: t }) => {
        if (cancelled) return;
        if (list.length > 0) {
          setArticles(list);
          setTotal(t);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [categorySn, page, pageSize]);

  return { articles, total, loading };
}

export function useArticleDetail(id: number) {
  const cached = getCachedDetail(id);
  const [article, setArticle] = useState<LiveArticleDetail | null>(cached ?? null);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchArticleDetail(id)
      .then((detail) => {
        if (cancelled) return;
        if (detail) setArticle(detail);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { article, loading };
}

export function useArticleByCategory(categorySn: number) {
  const cached = getCachedDetailByCategory(categorySn);
  const [article, setArticle] = useState<LiveArticleDetail | null>(cached ?? null);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    const staticDetail = getStaticCategoryDetail(categorySn);
    if (staticDetail) {
      setArticle(staticDetail);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    fetchArticleDetailByCategorySn(categorySn)
      .then((detail) => {
        if (cancelled) return;
        if (detail) setArticle(detail);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [categorySn]);

  return { article, loading };
}

export function getRelatedFromCache(
  categorySn: number,
  excludeId: number,
  limit = 5
): LiveArticleListItem[] {
  return getCachedList(categorySn).filter((a) => a.id !== excludeId).slice(0, limit);
}
