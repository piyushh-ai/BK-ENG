import React from "react";

const STOCK = {
  out:  { label: "Out of Stock", color: "#DC2626", bg: "rgba(220,38,38,0.07)",  border: "rgba(220,38,38,0.18)",  dot: "#DC2626", strip: "#DC2626" },
  low:  { label: "Low Stock",    color: "#D97706", bg: "rgba(217,119,6,0.08)",  border: "rgba(217,119,6,0.20)",  dot: "#D97706", strip: "#D97706" },
  good: { label: "In Stock",     color: "#059669", bg: "rgba(5,150,105,0.07)",  border: "rgba(5,150,105,0.18)", dot: "#059669", strip: "#059669" },
};

const getLevel = (qty) => {
  const q = parseInt(qty);
  if (isNaN(q) || q === 0) return "out";
  if (q <= 5) return "low";
  return "good";
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) return "Updated today";
    if (diffDays === 1) return "Updated yesterday";
    if (diffDays < 7) return `Updated ${diffDays}d ago`;
    return `Updated ${d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: diffDays > 365 ? "2-digit" : undefined })}`;
  } catch {
    return null;
  }
};

const ProductCard = React.memo(({ item }) => {
  const level = getLevel(item.quantity);
  const sc = STOCK[level];
  const hasMrp = item.mrp !== undefined && item.mrp !== null && item.mrp !== "";
  const lastUpdated = formatDate(item.updatedAt || item.lastUpdated || item.updated_at);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;700&display=swap');

        /* ─── Card Shell ─── */
        .pc2-card {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E5E7EB;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          position: relative;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          cursor: default;
          animation: pc2FadeUp 0.35s ease both;
        }
        @keyframes pc2FadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .pc2-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
          border-color: #D1D5DB;
          transform: translateY(-2px);
        }

        /* ─── Status Strip ─── */
        .pc2-strip { height: 3px; flex-shrink: 0; }

        /* ─── Top Row: Part No + Status ─── */
        .pc2-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          padding: 14px 16px 0;
        }
        .pc2-partno-group { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .pc2-partno-label {
          font-size: 9.5px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #9CA3AF;
        }
        .pc2-partno {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px; font-weight: 700;
          color: #111827;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 160px;
          letter-spacing: 0.03em;
        }

        /* Status badge */
        .pc2-status {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 9px; border-radius: 20px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.03em; white-space: nowrap;
          border: 1px solid; flex-shrink: 0;
        }
        .pc2-status-dot {
          width: 5px; height: 5px; border-radius: 50%;
          flex-shrink: 0;
          animation: pc2Pulse 2.4s ease infinite;
        }
        @keyframes pc2Pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

        /* ─── Item Name ─── */
        .pc2-name-wrap { padding: 10px 16px 0; }
        .pc2-name {
          font-size: 15px; font-weight: 700;
          color: #111827; line-height: 1.3;
          letter-spacing: -0.2px;
        }

        /* ─── Sheet tag ─── */
        .pc2-sheet-wrap { padding: 6px 16px 0; }
        .pc2-sheet {
          display: inline-flex; align-items: center; gap: 5px;
          background: #F3F4F6; border: 1px solid #E5E7EB;
          border-radius: 6px; padding: 3px 9px;
          font-size: 11px; font-weight: 500; color: #6B7280;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%; align-self: flex-start;
        }
        .pc2-sheet svg { flex-shrink: 0; opacity: 0.6; }

        /* ─── Divider ─── */
        .pc2-divider { height: 1px; background: #F3F4F6; margin: 12px 16px 0; }

        /* ─── Metrics ─── */
        .pc2-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 12px 16px;
        }
        .pc2-metric {
          border-radius: 12px;
          padding: 11px 13px;
          display: flex; flex-direction: column; gap: 3px;
          border: 1px solid;
        }
        .pc2-metric-label {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          opacity: 0.6;
        }
        .pc2-metric-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 28px; font-weight: 700;
          line-height: 1; letter-spacing: -1px;
        }
        .pc2-metric-unit {
          font-size: 10px; font-weight: 500; opacity: 0.55;
        }

        /* MRP block */
        .pc2-mrp-block {
          border-radius: 12px; padding: 11px 13px;
          display: flex; flex-direction: column; gap: 3px;
          background: #F5F3FF; border: 1px solid rgba(109,40,217,0.15);
        }
        .pc2-mrp-label {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #7C3AED; opacity: 0.7;
        }
        .pc2-mrp-val {
          display: flex; align-items: baseline; gap: 1px;
          color: #111827;
        }
        .pc2-mrp-sym { font-size: 14px; font-weight: 700; color: #7C3AED; }
        .pc2-mrp-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 24px; font-weight: 700;
          line-height: 1; letter-spacing: -1px; color: #111827;
        }
        .pc2-mrp-unit { font-size: 10px; color: #7C3AED; opacity: 0.6; font-weight: 500; }

        /* ─── Description ─── */
        .pc2-desc {
          margin: 0 16px;
          background: #F9FAFB; border: 1px solid #E5E7EB;
          border-radius: 10px; padding: 9px 12px;
        }
        .pc2-desc-label {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #9CA3AF; margin-bottom: 3px;
        }
        .pc2-desc-text { font-size: 12px; color: #6B7280; line-height: 1.5; }

        /* ─── Footer: Last Updated ─── */
        .pc2-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px 14px;
          margin-top: auto;
          gap: 8px;
        }
        .pc2-updated {
          display: flex; align-items: center; gap: 5px;
          font-size: 10.5px; font-weight: 500; color: #9CA3AF;
        }
        .pc2-updated svg { opacity: 0.6; flex-shrink: 0; }
        .pc2-sno {
          font-size: 10px; color: #D1D5DB; font-weight: 500;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ─── Mobile ─── */
        @media (max-width: 768px) {
          .pc2-name { font-size: 14px; }
          .pc2-metric-value { font-size: 24px; }
          .pc2-mrp-num { font-size: 20px; }
          .pc2-partno { font-size: 12px; }
          .pc2-metrics { padding: 10px 14px; gap: 8px; }
          .pc2-top { padding: 12px 14px 0; }
          .pc2-name-wrap { padding: 8px 14px 0; }
          .pc2-sheet-wrap { padding: 5px 14px 0; }
          .pc2-divider { margin: 10px 14px 0; }
          .pc2-desc { margin: 0 14px; }
          .pc2-footer { padding: 8px 14px 12px; }
        }
      `}</style>

      <div className="pc2-card">

        {/* Colored status strip at top */}
        <div className="pc2-strip" style={{ background: sc.strip }} />

        {/* Part No + Status */}
        <div className="pc2-top">
          <div className="pc2-partno-group">
            <span className="pc2-partno-label">Part No.</span>
            <span className="pc2-partno" title={item.partno}>{item.partno || "N/A"}</span>
          </div>
          <span className="pc2-status" style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>
            <span className="pc2-status-dot" style={{ background: sc.dot }} />
            {sc.label}
          </span>
        </div>

        {/* Item Name */}
        <div className="pc2-name-wrap">
          <div className="pc2-name">{item.itemName || "Unnamed Item"}</div>
        </div>

        {/* Sheet Tag */}
        {item.sheetName && (
          <div className="pc2-sheet-wrap">
            <span className="pc2-sheet">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="0.75" y="0.75" width="8.5" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M2.5 4h5M2.5 6h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {item.sheetName}
            </span>
          </div>
        )}

        <div className="pc2-divider" />

        {/* Metrics: Qty + MRP */}
        <div className="pc2-metrics">
          {/* Quantity */}
          <div className="pc2-metric" style={{ background: sc.bg, borderColor: sc.border, color: sc.color }}>
            <span className="pc2-metric-label">Quantity</span>
            <span className="pc2-metric-value">{item.quantity ?? "—"}</span>
            <span className="pc2-metric-unit">units avail.</span>
          </div>

          {/* MRP or placeholder */}
          {hasMrp ? (
            <div className="pc2-mrp-block">
              <span className="pc2-mrp-label">MRP</span>
              <div className="pc2-mrp-val">
                <span className="pc2-mrp-sym">₹</span>
                <span className="pc2-mrp-num">{item.mrp}</span>
              </div>
              <span className="pc2-mrp-unit">incl. tax</span>
            </div>
          ) : (
            <div className="pc2-mrp-block" style={{ opacity: 0.45 }}>
              <span className="pc2-mrp-label">MRP</span>
              <div className="pc2-mrp-val">
                <span className="pc2-mrp-num" style={{ fontSize: "16px", letterSpacing: 0, color: "#9CA3AF" }}>N/A</span>
              </div>
              <span className="pc2-mrp-unit">not listed</span>
            </div>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <div className="pc2-desc" style={{ marginBottom: "12px" }}>
            <div className="pc2-desc-label">Description</div>
            <div className="pc2-desc-text">{item.description}</div>
          </div>
        )}

        {/* Footer */}
        <div className="pc2-footer">
          <div className="pc2-updated">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            {lastUpdated || "No update info"}
          </div>
          {item.sno && <span className="pc2-sno">#{item.sno}</span>}
        </div>

      </div>
    </>
  );
});

export default ProductCard;