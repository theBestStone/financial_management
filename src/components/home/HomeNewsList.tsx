import { useNavigate } from 'react-router-dom';
import type { HomeNewsItem } from '../../data/homeData';
import { articleDetailLink, navigateLink } from '../../utils/legacyRoutes';

interface HomeNewsListProps {
  title: string;
  items: HomeNewsItem[];
  moreLink: string;
  variant?: 'tab' | 'default' | 'politics';
}

function NewsItem({
  item,
  bulletClass,
  titleClass,
}: {
  item: HomeNewsItem;
  bulletClass: string;
  titleClass: string;
}) {
  const navigate = useNavigate();

  return (
    <li className="home-news-item">
      <span className={bulletClass} />
      <span
        className={titleClass}
        onClick={() => navigateLink(item.link ?? articleDetailLink(item.id), navigate)}
      >
        <span className="home-news-title-text">{item.title}</span>
        {item.isNew && <em className="new-tag-italic">New</em>}
      </span>
      <span className="home-news-date">{item.date}</span>
    </li>
  );
}

export default function HomeNewsList({ title, items, moreLink, variant = 'default' }: HomeNewsListProps) {
  const navigate = useNavigate();

  if (variant === 'politics') {
    return (
      <div className="home-panel home-panel-politics">
        <div className="home-politics-header">
          <div className="home-politics-title">{title}</div>
          <span className="home-politics-more" onClick={() => navigateLink(moreLink, navigate)}>
            更多
          </span>
        </div>
        <ul className="home-news-list home-news-list-politics">
          {items.map((item) => (
            <NewsItem
              key={item.id}
              item={item}
              bulletClass="home-news-bullet home-news-bullet-square"
              titleClass="home-news-title"
            />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={`home-panel ${variant === 'tab' ? 'home-panel-tab' : ''}`}>
      <div className="home-panel-header">
        <div className="home-panel-title">{title}</div>
        <span className="home-panel-more" onClick={() => navigateLink(moreLink, navigate)}>
          更多
        </span>
      </div>
      <ul className="home-news-list">
        {items.map((item) => (
          <NewsItem
            key={item.id}
            item={item}
            bulletClass="home-news-bullet"
            titleClass={`home-news-title ${item.isNew ? 'is-new-item' : ''}`}
          />
        ))}
      </ul>
    </div>
  );
}
