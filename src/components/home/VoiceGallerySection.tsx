import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VOICE_GALLERY, VOICE_GALLERY_TABS } from '../../data/homeData';
import { navigateLink } from '../../utils/legacyRoutes';
import EfmacImage from '../common/EfmacImage';
import HomeSectionHeader from './HomeSectionHeader';

export default function VoiceGallerySection() {
  const [activeTab, setActiveTab] = useState(VOICE_GALLERY_TABS[0].key);
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const visibleCount = 5;
  const maxIndex = Math.max(VOICE_GALLERY.length - visibleCount, 0);
  const trackItems = Array.from(
    { length: Math.min(VOICE_GALLERY.length, visibleCount + 1) },
    (_, index) => VOICE_GALLERY[(current + index) % VOICE_GALLERY.length],
  );

  useEffect(() => {
    if (paused || sliding || maxIndex === 0) return undefined;
    const timer = setTimeout(() => {
      setSliding(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [maxIndex, paused, sliding, current]);

  const handleTrackTransitionEnd = () => {
    if (!sliding) return;
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setSliding(false);
  };

  return (
    <div className="home-panel voice-gallery-panel">
      <HomeSectionHeader
        tabs={VOICE_GALLERY_TABS}
        activeKey={activeTab}
        onTabChange={setActiveTab}
        mode="merged"
      />
      <div
        className="voice-gallery-row"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="voice-gallery-viewport">
          <div
            className={`voice-gallery-track ${sliding ? 'is-sliding' : ''}`}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {trackItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
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
      </div>
    </div>
  );
}
