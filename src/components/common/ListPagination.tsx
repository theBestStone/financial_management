import { useEffect, useState } from 'react';

interface ListPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export default function ListPagination({
  page,
  totalPages,
  total,
  pageSize,
  pageSizeOptions = [10, 20, 30, 50],
  onPageChange,
  onPageSizeChange,
}: ListPaginationProps) {
  const [gotoValue, setGotoValue] = useState(String(page));

  useEffect(() => {
    setGotoValue(String(page));
  }, [page]);

  const handleGoto = () => {
    const next = Number(gotoValue);
    if (Number.isNaN(next) || next < 1 || next > totalPages) return;
    onPageChange(next);
  };

  const pageButtons =
    totalPages <= 7
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : [1, 2, 3, 'ellipsis', totalPages];

  return (
    <div className="list-pagination">
      <span className="list-pagination-total">共 {total} 条</span>

      {onPageSizeChange && (
        <select
          className="list-pagination-size"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}条/页
            </option>
          ))}
        </select>
      )}

      <button
        type="button"
        className="list-pagination-btn"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        上一页
      </button>

      {pageButtons.map((p, index) =>
        typeof p === 'number' ? (
          <button
            key={p}
            type="button"
            className={`list-pagination-btn ${p === page ? 'active' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="list-pagination-ellipsis">
            …
          </span>
        )
      )}

      <button
        type="button"
        className="list-pagination-btn"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        下一页
      </button>

      <span className="list-pagination-goto">
        前往
        <input
          type="text"
          value={gotoValue}
          onChange={(e) => setGotoValue(e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => e.key === 'Enter' && handleGoto()}
        />
        页
      </span>
    </div>
  );
}
