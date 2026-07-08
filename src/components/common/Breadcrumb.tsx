import { Link } from 'react-router-dom';
import { getCategoryPath } from '../../data/navigation';
import { categoryLink } from '../../utils/legacyRoutes';

interface BreadcrumbProps {
  categorySn?: number;
  fallbackCategoryName?: string;
  currentTitle?: string;
  parentTitle?: string;
  showHomeIcon?: boolean;
}

function HomeIcon() {
  return (
    <svg
      className="breadcrumb-home-icon"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M8 1.2 1.5 6.4v8.1h4.2V10h4.6v4.5h4.2V6.4L8 1.2zm0 1.6 4.8 3.8v6.7H9.5V9.5H6.5v3.8H3.2V6.6L8 2.8z"
      />
    </svg>
  );
}

function HomeLink({ showHomeIcon }: { showHomeIcon: boolean }) {
  return (
    <Link to="/" className="breadcrumb-home-link">
      {showHomeIcon && <HomeIcon />}
      <span>首页</span>
    </Link>
  );
}

export default function Breadcrumb({
  categorySn,
  fallbackCategoryName,
  currentTitle,
  parentTitle,
  showHomeIcon = false,
}: BreadcrumbProps) {
  const path = categorySn ? getCategoryPath(categorySn) : [];
  const lastPathName = path[path.length - 1]?.categoryName;
  const showCurrentTitle = currentTitle && currentTitle !== lastPathName;

  if (path.length === 0 && fallbackCategoryName) {
    return (
      <div className="breadcrumb">
        <HomeLink showHomeIcon={showHomeIcon} />
        <span> / {fallbackCategoryName}</span>
        {showCurrentTitle && currentTitle !== fallbackCategoryName && <span> / {currentTitle}</span>}
      </div>
    );
  }

  return (
    <div className="breadcrumb">
      <HomeLink showHomeIcon={showHomeIcon} />
      {path.slice(1).map((item, i) => (
        <span key={item.categorySn ?? item.categoryName}>
          {' / '}
          {item.categorySn ? (
            <Link to={categoryLink(item.categorySn, path[i].categorySn)}>{item.categoryName}</Link>
          ) : (
            item.categoryName
          )}
        </span>
      ))}
      {!categorySn && parentTitle && <span> / {parentTitle}</span>}
      {showCurrentTitle && <span> / {currentTitle}</span>}
    </div>
  );
}
