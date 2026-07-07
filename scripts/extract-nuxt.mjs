import fs from 'fs';

const html = fs.readFileSync('temp_home.html', 'utf8');
const start = html.indexOf('window.__NUXT__=');
const end = html.indexOf('</script>', start);
const payload = html.slice(start, end);

const strings = [...payload.matchAll(/categoryName:"([^"]+)"/g)].map((m) => m[1]);
console.log('categories:', [...new Set(strings)].join(', '));

const urls = [...payload.matchAll(/https:\\u002F\\u002F[^"\\]+/g)].map((m) =>
  m[0].replace(/\\u002F/g, '/')
);
console.log('\nimages:', [...new Set(urls.filter((u) => u.includes('pcweb') || u.includes('expand')))].slice(0, 15).join('\n'));
