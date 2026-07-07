import fs from 'fs';
import https from 'https';
import sharp from 'sharp';

const headers = { Referer: 'https://www.gov.cn/', 'User-Agent': 'Mozilla/5.0' };

async function dl(dest, url, referer = 'https://www.gov.cn/') {
  const res = await fetch(url, { headers: { ...headers, Referer: referer } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync('public/assets/carousel', { recursive: true });
  fs.writeFileSync(dest, buf);
  return buf.length;
}

// 已知 gov.cn 图片
const known = [
  ['01-hasina', 'https://www.gov.cn/yaowen/liebiao/202407/W020240710725266874504_ORIGIN.jpg'],
  ['02-hasina2', 'https://www.gov.cn/yaowen/liebiao/202407/W020240710725271262085_ORIGIN.jpg'],
];

for (const [name, url] of known) {
  try {
    const size = await dl(`public/assets/carousel/${name}.jpg`, url);
    console.log('OK', name, size);
  } catch (e) {
    console.log('FAIL', name, e.message);
  }
}

// 从用户截图裁剪轮播帧
const crops = [
  {
    name: '03-agri',
    src: 'C:/Users/24122/.cursor/projects/f-project-financial-management/assets/c__Users_24122_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-da39edf4-5d12-4c6d-81ab-af05048c49ea.png',
    top: 0.02,
    height: 0.96,
  },
  {
    name: '04-cpc105',
    src: 'C:/Users/24122/.cursor/projects/f-project-financial-management/assets/c__Users_24122_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-e3fdb05b-8650-487d-aba6-64baefaca056.png',
    top: 0.02,
    height: 0.96,
  },
  {
    name: '05-handshake',
    src: 'C:/Users/24122/.cursor/projects/f-project-financial-management/assets/c__Users_24122_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-09631b2f-3b25-4811-8868-f228089fed74.png',
    top: 0.42,
    height: 0.28,
    left: 0.02,
    width: 0.62,
  },
];

for (const c of crops) {
  if (!fs.existsSync(c.src)) {
    console.log('skip missing', c.name);
    continue;
  }
  const meta = await sharp(c.src).metadata();
  const extract = {
    left: Math.round((c.left ?? 0) * meta.width),
    top: Math.round(c.top * meta.height),
    width: Math.round((c.width ?? 1) * meta.width),
    height: Math.round(c.height * meta.height),
  };
  await sharp(c.src)
    .extract(extract)
    .resize(1560, 720, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(`public/assets/carousel/${c.name}.jpg`);
  console.log('cropped', c.name, extract);
}

// 协会风采图
const expand = [
  ['06-efmac1', 'https://pcweb.shanghuiyidisk.com/shy/623/new/expand/20250414/343ee2ae09a541b18417e3081ba0d4ad/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg'],
  ['07-efmac2', 'https://pcweb.shanghuiyidisk.com/shy/623/new/expand/20250429/7fd15466e6cb4b5d81a439a5ac5aef4f/%E9%A3%8E%E9%87%87%E5%9B%BE.jpeg'],
  ['08-banner04', 'https://pcweb.shanghuiyidisk.com/shy/0/pcweb/banner/banner_04.jpg'],
];

for (const [name, url] of expand) {
  try {
    const size = await dl(`public/assets/carousel/${name}.jpg`, url, 'https://www.efmac.net/');
    console.log('OK', name, size);
  } catch (e) {
    console.log('FAIL', name, e.message);
  }
}
