import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const STOCK = {
  out:  { bg: "rgba(231,76,60,0.07)",  border: "rgba(231,76,60,0.22)",  color: "#C0392B", dot: "#E74C3C", label: "Out of Stock", strip: "#E74C3C" },
  low:  { bg: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.24)", color: "#A05C00", dot: "#F5A623", label: "Low Stock",    strip: "#F5A623" },
  good: { bg: "rgba(39,174,96,0.07)",  border: "rgba(39,174,96,0.22)",  color: "#1E8449", dot: "#27AE60", label: "In Stock",    strip: "#27AE60" },
};

const getLevel = (qty) => {
  const q = parseInt(qty);
  if (isNaN(q) || q === 0) return "out";
  if (q <= 5) return "low";
  return "good";
};

const ProductCard = React.memo(({ item }) => {
  const cardRef    = useRef(null);
  const shimmerRef = useRef(null);
  const qtyRef     = useRef(null);

  const level = getLevel(item.quantity);
  const sc    = STOCK[level];

  // ── Entrance animation ──────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.48, ease: "power3.out",
        onComplete: () => gsap.set(cardRef.current, { clearProps: "transform" }) }
    );
  }, []);

  // ── Mouse tilt + shimmer ────────────────────────────────────────
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * 5;
    const ry = ((x - rect.width  / 2) / rect.width)  * -5;

    gsap.to(cardRef.current, {
      rotateX: rx, rotateY: ry,
      transformPerspective: 900,
      boxShadow: `0 16px 40px rgba(0,0,0,0.10), ${ry * -1.2}px ${rx * -1.2}px 20px rgba(107,96,212,0.08)`,
      duration: 0.22, ease: "power2.out",
    });

    if (shimmerRef.current) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      shimmerRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.55) 0%, transparent 65%)`;
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0, y: 0,
      boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
      duration: 0.55, ease: "elastic.out(1, 0.6)",
    });
    if (shimmerRef.current) shimmerRef.current.style.background = "transparent";
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -4, duration: 0.28, ease: "power2.out" });
    if (qtyRef.current) {
      gsap.fromTo(qtyRef.current,
        { scale: 0.92 },
        { scale: 1, duration: 0.35, ease: "back.out(2.5)" }
      );
    }
  };

  const hasMrp = item.mrp !== undefined && item.mrp !== null && item.mrp !== "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

        .pc-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          cursor: default;
          transform-style: preserve-3d;
          will-change: transform;
          box-shadow: 0 1px 12px rgba(0,0,0,0.06);
          transition: border-color 0.22s ease;
          font-family: 'Instrument Sans', sans-serif;
        }
        .pc-card:hover {
          border-color: rgba(0,0,0,0.13);
        }

        /* Shimmer */
        .pc-shimmer {
          position: absolute; inset: 0; pointer-events: none;
          border-radius: 20px; z-index: 1; transition: background 0.08s;
        }

        /* ── Top accent strip ── */
        .pc-accent-strip {
          height: 3px;
          flex-shrink: 0;
        }

        /* ── Header: partno + stock badge ── */
        .pc-header {
          padding: 16px 18px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        /* Part No — now prominent */
        .pc-partno-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pc-partno-eyebrow {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #B0A9A3;
        }
        .pc-partno {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #1A1714;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 180px;
        }

        /* Stock badge */
        .pc-stock-pill {
          display: flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.03em;
          padding: 4px 10px 4px 8px; border-radius: 20px;
          white-space: nowrap; flex-shrink: 0;
          border: 1px solid;
        }
        .pc-stock-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
          animation: pcDotPulse 2.2s ease infinite;
        }
        @keyframes pcDotPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }

        /* ── Body ── */
        .pc-body {
          padding: 12px 18px 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Item name */
        .pc-name {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #1A1714;
          letter-spacing: -0.3px;
          line-height: 1.25;
          margin-bottom: 8px;
        }

        /* Sheet name */
        .pc-sheet-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #F5F3EF;
          color: #7A7370;
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 8px;
          margin-bottom: 16px;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border: 1px solid #EDE9E4;
          align-self: flex-start;
        }
        .pc-sheet-icon {
          flex-shrink: 0;
          opacity: 0.55;
        }

        /* Divider */
        .pc-divider {
          height: 1px;
          background: #F0EDE9;
          margin-bottom: 14px;
        }

        /* ── Metrics row ── */
        .pc-metrics {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        /* QTY block */
        .pc-qty-block {
          flex: 1;
          border-radius: 14px;
          padding: 12px 14px 11px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          border: 1px solid;
          position: relative;
          overflow: hidden;
        }
        .pc-qty-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.65;
        }
        .pc-qty-value {
          font-family: 'Syne', sans-serif;
          font-size: 30px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -1.5px;
        }
        .pc-qty-unit {
          font-size: 10px;
          font-weight: 500;
          opacity: 0.55;
          margin-top: 2px;
        }

        /* MRP block */
        .pc-mrp-block {
          flex: 1;
          background: #F9F7FD;
          border: 1px solid rgba(107,96,212,0.15);
          border-radius: 14px;
          padding: 12px 14px 11px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pc-mrp-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6B60D4;
          opacity: 0.75;
        }
        .pc-mrp-value {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #1A1714;
          line-height: 1;
          letter-spacing: -0.8px;
          display: flex;
          align-items: baseline;
          gap: 2px;
        }
        .pc-mrp-symbol {
          font-size: 15px;
          font-weight: 700;
          color: #6B60D4;
        }
        .pc-mrp-sub {
          font-size: 10px;
          color: #6B60D4;
          font-weight: 500;
          opacity: 0.6;
          margin-top: 2px;
        }

        /* ── Description ── */
        .pc-desc {
          margin-top: 12px;
          background: #F9F7F5;
          border: 1px solid #EDE9E4;
          border-radius: 12px;
          padding: 10px 13px;
        }
        .pc-desc-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #B0A9A3;
          margin-bottom: 4px;
        }
        .pc-desc-text {
          font-size: 12.5px;
          font-weight: 400;
          color: #6B6560;
          line-height: 1.55;
        }

        /* ── SNO watermark ── */
        .pc-sno {
          position: absolute;
          bottom: 11px; right: 14px;
          font-size: 10px;
          color: #C5BFB8;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          z-index: 2;
          letter-spacing: 0.04em;
        }
        .pc-card:hover .pc-sno { opacity: 1; }

        @media (max-width: 768px) {
          .pc-qty-value  { font-size: 26px; }
          .pc-mrp-value  { font-size: 20px; }
          .pc-name       { font-size: 15px; }
          .pc-partno     { font-size: 13px; }
        }
      `}</style>

      <div
        className="pc-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Shimmer layer */}
        <div className="pc-shimmer" ref={shimmerRef} />

        {/* SNO watermark */}
        {item.sno && <span className="pc-sno">#{item.sno}</span>}

        {/* Accent top strip */}
        <div className="pc-accent-strip" style={{ background: sc.strip }} />

        {/* Header: part no + stock badge */}
        <div className="pc-header">
          <div className="pc-partno-wrap">
            <span className="pc-partno-eyebrow">Part No.</span>
            <span className="pc-partno" title={item.partno}>{item.partno || "N/A"}</span>
          </div>
          <span
            className="pc-stock-pill"
            style={{
              background: sc.bg,
              color: sc.color,
              borderColor: sc.border,
            }}
          >
            <span className="pc-stock-dot" style={{ background: sc.dot }} />
            {sc.label}
          </span>
        </div>

        {/* Body */}
        <div className="pc-body">
          <div className="pc-name">{item.itemName || "Unnamed Item"}</div>

          {item.sheetName && (
            <span className="pc-sheet-tag">
              <svg className="pc-sheet-icon" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" rx="1.8" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M3 4.5h5M3 6.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              {item.sheetName}
            </span>
          )}

          <div className="pc-divider" />

          {/* Metrics: QTY + MRP */}
          <div className="pc-metrics" ref={qtyRef}>
            <div
              className="pc-qty-block"
              style={{ background: sc.bg, borderColor: sc.border, color: sc.color }}
            >
              <span className="pc-qty-label">Quantity</span>
              <span className="pc-qty-value">{item.quantity ?? "—"}</span>
              <span className="pc-qty-unit">units available</span>
            </div>

            {hasMrp && (
              <div className="pc-mrp-block">
                <span className="pc-mrp-label">MRP</span>
                <div className="pc-mrp-value">
                  <span className="pc-mrp-symbol">₹</span>
                  {item.mrp}
                </div>
                <span className="pc-mrp-sub">incl. tax</span>
              </div>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <div className="pc-desc">
              <div className="pc-desc-label">Description</div>
              <div className="pc-desc-text">{item.description}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default ProductCard;