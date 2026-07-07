const headers = {
  Referer: 'https://www.efmac.net/',
  'User-Agent': 'Mozilla/5.0',
};

const urls = [
  'https://www.efmac.net/article/13_1301_1_1002.html?shId=623',
  'https://www.efmac.net/article/77_7751_0_0.html?shId=623',
  'https://www.efmac.net/article/16_0_0_0.html?shId=623',
  'https://www.efmac.net/subject/16_2_0_2351?shId=623',
  'https://www.efmac.net/companyJob/1_0_0_0.html',
];

for (const url of urls) {
  const res = await fetch(url, { headers });
  const text = await res.text();
  console.log('\n===', url, res.status, text.length, '===');
  const title = text.match(/<title>([^<]+)/)?.[1];
  console.log('title:', title);
  const imgs = [...text.matchAll(/https:\/\/pcweb\.shanghuiyidisk\.com[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => m[0]);
  console.log('expand imgs:', [...new Set(imgs)].filter((u) => u.includes('expand')).slice(0, 5).join('\n'));
  const nuxtTitles = [...text.matchAll(/title:"([^"]{10,})"/g)].map((m) => m[1]).slice(0, 5);
  console.log('nuxt titles:', nuxtTitles.join(' | '));
}
