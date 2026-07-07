/** 将 API 返回的富文本转为纯文本段落（React 直接渲染，不用 HTML） */
export function htmlToParagraphs(html = ''): string[] {
  if (!html) return [];
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
  return text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}
