import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSOCIATION_NEWS, NOTICE_NEWS, NOTICE_TABS } from '../../data/homeData';
import { articleDetailLink, navigateLink } from '../../utils/legacyRoutes';
import HomeSectionHeader from './HomeSectionHeader';

export default function TabbedNewsPanel() {
  const [activeTab, setActiveTab] = useState(NOTICE_TABS[0].key);
  const navigate = useNavigate();
  const items = activeTab === 'notice' ? NOTICE_NEWS : ASSOCIATION_NEWS;

  return (
    <div className="home-panel home-panel-tab">
      <HomeSectionHeader
        tabs={NOTICE_TABS}
        activeKey={activeTab}
        onTabChange={setActiveTab}
        mode="blocks"
      />
      <ul className="home-news-list">
        {items.map((item) => (
          <li key={item.id} className="home-news-item">
            <span className="home-news-bullet" />
            <span
              className={`home-news-title ${item.isNew ? 'is-new-item' : ''}`}
              onClick={() => navigateLink(item.link ?? articleDetailLink(item.id), navigate)}
            >
              <span className="home-news-title-text">{item.title}</span>
              {item.isNew && (
                <img
                  className="new-tag"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Crect fill='%23e60016' rx='2' width='24' height='12'/%3E%3Ctext x='12' y='9' fill='white' font-size='8' text-anchor='middle' font-family='Arial'%3ENew%3C/text%3E%3C/svg%3E"
                  alt="New"
                />
              )}
            </span>
            <span className="home-news-date">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
