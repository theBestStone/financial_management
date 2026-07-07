import fs from 'fs';

const html = fs.readFileSync('temp_home.html', 'utf8');
const decoded = html.replace(/\\u002F/g, '/');
const urls = [...decoded.matchAll(/https:\/\/pcweb\.shanghuiyidisk\.com[^"\\)\s]+/g)].map((m) => m[0]);
console.log([...new Set(urls)].join('\n'));
