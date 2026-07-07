import { EFMAC_ASSETS } from './officialAssets';

export const SITE_CONFIG = {
  name: '中国企业财务管理协会',
  shortName: '中财协',
  logo: EFMAC_ASSETS.logo,
  headerBg: EFMAC_ASSETS.headerBg,
  pageBg: EFMAC_ASSETS.pageBg,
  themeColor: '#005AAA',
  themeHover: '#b72e2e',
  themeDark: '#004488',
  accentColor: '#e60016',
  footerBg: '#012D5A',
  tel: '010-88585021',
  email: 'zcx@efmac.net',
  address: '北京市海淀区西三环北路87号国际财经中心D座10层1001室',
  icp: '京ICP备16015800号-2',
  floatImage: EFMAC_ASSETS.floatParty,
  qrCodes: {
    mina: { title: '小程序', image: EFMAC_ASSETS.qr.mina },
    service: { title: '服务号', image: EFMAC_ASSETS.qr.service },
    subscription: { title: '订阅号', image: EFMAC_ASSETS.qr.subscription },
    tiktok: { title: '抖音号', image: EFMAC_ASSETS.qr.tiktok },
  },
};

export const FRIENDLY_LINKS = [
  { name: '中华人民共和国中央人民政府', url: 'https://www.gov.cn/' },
  { name: '中共中央社会工作部', url: 'https://www.ccps.gov.cn/' },
  { name: '中华人民共和国民政部', url: 'https://www.mca.gov.cn/' },
  { name: '中华人民共和国财政部', url: 'https://www.mof.gov.cn/' },
  { name: '中华人民共和国工业和信息化部', url: 'https://www.miit.gov.cn/' },
  { name: '中华人民共和国国家发展和改革委员会', url: 'https://www.ndrc.gov.cn/' },
  { name: '中华人民共和国审计署', url: 'https://www.audit.gov.cn/' },
  { name: '中华人民共和国人力资源和社会保障部', url: 'https://www.mohrss.gov.cn/' },
  { name: '中国证监会', url: 'https://www.csrc.gov.cn/' },
  { name: '国家税务总局', url: 'https://www.chinatax.gov.cn/' },
];
