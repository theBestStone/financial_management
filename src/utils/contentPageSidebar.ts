import type { NavItem } from '../types';
import { findNavByCategorySn, getCategoryPath } from '../data/navigation';

export interface SidebarMenuItem {
  categorySn?: number;
  categoryName: string;
  link?: string;
  external?: boolean;
}

export interface ContentPageSidebarConfig {
  sidebarTitle: string;
  items: SidebarMenuItem[];
  parentCategorySn?: number;
  activeCategorySn?: number;
}

export function getContentPageSidebar(
  categorySn?: number,
  categoryName?: string
): ContentPageSidebarConfig | null {
  if (!categorySn) return null;

  const path = getCategoryPath(categorySn);
  const navItem = findNavByCategorySn(categorySn);
  const rootNav = path[0];
  const secondLevelNav = path[1] ?? navItem;
  const children = rootNav?.children ?? [];

  if (children.length > 0) {
    return {
      sidebarTitle: rootNav?.categoryName ?? navItem?.categoryName ?? '栏目导航',
      items: children.map(flattenNavItem),
      parentCategorySn: rootNav?.categorySn,
      activeCategorySn: secondLevelNav?.categorySn ?? categorySn,
    };
  }

  const title = categoryName ?? navItem?.categoryName ?? '文章详情';
  return {
    sidebarTitle: title,
    items: [{ categorySn, categoryName: title }],
    parentCategorySn: categorySn,
    activeCategorySn: categorySn,
  };
}

export function flattenNavItem(item: NavItem): SidebarMenuItem {
  return {
    categorySn: item.categorySn,
    categoryName: item.categoryName,
    link: item.linkUrl,
    external: item.external,
  };
}
