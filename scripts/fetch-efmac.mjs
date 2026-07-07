const headers = {
  Referer: 'https://www.efmac.net/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

const urls = [
  'https://www.efmac.net/',
  'https://www.efmac.net/article/13_1301_0_0.html?shId=623',
  'https://www.efmac.net/article/detail/7751.html?shId=623',
];

import fs from 'fs';

for (const url of urls) {
  try {
    const res = await fetch(url, { headers, redirect: 'follow' });
    const text = await res.text();
    const name = url.replace(/[^a-z0-9]+/gi, '_').slice(0, 60);
    fs.writeFileSync(`temp_${name}.html`, text, 'utf8');
    console.log(url, res.status, text.length);
    const expand = [...text.matchAll(/https:\/\/pcweb\.shanghuiyidisk\.com[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => m[0]);
    console.log('images:', [...new Set(expand)].slice(0, 10).join('\n  '));
  } catch (e) {
    console.log('FAIL', url, e.message);
  }
}
