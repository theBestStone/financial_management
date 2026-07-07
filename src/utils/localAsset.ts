import assetData from '../data/localAssetMap.json';

const { map: ASSET_MAP, named: NAMED_ASSETS } = assetData as {
  map: Record<string, string>;
  named: Record<string, string>;
};

function normalizeAssetKey(url: string): string {
  return url
    .replace(/^https?:\/\/(console|pcweb)\.shanghuiyidisk\.com/i, '')
    .replace(/%40h_1280/gi, '')
    .split('?')[0];
}

/** 将 CDN / 远程地址解析为站点根路径绝对地址，如 /assets/logo.png */
export function resolveLocalAsset(src?: string): string | undefined {
  if (!src) return src;
  if (src.startsWith('/')) return src;

  const direct = ASSET_MAP[src] ?? ASSET_MAP[src.split('?')[0]];
  if (direct) return direct;

  const pathKey = normalizeAssetKey(src);
  const fromPath =
    ASSET_MAP[pathKey] ??
    ASSET_MAP[`https://pcweb.shanghuiyidisk.com${pathKey}`] ??
    ASSET_MAP[`https://console.shanghuiyidisk.com${pathKey}`];
  if (fromPath) return fromPath;

  return src;
}

export function localBgUrl(url: string): string {
  const resolved = resolveLocalAsset(url) ?? url;
  return `url(${resolved})`;
}

export { NAMED_ASSETS };
