/**
 * 官网 CDN 图片地址解析
 * pcweb.shanghuiyidisk.com 启用防盗链，浏览器直连需 Referer=www.efmac.net
 * 生产环境通过同源 /pcweb-cdn 由 Nginx 转发并注入 Referer（见 deploy/nginx.conf）
 */
import { EFMAC_CDN_PROXY_PATH } from '../constants/efmacCdn';

const CDN_HOSTS = [
  'https://pcweb.shanghuiyidisk.com',
  'https://console.shanghuiyidisk.com',
] as const;

export function resolveEfmacImageSrc(src?: string): string | undefined {
  if (!src) return src;

  const normalized = src
    .replace(/console\.shanghuiyidisk\.com/g, 'pcweb.shanghuiyidisk.com')
    .replace(/%40h_1280/gi, '');

  for (const host of CDN_HOSTS) {
    if (normalized.startsWith(host)) {
      return normalized.replace(host, EFMAC_CDN_PROXY_PATH);
    }
  }

  return normalized;
}

export function efmacBgUrl(url: string): string {
  const resolved = resolveEfmacImageSrc(url) ?? url;
  return `url(${resolved})`;
}

export { EFMAC_SITE_ORIGIN } from '../data/officialAssets';
