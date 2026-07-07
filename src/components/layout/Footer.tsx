import { Link } from 'react-router-dom';
import { NAV_LIST } from '../../data/navigation';
import { SITE_CONFIG, FRIENDLY_LINKS } from '../../data/config';
import { getNavLink, isExternalLink } from '../../utils/helpers';
import EfmacImage from '../common/EfmacImage';

export default function Footer() {
  return (
    <footer className="footer" style={{ background: SITE_CONFIG.footerBg }}>
      <div className="wrap" style={{ paddingTop: 15 }}>
        <div className="footer-nav">
          {NAV_LIST.map((item, index) => (
            <div key={item.categoryName} style={{ display: 'flex', alignItems: 'center' }}>
              {item.linkUrl && isExternalLink(getNavLink(item)) ? (
                <a
                  className="footer-nav-item"
                  href={getNavLink(item)}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  {item.categoryName}
                </a>
              ) : (
                <Link
                  className="footer-nav-item"
                  to={getNavLink(item)}
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  {item.categoryName}
                </Link>
              )}
              {index < NAV_LIST.length - 1 && (
                <span style={{ height: 20, lineHeight: '19px', color: '#fff' }}>|</span>
              )}
            </div>
          ))}
        </div>
        <div className="footer-divider" />
        <div className="footer-box">
          <div className="footer-inner">
            <div className="footer-code-box">
              {Object.values(SITE_CONFIG.qrCodes).map((qr) => (
                <div className="footer-code-item" key={qr.title}>
                  <p className="footer-code-tit">{qr.title}</p>
                  <EfmacImage src={qr.image} alt={qr.title} />
                </div>
              ))}
            </div>
            <div>
              <div>Tel：{SITE_CONFIG.tel}</div>
              <div>Email：{SITE_CONFIG.email}</div>
              <div>地址：{SITE_CONFIG.address}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          {SITE_CONFIG.name} 版权所有 ©{' '}
          <a href="https://www.xiehuiyi.com" target="_blank" rel="noreferrer">
            协会易
          </a>{' '}
          技术支持{' '}
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
            {SITE_CONFIG.icp}
          </a>
        </p>
      </div>
    </footer>
  );
}

export function FriendlyLinksSection() {
  return (
    <section className="friendly-links-module" aria-label="友情链接">
      <div className="friendly-links-head">友情链接</div>
      <div className="friendly-links-body">
        {FRIENDLY_LINKS.map((link, index) => (
          <span key={link.name} className="friendly-links-entry">
            {index > 0 && <span className="friendly-links-sep" aria-hidden="true">|</span>}
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.name}
            </a>
          </span>
        ))}
      </div>
    </section>
  );
}
