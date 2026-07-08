export interface NavItem {
  categoryName: string;
  categorySn?: number;
  linkUrl?: string;
  external?: boolean;
  /** 0=单页内容，1=列表，2=目录，3=外链 */
  isList?: number;
  children?: NavItem[];
}

export interface Article {
  id: number;
  title: string;
  summary?: string;
  content: string;
  categorySn: number;
  categoryName: string;
  publishTime: string;
  author?: string;
  views?: number;
  thumb?: string;
}

export interface BannerItem {
  id: number;
  title: string;
  image: string;
  link?: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  icon: string;
  link?: string;
  external?: boolean;
}

export interface MemberCompany {
  id: number;
  name: string;
  type: string;
  region: string;
  joinDate: string;
}

export interface MemberRecord {
  id: number;
  name: string;
  memberNo: string;
  type: string;
  status: string;
  expireDate: string;
}

export interface CertificateRecord {
  certNo: string;
  name: string;
  project: string;
  level: string;
  issueDate: string;
  status: string;
}

export interface SearchResult {
  type: string;
  id: number;
  title: string;
  date: string;
  categoryName: string;
}
