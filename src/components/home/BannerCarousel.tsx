import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAROUSEL_ITEMS } from '../../data/homeData';

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const item = CAROUSEL_ITEMS[current];

  return (
    <div className="home-carousel">
      <div className="home-carousel-inner" onClick={() => navigate(item.link ?? '/article/1301')}>
        <img src={item.image} alt={item.title} />
        <div className="home-carousel-caption">{item.title}</div>
      </div>
      <button type="button" className="banner-arrow prev" onClick={() => setCurrent((c) => (c - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length)}>
        ‹
      </button>
      <button type="button" className="banner-arrow next" onClick={() => setCurrent((c) => (c + 1) % CAROUSEL_ITEMS.length)}>
        ›
      </button>
      <div className="banner-dots">
        {CAROUSEL_ITEMS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`banner-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
