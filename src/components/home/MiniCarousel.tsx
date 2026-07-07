import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CarouselSlide } from '../../data/homeData';
import { CAROUSEL_FLIP_MS } from '../../data/homeData';
import { navigateLink } from '../../utils/legacyRoutes';
import EfmacImage from '../common/EfmacImage';

interface Props {
  slides: CarouselSlide[];
  className?: string;
  intervalMs?: number;
}

export default function MiniCarousel({ slides, className = '', intervalMs = CAROUSEL_FLIP_MS }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const item = slides[current];

  useEffect(() => {
    if (paused || slides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [paused, slides.length, intervalMs]);

  return (
    <div
      className={`mini-carousel ${className}`.trim()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mini-carousel-slides">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`mini-carousel-slide ${i === current ? 'active' : ''}`}
            onClick={() => navigateLink(slide.link, navigate)}
          >
            <EfmacImage src={slide.image} alt={slide.title} draggable={false} />
          </div>
        ))}
      </div>
      <div className="mini-carousel-caption">{item.title}</div>
      {slides.length > 1 && (
        <div className="banner-dots mini-carousel-dots">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`banner-dot ${i === current ? 'active' : ''}`}
              aria-label={`第 ${i + 1} 张`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
