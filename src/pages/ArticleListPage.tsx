import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import Pagination from '../components/common/Pagination';
import { ARTICLES, getArticlesByCategory } from '../data/content';
import { getCategoryPath, findNavByCategorySn } from '../data/navigation';
import { paginate } from '../utils/helpers';
import { articleDetailLink, categoryLink, navigateLink } from '../utils/legacyRoutes';

interface ArticleListPageProps {
  overrideCategorySn?: number;
  overridePage?: number;
}

export default function ArticleListPage({
  overrideCategorySn,
  overridePage,
}: ArticleListPageProps = {}) {
  const { categorySn: snParam } = useParams();
  const navigate = useNavigate();
  const categorySn = overrideCategorySn ?? Number(snParam);
  const [page, setPage] = useState(overridePage ?? 1);
  const pageSize = 10;

  const navItem = findNavByCategorySn(categorySn);
  const path = getCategoryPath(categorySn);
  const parentNav = path.length > 1 ? path[path.length - 2] : path[0];

  const articles = useMemo(() => {
    const fromCategory = getArticlesByCategory(categorySn);
    if (fromCategory.length > 0) return fromCategory;

    const direct = ARTICLES.filter((a) => a.categorySn === categorySn);
    if (direct.length > 0) return direct;

    const childSns: number[] = [];
    const collectChildren = (sn: number) => {
      const item = findNavByCategorySn(sn);
      if (item?.children) {
        item.children.forEach((c) => {
          if (c.categorySn) {
            childSns.push(c.categorySn);
            collectChildren(c.categorySn);
          }
        });
      }
    };
    collectChildren(categorySn);
    return ARTICLES.filter((a) => childSns.includes(a.categorySn));
  }, [categorySn]);

  const { data, totalPages } = paginate(articles, page, pageSize);
  const title = navItem?.categoryName ?? '文章列表';

  const sidebarItems = parentNav?.children ?? [];

  return (
    <div className="wrap">
      <div className="page-header">
        <Breadcrumb categorySn={categorySn} />
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="content-layout">
        {sidebarItems.length > 0 && (
          <aside className="sidebar">
            <div className="sidebar-menu">
              <div className="sidebar-menu-title">{parentNav?.categoryName}</div>
              {sidebarItems.map((item) => (
                <div
                  key={item.categorySn ?? item.categoryName}
                  className={`sidebar-menu-item ${item.categorySn === categorySn ? 'active' : ''}`}
                  onClick={() => {
                    if (item.categorySn) {
                      setPage(1);
                      navigateLink(categoryLink(item.categorySn, parentNav?.categorySn), navigate);
                    }
                  }}
                >
                  {item.categoryName}
                </div>
              ))}
            </div>
          </aside>
        )}
        <main className="main-content">
          <div className="module-box" style={{ padding: '10px 20px' }}>
            {data.length === 0 ? (
              <div className="alert alert-info">暂无相关内容</div>
            ) : (
              data.map((article) => (
                <div key={article.id} className="article-list-item">
                  <span
                    className="article-list-title"
                    onClick={() => navigateLink(articleDetailLink(article.id), navigate)}
                  >
                    {article.title}
                  </span>
                  <span className="article-list-date">{article.publishTime}</span>
                </div>
              ))
            )}
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </main>
      </div>
    </div>
  );
}
