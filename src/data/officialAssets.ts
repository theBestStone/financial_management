/**
 * 站点静态资源 — public/assets 目录，部署后为 /assets/... 绝对路径
 */
export const LOCAL_ASSETS = {
  favicon: '/assets/favicon.png',
  logo: '/assets/logo.png',
  headerBg: '/assets/header.svg',
  pageBg: '/assets/page-bg.png',
  floatParty: '/assets/float-sidebar.jpg',
  floatSidebar: '/assets/float-sidebar.jpg',
  banner04: '/assets/banner-04.jpg',
  expand: {
    a: '/assets/carousel-xi.jpg',
    b: '/assets/carousel-2.jpeg',
  },
  qr: {
    mina: '/assets/qr-mina.png',
    service: '/assets/qr-service.jpg',
    subscription: '/assets/qr-sub.jpeg',
    tiktok: '/assets/qr-tiktok.jpeg',
  },
} as const;

/** @deprecated 使用 LOCAL_ASSETS */
export const EFMAC_ASSETS = LOCAL_ASSETS;

export const EFMAC_CAROUSEL_IMAGES = [
  LOCAL_ASSETS.expand.a,
  LOCAL_ASSETS.expand.b,
  LOCAL_ASSETS.banner04,
  LOCAL_ASSETS.floatParty,
  LOCAL_ASSETS.pageBg,
  LOCAL_ASSETS.qr.service,
] as const;

export const EFMAC_SITE_ORIGIN = 'https://www.efmac.net';
