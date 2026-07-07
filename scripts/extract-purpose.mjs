import fs from 'fs';

const html = fs.readFileSync('temp_https_www_efmac_net_.html', 'utf8');
const payload = html.slice(html.indexOf('window.__NUXT__='));

const idx = payload.indexOf('purpose');
console.log('purpose occurrences:', (payload.match(/purpose/g) || []).length);
let pos = 0;
for (let i = 0; i < 5; i++) {
  pos = payload.indexOf('purpose', pos);
  if (pos < 0) break;
  console.log('\n---', i, '---');
  console.log(payload.slice(pos - 80, pos + 300));
  pos += 7;
}

// chamberGlobalSetting
const cg = payload.match(/chamberGlobalSetting:\{[^}]+\}/);
console.log('\nchamberGlobal:', cg?.[0]?.slice(0, 500));

// search for image paths near purpose
const imgNear = [...payload.matchAll(/purpose[^}]{0,200}/g)].map((m) => m[0]);
imgNear.forEach((s) => console.log('\nPURPOSE BLOCK:', s));
