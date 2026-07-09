import type { Article, BannerItem, ServiceItem, MemberCompany, MemberRecord, CertificateRecord } from '../types';
import {
  POLITICS_NEWS,
  NOTICE_NEWS,
  ASSOCIATION_NEWS,
  STANDARD_NEWS,
} from './homeData';
import { getLiveArticleById } from './homeLiveData';
import { EFMAC_ASSETS } from './officialAssets';

export const BANNERS: BannerItem[] = [
  {
    id: 1,
    title: '北京现代财务战略研究院',
    image: EFMAC_ASSETS.expand.b,
  },
  {
    id: 2,
    title: '财务管理人员能力验证工作全面推进',
    image: EFMAC_ASSETS.banner04,
  },
  {
    id: 3,
    title: '团体标准建设',
    image: EFMAC_ASSETS.pageBg,
  },
];

export const SERVICE_CENTER: ServiceItem[] = [
  { id: 1, title: '证书查询', icon: '📜', link: '/certificate/query' },
  { id: 2, title: '中财协数服平台', icon: '💻', link: '/article/73/7351' },
  { id: 3, title: '企业数字化', icon: '📊', link: '/article/73/735559' },
  { id: 4, title: '产教融合共同体', icon: '🎓', link: '/article/73/7354' },
  { id: 5, title: '五星人才评价', icon: '⭐', link: '/article/73/735959' },
  { id: 6, title: '人才库', icon: '👥', link: '/article/79/7950' },
  { id: 7, title: '人才培养平台', icon: '📚', link: '/article/73/7351' },
  { id: 8, title: '考试平台', icon: '✏️', link: '/article/73/7354' },
  { id: 9, title: '国际赋能', icon: '🌍', link: '/article/73/735751' },
  { id: 10, title: '项目办公室', icon: '🏢', link: '/article/73/7351' },
  { id: 11, title: '申请入会', icon: '📝', link: '/member/apply' },
];

const articleContent = (title: string, body: string) => `
<h2>${title}</h2>
<p>${body}</p>
<p>北京现代财务战略研究院（简称"中财协"）是经国务院批准、民政部登记注册的非营利性全国性社会团体，是代表中国企业财务管理领域最高水平的行业协会。</p>
<p>协会致力于推动企业财务管理现代化，加强行业自律，促进国际交流与合作，为企业培养高素质财务管理人才，助力企业高质量发展。</p>
<p>如需了解更多信息，请联系协会秘书处：010-88585021，邮箱：zcx@efmac.net。</p>
`;

export const ARTICLES: Article[] = [
  {
    id: 1001,
    title: '中财协发〔2025〕16号关于《企业数据资产管理规范》团体标准立项公告',
    summary: '根据《北京现代财务战略研究院团体标准管理办法》有关规定，现对《企业数据资产管理规范》团体标准予以立项公告。',
    content: articleContent(
      '关于《企业数据资产管理规范》团体标准立项公告',
      '根据《北京现代财务战略研究院团体标准管理办法》有关规定，经标准化委员会审查，现对《企业数据资产管理规范》团体标准予以立项。请各有关单位积极参与标准制定工作。'
    ),
    categorySn: 705750,
    categoryName: '标准立项',
    publishTime: '2025-06-15',
    author: '标准化委员会',
    views: 1280,
  },
  {
    id: 1002,
    title: '北京现代财务战略研究院2025年度会员大会顺利召开',
    summary: '大会总结了2024年工作成果，部署了2025年重点工作任务。',
    content: articleContent(
      '2025年度会员大会顺利召开',
      '2025年3月28日，北京现代财务战略研究院2025年度会员大会在北京国际财经中心顺利召开。来自全国各地的会员代表200余人参加了会议。'
    ),
    categorySn: 1301,
    categoryName: '协会动态',
    publishTime: '2025-03-28',
    views: 3560,
  },
  {
    id: 1003,
    title: '关于举办"数据资产化全链路实战专项培训"的通知',
    summary: '为帮助企业财务人员掌握数据资产管理核心技能，协会定于2025年7月举办专项培训。',
    content: articleContent(
      '数据资产化全链路实战专项培训通知',
      '培训内容包括数据资产识别、评估、入表、披露等全链路实务操作，欢迎各会员单位及企业财务人员报名参加。'
    ),
    categorySn: 1302,
    categoryName: '通知公告',
    publishTime: '2025-06-20',
    views: 890,
  },
  {
    id: 1004,
    title: '中英携手筑高地·人才赋能启新程——财务管理人员能力验证工作启动',
    summary: '北京现代财务战略研究院与IAB联合开展财务管理人员能力验证，共建高层次国际人才服务平台。',
    content: articleContent(
      '财务管理人员能力验证工作启动',
      '协会与英国会计师和簿记师公会（IAB）联合启动财务管理人员能力验证工作，为高层次财务人才提供全职业周期服务。'
    ),
    categorySn: 1301,
    categoryName: '协会动态',
    publishTime: '2025-02-23',
    views: 2100,
  },
  {
    id: 1005,
    title: '协会简介',
    summary: '北京现代财务战略研究院是经国务院批准、民政部登记注册的非营利性全国性社会团体。',
    content: articleContent(
      '协会简介',
      '北京现代财务战略研究院成立于2014年，是代表中国企业财务管理领域最高水平的行业协会。协会现有会员单位3000余家，个人会员50000余人。'
    ),
    categorySn: 7150,
    categoryName: '协会简介',
    publishTime: '2024-01-01',
    views: 8900,
  },
  {
    id: 1006,
    title: '协会章程',
    summary: '本章程是北京现代财务战略研究院的基本准则。',
    content: articleContent(
      '协会章程',
      '第一章 总则。本协会名称为北京现代财务战略研究院，英文名称为China Enterprise Financial Management Association，缩写为EFMAC。'
    ),
    categorySn: 7151,
    categoryName: '协会章程',
    publishTime: '2024-01-01',
    views: 5600,
  },
  {
    id: 1007,
    title: '组织架构',
    summary: '协会设理事会、常务理事会、秘书处等机构。',
    content: articleContent(
      '组织架构',
      '协会最高权力机构为会员大会，执行机构为理事会，日常办事机构为秘书处。下设标准化委员会、人才培养委员会等专业委员会。'
    ),
    categorySn: 7164,
    categoryName: '组织架构',
    publishTime: '2024-01-01',
    views: 4200,
  },
  {
    id: 1008,
    title: '会员发展和服务办法',
    summary: '为规范会员管理，保障会员权益，制定本办法。',
    content: articleContent(
      '会员发展和服务办法',
      '协会实行单位会员和个人会员制度。单位会员包括企业、事业单位、社会团体等；个人会员包括财务管理从业人员、专家学者等。'
    ),
    categorySn: 7255,
    categoryName: '会员发展和服务办法',
    publishTime: '2024-06-01',
    views: 3100,
  },
  {
    id: 1009,
    title: '会员权益',
    summary: '会员享有参加协会活动、获取行业资讯、享受培训优惠等权益。',
    content: articleContent(
      '会员权益',
      '会员权益包括：优先参加协会组织的培训、研讨、考察活动；免费获取协会刊物和行业研究报告；享受职业能力评价优惠等。'
    ),
    categorySn: 7253,
    categoryName: '会员权益',
    publishTime: '2024-06-01',
    views: 2800,
  },
  {
    id: 1010,
    title: '财务管理师FM职业能力评价项目介绍',
    summary: '财务管理师（FM）是中财协推出的核心职业能力评价项目。',
    content: articleContent(
      '财务管理师FM项目介绍',
      '财务管理师（Financial Manager，简称FM）职业能力评价项目旨在培养具备现代财务管理理念和实务操作能力的高素质人才。'
    ),
    categorySn: 735552,
    categoryName: '财务管理师FM',
    publishTime: '2024-09-01',
    views: 4500,
  },
  {
    id: 1011,
    title: '管理会计师MAA职业能力评价项目介绍',
    summary: '管理会计师（MAA）项目面向企业管理层财务人员。',
    content: articleContent(
      '管理会计师MAA项目介绍',
      '管理会计师（Management Accounting Analyst，简称MAA）职业能力评价项目重点培养战略决策支持和管理会计实务能力。'
    ),
    categorySn: 735550,
    categoryName: '管理会计师MAA',
    publishTime: '2024-09-01',
    views: 3800,
  },
  {
    id: 1012,
    title: '人才库简介',
    summary: '中国企业财务管理人才库是为财务管理人员铺设成才通道而建立的人才服务体系。',
    content: articleContent(
      '人才库简介',
      '人才库是中组部委托人社部全国人才流动中心建设的全国企业经营管理人才库的财务专业子库，已培养各层级财务管理人才约五万余人入库。'
    ),
    categorySn: 7950,
    categoryName: '人才库简介',
    publishTime: '2024-01-01',
    views: 6200,
  },
  {
    id: 1013,
    title: '党建工作：学习贯彻党的二十大精神专题活动',
    summary: '协会党支部组织全体党员开展学习贯彻党的二十大精神专题学习活动。',
    content: articleContent(
      '学习贯彻党的二十大精神专题活动',
      '协会党支部认真组织学习党的二十大报告，深入领会习近平新时代中国特色社会主义思想，推动协会党建工作高质量发展。'
    ),
    categorySn: 7751,
    categoryName: '工作动态',
    publishTime: '2025-04-15',
    views: 980,
  },
  {
    id: 7751,
    title: '关于开展新时代中国式大财务管理教育创新基金课题研究通知',
    summary: '面向会员单位及相关机构开展新时代中国式大财务管理教育创新基金课题研究。',
    content: articleContent(
      '关于开展新时代中国式大财务管理教育创新基金课题研究通知',
      '为深入贯彻落实新时代财务管理教育创新要求，北京现代财务战略研究院现开展新时代中国式大财务管理教育创新基金课题研究，欢迎各会员单位、高等院校及相关机构积极申报。'
    ),
    categorySn: 7751,
    categoryName: '工作动态',
    publishTime: '2025-06-01',
    views: 1560,
  },
  {
    id: 1014,
    title: '标准化委员会成立公告',
    summary: '为进一步推进团体标准建设，协会成立标准化委员会。',
    content: articleContent(
      '标准化委员会成立公告',
      '标准化委员会负责协会团体标准的立项、制定、发布和管理工作，推动企业财务管理领域标准体系建设。'
    ),
    categorySn: 7052,
    categoryName: '标准化委员会',
    publishTime: '2024-03-01',
    views: 1500,
  },
  {
    id: 1015,
    title: '2025年会员活动：财务管理创新论坛',
    summary: '协会将于2025年8月举办财务管理创新论坛，欢迎会员报名参加。',
    content: articleContent(
      '财务管理创新论坛',
      '论坛将邀请知名专家学者和企业家分享财务管理创新实践经验，探讨数字化转型背景下的财务管理变革。'
    ),
    categorySn: 1354,
    categoryName: '会员活动',
    publishTime: '2025-05-10',
    views: 760,
  },
  {
    id: 1016,
    title: '财务专家：张明 教授',
    summary: '张明，中国人民大学商学院教授，中财协财务专家。',
    content: articleContent(
      '财务专家：张明',
      '张明教授长期从事公司财务、资本市场研究，发表学术论文100余篇，主持国家级课题10余项，是中财协特聘财务专家。'
    ),
    categorySn: 745660,
    categoryName: '财务专家',
    publishTime: '2024-11-01',
    views: 1200,
  },
  {
    id: 1017,
    title: '线上学习平台使用指南',
    summary: '中财协线上学习平台已正式上线，提供丰富的财务管理课程资源。',
    content: articleContent(
      '线上学习平台使用指南',
      '平台涵盖财务管理、税务管理、数据资产、人工智能财会等多个领域的在线课程，支持PC端和移动端学习。'
    ),
    categorySn: 7354,
    categoryName: '线上学习平台',
    publishTime: '2024-08-01',
    views: 5400,
  },
  {
    id: 1018,
    title: '五星人才评价办法',
    summary: '五星人才评价是中财协推出的高端财务管理人才评价体系。',
    content: articleContent(
      '五星人才评价办法',
      '评价采用五星等级制，从专业能力、实践经验、行业贡献等维度对财务管理人才进行综合评价。'
    ),
    categorySn: 735959,
    categoryName: '五星人才评价办法',
    publishTime: '2024-10-01',
    views: 2300,
  },
];

export const MEMBER_COMPANIES: MemberCompany[] = [
  { id: 1, name: '北京创新科技有限公司', type: '单位会员', region: '北京市', joinDate: '2023-05-12' },
  { id: 2, name: '上海财务咨询有限公司', type: '单位会员', region: '上海市', joinDate: '2022-08-20' },
  { id: 3, name: '深圳数字科技集团', type: '单位会员', region: '广东省', joinDate: '2024-01-15' },
  { id: 4, name: '杭州云财务服务有限公司', type: '单位会员', region: '浙江省', joinDate: '2023-11-08' },
  { id: 5, name: '成都企业管理顾问有限公司', type: '单位会员', region: '四川省', joinDate: '2022-03-22' },
  { id: 6, name: '武汉华中财务培训中心', type: '单位会员', region: '湖北省', joinDate: '2024-06-01' },
  { id: 7, name: '南京金陵会计师事务所', type: '单位会员', region: '江苏省', joinDate: '2021-09-30' },
  { id: 8, name: '广州南方财税研究院', type: '单位会员', region: '广东省', joinDate: '2023-02-14' },
];

export const MEMBER_RECORDS: MemberRecord[] = [
  { id: 1, name: '李伟', memberNo: 'EFMAC-P-20240001', type: '个人会员', status: '正常', expireDate: '2026-12-31' },
  { id: 2, name: '王芳', memberNo: 'EFMAC-P-20240002', type: '个人会员', status: '正常', expireDate: '2026-12-31' },
  { id: 3, name: '北京创新科技有限公司', memberNo: 'EFMAC-C-20230001', type: '单位会员', status: '正常', expireDate: '2025-12-31' },
  { id: 4, name: '陈静', memberNo: 'EFMAC-P-20230015', type: '个人会员', status: '正常', expireDate: '2025-12-31' },
  { id: 5, name: '上海财务咨询有限公司', memberNo: 'EFMAC-C-20220008', type: '单位会员', status: '正常', expireDate: '2026-06-30' },
];

export const CERTIFICATE_RECORDS: CertificateRecord[] = [
  { certNo: 'FM2024001001', name: '张伟', project: '财务管理师FM', level: '高级', issueDate: '2024-06-15', status: '有效' },
  { certNo: 'MAA2024002001', name: '李娜', project: '管理会计师MAA', level: '中级', issueDate: '2024-08-20', status: '有效' },
  { certNo: 'FM2023001056', name: '王强', project: '财务管理师FM', level: '初级', issueDate: '2023-12-10', status: '有效' },
  { certNo: 'CNTA2024003001', name: '赵敏', project: '税务管理师CNTA', level: '高级', issueDate: '2024-09-05', status: '有效' },
  { certNo: 'EDAM2024004001', name: '刘洋', project: '企业数据资产管理师EDAM', level: '中级', issueDate: '2024-11-18', status: '有效' },
];

export function getArticlesByCategory(categorySn: number): Article[] {
  const direct = ARTICLES.filter((a) => a.categorySn === categorySn);
  const homeMapped = getHomeArticlesForCategory(categorySn);
  const ids = new Set(direct.map((a) => a.id));
  return [...direct, ...homeMapped.filter((a) => !ids.has(a.id))];
}

function getHomeArticlesForCategory(categorySn: number): Article[] {
  const mapItems = (items: typeof POLITICS_NEWS, sn: number, name: string): Article[] =>
    items.map((item) => ({
      id: item.id,
      title: item.title,
      content: articleContent(item.title, item.title),
      categorySn: sn,
      categoryName: name,
      publishTime: item.date,
      views: 800 + (item.id % 500),
    }));

  if (categorySn === 1301) return mapItems(ASSOCIATION_NEWS, 1301, '协会动态');
  if (categorySn === 1302) return mapItems(NOTICE_NEWS, 1302, '通知公告');
  if (categorySn === 705750) return mapItems(STANDARD_NEWS, 705750, '标准立项');
  if (categorySn === 13) {
    return [
      ...mapItems(ASSOCIATION_NEWS, 1301, '协会动态'),
      ...mapItems(NOTICE_NEWS, 1302, '通知公告'),
    ];
  }
  return [];
}

export function getArticleById(id: number): Article | undefined {
  const found = ARTICLES.find((a) => a.id === id);
  if (found) return found;

  const homeItems = [...POLITICS_NEWS, ...NOTICE_NEWS, ...ASSOCIATION_NEWS, ...STANDARD_NEWS];
  const homeItem = homeItems.find((item) => item.id === id);
  if (homeItem) {
    return {
      id: homeItem.id,
      title: homeItem.title,
      content: articleContent(homeItem.title, homeItem.title),
      categorySn: homeItem.id >= 3000000 ? 1302 : 1301,
      categoryName: '协会动态',
      publishTime: homeItem.date,
      views: Math.floor(Math.random() * 3000) + 500,
    };
  }

  const live = getLiveArticleById(id);
  if (!live) return undefined;

  return {
    id: Number(live.id),
    title: live.title,
    content: articleContent(live.title, live.foreword || live.title),
    categorySn: live.categorySn ?? 1301,
    categoryName: live.categoryName?.split(',')[0] ?? '协会动态',
    publishTime: live.publishTime.slice(0, 10),
    views: Math.floor(Math.random() * 3000) + 500,
    thumb: live.thumbImg,
  };
}

export function getRelatedArticles(article: Article, limit = 5): Article[] {
  return ARTICLES.filter((a) => a.categorySn === article.categorySn && a.id !== article.id).slice(0, limit);
}

export function searchArticles(keyword: string): Article[] {
  const kw = keyword.toLowerCase();
  const base = ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(kw) ||
      a.summary?.toLowerCase().includes(kw) ||
      a.categoryName.toLowerCase().includes(kw)
  );
  const homeItems = [...POLITICS_NEWS, ...NOTICE_NEWS, ...ASSOCIATION_NEWS, ...STANDARD_NEWS]
    .filter((item) => item.title.toLowerCase().includes(kw))
    .map((item) => getArticleById(item.id)!)
    .filter(Boolean);
  const ids = new Set(base.map((a) => a.id));
  return [...base, ...homeItems.filter((a) => !ids.has(a.id))];
}

export function queryMember(keyword: string): MemberRecord[] {
  const kw = keyword.toLowerCase();
  return MEMBER_RECORDS.filter(
    (m) => m.name.toLowerCase().includes(kw) || m.memberNo.toLowerCase().includes(kw)
  );
}

export function queryCertificate(certNo: string, name: string): CertificateRecord[] {
  return CERTIFICATE_RECORDS.filter(
    (c) =>
      c.certNo.toLowerCase().includes(certNo.toLowerCase()) &&
      c.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function queryCompanies(keyword: string): MemberCompany[] {
  const kw = keyword.toLowerCase();
  if (!kw) return MEMBER_COMPANIES;
  return MEMBER_COMPANIES.filter(
    (c) => c.name.toLowerCase().includes(kw) || c.region.toLowerCase().includes(kw)
  );
}
