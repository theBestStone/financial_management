import fs from 'fs';

const html = fs.readFileSync('temp_efmac.html', 'utf8');
const m = html.match(/index\.([a-f0-9]+)\.js/);
if (!m) {
  console.error('index hash not found');
  process.exit(1);
}

const base = 'https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/';
const js = await (await fetch(`${base}index.${m[1]}.js`, {
  headers: { Referer: 'https://www.efmac.net/' },
})).text();

const urls = new Set();
for (const match of js.matchAll(/pcweb\.shanghuiyidisk\.com[^"'\\]+/g)) {
  urls.add('https://' + match[0]);
}
for (const match of js.matchAll(/https:\\\/\\\/pcweb\.shanghuiyidisk\.com[^"']+/g)) {
  urls.add(match[0].replace(/\\\//g, '/'));
}

console.log([...urls].sort().join('\n'));
