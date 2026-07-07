import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VOICE_GALLERY, VOICE_GALLERY_TABS } from '../../data/homeData';
import { navigateLink } from '../../utils/legacyRoutes';
import EfmacImage from '../common/EfmacImage';
import HomeSectionHeader from './HomeSectionHeader';

export default function VoiceGallerySection() {
  const [activeTab, setActiveTab] = useState(VOICE_GALLERY_TABS[0].key);
  const navigate = useNavigate();

  return (
    <div className="home-panel voice-gallery-panel">
      <HomeSectionHeader
        tabs={VOICE_GALLERY_TABS}
        activeKey={activeTab}
        onTabChange={setActiveTab}
        mode="inline"
      />
      <div className="voice-gallery-row">
        {VOICE_GALLERY.map((item) => (
          <div
            key={item.id}
            className="voice-gallery-item"
            onClick={() => navigateLink(item.link, navigate)}
          >
            <div className="voice-gallery-thumb">
              <EfmacImage src={item.image} alt={item.title} />
            </div>
            <p className="voice-gallery-caption">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
