import { useNavigate } from 'react-router-dom';
import type { HomeNewsItem } from '../../data/homeData';

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
        <span className="home-panel-more" onClick={() => navigate(moreLink)}>更多</span>
      </div>
      <ul className="home-news-list">
        {items.map((item) => (
          <li key={item.id} className="home-news-item">
            <span className="home-news-bullet" />
            <span className="home-news-title" onClick={() => navigate(`/article/detail/${item.id}`)}>
              {item.title}
            </span>
            <span className="home-news-date">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
