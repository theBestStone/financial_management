import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAROUSEL_FLIP_MS, CAROUSEL_ITEMS } from '../../data/homeData';
import { navigateLink } from '../../utils/legacyRoutes';
import EfmacImage from '../common/EfmacImage';

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, CAROUSEL_FLIP_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const item = CAROUSEL_ITEMS[current];

  return (
    <div
      className="home-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="home-carousel-slides">
        {CAROUSEL_ITEMS.map((slide, i) => (
          <div
            key={slide.id}
            className={`home-carousel-slide ${i === current ? 'active' : ''}`}
            onClick={() => navigateLink(slide.link, navigate)}
          >
            <EfmacImage src={slide.image} alt={slide.title} draggable={false} />
          </div>
        ))}
      </div>
      <div className="home-carousel-caption-bar" aria-hidden="true" />
      <div className="home-carousel-caption">{item.title}</div>
      <div className="banner-dots">
        {CAROUSEL_ITEMS.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={`banner-dot ${i === current ? 'active' : ''}`}
            aria-label={`第 ${i + 1} 张`}
            aria-current={i === current ? 'true' : undefined}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
