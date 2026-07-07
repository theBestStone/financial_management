import { useEffect, useState } from 'react';
import {
  fetchArticleDetail,
  fetchArticleList,
  type LiveArticleDetail,
  type LiveArticleListItem,
} from '../services/efmacApi';
import articlesCache from '../data/articlesLive.json';

interface CachedCategory {
  total: number;
  items: LiveArticleListItem[];
}

function getCachedList(categorySn: number): LiveArticleListItem[] {
  const bucket = (articlesCache.listByCategory as Record<string, CachedCategory>)[String(categorySn)];
  return bucket?.items ?? [];
}

function getCachedDetail(id: number): LiveArticleDetail | undefined {
  const raw = (articlesCache.details as Record<string, LiveArticleDetail>)[String(id)];
  if (!raw?.title) return undefined;
  return raw;
}

export function useArticleList(categorySn: number, page = 1, pageSize = 10) {
  const cached = getCachedList(categorySn);
  const [articles, setArticles] = useState<LiveArticleListItem[]>(cached);
  const [total, setTotal] = useState(cached.length);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

export function getRelatedFromCache(
  categorySn: number,
  excludeId: number,
  limit = 5
): LiveArticleListItem[] {
  return getCachedList(categorySn).filter((a) => a.id !== excludeId).slice(0, limit);
}
