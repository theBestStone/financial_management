import fs from 'fs';

const headers = { Referer: 'https://www.gov.cn/', 'User-Agent': 'Mozilla/5.0' };

async function grab(name, url) {
  try {
    const html = await (await fetch(url, { headers })).text();
    if (!html.includes('DOCTYPE')) console.log(name, 'short', html.length);
    const img = html.match(/\.\/(W[0-9_]+(?:ORIGIN)?\.jpg)/i)?.[1];
    console.log(name, url, img || 'no img');
    if (!img) return;
    const imgUrl = url.replace(/[^/]+$/, '') + img;
    const buf = Buffer.from(await (await fetch(imgUrl, { headers })).arrayBuffer());
    fs.writeFileSync(`public/assets/carousel/${name}.jpg`, buf);
    console.log(' saved', buf.length);
  } catch (e) {
    console.log(name, e.message);
  }
}

const urls = [
  ['09-kenya', 'https://www.gov.cn/yaowen/liebiao/202604/content_7032100.htm'],
  ['10-union100', 'https://www.gov.cn/yaowen/liebiao/202604/content_7031500.htm'],
  ['11-agri-gov', 'https://www.gov.cn/yaowen/liebiao/202603/content_7034567.htm'],
];

for (const [n, u] of urls) await grab(n, u);

// 备用：新华网图片
try {
  const html = await (await fetch('https://www.news.cn/politics/leaders/20260703/de0710be19ef445bb6b72bb96714b10e/c.html', { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
  const img = html.match(/https:\/\/[^\"']+\.(?:jpg|jpeg)/i)?.[0];
  console.log('xinhua', img);
} catch (e) {
  console.log('xinhua fail');
}
