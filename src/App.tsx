import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ArticleListPage from './pages/ArticleListPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import MemberApplyPage from './pages/MemberApplyPage';
import MemberQueryPage from './pages/MemberQueryPage';
import CompanyDirectoryPage from './pages/CompanyDirectoryPage';
import CertificateQueryPage from './pages/CertificateQueryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="article/:categorySn" element={<ArticleListPage />} />
          <Route path="article/detail/:id" element={<ArticleDetailPage />} />
          <Route path="member/apply" element={<MemberApplyPage />} />
          <Route path="member/query" element={<MemberQueryPage />} />
          <Route path="member/companies" element={<CompanyDirectoryPage />} />
          <Route path="certificate/query" element={<CertificateQueryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
