import type { NavItem } from '../types';

export const NAV_LIST: NavItem[] = [
  { categoryName: '首页', categorySn: -1 },
  {
    categoryName: '协会概述',
    categorySn: 71,
    children: [
      { categoryName: '协会简介', categorySn: 7150 },
      { categoryName: '协会章程', categorySn: 7151 },
      { categoryName: '组织架构', categorySn: 7164 },
      {
        categoryName: '协会领导',
        categorySn: 7162,
        children: [{ categoryName: '协会领导', categorySn: 716250 }],
      },
      {
        categoryName: '机构设置',
        categorySn: 7161,
        children: [
          { categoryName: '内设机构', categorySn: 716152 },
          { categoryName: '分支机构', categorySn: 716151 },
          { categoryName: '合作机构', categorySn: 716153 },
        ],
      },
    ],
  },
  {
    categoryName: '协会动态',
    categorySn: 13,
    children: [
      { categoryName: '协会动态', categorySn: 1301 },
      { categoryName: '通知公告', categorySn: 1302 },
      { categoryName: '会员活动', categorySn: 1354 },
    ],
  },
  {
    categoryName: '标准建设',
    categorySn: 70,
    children: [
      { categoryName: '标准化委员会', categorySn: 7052 },
      {
        categoryName: '标准政策文件',
        categorySn: 7055,
        children: [
          { categoryName: '国标文件', categorySn: 705550 },
          { categoryName: '社会团标', categorySn: 705551 },
        ],
      },
      {
        categoryName: '团体标准制定',
        categorySn: 7057,
        children: [
          { categoryName: '标准立项', categorySn: 705750 },
          { categoryName: '征求意见', categorySn: 705753 },
          { categoryName: '标准发布', categorySn: 705752 },
        ],
      },
      { categoryName: '标准案例', categorySn: 7058 },
    ],
  },
  {
    categoryName: '人才培养',
    categorySn: 73,
    children: [
      { categoryName: '服务平台', categorySn: 7351 },
      {
        categoryName: '国内评价',
        categorySn: 7355,
        children: [
          { categoryName: '财务管理师FM', categorySn: 735552 },
          { categoryName: '管理会计师MAA', categorySn: 735550 },
          { categoryName: '税务管理师CNTA', categorySn: 735557 },
          { categoryName: '企业财税合规师FTC', categorySn: 735558 },
          { categoryName: '财务BP数字化管理师FBP', categorySn: 735556 },
          { categoryName: '企业数据资产管理师EDAM', categorySn: 735559 },
          { categoryName: '人工智能财会应用技能认证AIFASC', categorySn: 735562 },
        ],
      },
      {
        categoryName: '联合评价',
        categorySn: 7357,
        children: [
          { categoryName: '国际注册会计师ICPA', categorySn: 735751 },
          { categoryName: '全球数字化会计师GDA', categorySn: 735752 },
          { categoryName: 'ESG 分析师联合认证项目', categorySn: 735750 },
          { categoryName: '国际会计高端人才素质提升项目', categorySn: 735753 },
        ],
      },
      {
        categoryName: '专业能力评价',
        categorySn: 7359,
        children: [
          { categoryName: '五星人才评价办法', categorySn: 735959 },
          { categoryName: '五星人才评价流程', categorySn: 735960 },
          { categoryName: '五星人才评价入口', categorySn: 735961 },
          { categoryName: '数字化税务师', categorySn: 735955 },
        ],
      },
      { categoryName: '线上学习平台', categorySn: 7354 },
      {
        categoryName: '线下高级研修项目',
        categorySn: 7358,
        children: [
          { categoryName: '财务总监班/五星财务人才专题培训', categorySn: 735856 },
          { categoryName: '数据资产化全链路实战专项培训', categorySn: 735860 },
          { categoryName: '数字化转型与咨询专题培训', categorySn: 735861 },
          { categoryName: '拔尖人才专项财务管理研修班', categorySn: 735857 },
          { categoryName: '高端人才专项财务管理研修班', categorySn: 735858 },
          { categoryName: '企业定制化内训', categorySn: 735854 },
          { categoryName: '人社部"知识更新工程"专题培训', categorySn: 735855 },
        ],
      },
    ],
  },
  {
    categoryName: '会员服务',
    categorySn: 72,
    children: [
      { categoryName: '会员发展和服务办法', categorySn: 7255 },
      { categoryName: '会员权益', categorySn: 7253 },
      { categoryName: '申请入会', linkUrl: '/article/16_0_0_0.html?shId=623' },
      { categoryName: '会员查询', linkUrl: '/subject/16_2_0_2351?shId=623' },
      { categoryName: '会员单位名录', linkUrl: '/companyJob/1_0_0_0.html' },
    ],
  },
  {
    categoryName: '专家智库',
    categorySn: 74,
    children: [
      {
        categoryName: '专家智库',
        categorySn: 7456,
        children: [
          { categoryName: '高端人才（原领军人才专家）', categorySn: 745659 },
          { categoryName: '企业数字化转型专家', categorySn: 745666 },
          { categoryName: '数据资产化专家', categorySn: 745667 },
          { categoryName: '财务专家', categorySn: 745660 },
          { categoryName: '税务专家', categorySn: 745661 },
          { categoryName: '审计专家', categorySn: 745662 },
          { categoryName: '风控专家', categorySn: 745664 },
          { categoryName: '投融资专家', categorySn: 745665 },
          { categoryName: '管理咨询专家', categorySn: 745663 },
        ],
      },
    ],
  },
  {
    categoryName: '人才库',
    categorySn: 79,
    children: [
      { categoryName: '人才库简介', categorySn: 7950 },
      {
        categoryName: '高层次国际人才服务平台',
        linkUrl: 'http://csnlyz.efmac.net/',
        external: true,
      },
      { categoryName: '实施细则', categorySn: 7953 },
      {
        categoryName: '证书查询',
        linkUrl: '/certificate/query',
      },
    ],
  },
  {
    categoryName: '党建工作',
    categorySn: 77,
    children: [{ categoryName: '工作动态', categorySn: 7751 }],
  },
  {
    categoryName: '课题申报入口',
    linkUrl: 'https://zcx.cnerp.org.cn',
    external: true,
  },
];

export function findNavByCategorySn(sn: number): NavItem | undefined {
  const walk = (items: NavItem[]): NavItem | undefined => {
    for (const item of items) {
      if (item.categorySn === sn) return item;
      if (item.children) {
        const found = walk(item.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return walk(NAV_LIST);
}

export function getCategoryPath(sn: number): NavItem[] {
  const path: NavItem[] = [];
  const walk = (items: NavItem[], ancestors: NavItem[]): boolean => {
    for (const item of items) {
      const next = [...ancestors, item];
      if (item.categorySn === sn) {
        path.push(...next);
        return true;
      }
      if (item.children && walk(item.children, next)) return true;
    }
    return false;
  };
  walk(NAV_LIST, []);
  return path;
}
