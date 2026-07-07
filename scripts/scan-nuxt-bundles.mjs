import fs from 'fs';

const headers = {
  Referer: 'https://www.efmac.net/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

const html = fs.readFileSync('temp_efmac.html', 'utf8');
const base = 'https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/';

const jsFiles = new Set();
for (const m of html.matchAll(/\/_nuxt\/([^"']+\.js)/g)) {
  jsFiles.add(m[1]);
}

const allUrls = new Set();
const titles = new Set();
const articleSnippets = [];

for (const file of jsFiles) {
  try {
    const js = await (await fetch(`${base}${file}`, { headers })).text();
    for (const m of js.matchAll(/https:\\\/\\\/pcweb\.shanghuiyidisk\.com[^"']+/g)) {
      allUrls.add(m[0].replace(/\\\//g, '/'));
    }
    for (const m of js.matchAll(/pcweb\.shanghuiyidisk\.com[^"'\\]+/g)) {
      allUrls.add('https://' + m[0].split('?')[0]);
    }
    for (const m of js.matchAll(/articleTitle:"([^"]{8,120})"/g)) {
      titles.add(m[1]);
    }
    for (const m of js.matchAll(/title:"([^"]{8,120})"/g)) {
      if (!m[1].includes('http') && !m[1].includes('px')) titles.add(m[1]);
    }
    if (js.includes('carousel') || js.includes('banner') || js.includes('getHomePage')) {
      articleSnippets.push({ file, len: js.length });
    }
  } catch (e) {
    // ignore
  }
}

console.log('JS files:', jsFiles.size);
console.log('\n=== CDN URLs ===');
[...allUrls].sort().forEach((u) => console.log(u));

console.log('\n=== Titles sample ===');
[...titles].slice(0, 40).forEach((t) => console.log(t));

console.log('\n=== Interesting JS ===');
articleSnippets.forEach((s) => console.log(s.file, s.len));

fs.writeFileSync('scripts/efmac-bundle-urls.txt', [...allUrls].sort().join('\n'));
