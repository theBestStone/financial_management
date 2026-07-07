import { useNavigate } from 'react-router-dom';
import type { HomeNewsItem } from '../../data/homeData';
import { articleDetailLink, navigateLink } from '../../utils/legacyRoutes';

interface Props {
  title: string;
  items: HomeNewsItem[];
  moreLink: string;
}

export default function HomeNewsListSimple({ title, items, moreLink }: Props) {
  const navigate = useNavigate();

  return (
    <div className="home-panel">
      <div className="home-panel-header">
        <div className="home-panel-title">{title}</div>
        <span className="home-panel-more" onClick={() => navigateLink(moreLink, navigate)}>
          更多
        </span>
      </div>
      <ul className="home-news-list">
        {items.map((item) => (
          <li key={item.id} className="home-news-item">
            <span className="home-news-bullet" />
            <span
              className="home-news-title"
              onClick={() => navigateLink(item.link ?? articleDetailLink(item.id), navigate)}
            >
              <span className="home-news-title-text">{item.title}</span>
            </span>
            <span className="home-news-date">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
