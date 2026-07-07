import { useNavigate } from 'react-router-dom';
import type { HomeNewsItem } from '../../data/homeData';

interface HomeNewsListProps {
  title: string;
  items: HomeNewsItem[];
  moreLink: string;
  variant?: 'tab' | 'default';
}

export default function HomeNewsList({ title, items, moreLink, variant = 'default' }: HomeNewsListProps) {
  const navigate = useNavigate();

  return (
    <div className={`home-panel ${variant === 'tab' ? 'home-panel-tab' : ''}`}>
      <div className="home-panel-header">
        <div className="home-panel-title">{title}</div>
        <span className="home-panel-more" onClick={() => navigate(moreLink)}>
          更多
        </span>
      </div>
      <ul className="home-news-list">
        {items.map((item) => (
          <li key={item.id} className="home-news-item">
            <span className="home-news-bullet" />
            <span
              className={`home-news-title ${item.isNew ? 'is-new-item' : ''}`}
              onClick={() => navigate(`/article/detail/${item.id}`)}
            >
              {item.title}
              {item.isNew && <img className="new-tag" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Crect fill='%23e60016' rx='2' width='24' height='12'/%3E%3Ctext x='12' y='9' fill='white' font-size='8' text-anchor='middle' font-family='Arial'%3ENew%3C/text%3E%3C/svg%3E" alt="New" />}
            </span>
            <span className="home-news-date">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
