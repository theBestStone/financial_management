import { useNavigate } from 'react-router-dom';
import {
  MAGAZINE_COVERS,
  MEMBER_ACTIVITIES,
  MEMBER_PUBLICITY_NAMES,
  STANDARD_NEWS,
} from '../../data/homeData';
import { articleDetailLink, articleListLink, memberCompaniesLink, navigateLink } from '../../utils/legacyRoutes';
import EfmacImage from '../common/EfmacImage';

export default function HomeFourColumns() {
  const navigate = useNavigate();

  return (
    <div className="home-row home-row-quad">
      <div className="home-quad-col">
        <div className="home-column-panel">
          <div className="home-column-header">
            <span className="home-column-title">团体标准建设</span>
            <span
              className="home-column-more"
              onClick={() => navigateLink(articleListLink(70, 705750), navigate)}
            >
              更多
            </span>
          </div>
          <ul className="home-column-list">
            {STANDARD_NEWS.map((item) => (
              <li key={item.id} className="home-column-item">
                <span className="home-news-bullet orange" />
                <span
                  className="home-column-text"
                  onClick={() => navigateLink(item.link ?? articleDetailLink(item.id), navigate)}
                >
                  {item.title}
                </span>
                <span className="home-news-date">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-quad-col">
        <div className="home-column-panel">
          <div className="home-column-header">
            <span className="home-column-title">《财务管理研究》</span>
            <span className="home-column-more">更多</span>
          </div>
          <div className="magazine-covers">
            {MAGAZINE_COVERS.map((cover) => (
              <div
                key={cover.id}
                className="magazine-cover-item"
                onClick={() => navigateLink(cover.link, navigate)}
              >
                <EfmacImage src={cover.image} alt={cover.title} />
                <p>{cover.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="home-quad-col">
        <div className="home-column-panel">
          <div className="home-column-header">
            <span className="home-column-title">会员活动</span>
            <span
              className="home-column-more"
              onClick={() => navigateLink(articleListLink(13, 1301), navigate)}
            >
              更多
            </span>
          </div>
          <ul className="home-column-list">
            {MEMBER_ACTIVITIES.map((item) => (
              <li key={item.id} className="home-column-item">
                <span className="home-news-bullet orange" />
                <span
                  className="home-column-text"
                  onClick={() => navigateLink(item.link ?? articleDetailLink(item.id), navigate)}
                >
                  {item.title}
                </span>
                <span className="home-news-date">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-quad-col">
        <div className="home-panel home-panel-fill member-publicity-panel">
          <div className="home-panel-header">
            <div className="home-panel-title">会员公示</div>
            <span
              className="home-panel-more"
              onClick={() => navigateLink(memberCompaniesLink(), navigate)}
            >
              更多
            </span>
          </div>
          <ul className="member-publicity-list">
            {MEMBER_PUBLICITY_NAMES.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
