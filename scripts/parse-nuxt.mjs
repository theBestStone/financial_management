import fs from 'fs';

const html = fs.readFileSync('temp_efmac.html', 'utf8');
const start = html.indexOf('window.__NUXT__=');
const end = html.indexOf('</script>', start);
const raw = html.slice(start + 'window.__NUXT__='.length, end);

// Save raw payload snippet
fs.writeFileSync('scripts/nuxt-payload-raw.js', raw.slice(0, 500000));

// Search patterns
const patterns = {
  expand: /expand\/\d{8}\/[a-f0-9]+[^"'\\]+/gi,
  articleId: /articleId[:=]\d+/g,
  categorySn: /categorySn[:=]\d+/g,
  thumb: /thumb[^"'\\]{0,120}/gi,
  banner: /banner[^"'\\]{0,120}/gi,
  titleZh: /[\u4e00-\u9fff]{10,80}/g,
};

for (const [name, re] of Object.entries(patterns)) {
  const hits = [...new Set([...raw.matchAll(re)].map((m) => m[0]))];
  console.log(`\n=== ${name} (${hits.length}) ===`);
  hits.slice(0, 25).forEach((h) => console.log(h.slice(0, 200)));
}

// Try eval payload in sandbox - risky but nuxt uses function format
try {
  const fn = new Function(`return ${raw}`);
  const data = fn();
  fs.writeFileSync('scripts/nuxt-payload.json', JSON.stringify(data, null, 2).slice(0, 500000));
  console.log('\nPayload keys:', Object.keys(data));
  if (data.data) console.log('data keys:', Object.keys(data.data[0] || data.data));
  if (data.state) console.log('state sample:', JSON.stringify(data.state).slice(0, 2000));
} catch (e) {
  console.log('\nEval failed:', e.message);
}
