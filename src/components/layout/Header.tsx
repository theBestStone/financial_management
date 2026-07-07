import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../data/config';

interface HeaderProps {
  onSearchClick: () => void;
  onLoginClick: () => void;
}

function SearchIcon() {
  return (
    <svg className="header-btn-icon" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="11" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Header({ onSearchClick, onLoginClick }: HeaderProps) {
  return (
    <div className="header-root">
      <div className="nav-top-wrap">
        <div className="nav-top-sizer" aria-hidden="true" />
        <div className="top-bg-img">
          <img src={SITE_CONFIG.headerBg} alt={SITE_CONFIG.name} />
        </div>
        <div className="nav-top-overlay">
          <div className="header-brand-spacer" />
          <div className="header-actions">
            <button type="button" className="header-btn" onClick={onSearchClick}>
              <SearchIcon />
              搜索
            </button>
            <button type="button" className="header-btn" onClick={onLoginClick}>
              登录
            </button>
            <Link to="/member/apply" className="header-btn">
              申请入会
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
