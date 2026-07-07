import { useNavigate } from 'react-router-dom';
import type { SectionTabConfig } from '../../data/homeData';
import { navigateLink } from '../../utils/legacyRoutes';

interface HomeSectionHeaderProps {
  tabs: SectionTabConfig[];
  activeKey: string;
  onTabChange: (key: string) => void;
  /** blocks：独立 Tab 按钮；inline：斜杠分隔的一行标题 Tab */
  mode?: 'blocks' | 'inline';
}

export default function HomeSectionHeader({
  tabs,
  activeKey,
  onTabChange,
  mode = 'blocks',
}: HomeSectionHeaderProps) {
  const navigate = useNavigate();
  const activeTab = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  return (
    <div className={`home-section-header home-section-header--${mode}`}>
      <div className={`home-section-tabs home-section-tabs--${mode}`}>
        {tabs.map((tab, index) => (
          <span key={tab.key} className="home-section-tab-wrap">
            {mode === 'inline' && index > 0 && (
              <span className="home-section-tab-separator" aria-hidden="true">
                /
              </span>
            )}
            <button
              type="button"
              className={`home-section-tab ${activeKey === tab.key ? 'active' : ''}`}
              onClick={() => onTabChange(tab.key)}
            >
              {tab.label}
            </button>
          </span>
        ))}
      </div>
      <span
        className="home-section-more"
        onClick={() => navigateLink(activeTab.moreLink, navigate)}
      >
        更多
      </span>
    </div>
  );
}
