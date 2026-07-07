import fs from 'fs';
import https from 'https';
import path from 'path';
import crypto from 'crypto';
import live from '../src/data/homeLive.json' with { type: 'json' };

const REFERER = 'https://www.efmac.net/';
const ASSET_ROOT = 'public/assets';
const MAP_FILE = 'src/data/localAssetMap.json';

function normalizeKey(url) {
  if (!url) return '';
  return url
    .replace(/^https?:\/\/(console|pcweb)\.shanghuiyidisk\.com/i, '')
    .replace(/%40h_1280/gi, '')
    .split('?')[0];
}

function urlVariants(url) {
  const keys = new Set();
  const raw = url.split('?')[0];
  keys.add(raw);
  keys.add(raw.replace('console.shanghuiyidisk.com', 'pcweb.shanghuiyidisk.com'));
  keys.add(raw.replace('pcweb.shanghuiyidisk.com', 'console.shanghuiyidisk.com'));
  keys.add(normalizeKey(raw));
  keys.add(`https://pcweb.shanghuiyidisk.com${normalizeKey(raw)}`);
  keys.add(`https://console.shanghuiyidisk.com${normalizeKey(raw)}`);
  return [...keys].filter(Boolean);
}

const STATIC_ASSETS = [
  ['logo.png', 'https://pcweb.shanghuiyidisk.com/shy/superChamber/37aad5a2af7fc1298942d7bb95f4fa5f_logo.png'],
  ['favicon.png', 'https://pcweb.shanghuiyidisk.com/shy/superChamber/37aad5a2af7fc1298942d7bb95f4fa5f_logo.png'],
  ['header.svg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/8b1d5974af6c4b50838710aa4dee9f74_home.svg'],
  ['page-bg.png', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/293acc8a4ca34d86a6cd27f7fdb17165_home.png'],
  ['float-sidebar.jpg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/87fdb9006508456f95d724f2befde5ef_home.jpg'],
  ['banner-04.jpg', 'https://pcweb.shanghuiyidisk.com/shy/0/pcweb/banner/banner_04.jpg'],
  ['qr-mina.png', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/33a834b90b1f41af87d7f0362fe3f00d_home.png'],
  ['qr-service.jpg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/cad191bcf52d4f9eaebdd7c1006d25a0_home.jpg'],
  ['qr-sub.jpeg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/c9e5bc13ae634d10b39dfd7963cc7c3f_home_snapshot.jpeg'],
  ['qr-tiktok.jpeg', 'https://pcweb.shanghuiyidisk.com/shy/623/pc/8405fd6373c84ba0afe1626c1ebab8da_home_snapshot.jpeg'],
];

function collectUrls(value, set) {
  if (!value) return;
  if (typeof value === 'string') {
    if (/shanghuiyidisk\.com|xiehuiyi\.com/i.test(value)) set.add(value.split('?')[0]);
    return;
  }
  if (Array.isArray(value)) value.forEach((item) => collectUrls(item, set));
  else if (typeof value === 'object') Object.values(value).forEach((item) => collectUrls(item, set));
}

function extFromUrl(url) {
  const clean = url.split('?')[0];
  const match = clean.match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toLowerCase() : 'bin';
}

function localNameForUrl(url) {
  const key = normalizeKey(url);
  const hash = crypto.createHash('md5').update(key).digest('hex').slice(0, 12);
  return `${hash}.${extFromUrl(url)}`;
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url.replace('console.shanghuiyidisk.com', 'pcweb.shanghuiyidisk.com'), {
        headers: { Referer: REFERER, 'User-Agent': 'Mozilla/5.0' },
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) return reject(new Error(`${url} -> ${res.statusCode}`));
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

async function saveAsset(url, relativePath) {
  const dest = path.join(ASSET_ROOT, relativePath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest)) {
    const buf = await download(url);
    fs.writeFileSync(dest, buf);
    console.log('saved', relativePath, buf.length);
  }
  return `/assets/${relativePath.replace(/\\/g, '/')}`;
}

const urlSet = new Set();
collectUrls(live, urlSet);
for (const [, url] of STATIC_ASSETS) urlSet.add(url);

const map = {};
const named = {};

for (const [name, url] of STATIC_ASSETS) {
  const localPath = await saveAsset(url, name);
  named[name] = localPath;
  for (const variant of urlVariants(url)) map[variant] = localPath;
}

let index = 0;
for (const url of urlSet) {
  const variants = urlVariants(url);
  if (variants.some((key) => map[key])) continue;
  const file = `remote/${localNameForUrl(url)}`;
  try {
    const localPath = await saveAsset(url, file);
    for (const key of variants) map[key] = localPath;
    index += 1;
  } catch (error) {
    console.warn('skip', url, error.message);
  }
}

fs.writeFileSync(MAP_FILE, JSON.stringify({ map, named }, null, 2));
console.log('mapped', Object.keys(map).length, 'urls');
