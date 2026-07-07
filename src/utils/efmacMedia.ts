import { EFMAC_SITE_ORIGIN } from '../data/officialAssets';

const CDN_HOSTS = [
  'https://pcweb.shanghuiyidisk.com',
  'https://console.shanghuiyidisk.com',
] as const;

/** 开发环境经 Vite 代理转发，携带官网 Referer 避免防盗链 */
export function resolveEfmacImageSrc(src?: string): string | undefined {
  if (!src) return src;
  const normalized = src.replace('console.shanghuiyidisk.com', 'pcweb.shanghuiyidisk.com');

  if (import.meta.env.DEV) {
    for (const host of CDN_HOSTS) {
      if (normalized.startsWith(host)) {
        return normalized.replace(host, '/pcweb-cdn');
      }
    }
  }
  return normalized;
}

export function efmacBgUrl(url: string): string {
  const resolved = resolveEfmacImageSrc(url) ?? url;
  return `url(${resolved})`;
}

export { EFMAC_SITE_ORIGIN };
