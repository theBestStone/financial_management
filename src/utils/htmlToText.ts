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

export interface ParsedArticleContent {
  paragraphs: string[];
  thumb?: string;
  imageCaption?: string;
}

/** 从富文本提取正文段落、配图与说明 */
export function htmlToArticleContent(html = ''): ParsedArticleContent {
  if (!html) return { paragraphs: [] };

  let thumb: string | undefined;
  let imageCaption: string | undefined;
  let cleaned = html;

  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  if (imgMatch) {
    thumb = imgMatch[1];
    const afterImg = html.slice(html.indexOf(imgMatch[0]) + imgMatch[0].length);
    const captionMatch =
      afterImg.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i) ??
      afterImg.match(/<p[^>]*text-align\s*:\s*center[^>]*>([\s\S]*?)<\/p>/i) ??
      afterImg.match(/<div[^>]*background[^>]*>([\s\S]*?)<\/div>/i);
    if (captionMatch) {
      imageCaption = captionMatch[1]
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();
    }
  }

  cleaned = cleaned
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, '');

  return {
    paragraphs: htmlToParagraphs(cleaned),
    thumb,
    imageCaption,
  };
}
