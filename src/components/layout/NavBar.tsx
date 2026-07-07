import { useNavigate } from 'react-router-dom';
import { NAV_LIST } from '../../data/navigation';
import { getNavLink, isExternalLink } from '../../utils/helpers';
import type { NavItem } from '../../types';
import { SITE_CONFIG } from '../../data/config';

function handleNavNavigate(navigate: ReturnType<typeof useNavigate>, item: NavItem) {
  const link = getNavLink(item);
  if (isExternalLink(link)) {
    window.open(link, '_blank');
  } else {
    navigate(link);
  }
}

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="nav-wrap" style={{ fontFamily: 'Microsoft YaHei', background: SITE_CONFIG.themeColor }}>
      <div className="nav-box">
        <div className="nav-items">
          {NAV_LIST.map((item) => (
            <div className="nav-item" key={item.categoryName}>
              {item.children && item.children.length > 0 ? (
                <>
                  <div className="nav-title">{item.categoryName}</div>
                  <div className="nav-child-box" style={{ background: SITE_CONFIG.themeColor }}>
                    {item.children.map((child) => (
                      <p
                        key={child.categorySn ?? child.categoryName}
                        onClick={() => handleNavNavigate(navigate, child)}
                      >
                        {child.categoryName}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                <div className="nav-title" onClick={() => handleNavNavigate(navigate, item)}>
                  {item.categoryName}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
