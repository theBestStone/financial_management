/** 站内路由（由原 efmac.net 规则简化，不含 .html） */

export const SH_ID = 623;

export function articleListLink(parentSn: number, categorySn: number, page = 0): string {
  return `/article/${parentSn}_${categorySn}_${page}_0`;
}

export function articleDetailLink(id: number): string {
  return `/article/detail/${id}`;
}

export function memberApplyLink(): string {
  return '/member/apply';
}

export function memberQueryLink(): string {
  return '/member/query';
}

export function memberCompaniesLink(): string {
  return '/member/companies';
}

export function parseLegacyListPath(
  path: string
): { parentSn: number; categorySn: number; page: number; detailId: number } | null {
  const clean = path.replace(/\?.*$/, '').replace(/\.html$/, '');
  const parts = clean.split('_').map(Number);
  if (parts.length < 2 || parts.some((n) => Number.isNaN(n))) return null;
  return {
    parentSn: parts[0],
    categorySn: parts[1],
    page: parts[2] ?? 0,
    detailId: parts[3] ?? 0,
  };
}

export function parseLegacyDetailPath(path: string): number | null {
  const clean = path.replace(/\?.*$/, '').replace(/\.html$/, '');
  const id = Number(clean);
  return Number.isNaN(id) ? null : id;
}

export function resolveListCategorySn(parentSn: number, categorySn: number): number {
  return categorySn === 0 ? parentSn : categorySn;
}

export function categoryLink(categorySn: number, parentSn?: number): string {
  const parent = parentSn ?? inferParentSn(categorySn);
  return articleListLink(parent, categorySn);
}

function inferParentSn(categorySn: number): number {
  const sn = String(categorySn);
  if (sn.startsWith('71')) return 71;
  if (sn.startsWith('13')) return 13;
  if (sn.startsWith('70')) return 70;
  if (sn.startsWith('73')) return 73;
  if (sn.startsWith('72')) return 72;
  if (sn.startsWith('74')) return 74;
  if (sn.startsWith('79')) return 79;
  if (sn.startsWith('77')) return 77;
  if (sn.startsWith('16')) return 16;
  return categorySn;
}

export function isExternalUrl(link: string): boolean {
  return link.startsWith('http://') || link.startsWith('https://');
}

/** 将 API / 原站带 .html 的链接转为站内干净路径 */
export function normalizeInternalLink(link: string): string {
  if (isExternalUrl(link)) return link;

  const path = link.split('?')[0].replace(/\.html$/, '');

  if (path === '/article/16_0_0_0') return memberApplyLink();
  if (path.startsWith('/companyJob/')) return memberCompaniesLink();
  if (path.startsWith('/subject/')) return memberQueryLink();

  const listWithDetail = path.match(/^\/article\/\d+_\d+_\d+_(\d+)$/);
  if (listWithDetail) {
    const detailId = Number(listWithDetail[1]);
    return detailId > 0 ? articleDetailLink(detailId) : path;
  }

  const detailMatch = path.match(/_0_(\d+)$/);
  if (detailMatch && path.startsWith('/article/')) {
    const detailId = Number(detailMatch[1]);
    return detailId > 0 ? articleDetailLink(detailId) : path;
  }

  return path;
}

export function navigateLink(link: string, navigate: (path: string) => void): void {
  if (isExternalUrl(link)) {
    window.open(link, '_blank');
    return;
  }
  navigate(normalizeInternalLink(link));
}
