import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTICE_NEWS, ASSOCIATION_NEWS } from '../../data/homeData';

export default function TabbedNewsPanel() {
  const [activeTab, setActiveTab] = useState<'notice' | 'news'>('notice');
  const navigate = useNavigate();
  const items = activeTab === 'notice' ? NOTICE_NEWS : ASSOCIATION_NEWS;
  const moreLink = activeTab === 'notice' ? '/article/1302' : '/article/1301';

  return (
    <div className="home-panel home-panel-tab">
      <div className="home-panel-header home-panel-header-tabs">
        <div className="home-tab-group">
          <button
            type="button"
            className={`home-tab ${activeTab === 'notice' ? 'active' : ''}`}
            onClick={() => setActiveTab('notice')}
          >
            通知公告
          </button>
          <button
            type="button"
            className={`home-tab ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            协会动态
          </button>
        </div>
        <span className="home-panel-more" onClick={() => navigate(moreLink)}>
          更多
        </span>
      </div>
      <ul className="home-news-list">
        {items.map((item) => (
          <li key={item.id} className="home-news-item">
            <span className="home-news-bullet" />
            <span
              className={`home-news-title ${item.isNew ? 'is-new-item' : ''}`}
              onClick={() => navigate(`/article/detail/${item.id}`)}
            >
              {item.title}
              {item.isNew && <img className="new-tag" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Crect fill='%23e60016' rx='2' width='24' height='12'/%3E%3Ctext x='12' y='9' fill='white' font-size='8' text-anchor='middle' font-family='Arial'%3ENew%3C/text%3E%3C/svg%3E" alt="New" />}
            </span>
            <span className="home-news-date">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
