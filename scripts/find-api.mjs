import fs from 'fs';

const headers = { Referer: 'https://www.efmac.net/', 'User-Agent': 'Mozilla/5.0' };
const html = fs.readFileSync('temp_efmac.html', 'utf8');
const base = 'https://static.xiehuiyi.com/pcWeb_nuxt3/prod/5.5.0.0610.2111/_nuxt/';
const entry = html.match(/entry\.([a-f0-9]+)\.js/)?.[1];
const js = await (await fetch(`${base}entry.${entry}.js`, { headers })).text();

const apis = [...new Set([...js.matchAll(/\/pcWeb\/[a-zA-Z\/]+/g)].map((m) => m[0]))];
console.log('API paths:', apis.sort().join('\n'));

const homeApis = apis.filter((a) => /home|banner|headline|article|module/i.test(a));
for (const path of homeApis.slice(0, 30)) {
  const url = `https://pcweb.xiehuiyi.com${path}?shId=623&siteId=357`;
  try {
    const res = await fetch(url, {
      headers: {
        ...headers,
        Origin: 'https://www.efmac.net',
        Accept: 'application/json',
      },
    });
    const text = await res.text();
    if (res.ok && text.length > 50) {
      console.log('\nOK', url, text.slice(0, 400));
      fs.writeFileSync(`scripts/api-${path.replace(/\//g, '_')}.json`, text);
    }
  } catch {}
}

// search for headline in all chunks
const chunks = [...new Set([...html.matchAll(/\/_nuxt\/([a-zA-Z0-9_.-]+\.js)/g)].map((m) => m[1]))];
let expandUrls = new Set();
for (const chunk of chunks) {
  try {
    const cjs = await (await fetch(base + chunk, { headers })).text();
    for (const m of cjs.matchAll(/https:\\\/\\\/pcweb\.shanghuiyidisk\.com\\\/shy\\\/623\\\/new\\\/expand[^"']+/g)) {
      expandUrls.add(m[0].replace(/\\\//g, '/'));
    }
    for (const m of cjs.matchAll(/shy\\\/623\\\/new\\\/expand[^"']+/g)) {
      expandUrls.add('https://pcweb.shanghuiyidisk.com/' + m[0].replace(/\\\//g, '/'));
    }
  } catch {}
}
console.log('\nExpand URLs from chunks:');
[...expandUrls].forEach((u) => console.log(u));
