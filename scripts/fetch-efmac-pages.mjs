import fs from 'fs';

const headers = {
  Referer: 'https://www.efmac.net/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

const pages = [
  'https://www.efmac.net/',
  'https://www.efmac.net/article/13_1301_0_0.html?shId=623',
  'https://www.efmac.net/article/13_1302_0_0.html?shId=623',
  'https://www.efmac.net/article/7751.html?shId=623',
  'https://www.efmac.net/companyJob/623_0_0.html?shId=623',
];

const all = new Set();

for (const url of pages) {
  try {
    const html = await (await fetch(url, { headers })).text();
    const name = url.replace(/https:\/\/www\.efmac\.net\//, '').replace(/[/?=]/g, '_');
    fs.writeFileSync(`temp_page_${name}.html`, html);
    for (const m of html.matchAll(/https:\/\/pcweb\.shanghuiyidisk\.com[^"'\s>)]+/gi)) {
      all.add(m[0].replace(/&amp;/g, '&').split('?')[0]);
    }
    for (const m of html.matchAll(/https:\\u002F\\u002Fpcweb\.shanghuiyidisk\.com[^"\\]+/g)) {
      all.add(m[0].replace(/\\u002F/g, '/').split('?')[0]);
    }
    console.log(url, 'images:', [...all].length);
  } catch (e) {
    console.log(url, 'ERR', e.message);
  }
}

console.log('\n=== ALL UNIQUE CDN (no query) ===');
[...all].sort().forEach((u) => console.log(u));

// extract article titles from list page
const listHtml = fs.readFileSync('temp_page_article_13_1301_0_0.html_shId_623.html', 'utf8');
const titles = [...listHtml.matchAll(/>([^<]{10,100})<\/a>/g)].map((m) => m[1].trim()).filter((t) => /[\u4e00-\u9fff]/.test(t));
console.log('\n=== List titles ===');
titles.slice(0, 15).forEach((t) => console.log(t));
