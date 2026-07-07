import { useNavigate } from 'react-router-dom';
import { TOP_NOTICE } from '../../data/homeData';
import { navigateLink } from '../../utils/legacyRoutes';
import EfmacImage from '../common/EfmacImage';

/** 官网通知横幅原图比例 1920×200 */
const NOTICE_BANNER_RATIO = '1920 / 200';

export default function TopNoticeBanner() {
  const navigate = useNavigate();

  if (!TOP_NOTICE.image) return null;

  return (
    <div className="top-notice-banner">
      <button
        type="button"
        className="top-notice-link"
        style={{ aspectRatio: NOTICE_BANNER_RATIO }}
        onClick={() => navigateLink(TOP_NOTICE.link, navigate)}
        aria-label="关于开展新时代中国式大财务管理教育创新基金课题研究通知"
      >
        <EfmacImage
          className="top-notice-img"
          src={TOP_NOTICE.image}
          alt="关于开展新时代中国式大财务管理教育创新基金课题研究通知"
        />
      </button>
    </div>
  );
}
