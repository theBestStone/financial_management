import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContentPageSidebar } from '../../utils/contentPageSidebar';
import { categoryLink, isExternalUrl, navigateLink } from '../../utils/legacyRoutes';
import { ArrowRightOutlined } from '@ant-design/icons';
interface ContentPageShellProps {
  categorySn?: number;
  categoryName?: string;
  children: ReactNode;
}

export default function ContentPageShell({
  categorySn,
  categoryName,
  children,
}: ContentPageShellProps) {
  const navigate = useNavigate();
  const sidebar = getContentPageSidebar(categorySn, categoryName);

  const handleSidebarClick = (categorySnItem?: number, link?: string, external?: boolean) => {
    if (external && link) {
      window.open(link, '_blank');
      return;
    }
    if (link && !isExternalUrl(link)) {
      navigateLink(link, navigate);
      return;
    }
    if (categorySnItem !== undefined) {
      navigateLink(categoryLink(categorySnItem, sidebar?.parentCategorySn), navigate);
    }
  };

  return (
    <div className="wrap content-page-wrap">
      <div className="content-page-layout">
        {sidebar && (
          <aside className="sidebar content-page-sidebar">
            <div className="sidebar-menu">
              <div className="sidebar-menu-title">{sidebar.sidebarTitle}</div>
              {sidebar.items.map((item) => {
                const isActive = item.categorySn === sidebar.activeCategorySn;
                return (
                  <div
                    key={item.categorySn ?? item.categoryName}
                    className={`sidebar-menu-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleSidebarClick(item.categorySn, item.link, item.external)}
                  >
                    {item.categoryName}
                    {isActive && <ArrowRightOutlined />}
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        <main className="main-content content-page-main">{children}</main>
      </div>
    </div>
  );
}
