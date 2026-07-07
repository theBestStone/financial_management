import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigateLink } from '../../utils/legacyRoutes';
import EfmacImage from '../common/EfmacImage';

export interface MagazineCoverItem {
  id: number | string;
  title: string;
  image: string;
  link: string;
}

interface Props {
  covers: MagazineCoverItem[];
  intervalMs?: number;
}

const VISIBLE_COUNT = 2;

export default function MagazineCarousel({ covers, intervalMs = 4000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const maxIndex = Math.max(0, covers.length - VISIBLE_COUNT);

  useEffect(() => {
    if (paused || maxIndex === 0) return undefined;
    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, intervalMs);
    return () => clearInterval(timer);
  }, [paused, maxIndex, intervalMs]);

  const slideStep = covers.length > 0 ? 100 / covers.length : 0;

  if (covers.length === 0) return null;

  return (
    <div
      className="magazine-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="magazine-carousel-viewport">
        <div
          className="magazine-carousel-track"
          style={{
            ['--magazine-count' as string]: covers.length,
            width: `${(covers.length / VISIBLE_COUNT) * 100}%`,
            transform: `translateX(-${index * slideStep}%)`,
          }}
        >
          {covers.map((cover) => (
            <div
              key={cover.id}
              className="magazine-carousel-item"
              onClick={() => navigateLink(cover.link, navigate)}
            >
              <div className="magazine-carousel-thumb">
                <EfmacImage src={cover.image} alt={cover.title} />
              </div>
              <p className="magazine-carousel-caption">{cover.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
