import type { ReactNode } from 'react';
import ContentPageShell from './ContentPageShell';
import Breadcrumb from '../common/Breadcrumb';

interface ContentPageLayoutProps {
  categorySn?: number;
  categoryName?: string;
  breadcrumbTitle?: string;
  title?: string;
  meta?: ReactNode;
  children: ReactNode;
}

/** 详情页固定布局：左上栏目标题 + 右上面包屑 + 居中标题 + 动态正文 */
export default function ContentPageLayout({
  categorySn,
  categoryName,
  breadcrumbTitle,
  title,
  meta,
  children,
}: ContentPageLayoutProps) {
  const sectionTitle = categoryName ?? breadcrumbTitle ?? title;

  return (
    <ContentPageShell categorySn={categorySn} categoryName={categoryName}>
      <div className="content-page-panel content-detail-panel">
        <div className="content-page-header">
          {sectionTitle && <h1 className="content-page-section-title">{sectionTitle}</h1>}
          <div className="content-page-header-breadcrumb">
            <Breadcrumb
              categorySn={categorySn}
              fallbackCategoryName={categoryName}
              currentTitle={breadcrumbTitle ?? categoryName}
              showHomeIcon
            />
          </div>
        </div>

        {(title || meta) && (
          <div className="content-page-article-head">
            {title && <h2 className="content-page-title">{title}</h2>}
            {meta && <div className="content-page-meta">{meta}</div>}
          </div>
        )}

        <div className="content-page-body">{children}</div>
      </div>
    </ContentPageShell>
  );
}
