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
}

export default function MagazineCarousel({ covers }: Props) {
  const navigate = useNavigate();

  if (covers.length === 0) return null;

  const loopCovers = [...covers, ...covers];

  return (
    <div className="magazine-carousel">
      <div className="magazine-carousel-viewport">
        <div
          className="magazine-carousel-track"
          style={{
            ['--magazine-loop-count' as string]: loopCovers.length,
            width: `${(loopCovers.length / 2) * 100}%`,
          }}
        >
          {loopCovers.map((cover, index) => (
            <div
              key={`${cover.id}-${index}`}
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
