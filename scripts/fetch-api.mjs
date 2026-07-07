const headers = {
  Referer: 'https://www.efmac.net/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

const endpoints = [
  'https://pcweb.xiehuiyi.com/pcWeb/module/getHomeModuleList?shId=623&siteId=357',
  'https://pcweb.xiehuiyi.com/pcWeb/module/getHomeModuleList?shId=623&siteId=0',
  'https://pcweb.xiehuiyi.com/pcWeb/home/getHomePage?shId=623&siteId=357',
  'https://pcweb.xiehuiyi.com/pcWeb/home/getHomePage?shId=623&siteId=0',
  'https://pcweb.xiehuiyi.com/pcWeb/home/getHomePageInfo?shId=623&siteId=357',
  'https://pcweb.xiehuiyi.com/pcWeb/article/getArticleList?shId=623&categorySn=1301&pageNum=1&pageSize=10',
  'https://pcweb.xiehuiyi.com/pcWeb/article/getArticleList?shId=623&categorySn=13&pageNum=1&pageSize=10',
];

for (const url of endpoints) {
  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    console.log('\n===', url, res.status, '===');
    console.log(text.slice(0, 1200));
  } catch (e) {
    console.log('FAIL', url, e.message);
  }
}
