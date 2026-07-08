import ContentPageShell from './ContentPageShell';
import Breadcrumb from '../common/Breadcrumb';
import ListPagination from '../common/ListPagination';

export interface ContentListItem {
  id: string | number;
  title: string;
  date: string;
  onClick?: () => void;
}

interface ContentListLayoutProps {
  categorySn?: number;
  categoryName: string;
  items: ContentListItem[];
  loading?: boolean;
  emptyText?: string;
  page: number;
  totalPages: number;
  total: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

/** 列表页固定布局：左标题右面包屑 + 列表 + 分页 */
export default function ContentListLayout({
  categorySn,
  categoryName,
  items,
  loading = false,
  emptyText = '暂无相关内容',
  page,
  totalPages,
  total,
  pageSize = 20,
  pageSizeOptions = [10, 20, 30, 50],
  onPageChange,
  onPageSizeChange,
}: ContentListLayoutProps) {
  return (
    <ContentPageShell categorySn={categorySn} categoryName={categoryName}>
      <div className="content-page-panel content-list-panel">
        <div className="content-list-header">
          <h1 className="content-page-section-title">{categoryName}</h1>
          <div className="content-page-header-breadcrumb">
            <Breadcrumb
              categorySn={categorySn}
              fallbackCategoryName={categoryName}
              currentTitle={categoryName}
              showHomeIcon
            />
          </div>
        </div>

        <div className="content-list-body">
          {loading && items.length === 0 ? (
            <div className="alert alert-info">加载中…</div>
          ) : items.length === 0 ? (
            <div className="content-list-empty">{emptyText}</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="content-list-item">
                <span className="content-list-item-title" onClick={item.onClick}>
                  {item.title}
                </span>
                <span className="content-list-item-date">{item.date}</span>
              </div>
            ))
          )}
        </div>

        <ListPagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </ContentPageShell>
  );
}
