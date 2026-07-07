export interface HomeNewsItem {
  id: number;
  title: string;
  date: string;
  isNew?: boolean;
  link?: string;
}

export const TOP_NOTICE = {
  title: '关于开展新时代中国式大财务管理教育创新基金课题研究通知',
  link: '/article/7751',
};

export const POLITICS_NEWS: HomeNewsItem[] = [
  { id: 2001, title: '庆祝中华全国总工会成立100周年暨全国劳动模范和先进工作者表彰大会隆重举行 习近平发表重要讲话', date: '2026-07-07', isNew: true },
  { id: 2002, title: '习近平同肯尼亚总统鲁托会谈', date: '2026-07-07', isNew: true },
  { id: 2003, title: '财政部会计司有关负责人就《会计奖惩信息归集管理办法（试行）》答记者问', date: '2026-07-06', isNew: true },
  { id: 2004, title: '关于印发《民间非营利组织新旧会计制度有关衔接问题的处理规定》的通知', date: '2026-07-05', isNew: true },
  { id: 2005, title: '2025年1-3月全国国有及国有控股企业经济运行情况', date: '2026-07-04' },
  { id: 2006, title: '财政部在香港成功发行2025年第二期125亿元人民币国债', date: '2026-07-03' },
  { id: 2007, title: '中共中央国务院印发《关于实施自由贸易试验区提升战略的意见》', date: '2026-07-02', isNew: true },
  { id: 2008, title: '财政部北京监管局：坚持四举措全面提升决算审核质效', date: '2026-07-01', isNew: true },
  { id: 2009, title: '习近平会见柬埔寨国王西哈莫尼', date: '2026-06-28' },
  { id: 2010, title: '2025年一季度财政收支情况', date: '2026-06-25' },
];

export const NOTICE_NEWS: HomeNewsItem[] = [
  { id: 3001, title: '关于公布2024年度财务管理高端人才选拔结果的通知', date: '2026-07-07' },
  { id: 3002, title: '关于公示2024年度财务管理高端人才选拔结果的通知', date: '2026-07-05' },
  { id: 3003, title: '中财协发〔2025〕25号关于批准发布《企业税务管理体系 要求》团体标准的公告', date: '2026-07-03' },
  { id: 3004, title: '会议时间地址变更通知｜2025年中国企业财务管理发展大会——AI+中财数智化服务企政协同高质量发展', date: '2026-07-01' },
  { id: 3005, title: '中财协发〔2025〕16号关于《企业数据资产管理规范》团体标准立项公告', date: '2026-06-28' },
  { id: 3006, title: '关于举办"数据资产化全链路实战专项培训"的通知', date: '2026-06-25' },
  { id: 3007, title: '关于2026年度企业财税合规师FTC全国统一考试通知', date: '2026-06-20' },
  { id: 3008, title: '关于2026年3月21日企业财税合规师职业能力评价考试相关事项的通知', date: '2026-06-18' },
];

export const ASSOCIATION_NEWS: HomeNewsItem[] = [
  { id: 4001, title: '人民政协报｜全国政协常委、中财协会长张连起：推进世界一流财务管理体系建设', date: '2026-07-07', isNew: true },
  { id: 4002, title: '中国企业财务管理协会2025年度会员大会顺利召开', date: '2026-07-05' },
  { id: 4003, title: '中英携手筑高地·人才赋能启新程——财务管理人员能力验证工作启动', date: '2026-07-03' },
  { id: 4004, title: '中财协赴云南玉溪开展企政协同赋能座谈', date: '2026-07-01' },
  { id: 4005, title: '中国企业财务管理协会关于批准发布《"数据×"人才评价要求》团体标准的公告', date: '2026-06-28' },
  { id: 4006, title: '2025年中国企业财务管理发展大会在京成功举办', date: '2026-06-25' },
  { id: 4007, title: '协会与IAB联合启动财务管理人员能力验证工作', date: '2026-06-20' },
  { id: 4008, title: '中财协标准化委员会成立公告', date: '2026-06-18' },
];

export const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: '习近平会见孟加拉国总理哈西娜',
    image: '/assets/carousel-main.jpg',
    link: '/article/1301',
  },
  {
    id: 2,
    title: '庆祝中国共产党成立105周年音乐会《人民至上》在京举行 王沪宁出席观看',
    image: '/assets/carousel1.jpeg',
    link: '/article/1302',
  },
  {
    id: 3,
    title: '中国企业财务管理协会领导赴基层调研',
    image: '/assets/carousel2.jpeg',
    link: '/article/1303',
  },
  {
    id: 4,
    title: '人民政协报｜全国政协常委、中财协会长张连起：推进世界一流财务管理体系建设',
    image: '/assets/carousel-xi.jpg',
    link: '/article/1304',
  },
  {
    id: 5,
    title: '2025年中国企业财务管理发展大会在京成功举办',
    image: '/assets/carousel-2.jpeg',
    link: '/article/1305',
  },
];

export const PHOTO_REPORT = {
  title: '图片报道 / 协会领导动态',
  image: '/assets/photo-report.jpg',
  link: '/article/1301',
};

export const SERVICE_CENTER = [
  { id: 1, title: '证书查询', icon: '📜', link: '/certificate/query' },
  { id: 2, title: '中财协数服平台', icon: '💻', link: '/article/7351' },
  { id: 3, title: '企业数字化', icon: '📊', link: '/article/735559' },
  { id: 4, title: '产教融合共同体', icon: '🎓', link: '/article/7354' },
  { id: 5, title: '五星人才评价', icon: '⭐', link: '/article/735959' },
  { id: 6, title: '人才库', icon: '🔍', link: '/article/7950' },
  { id: 7, title: '人才培养平台', icon: '📚', link: '/article/7351' },
  { id: 8, title: '考试平台', icon: '✏️', link: '/article/7354' },
  { id: 9, title: '国际赋能', icon: '🌍', link: '/article/735751' },
  { id: 10, title: '项目办公室', icon: '🏢', link: '/article/7351' },
  { id: 11, title: '申请入会', icon: '📝', link: '/member/apply' },
];

export const STANDARD_NEWS: HomeNewsItem[] = [
  { id: 5001, title: '中财协发〔2025〕16号关于《企业数据资产管理规范》团体标准立项公告', date: '2026-07-07' },
  { id: 5002, title: '中财协发〔2025〕25号关于批准发布《企业税务管理体系 要求》团体标准的公告', date: '2026-07-03' },
  { id: 5003, title: '中国企业财务管理协会关于批准发布《"数据×"人才评价要求》团体标准的公告', date: '2026-06-28' },
  { id: 5004, title: '关于《企业数据资产管理规范》团体标准征求意见的通知', date: '2026-06-20' },
];

export const MEMBER_PUBLICITY = [
  { id: 1, name: '北京创新科技有限公司', type: '单位会员' },
  { id: 2, name: '上海财务咨询有限公司', type: '单位会员' },
  { id: 3, name: '深圳数字科技集团', type: '单位会员' },
  { id: 4, name: '杭州云财务服务有限公司', type: '单位会员' },
  { id: 5, name: '广州南方财税研究院', type: '单位会员' },
];
