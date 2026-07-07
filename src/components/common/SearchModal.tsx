import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import articlesCache from '../../data/articlesLive.json';
import { articleDetailLink, navigateLink } from '../../utils/legacyRoutes';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

function searchLiveArticles(keyword: string) {
  const kw = keyword.toLowerCase();
  const seen = new Set<number>();
  const results: { id: number; title: string; date: string; categoryName: string }[] = [];
  for (const bucket of Object.values(articlesCache.listByCategory)) {
    for (const item of bucket.items) {
      if (seen.has(item.id)) continue;
      if (item.title.toLowerCase().includes(kw)) {
        seen.add(item.id);
        results.push({
          id: item.id,
          title: item.title,
          date: item.publishTime,
          categoryName: item.categoryName,
        });
      }
    }
  }
  return results;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [keyword, setKeyword] = useState('');
  const [tab, setTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setKeyword('');
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const results = useMemo(
    () => (keyword.trim() ? searchLiveArticles(keyword.trim()) : []),
    [keyword]
  );

  if (!open) return null;

  const handleResultClick = (id: number) => {
    navigateLink(articleDetailLink(id), navigate);
    onClose();
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <input
            autoFocus
            placeholder="请输入搜索关键词"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && results[0]) handleResultClick(results[0].id);
            }}
          />
          <button className="search-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="search-tabs">
          <div className={`search-tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>
            全部
          </div>
          <div className={`search-tab ${tab === 'article' ? 'active' : ''}`} onClick={() => setTab('article')}>
            文章
          </div>
        </div>
        <div className="search-results">
          {keyword.trim() === '' ? (
            <div className="search-empty">请输入关键词进行搜索</div>
          ) : results.length === 0 ? (
            <div className="search-empty">未找到相关内容</div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                className="search-result-item"
                onClick={() => handleResultClick(item.id)}
              >
                <span className="search-result-tag">{item.categoryName}</span>
                <div>
                  <div>{item.title}</div>
                  <div style={{ color: '#909399', fontSize: 13, marginTop: 4 }}>{item.date}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
