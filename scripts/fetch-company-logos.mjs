import fs from 'fs';

const headers = { Referer: 'https://www.efmac.net/', 'User-Agent': 'Mozilla/5.0' };
const html = await (await fetch('https://www.efmac.net/companyJob/1_0_0_0.html', { headers })).text();
const urls = [...html.matchAll(/https:\/\/pcweb\.shanghuiyidisk\.com[^"'\s>)]+/gi)].map((m) => m[0]);
console.log('count', urls.length);
[...new Set(urls)].filter((u) => u.includes('logo') || u.includes('company') || u.includes('.jpg') || u.includes('.png')).slice(0, 40).forEach((u) => console.log(u));

const payload = html.includes('__NUXT__') ? html.slice(html.indexOf('window.__NUXT__=')) : '';
const all = [...payload.matchAll(/https:\\u002F\\u002Fpcweb\.shanghuiyidisk\.com[^"\\]+/g)].map((m) => m[0].replace(/\\u002F/g, '/'));
console.log('nuxt imgs', [...new Set(all)].slice(0, 20).join('\n'));
