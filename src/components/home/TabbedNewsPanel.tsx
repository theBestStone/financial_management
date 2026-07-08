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
    <div className="home-panel home-panel-tab tabbed-news-panel">
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
              {item.isNew && <em className="new-tag-italic">New</em>}
            </span>
            <span className="home-news-date">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
