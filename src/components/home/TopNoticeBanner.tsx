import { useNavigate } from 'react-router-dom';
import { TOP_NOTICE } from '../../data/homeData';

export default function TopNoticeBanner() {
  const navigate = useNavigate();

  return (
    <div className="top-notice-banner" onClick={() => navigate(TOP_NOTICE.link)}>
      <div className="top-notice-watermark" aria-hidden="true" />
      <div className="top-notice-inner">
        <span className="top-notice-text">{TOP_NOTICE.title}</span>
      </div>
    </div>
  );
}
