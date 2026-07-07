const headers = {
  Referer: 'https://www.efmac.net/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

const endpoints = [
  'https://pcweb.xiehuiyi.com/pcWeb/module/getHomeModuleList?shId=623&siteId=357',
  'https://pcweb.xiehuiyi.com/pcWeb/home/getHomePage?shId=623&siteId=357',
  'https://pcweb.xiehuiyi.com/pcWeb/home/getHomePageInfo?shId=623&siteId=357',
  'https://pcweb.xiehuiyi.com/pcWeb/article/getArticleList?shId=623&categorySn=1301&pageNum=1&pageSize=20&isRecommend=1',
];

for (const url of endpoints) {
  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    console.log('\n===', url, res.status, '===');
    if (text.startsWith('{') || text.startsWith('[')) {
      try {
        const json = JSON.parse(text);
        console.log(JSON.stringify(json, null, 2).slice(0, 4000));
      } catch {
        console.log(text.slice(0, 1500));
      }
    } else {
      console.log(text.slice(0, 800));
    }
  } catch (e) {
    console.log('FAIL', e.message);
  }
}
