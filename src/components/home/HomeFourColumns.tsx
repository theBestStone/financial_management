import { useNavigate } from 'react-router-dom';
import {
  MAGAZINE_COVERS,
  MAGAZINE_MORE_LINK,
  MEMBER_ACTIVITIES,
  MEMBER_ACTIVITIES_MORE_LINK,
  MEMBER_PUBLICITY_NAMES,
  STANDARD_MORE_LINK,
  STANDARD_NEWS,
} from '../../data/homeData';
import { articleDetailLink, memberCompaniesLink, navigateLink } from '../../utils/legacyRoutes';
import MagazineCarousel from './MagazineCarousel';

function ColumnHeader({ title, onMore }: { title: string; onMore?: () => void }) {
  return (
    <div className="home-column-header">
      <span className="home-column-title">{title}</span>
      {onMore ? (
        <span className="home-column-more" onClick={onMore}>
          更多
        </span>
      ) : null}
    </div>
  );
}

export default function HomeFourColumns() {
  const navigate = useNavigate();
  const memberMoreLink = memberCompaniesLink();

  const openMore = (link: string) => () => navigateLink(link, navigate);

  return (
    <div className="home-row home-row-quad">
      <div className="home-quad-col">
        <div className="home-column-panel">
          <ColumnHeader title="团体标准建设" onMore={openMore(STANDARD_MORE_LINK)} />
          <ul className="home-column-list home-column-list--standards">
            {STANDARD_NEWS.map((item) => (
              <li
                key={item.id}
                className="home-column-item"
                onClick={() => navigateLink(item.link ?? articleDetailLink(item.id), navigate)}
              >
                <span className="home-news-bullet" />
                <span className="home-column-text">{item.title}</span>
                <span className="home-news-date">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-quad-col">
        <div className="home-column-panel home-column-panel--magazine">
          <ColumnHeader title="《财务管理研究》" onMore={openMore(MAGAZINE_MORE_LINK)} />
          <div className="magazine-carousel-body">
            <MagazineCarousel covers={MAGAZINE_COVERS} />
          </div>
        </div>
      </div>

      <div className="home-quad-col">
        <div className="home-column-panel">
          <ColumnHeader title="会员活动" onMore={openMore(MEMBER_ACTIVITIES_MORE_LINK)} />
          <ul className="home-column-list home-column-list--activities">
            {MEMBER_ACTIVITIES.map((item) => (
              <li
                key={item.id}
                className="home-column-item"
                onClick={() => navigateLink(item.link ?? articleDetailLink(item.id), navigate)}
              >
                <span className="home-news-bullet" />
                <span className="home-column-text">{item.title}</span>
                <span className="home-news-date">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-quad-col">
        <div className="home-column-panel">
          <ColumnHeader title="会员公示" onMore={openMore(memberMoreLink)} />
          <ul className="home-column-list home-column-list--plain">
            {MEMBER_PUBLICITY_NAMES.map((name, index) => (
              <li
                key={`${name}-${index}`}
                className="home-column-item home-column-item--plain"
                onClick={openMore(memberMoreLink)}
              >
                <span className="home-column-text">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
