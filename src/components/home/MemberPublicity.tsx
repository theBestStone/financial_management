import { Link } from 'react-router-dom';
import { MEMBER_COMPANIES } from '../../data/content';

export default function MemberPublicity() {
  return (
    <div className="module-box">
      <div className="module-title">
        <span>会员公示</span>
        <Link to="/member/companies" className="more" style={{ textDecoration: 'none' }}>
          更多 »
        </Link>
      </div>
      <div className="module-body">
        <div className="member-scroll">
          {MEMBER_COMPANIES.map((company) => (
            <div key={company.id} className="member-card">
              <div className="member-card-name">{company.name}</div>
              <div className="member-card-type">{company.type} · {company.region}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
