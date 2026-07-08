import { useNavigate, useParams } from 'react-router-dom';
import { SITE_CONFIG } from '../data/config';
import ArticleBody from '../components/common/ArticleBody';
import ContentPageLayout from '../components/layout/ContentPageLayout';
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
    <ContentPageLayout
      categorySn={article.categorySn}
      categoryName={article.categoryName}
      breadcrumbTitle={article.categoryName}
      title={article.title}
      meta={
        <>
          <span>{article.author || SITE_CONFIG.name}</span>
          <span>发布时间：{article.publishTime}</span>
        </>
      }
    >
      <ArticleBody article={article} />

      {related.length > 0 && (
        <div className="content-page-related">
          <div className="content-page-related-title">相关文章</div>
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
    </ContentPageLayout>
  );
}
