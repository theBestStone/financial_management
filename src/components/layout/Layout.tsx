import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import FloatSidebar from './FloatSidebar';
import SearchModal from '../common/SearchModal';
import LoginModal from '../common/LoginModal';
import { SITE_CONFIG } from '../../data/config';

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div
      className="page-wrap"
      style={{ backgroundImage: `url(${SITE_CONFIG.pageBg})` }}
    >
      <div className="site-header-block">
        <Header
          onSearchClick={() => setSearchOpen(true)}
          onLoginClick={() => setLoginOpen(true)}
        />
        <NavBar />
      </div>
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
      <FloatSidebar />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
