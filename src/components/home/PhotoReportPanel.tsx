import { useState } from 'react';
import {
  PHOTO_LEADERSHIP_SLIDES,
  PHOTO_REPORT_SLIDES,
  PHOTO_REPORT_TABS,
} from '../../data/homeData';
import HomeSectionHeader from './HomeSectionHeader';
import MiniCarousel from './MiniCarousel';

export default function PhotoReportPanel() {
  const [activeTab, setActiveTab] = useState(PHOTO_REPORT_TABS[0].key);
  const slides =
    activeTab === 'leadership' ? PHOTO_LEADERSHIP_SLIDES : PHOTO_REPORT_SLIDES;

  return (
    <div className="home-panel home-panel-fill photo-report-panel">
      <HomeSectionHeader
        tabs={PHOTO_REPORT_TABS}
        activeKey={activeTab}
        onTabChange={setActiveTab}
        mode="merged"
      />
      <MiniCarousel key={activeTab} slides={slides} className="photo-report-carousel" />
    </div>
  );
}
