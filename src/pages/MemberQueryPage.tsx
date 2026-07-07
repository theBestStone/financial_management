import { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { queryMember } from '../data/content';
import type { MemberRecord } from '../types';

export default function MemberQueryPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<MemberRecord[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setResults(queryMember(keyword.trim()));
  };

  return (
    <div className="wrap">
      <div className="page-header">
        <Breadcrumb currentTitle="会员查询" />
        <h1 className="page-title">会员查询</h1>
      </div>
      <div className="form-page">
        <p style={{ marginBottom: 20, color: '#666' }}>
          请输入会员姓名或会员编号进行查询。
        </p>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, maxWidth: 600 }}>
          <input
            style={{ flex: 1 }}
            placeholder="会员姓名 / 会员编号"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            查询
          </button>
        </form>

        {searched && (
          results && results.length > 0 ? (
            <table className="result-table">
              <thead>
                <tr>
                  <th>会员编号</th>
                  <th>名称</th>
                  <th>会员类型</th>
                  <th>状态</th>
                  <th>有效期至</th>
                </tr>
              </thead>
              <tbody>
                {results.map((m) => (
                  <tr key={m.id}>
                    <td>{m.memberNo}</td>
                    <td>{m.name}</td>
                    <td>{m.type}</td>
                    <td>{m.status}</td>
                    <td>{m.expireDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-info">未查询到相关会员信息，请核对输入内容。</div>
          )
        )}
      </div>
    </div>
  );
}
