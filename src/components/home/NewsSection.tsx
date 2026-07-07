import { useNavigate } from 'react-router-dom';
import type { Article } from '../../types';

interface NewsSectionProps {
  title: string;
  articles: Article[];
  moreLink: string;
}

export default function NewsSection({ title, articles, moreLink }: NewsSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="module-box">
      <div className="module-title">
        <span>{title}</span>
        <span className="more" onClick={() => navigate(moreLink)}>
          更多 »
        </span>
      </div>
      <div className="module-body">
        <ul className="news-list">
          {articles.slice(0, 8).map((article) => (
            <li key={article.id}>
              <span className="news-dot" />
              <span
                className="news-title"
                onClick={() => navigate(`/article/detail/${article.id}`)}
              >
                {article.title}
              </span>
              <span className="news-date">{article.publishTime}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
