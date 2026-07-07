/** 原站 efmac.net URL 规则（协会易 Nuxt3） */

export const SH_ID = 623;

export function articleListLink(parentSn: number, categorySn: number, page = 0): string {
  return `/article/${parentSn}_${categorySn}_${page}_0.html?shId=${SH_ID}`;
}

export function articleDetailLink(id: number): string {
  return `/article/detail/${id}.html?shId=${SH_ID}`;
}

export function memberApplyLink(): string {
  return `/article/16_0_0_0.html?shId=${SH_ID}`;
}

export function memberQueryLink(): string {
  return `/subject/16_2_0_2351?shId=${SH_ID}`;
}

export function memberCompaniesLink(): string {
  return `/companyJob/1_0_0_0.html`;
}

export function parseLegacyListPath(path: string): { parentSn: number; categorySn: number; page: number } | null {
  const clean = path.replace(/\?.*$/, '').replace(/\.html$/, '');
  const parts = clean.split('_').map(Number);
  if (parts.length < 2 || parts.some((n) => Number.isNaN(n))) return null;
  return {
    parentSn: parts[0],
    categorySn: parts[1],
    page: parts[2] ?? 0,
  };
}

export function parseLegacyDetailPath(path: string): number | null {
  const clean = path.replace(/\?.*$/, '').replace(/\.html$/, '');
  const id = Number(clean);
  return Number.isNaN(id) ? null : id;
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

export function navigateLink(link: string, navigate: (path: string) => void): void {
  if (isExternalUrl(link)) {
    window.open(link, '_blank');
    return;
  }
  const path = link.split('?')[0];
  navigate(path);
}
