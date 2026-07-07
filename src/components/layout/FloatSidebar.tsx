import { useState } from 'react';
import { SITE_CONFIG } from '../../data/config';

export default function FloatSidebar() {
  const [expanded, setExpanded] = useState(true);

  const qrList = [
    SITE_CONFIG.qrCodes.mina,
    SITE_CONFIG.qrCodes.service,
    SITE_CONFIG.qrCodes.subscription,
    { title: '抖音号', image: SITE_CONFIG.qrCodes.tiktok.image },
  ];

  return (
    <div className="float-sidebar">
      <div className={`float-sidebar-wrap ${expanded ? 'expanded' : ''}`}>
        <button
          type="button"
          className="float-sidebar-toggle"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? '收起二维码' : '展开二维码'}
        >
          {expanded ? '‹' : '›'}
        </button>
        <div className="float-sidebar-inner">
          <div className="party-banner">
            <span className="party-icon">☭</span>
            党建活动
          </div>
          {qrList.map((qr) => (
            <div className="float-qr-item" key={qr.title}>
              <img src={qr.image} alt={qr.title} />
              <p>{qr.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
