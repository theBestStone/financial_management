import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MemberApplyPage from './pages/MemberApplyPage';
import MemberQueryPage from './pages/MemberQueryPage';
import CompanyDirectoryPage from './pages/CompanyDirectoryPage';
import CertificateQueryPage from './pages/CertificateQueryPage';
import ArticleRouteHandler, {
  LegacyCompanyJobPage,
  LegacySubjectPage,
} from './pages/LegacyRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="article/*" element={<ArticleRouteHandler />} />
          <Route path="subject/*" element={<LegacySubjectPage />} />
          <Route path="companyJob/*" element={<LegacyCompanyJobPage />} />
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
