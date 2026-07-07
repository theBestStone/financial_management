import { useNavigate } from 'react-router-dom';
import { PHOTO_REPORT } from '../../data/homeData';

export default function PhotoReportPanel() {
  const navigate = useNavigate();

  return (
    <div className="home-panel home-panel-fill">
      <div className="home-panel-header">
        <div className="home-panel-title">{PHOTO_REPORT.title}</div>
        <span className="home-panel-more" onClick={() => navigate(PHOTO_REPORT.link)}>
          更多
        </span>
      </div>
      <div className="photo-report-image-wrap" onClick={() => navigate(PHOTO_REPORT.link)}>
        <img src={PHOTO_REPORT.image} alt={PHOTO_REPORT.title} />
      </div>
    </div>
  );
}
