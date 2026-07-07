import { useNavigate, useParams } from 'react-router-dom';
import ArticleBody from '../components/common/ArticleBody';
import Breadcrumb from '../components/common/Breadcrumb';
import { getRelatedFromCache, useArticleDetail } from '../hooks/useEfmacArticles';
import { articleDetailLink } from '../utils/legacyRoutes';

interface ArticleDetailPageProps {
  overrideId?: number;
}

export default function ArticleDetailPage({ overrideId }: ArticleDetailPageProps = {}) {
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const id = overrideId ?? Number(idParam);
  const { article, loading } = useArticleDetail(id);

  if (loading && !article) {
    return (
      <div className="wrap">
        <div className="alert alert-info" style={{ marginTop: 30 }}>
          加载中…
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="wrap">
        <div className="alert alert-error" style={{ marginTop: 30 }}>
          文章不存在或已被删除
        </div>
      </div>
    );
  }

  const related = getRelatedFromCache(article.categorySn, article.id);

  return (
    <div className="wrap">
      <div className="page-header">
        <Breadcrumb categorySn={article.categorySn} currentTitle={article.title} />
      </div>
      <div className="content-layout">
        <main className="main-content">
          <article className="article-detail">
            <h1 className="article-detail-title">{article.title}</h1>
            <div className="article-meta">
              <span>发布时间：{article.publishTime}</span>
              {article.author && <span>来源：{article.author}</span>}
              {article.views !== undefined && <span>浏览：{article.views}</span>}
            </div>
            <ArticleBody article={article} />
          </article>

          {related.length > 0 && (
            <div className="module-box" style={{ marginTop: 10, padding: '15px 20px' }}>
              <div className="module-title">
                <span>相关文章</span>
              </div>
              <ul className="news-list">
                {related.map((item) => (
                  <li key={item.id}>
                    <span className="news-dot" />
                    <span
                      className="news-title"
                      onClick={() => navigate(articleDetailLink(item.id))}
                    >
                      {item.title}
                    </span>
                    <span className="news-date">{item.publishTime}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
