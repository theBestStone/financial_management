import fs from 'fs';
import { apiGet, htmlToParagraphs } from './lib/efmac-api.mjs';

const carouselIds = '2352421,2351781,2350483,2350541,2344227,2333636';
const photoIds = '2321043,2314461,2303748,2308204,2291995,2286861';

const modulesRes = await apiGet('/pcWeb/infoApp/setting/modules', {});
const modules = modulesRes.data || [];
const adModule = modules.find((m) => m.showType === 9);
const serviceModule = modules.find((m) => m.showType === 11);
const enterpriseModule = modules.find((m) => m.showType === 7);
const memberModule = modules.find((m) => m.showType === 19);

const [carousel, photo, politics, tabs, gallery, standards, activities, periodicals] = await Promise.all([
  apiGet('/pcWeb/infoApp/article/getListByIds', { ids: carouselIds }),
  apiGet('/pcWeb/infoApp/article/getListByIds', { ids: photoIds }),
  apiGet('/pcWeb/infoApp/article/list', { categorySns: '84', pageNum: 1, pageSize: 15 }),
  apiGet('/pcWeb/infoApp/article/list', { categorySns: '1302,1301', pageNum: 1, pageSize: 15 }),
  apiGet('/pcWeb/infoApp/article/list', { categorySns: '80', pageNum: 1, pageSize: 5 }),
  apiGet('/pcWeb/infoApp/article/list', { categorySns: '1353', pageNum: 1, pageSize: 10 }),
  apiGet('/pcWeb/infoApp/article/list', { categorySns: '1354', pageNum: 1, pageSize: 7 }),
  apiGet('/pcWeb/home/periodicals', {}),
]);

const output = {
  fetchedAt: new Date().toISOString(),
  flipSpeed: 3,
  themeWidth: 1300,
  noticeBanner: {
    image: adModule?.settings?.adBanner,
    link: adModule?.settings?.adLink,
  },
  carousel: carousel.data,
  politics: politics.data?.list,
  tabNews: tabs.data?.list,
  photoReport: photo.data,
  gallery: gallery.data?.list,
  standards: standards.data?.list,
  activities: activities.data?.list,
  serviceCenter: serviceModule?.settings?.linkList,
  periodicals: periodicals.data?.list ?? [],
  memberPublicity: htmlToParagraphs(memberModule?.settings?.customerContent || '')
    .filter((name) => name !== '......' && name.length > 1)
    .slice(0, 15),
  enterpriseLogos: (enterpriseModule?.settings?.linkList || []).map((item) => item.logo),
};

fs.writeFileSync('src/data/homeLive.json', JSON.stringify(output, null, 2));
console.log('exported', output.carousel?.length, 'carousel,', output.enterpriseLogos?.length, 'logos');
