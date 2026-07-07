import { Link } from 'react-router-dom';
import TopNoticeBanner from '../components/home/TopNoticeBanner';
import BannerCarousel from '../components/home/BannerCarousel';
import HomeNewsList from '../components/home/HomeNewsList';
import PhotoReportPanel from '../components/home/PhotoReportPanel';
import TabbedNewsPanel from '../components/home/TabbedNewsPanel';
import ServiceCenter from '../components/home/ServiceCenter';
import { FriendlyLinksSection } from '../components/layout/Footer';
import {
  POLITICS_NEWS,
  STANDARD_NEWS,
  MEMBER_PUBLICITY,
} from '../data/homeData';
import HomeNewsListSimple from '../components/home/HomeNewsListSimple';

export default function HomePage() {
  return (
    <div className="home-page">
      <TopNoticeBanner />

      <div className="home-main wrap">
        <div className="home-row home-row-top">
          <div className="home-col-left">
            <BannerCarousel />
          </div>
          <div className="home-col-right">
            <HomeNewsList
              title="时政·财经要闻"
              items={POLITICS_NEWS}
              moreLink="/article/1301"
            />
          </div>
        </div>

        <div className="home-row home-row-bottom">
          <div className="home-col-left">
            <PhotoReportPanel />
          </div>
          <div className="home-col-right">
            <TabbedNewsPanel />
          </div>
        </div>

        <div className="home-row">
          <div className="home-col-full">
            <ServiceCenter />
          </div>
        </div>

        <div className="home-row home-row-half">
          <div className="home-col-half">
            <HomeNewsListSimple title="团体标准建设" items={STANDARD_NEWS} moreLink="/article/705750" />
          </div>
          <div className="home-col-half">
            <div className="home-panel">
              <div className="home-panel-header">
                <div className="home-panel-title">会员公示</div>
                <Link className="home-panel-more" to="/member/companies">更多</Link>
              </div>
              <div className="member-publicity-grid">
                {MEMBER_PUBLICITY.map((m) => (
                  <div key={m.id} className="member-publicity-item">
                    <div className="member-publicity-name">{m.name}</div>
                    <div className="member-publicity-type">{m.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <FriendlyLinksSection />
      </div>
    </div>
  );
}
