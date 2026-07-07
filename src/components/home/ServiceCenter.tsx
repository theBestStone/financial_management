import { useNavigate } from 'react-router-dom';
import { SERVICE_CENTER } from '../../data/homeData';

export default function ServiceCenter() {
  const navigate = useNavigate();

  return (
    <div className="home-panel">
      <div className="home-panel-header">
        <div className="home-panel-title">服务中心</div>
        <span className="home-panel-more">更多</span>
      </div>
      <div className="service-grid">
        {SERVICE_CENTER.map((item) => (
          <div key={item.id} className="service-item" onClick={() => navigate(item.link)}>
            <span className="service-icon">{item.icon}</span>
            <span className="service-name">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
