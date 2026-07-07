import type { LiveArticleDetail } from '../../services/efmacApi';

interface ArticleBodyProps {
  article: LiveArticleDetail;
}

/** 纯 React 段落渲染，不使用 HTML */
export default function ArticleBody({ article }: ArticleBodyProps) {
  if (article.paragraphs.length === 0) {
    return (
      <div className="article-body">
        {article.summary && <p>{article.summary}</p>}
        {!article.summary && <p className="text-muted">暂无正文内容</p>}
      </div>
    );
  }

  return (
    <div className="article-body">
      {article.paragraphs.map((para: string, i: number) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}
