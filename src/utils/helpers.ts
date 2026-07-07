import type { NavItem } from '../types';

export function getNavLink(item: NavItem): string {
  if (item.linkUrl) return item.linkUrl;
  if (item.categorySn === -1) return '/';

  const getFirstLeaf = (nav: NavItem): NavItem => {
    if (nav.children && nav.children.length > 0) {
      return getFirstLeaf(nav.children[0]);
    }
    return nav;
  };

  if (item.children && item.children.length > 0) {
    const leaf = getFirstLeaf(item);
    if (leaf.linkUrl) return leaf.linkUrl;
    if (leaf.categorySn !== undefined) return `/article/${leaf.categorySn}`;
  }

  if (item.categorySn !== undefined) return `/article/${item.categorySn}`;
  return '/';
}

export function isExternalLink(link: string): boolean {
  return link.startsWith('http');
}

export function formatDate(dateStr: string): string {
  return dateStr;
}

export function paginate<T>(items: T[], page: number, pageSize: number): { data: T[]; total: number; totalPages: number } {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const start = (page - 1) * pageSize;
  return {
    data: items.slice(start, start + pageSize),
    total,
    totalPages,
  };
}
