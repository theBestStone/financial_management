import TopNoticeBanner from '../components/home/TopNoticeBanner';
import BannerCarousel from '../components/home/BannerCarousel';
import HomeNewsList from '../components/home/HomeNewsList';
import PhotoReportPanel from '../components/home/PhotoReportPanel';
import TabbedNewsPanel from '../components/home/TabbedNewsPanel';
import VoiceGallerySection from '../components/home/VoiceGallerySection';
import ServiceCenter from '../components/home/ServiceCenter';
import HomeFourColumns from '../components/home/HomeFourColumns';
import EnterpriseMembersSection from '../components/home/EnterpriseMembersSection';
import { FriendlyLinksSection } from '../components/layout/Footer';
import { POLITICS_NEWS, POLITICS_MORE_LINK } from '../data/homeData';
import './home/index.scss';
export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-main">
        <TopNoticeBanner />

        <div className="home-row home-row-top">
          <div className="home-col-left">
            <BannerCarousel />
          </div>
          <div className="home-col-right">
            <HomeNewsList
              title="时政·财经要闻"
              items={POLITICS_NEWS}
              moreLink={POLITICS_MORE_LINK}
              variant="politics"
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
            <VoiceGallerySection />
          </div>
        </div>

        <div className="home-row">
          <div className="home-col-full">
            <ServiceCenter />
          </div>
        </div>

        <HomeFourColumns />

        <div className="home-row">
          <div className="home-col-full">
            <EnterpriseMembersSection />
          </div>
        </div>

        <FriendlyLinksSection />
      </div>
    </div>
  );
}
