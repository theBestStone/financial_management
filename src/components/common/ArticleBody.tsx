import type { LiveArticleDetail } from '../../services/efmacApi';
import EfmacImage from './EfmacImage';

interface ArticleBodyProps {
  article: LiveArticleDetail;
}

function renderParagraph(text: string, index: number) {
  const headingTitles = new Set([
    '第一章　总则',
    '第二章　业务范围',
    '第三章　会员',
    '第四章　组织机构',
    '第五章　资产管理',
    '第六章　章程修改与终止',
    '第一届协会领导',
  ]);
  if (headingTitles.has(text)) {
    return (
      <p key={index} className="article-section-heading">
        {text}
      </p>
    );
  }

  if (/^[一二三四五六七八九十]、/.test(text) || /^(会长|副会长|秘书长|副秘书长|主 席|副主席|办公室主任|主 任|副 主 任|电 话)：?$/.test(text)) {
    return (
      <p key={index} className="article-strong-line">
        {text}
      </p>
    );
  }

  const labelMatch = text.match(/^(愿景|使命|目标)([：:])/);
  if (labelMatch) {
    const rest = text.slice(labelMatch[0].length);
    return (
      <p key={index}>
        <strong>
          {labelMatch[1]}
          {labelMatch[2]}
        </strong>
        {rest}
      </p>
    );
  }
  return <p key={index} className={text.length < 34 ? 'article-no-indent' : undefined}>{text}</p>;
}

/** 纯 React 段落渲染，不使用 HTML */
export default function ArticleBody({ article }: ArticleBodyProps) {
  const hasParagraphs = article.paragraphs.length > 0;
  const caption = article.imageCaption || article.title;
  const bodyModifier =
    article.categorySn === 7151
      ? 'article-body--charter'
      : [716152, 716250].includes(article.categorySn)
        ? 'article-body--plain'
        : '';

  return (
    <div className={`article-body ${bodyModifier}`}>
      {hasParagraphs ? (
        article.paragraphs.map((para, i) => renderParagraph(para, i))
      ) : (
        <>
          {article.summary && <p>{article.summary}</p>}
          {!article.summary && <p className="text-muted">暂无正文内容</p>}
        </>
      )}

      {article.thumb && (
        <figure className="article-body-image">
          <EfmacImage src={article.thumb} alt={article.title} />
          {caption && <figcaption className="article-body-image-caption">{caption}</figcaption>}
        </figure>
      )}
    </div>
  );
}
