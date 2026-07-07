import { ENTERPRISE_LOGOS } from '../../data/homeData';
import EfmacImage from '../common/EfmacImage';

export default function EnterpriseMembersSection() {
  return (
    <section className="enterprise-members-module" aria-label="企业会员">
      <div className="enterprise-members-head">
        <span className="enterprise-members-title">企业会员</span>
      </div>
      <div className="enterprise-logos-grid">
        {ENTERPRISE_LOGOS.map((logo, index) => (
          <div key={`${logo}-${index}`} className="enterprise-logo-cell">
            <EfmacImage src={logo} alt={`企业会员 ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
