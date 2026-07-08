import live from './homeLive.json';
import articlesLive from './articlesLive.json';
import { resolveLocalAsset } from '../utils/localAsset';
import {
  articleDetailLink,
  articleListLink,
  memberApplyLink,
  normalizeInternalLink,
  SH_ID,
} from '../utils/legacyRoutes';

export interface HomeNewsItem {
  id: number;
  title: string;
  date: string;
  isNew?: boolean;
  link?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  link: string;
}

export interface SectionTabConfig {
  key: string;
  label: string;
  moreLink: string;
}

export interface CarouselSlide {
  id: number;
  title: string;
  image: string;
  link: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  link: string;
  logo?: string;
}

interface LiveArticle {
  id: string;
  categorySn?: number;
  categoryName?: string;
  title: string;
  foreword?: string;
  thumbImg?: string;
  publishTime: string;
  isNew?: boolean;
}

interface LiveService {
  logo?: string;
  text: string;
  url: string;
}

interface LivePeriodical {
  id: string;
  title: string;
  thumbImg: string;
}

interface CategoryArticle {
  id: number;
  title: string;
  publishTime: string;
  isNew?: boolean;
}

export function normalizeCdnUrl(url?: string): string {
  if (!url) return '';
  return resolveLocalAsset(url) ?? url.split('?')[0];
}

function formatDate(publishTime: string): string {
  return publishTime?.slice(0, 10) ?? '';
}

function resolveArticleLink(link?: string, articleId?: string): string {
  if (!link) return articleId ? articleDetailLink(Number(articleId)) : '/';
  if (link.startsWith('http://') || link.startsWith('https://')) return link;
  const detailMatch = link.match(/_0_(\d+)(?:\.html)?(?:\?|$)/);
  if (detailMatch) return articleDetailLink(Number(detailMatch[1]));
  return normalizeInternalLink(link);
}

function mapArticle(item: LiveArticle): HomeNewsItem {
  const id = Number(item.id);
  return {
    id,
    title: item.title,
    date: formatDate(item.publishTime),
    isNew: item.isNew,
    link: articleDetailLink(id),
  };
}

function mapCategoryArticle(item: CategoryArticle, isNew = false): HomeNewsItem {
  return {
    id: item.id,
    title: item.title,
    date: formatDate(item.publishTime),
    isNew: isNew || item.isNew,
    link: articleDetailLink(item.id),
  };
}

function mapCarousel(item: LiveArticle): CarouselSlide {
  const id = Number(item.id);
  return {
    id,
    title: item.title,
    image: normalizeCdnUrl(item.thumbImg),
    link: articleDetailLink(id),
  };
}

function mapGallery(item: LiveArticle): GalleryItem {
  const id = Number(item.id);
  return {
    id,
    title: item.title,
    image: normalizeCdnUrl(item.thumbImg),
    link: articleDetailLink(id),
  };
}

const data = live as {
  flipSpeed: number;
  themeWidth: number;
  noticeBanner: { image?: string; link?: string };
  carousel: LiveArticle[];
  politics: LiveArticle[];
  tabNews: LiveArticle[];
  photoReport: LiveArticle[];
  gallery: LiveArticle[];
  standards: LiveArticle[];
  activities: LiveArticle[];
  serviceCenter: LiveService[];
  periodicals: LivePeriodical[];
  memberPublicity: string[];
  enterpriseLogos: string[];
};

const articleLists = articlesLive as {
  listByCategory: Record<string, { items: CategoryArticle[] }>;
};

export const HOME_THEME_WIDTH = data.themeWidth || 1300;
export const CAROUSEL_FLIP_MS = (data.flipSpeed || 3) * 1000;

export const TOP_NOTICE = {
  image: normalizeCdnUrl(data.noticeBanner?.image),
  link: resolveArticleLink(data.noticeBanner?.link),
};

export const POLITICS_NEWS: HomeNewsItem[] = (data.politics ?? []).map(mapArticle);

const NOTICE_CATEGORY_NEWS = articleLists.listByCategory['1302']?.items ?? [];
const ASSOCIATION_CATEGORY_NEWS = articleLists.listByCategory['1301']?.items ?? [];

export const NOTICE_NEWS: HomeNewsItem[] = [
  {
    id: 900905,
    title: '【9月5日考试】关于2026年度IAAP联合认证全国统一考试通知',
    date: '2026-07-08',
    isNew: true,
    link: articleDetailLink(2314937),
  },
  ...NOTICE_CATEGORY_NEWS.slice(0, 9).map((item, index) => mapCategoryArticle(item, index === 0)),
];

export const ASSOCIATION_NEWS: HomeNewsItem[] = ASSOCIATION_CATEGORY_NEWS
  .slice(0, 10)
  .map((item) => mapCategoryArticle(item));

export const CAROUSEL_ITEMS: CarouselSlide[] = (data.carousel ?? []).map(mapCarousel);

export const PHOTO_REPORT_TABS: SectionTabConfig[] = [
  { key: 'photo', label: '图片报道', moreLink: articleListLink(13, 1301) },
  { key: 'leadership', label: '协会领导动态', moreLink: articleListLink(71, 716250) },
];

export const PHOTO_REPORT_SLIDES: CarouselSlide[] = (data.photoReport ?? []).slice(0, 6).map(mapCarousel);
export const PHOTO_LEADERSHIP_SLIDES: CarouselSlide[] = PHOTO_REPORT_SLIDES;

export const NOTICE_TABS: SectionTabConfig[] = [
  { key: 'notice', label: '通知公告', moreLink: articleListLink(13, 1302) },
  { key: 'news', label: '协会动态', moreLink: articleListLink(13, 1301) },
];

export const VOICE_GALLERY_TABS: SectionTabConfig[] = [
  { key: 'voice', label: '协会声音', moreLink: articleListLink(80, 80) },
  { key: 'expert', label: '专家视角', moreLink: articleListLink(80, 80) },
  { key: 'forum', label: '协会论坛', moreLink: articleListLink(80, 80) },
  { key: 'member', label: '会员活动', moreLink: articleListLink(13, 1354) },
  { key: 'exchange', label: '行业交流', moreLink: articleListLink(80, 80) },
  { key: 'party', label: '党群活动', moreLink: articleListLink(77, 7751) },
];

export const VOICE_GALLERY: GalleryItem[] = (data.gallery ?? []).map(mapGallery);

const serviceItems = data.serviceCenter ?? [];
export const SERVICE_CENTER_MAIN: ServiceItem[] = serviceItems.slice(0, 10).map((item, index) => ({
  id: index + 1,
  title: item.text,
  link: item.url.startsWith('http') ? item.url : normalizeInternalLink(item.url),
  logo: normalizeCdnUrl(item.logo),
}));

const applyItem = serviceItems[10] ?? serviceItems[serviceItems.length - 1];
export const SERVICE_CENTER_APPLY = {
  title: applyItem?.text || '申请入会',
  link: applyItem?.url?.startsWith('http')
    ? applyItem.url
    : applyItem?.url
      ? normalizeInternalLink(applyItem.url)
      : memberApplyLink(),
  logo: normalizeCdnUrl(applyItem?.logo),
};

export const STANDARD_NEWS: HomeNewsItem[] = (data.standards ?? []).map(mapArticle);

export const MEMBER_ACTIVITIES: HomeNewsItem[] = (data.activities ?? []).map(mapArticle);

export const STANDARD_MORE_LINK = articleListLink(13, 1353);
export const MEMBER_ACTIVITIES_MORE_LINK = articleListLink(13, 1354);
export const MAGAZINE_MORE_LINK = `https://www.efmac.net/journal/list?shId=${SH_ID}`;

export const MAGAZINE_COVERS = (data.periodicals ?? []).map((item) => ({
  id: Number(item.id) || item.id,
  title: item.title,
  image: normalizeCdnUrl(item.thumbImg),
  link: `https://www.efmac.net/journal/detail/${item.id}?shId=${SH_ID}`,
}));

export const MEMBER_PUBLICITY_NAMES = data.memberPublicity ?? [];

export const ENTERPRISE_LOGOS = (data.enterpriseLogos ?? []).map(normalizeCdnUrl);

export const POLITICS_MORE_LINK = articleListLink(13, 84);

const ALL_LIVE_ARTICLES: LiveArticle[] = [
  ...(data.carousel ?? []),
  ...(data.politics ?? []),
  ...(data.tabNews ?? []),
  ...(data.photoReport ?? []),
  ...(data.gallery ?? []),
  ...(data.standards ?? []),
  ...(data.activities ?? []),
];

export function getLiveArticleById(id: number): LiveArticle | undefined {
  return ALL_LIVE_ARTICLES.find((item) => Number(item.id) === id);
}
