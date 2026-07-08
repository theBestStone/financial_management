import ArticleBody from '../components/common/ArticleBody';
import ContentPageLayout from '../components/layout/ContentPageLayout';
import { SITE_CONFIG } from '../data/config';
import { findNavByCategorySn } from '../data/navigation';
import { useArticleByCategory } from '../hooks/useEfmacArticles';

interface CategoryArticlePageProps {
  categorySn: number;
}

/** 单页栏目（isList=0）：按 categorySn 拉取正文 */
export default function CategoryArticlePage({ categorySn }: CategoryArticlePageProps) {
  const { article, loading } = useArticleByCategory(categorySn);
  const navItem = findNavByCategorySn(categorySn);
  const categoryName = navItem?.categoryName ?? article?.categoryName ?? '栏目详情';

  if (loading && !article) {
    return (
      <ContentPageLayout categorySn={categorySn} categoryName={categoryName}>
        <div className="alert alert-info">加载中…</div>
      </ContentPageLayout>
    );
  }

  if (!article) {
    return (
      <ContentPageLayout categorySn={categorySn} categoryName={categoryName}>
        <div className="content-list-empty">暂无相关内容</div>
      </ContentPageLayout>
    );
  }

  return (
    <ContentPageLayout
      categorySn={categorySn}
      categoryName={categoryName}
      breadcrumbTitle={categoryName}
      title={article.title}
      meta={
        <>
          <span>{article.author || SITE_CONFIG.name}</span>
          <span>发布时间：{article.publishTime}</span>
        </>
      }
    >
      <ArticleBody article={article} />
    </ContentPageLayout>
  );
}
