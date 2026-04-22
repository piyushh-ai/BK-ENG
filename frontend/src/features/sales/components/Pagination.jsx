import React from "react";

const Pagination = React.memo(({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages, totalDocuments, pageSize } = pagination;
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalDocuments);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  const btnBase = {
    padding: "7px 14px", borderRadius: "8px",
    border: "1.5px solid var(--color-outline-variant)",
    background: "var(--color-surface-container-lowest)",
    cursor: "pointer", fontSize: "13px",
    color: "var(--color-on-surface-variant)",
    fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "24px", padding: "0 4px", fontFamily: "'DM Sans', sans-serif", flexWrap: "wrap", gap: "12px" }}>
      <span style={{ fontSize: "12.5px", color: "var(--color-on-surface-variant)" }}>
        {from}–{to} of <strong>{totalDocuments}</strong>
      </span>
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          id="pagination-prev"
          style={{ ...btnBase, opacity: !pagination.hasPrevPage ? 0.4 : 1 }}
        >
          ← Prev
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} style={{ padding: "7px 4px", color: "var(--color-outline)", fontSize: "13px" }}>…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              id={`pagination-page-${p}`}
              style={{
                width: "36px", height: "36px", borderRadius: "8px",
                border: p === currentPage ? "none" : "1.5px solid var(--color-outline-variant)",
                background: p === currentPage ? "var(--color-primary)" : "var(--color-surface-container-lowest)",
                color: p === currentPage ? "var(--color-on-primary)" : "var(--color-on-surface-variant)",
                cursor: "pointer", fontSize: "13px",
                fontWeight: p === currentPage ? 700 : 400,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!pagination.hasNextPage}
          id="pagination-next"
          style={{ ...btnBase, opacity: !pagination.hasNextPage ? 0.4 : 1 }}
        >
          Next →
        </button>
      </div>
    </div>
  );
});

export default Pagination;
