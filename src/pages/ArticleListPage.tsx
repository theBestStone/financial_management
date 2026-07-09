import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentListLayout from '../components/layout/ContentListLayout';
import CategoryArticlePage from './CategoryArticlePage';
import { findNavByCategorySn } from '../data/navigation';
import { useArticleList } from '../hooks/useEfmacArticles';
import { articleDetailLink } from '../utils/legacyRoutes';

interface ArticleListPageProps {
  overrideCategorySn?: number;
  overridePage?: number;
}

function ArticleListPageContent({
  categorySn,
  overridePage,
}: {
  categorySn: number;
  overridePage?: number;
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(overridePage ?? 1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    setPage(overridePage ?? 1);
  }, [categorySn, overridePage]);

  const { articles, total, loading } = useArticleList(categorySn, page, pageSize);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const navItem = findNavByCategorySn(categorySn);
  const categoryName = navItem?.categoryName ?? articles[0]?.categoryName ?? '文章列表';

  const listItems = useMemo(
    () =>
      articles.map((article) => ({
        id: article.id,
        title: article.title,
        date: article.publishTime,
        onClick: () => navigate(articleDetailLink(article.id, categorySn)),
      })),
    [articles, categorySn, navigate]
  );

  return (
    <ContentListLayout
      categorySn={categorySn}
      categoryName={categoryName}
      items={listItems}
      loading={loading}
      page={page}
      totalPages={totalPages}
      total={total}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setPage(1);
      }}
    />
  );
}

export default function ArticleListPage({
  overrideCategorySn,
  overridePage,
}: ArticleListPageProps = {}) {
  const { categorySn: snParam } = useParams();
  const categorySn = overrideCategorySn ?? Number(snParam);
  const navItem = findNavByCategorySn(categorySn);

  if (categorySn === 7161) {
    return <CategoryArticlePage categorySn={716152} />;
  }

  if (categorySn === 7162) {
    return <CategoryArticlePage categorySn={716250} />;
  }

  if (navItem?.isList === 0) {
    return <CategoryArticlePage categorySn={categorySn} />;
  }

  return <ArticleListPageContent categorySn={categorySn} overridePage={overridePage} />;
}
