import { Navigate, useParams } from 'react-router-dom';
import ArticleListPage from './ArticleListPage';
import ArticleDetailPage from './ArticleDetailPage';
import MemberApplyPage from './MemberApplyPage';
import { parseLegacyDetailPath, parseLegacyListPath } from '../utils/legacyRoutes';

/** 统一处理 /article/* 原站与简化路由 */
export default function ArticleRouteHandler() {
  const { '*': rest = '' } = useParams();
  const path = rest.split('?')[0];

  if (path.startsWith('detail/')) {
    const id = parseLegacyDetailPath(path.slice('detail/'.length));
    if (id === null) return <Navigate to="/" replace />;
    return <ArticleDetailPage overrideId={id} />;
  }

  const parsed = parseLegacyListPath(path);
  if (parsed) {
    if (parsed.parentSn === 16 && parsed.categorySn === 0) {
      return <MemberApplyPage />;
    }
    return (
      <ArticleListPage
        overrideCategorySn={parsed.categorySn}
        overridePage={parsed.page + 1}
      />
    );
  }

  const simpleSn = Number(path.replace(/\.html$/, ''));
  if (!Number.isNaN(simpleSn) && path !== '') {
    return <ArticleListPage overrideCategorySn={simpleSn} />;
  }

  return <Navigate to="/" replace />;
}

export function LegacySubjectPage() {
  return <Navigate to="/member/query" replace />;
}

export function LegacyCompanyJobPage() {
  return <Navigate to="/member/companies" replace />;
}
