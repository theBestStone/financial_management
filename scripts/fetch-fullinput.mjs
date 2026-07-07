import fs from 'fs';

const headers = {
  Referer: 'https://www.efmac.net/',
  'User-Agent': 'Mozilla/5.0',
};

const urls = [
  'https://pcweb.shanghuiyidisk.com/shy/623/fullInput/txt/20260206/a8d5cf4dd3164cdb87511438b4c8a887/fullInput-1770346116838.txt',
  'https://pcweb.shanghuiyidisk.com/shy/super/fullInput-1764552300041.txt',
];

for (const url of urls) {
  const res = await fetch(url, { headers });
  const text = await res.text();
  const name = url.split('/').slice(-2).join('_');
  fs.writeFileSync(`scripts/${name}.json`, text);
  console.log('\n===', url, res.status, text.length, '===');
  console.log(text.slice(0, 2000));

  const imgs = [...text.matchAll(/https:\/\/pcweb\.shanghuiyidisk\.com[^"'\s]+/g)].map((m) => m[0]);
  if (imgs.length) {
    console.log('\nImages:');
    [...new Set(imgs)].forEach((u) => console.log(u));
  }
}

// parse nuxt payload for fullInput references
const html = fs.readFileSync('temp_efmac.html', 'utf8');
const payload = html.slice(html.indexOf('window.__NUXT__='), html.indexOf('</script>', html.indexOf('window.__NUXT__=')));
const fullInputs = [...payload.matchAll(/fullInput[^"']+\.txt/g)].map((m) => m[0]);
console.log('\nfullInput refs:', [...new Set(fullInputs)]);

// extract article titles from payload if any
const titles = [...payload.matchAll(/articleTitle:"([^"]+)"/g)].map((m) => m[1]);
console.log('\narticle titles count:', titles.length);
titles.slice(0, 20).forEach((t) => console.log(t));

const thumbs = [...payload.matchAll(/thumbUrl:"([^"]+)"/g)].map((m) => m[1].replace(/\\u002F/g, '/'));
console.log('\nthumbs count:', thumbs.length);
[...new Set(thumbs)].slice(0, 30).forEach((t) => console.log(t));
