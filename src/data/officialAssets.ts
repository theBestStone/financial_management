/**
 * 官网 https://www.efmac.net/ 使用的 pcweb.shanghuiyidisk.com 静态资源
 * 来源：官网 HTML / NUXT payload 及协会易站点 623 配置
 */
const CDN = 'https://pcweb.shanghuiyidisk.com';

export const EFMAC_ASSETS = {
  favicon: `${CDN}/shy/superChamber/37aad5a2af7fc1298942d7bb95f4fa5f_logo.png`,
  logo: `${CDN}/shy/superChamber/37aad5a2af7fc1298942d7bb95f4fa5f_logo.png`,
  headerBg: `${CDN}/shy/623/pc/8b1d5974af6c4b50838710aa4dee9f74_home.svg`,
  pageBg: `${CDN}/shy/623/pc/293acc8a4ca34d86a6cd27f7fdb17165_home.png`,
  floatParty: `${CDN}/shy/623/pc/87fdb9006508456f95d724f2befde5ef_home.jpg`,
  /** 官网浮动栏/党建活动合成图 */
  floatSidebar: `${CDN}/shy/623/pc/87fdb9006508456f95d724f2befde5ef_home.jpg`,
  banner04: `${CDN}/shy/0/pcweb/banner/banner_04.jpg`,
  expand: {
    /** 协会风采图 20250414 */
    a: `${CDN}/shy/623/new/expand/20250414/343ee2ae09a541b18417e3081ba0d4ad/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg`,
    /** 协会风采图 20250429 */
    b: `${CDN}/shy/623/new/expand/20250429/7fd15466e6cb4b5d81a439a5ac5aef4f/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg`,
  },
  qr: {
    mina: `${CDN}/shy/623/pc/33a834b90b1f41af87d7f0362fe3f00d_home.png`,
    service: `${CDN}/shy/623/pc/cad191bcf52d4f9eaebdd7c1006d25a0_home.jpg`,
    subscription: `${CDN}/shy/623/pc/c9e5bc13ae634d10b39dfd7963cc7c3f_home_snapshot.jpeg`,
    tiktok: `${CDN}/shy/623/pc/8405fd6373c84ba0afe1626c1ebab8da_home_snapshot.jpeg`,
  },
} as const;

/** 首页轮播图（官网 CDN） */
export const EFMAC_CAROUSEL_IMAGES = [
  EFMAC_ASSETS.expand.a,
  EFMAC_ASSETS.expand.b,
  EFMAC_ASSETS.banner04,
  EFMAC_ASSETS.floatParty,
  EFMAC_ASSETS.pageBg,
  EFMAC_ASSETS.qr.service,
] as const;

export const EFMAC_SITE_ORIGIN = 'https://www.efmac.net';
