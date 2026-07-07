import { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { queryCertificate } from '../data/content';
import type { CertificateRecord } from '../types';

export default function CertificateQueryPage() {
  const [certNo, setCertNo] = useState('');
  const [name, setName] = useState('');
  const [results, setResults] = useState<CertificateRecord[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNo.trim() || !name.trim()) return;
    setSearched(true);
    setResults(queryCertificate(certNo.trim(), name.trim()));
  };

  return (
    <div className="wrap">
      <div className="page-header">
        <Breadcrumb currentTitle="证书查询" />
        <h1 className="page-title">证书查询</h1>
      </div>
      <div className="form-page">
        <p style={{ marginBottom: 20, color: '#666' }}>
          请输入证书编号和持证人姓名进行查询验证。示例：证书编号 FM2024001001，姓名 张伟。
        </p>
        <form onSubmit={handleSearch}>
          <div className="form-row">
            <div className="form-group">
              <label>
                证书编号 <span className="required">*</span>
              </label>
              <input
                value={certNo}
                onChange={(e) => setCertNo(e.target.value)}
                placeholder="如：FM2024001001"
                required
              />
            </div>
            <div className="form-group">
              <label>
                持证人姓名 <span className="required">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入姓名"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            查询验证
          </button>
        </form>

        {searched && (
          results && results.length > 0 ? (
            <>
              <div className="alert alert-success">查询成功，找到 {results.length} 条证书记录。</div>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>证书编号</th>
                    <th>姓名</th>
                    <th>评价项目</th>
                    <th>级别</th>
                    <th>发证日期</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((c) => (
                    <tr key={c.certNo}>
                      <td>{c.certNo}</td>
                      <td>{c.name}</td>
                      <td>{c.project}</td>
                      <td>{c.level}</td>
                      <td>{c.issueDate}</td>
                      <td>{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="alert alert-error">
              未查询到匹配的证书信息，请核对证书编号和姓名是否正确。
            </div>
          )
        )}
      </div>
    </div>
  );
}
