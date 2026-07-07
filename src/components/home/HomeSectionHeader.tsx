import { useNavigate } from 'react-router-dom';
import type { SectionTabConfig } from '../../data/homeData';
import { navigateLink } from '../../utils/legacyRoutes';

interface HomeSectionHeaderProps {
  tabs: SectionTabConfig[];
  activeKey: string;
  onTabChange: (key: string) => void;
  /** blocks：独立 Tab；inline：分块 Tab；merged：斜杠合并为一条蓝底标题（官网样式） */
  mode?: 'blocks' | 'inline' | 'merged';
}

export default function HomeSectionHeader({
  tabs,
  activeKey,
  onTabChange,
  mode = 'blocks',
}: HomeSectionHeaderProps) {
  const navigate = useNavigate();
  const activeTab = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  if (mode === 'merged') {
    return (
      <div className="home-section-header home-section-header--merged">
        <div className="home-section-merged-title">
          {tabs.map((tab, index) => (
            <span key={tab.key} className="home-section-merged-part-wrap">
              {index > 0 && (
                <span className="home-section-merged-sep" aria-hidden="true">
                  /
                </span>
              )}
              <button
                type="button"
                className="home-section-merged-part"
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
