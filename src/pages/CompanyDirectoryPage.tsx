import { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import Pagination from '../components/common/Pagination';
import { queryCompanies } from '../data/content';
import { paginate } from '../utils/helpers';

export default function CompanyDirectoryPage() {
  const [keyword, setKeyword] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const companies = queryCompanies(searchKey);
  const { data, totalPages } = paginate(companies, page, pageSize);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKey(keyword);
    setPage(1);
  };

  return (
    <div className="wrap">
      <div className="page-header">
        <Breadcrumb currentTitle="会员单位名录" />
        <h1 className="page-title">会员单位名录</h1>
      </div>
      <div className="form-page">
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <input
            style={{ flex: 1, maxWidth: 400 }}
            placeholder="搜索单位名称或地区"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            搜索
          </button>
        </form>

        <table className="result-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>单位名称</th>
              <th>会员类型</th>
              <th>所在地区</th>
              <th>入会日期</th>
            </tr>
          </thead>
          <tbody>
            {data.map((company, index) => (
              <tr key={company.id}>
                <td>{(page - 1) * pageSize + index + 1}</td>
                <td>{company.name}</td>
                <td>{company.type}</td>
                <td>{company.region}</td>
                <td>{company.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
