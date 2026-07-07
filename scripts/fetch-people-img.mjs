import http from 'http';

http.get('http://pic.people.com.cn/n1/2026/0626/c426981-40748293.html', (r) => {
  let d = '';
  r.on('data', (c) => (d += c));
  r.on('end', () => {
    const imgs = [...d.matchAll(/src=\"([^\"]+\.(?:jpg|jpeg|png))\"/gi)].map((m) => m[1]);
    console.log([...new Set(imgs)].slice(0, 20).join('\n'));
  });
});
