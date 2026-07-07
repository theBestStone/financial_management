import { useState } from 'react';
import { EFMAC_ASSETS } from '../../data/officialAssets';
import EfmacImage from '../common/EfmacImage';

/**
 * 官网右侧浮动栏使用单张合成图（206×1106，含党建活动 + 4 个二维码）
 * 不可再叠加独立 QR，否则会重复显示
 */
export default function FloatSidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="float-sidebar">
      <div className={`float-sidebar-wrap ${expanded ? 'expanded' : ''}`}>
        <button
          type="button"
          className={`float-sidebar-toggle ${expanded ? 'is-expanded' : 'is-collapsed'}`}
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? '收起二维码' : '展开二维码'}
          aria-expanded={expanded}
        >
          <span className="float-sidebar-toggle-icon" aria-hidden="true">
            {expanded ? '‹' : '›'}
          </span>
        </button>
        <div className="float-sidebar-inner">
          <EfmacImage
            className="float-sidebar-composite"
            src={EFMAC_ASSETS.floatSidebar}
            alt="党建活动与协会二维码"
          />
        </div>
      </div>
    </div>
  );
}
