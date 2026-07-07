import { Link } from 'react-router-dom';
import { getCategoryPath } from '../../data/navigation';
import { categoryLink } from '../../utils/legacyRoutes';

interface BreadcrumbProps {
  categorySn?: number;
  currentTitle?: string;
  parentTitle?: string;
}

export default function Breadcrumb({ categorySn, currentTitle, parentTitle }: BreadcrumbProps) {
  const path = categorySn ? getCategoryPath(categorySn) : [];

  return (
    <div className="breadcrumb">
      <Link to="/">首页</Link>
      {path.slice(1).map((item, i) => (
        <span key={item.categorySn ?? item.categoryName}>
          {' '}
          &gt;{' '}
          {item.categorySn ? (
            <Link to={categoryLink(item.categorySn, path[i].categorySn)}>{item.categoryName}</Link>
          ) : (
            item.categoryName
          )}
        </span>
      ))}
      {!categorySn && parentTitle && <span> &gt; {parentTitle}</span>}
      {currentTitle && <span> &gt; {currentTitle}</span>}
    </div>
  );
}
