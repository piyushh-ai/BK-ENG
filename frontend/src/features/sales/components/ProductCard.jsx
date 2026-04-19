import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const STOCK = {
  out:  { bg: "rgba(186,26,26,0.10)", border: "rgba(186,26,26,0.28)", color: "#ba1a1a",  dot: "#ba1a1a",  label: "Out of Stock", pill: "rgba(186,26,26,0.14)" },
  low:  { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.28)", color: "#92600a", dot: "#f59e0b", label: "Low Stock",    pill: "rgba(245,158,11,0.14)" },
  good: { bg: "rgba(34,197,94,0.10)",  border: "rgba(34,197,94,0.28)",  color: "#15803d", dot: "#22c55e",  label: "In Stock",    pill: "rgba(34,197,94,0.14)"  },
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

  // ── Entrance animation ────────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.48, ease: "power3.out",
        onComplete: () => gsap.set(cardRef.current, { clearProps: "transform" }) }
    );
  }, []);

  // ── Mouse tilt + shimmer ─────────────────────────────────────────────
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * 6;
    const ry = ((x - rect.width  / 2) / rect.width)  * -6;

    gsap.to(cardRef.current, {
      rotateX: rx, rotateY: ry,
      transformPerspective: 900,
      boxShadow: `0 18px 44px rgba(0,37,66,0.13), ${ry * -1.2}px ${rx * -1.2}px 22px color-mix(in srgb, var(--color-primary) 10%, transparent)`,
      duration: 0.22, ease: "power2.out",
    });

    if (shimmerRef.current) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      shimmerRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.09) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0, y: 0,
      boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
      duration: 0.55, ease: "elastic.out(1, 0.6)",
    });
    if (shimmerRef.current) shimmerRef.current.style.background = "transparent";
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -5, duration: 0.28, ease: "power2.out" });
    if (qtyRef.current) {
      gsap.fromTo(qtyRef.current,
        { scale: 0.88 },
        { scale: 1, duration: 0.35, ease: "back.out(2.5)" }
      );
    }
  };

  const hasMrp = item.mrp !== undefined && item.mrp !== null && item.mrp !== "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ═══════════════════════════
           PRODUCT CARD
        ═══════════════════════════ */
        .pc-card {
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          cursor: default;
          transform-style: preserve-3d;
          will-change: transform;
          box-shadow: 0 1px 8px rgba(0,0,0,0.05);
          transition: border-color 0.2s ease;
        }
        .pc-card:hover {
          border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-outline-variant));
        }

        /* Shimmer */
        .pc-shimmer {
          position: absolute; inset: 0; pointer-events: none;
          border-radius: 22px; z-index: 1; transition: background 0.08s;
        }

        /* ── Top strip (colored by stock) ── */
        .pc-accent-strip {
          height: 4px;
          border-radius: 22px 22px 0 0;
          flex-shrink: 0;
        }

        /* ── Header ── */
        .pc-header {
          padding: 14px 16px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .pc-partno {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: var(--color-on-primary-container);
          background: var(--color-primary-container);
          padding: 3px 10px; border-radius: 20px;
          white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; max-width: 60%;
        }
        .pc-stock-pill {
          display: flex; align-items: center; gap: 4px;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em;
          padding: 3px 9px 3px 7px; border-radius: 20px;
          white-space: nowrap; flex-shrink: 0;
          border-width: 1px; border-style: solid;
        }
        .pc-stock-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
          animation: pcDotPulse 2.2s ease infinite;
        }
        @keyframes pcDotPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }

        /* ── Name ── */
        .pc-body { padding: 0 16px 14px; flex: 1; display: flex; flex-direction: column; }
        .pc-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 15.5px; font-weight: 700;
          color: var(--color-on-surface); letter-spacing: -0.3px;
          line-height: 1.3; margin-bottom: 8px;
        }
        .pc-sheet-tag {
          display: inline-flex; align-items: center;
          background: var(--color-surface-container);
          color: var(--color-on-surface-variant);
          font-size: 10.5px; font-weight: 500;
          padding: 2px 9px; border-radius: 10px;
          margin-bottom: 14px; max-width: 100%;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          border: 1px solid var(--color-outline-variant);
        }

        /* ── KEY METRICS ROW ── */
        .pc-metrics {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        /* QTY — dominant, stock-colored */
        .pc-qty-block {
          flex: 1;
          border-radius: 16px;
          padding: 12px 14px 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          border: 1px solid;
          position: relative;
          overflow: hidden;
        }
        .pc-qty-block::after {
          content: 'QTY';
          position: absolute;
          right: 8px; bottom: 6px;
          font-size: 28px; font-weight: 900;
          opacity: 0.06; letter-spacing: -1px;
          font-family: 'Bricolage Grotesque', sans-serif;
          pointer-events: none; line-height: 1;
          color: currentColor;
        }
        .pc-qty-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          opacity: 0.7;
        }
        .pc-qty-value {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 30px; font-weight: 800;
          line-height: 1; letter-spacing: -1px;
        }
        .pc-qty-unit {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 500;
          opacity: 0.6; margin-top: 1px;
        }

        /* MRP — clean with ₹ emphasis */
        .pc-mrp-block {
          flex: 1;
          background: color-mix(in srgb, var(--color-primary) 7%, var(--color-surface-container-lowest));
          border: 1px solid color-mix(in srgb, var(--color-primary) 20%, var(--color-outline-variant));
          border-radius: 16px;
          padding: 12px 14px 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .pc-mrp-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--color-primary);
          opacity: 0.8;
        }
        .pc-mrp-value {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 22px; font-weight: 800;
          color: var(--color-on-surface);
          line-height: 1; letter-spacing: -0.5px;
          display: flex; align-items: baseline; gap: 2px;
        }
        .pc-mrp-symbol {
          font-size: 15px; font-weight: 700;
          color: var(--color-primary);
          margin-right: 1px;
        }
        .pc-mrp-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; color: var(--color-primary);
          font-weight: 500; opacity: 0.7; margin-top: 1px;
        }

        /* ── Description chip ── */
        .pc-desc {
          margin-top: 10px;
          background: var(--color-surface-container);
          border: 1px solid var(--color-outline-variant);
          border-radius: 12px;
          padding: 9px 12px;
        }
        .pc-desc-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--color-outline);
          margin-bottom: 3px;
        }
        .pc-desc-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 400;
          color: var(--color-on-surface-variant);
          line-height: 1.5;
        }

        /* ── SNO watermark ── */
        .pc-sno {
          position: absolute; bottom: 10px; right: 13px;
          font-size: 9px; color: var(--color-outline);
          opacity: 0; transition: opacity 0.2s;
          font-family: 'DM Sans', sans-serif; pointer-events: none; z-index: 2;
        }
        .pc-card:hover .pc-sno { opacity: 1; }

        /* ── Responsive: 2 cols on mobile ── */
        @media (max-width: 768px) {
          .pc-qty-value { font-size: 26px; }
          .pc-mrp-value { font-size: 19px; }
          .pc-name      { font-size: 14.5px; }
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
        <div className="pc-accent-strip" style={{ background: sc.dot }} />

        {/* Header: part no + stock status */}
        <div className="pc-header">
          <span className="pc-partno" title={item.partno}>{item.partno || "N/A"}</span>
          <span
            className="pc-stock-pill"
            style={{ background: sc.pill, color: sc.color, borderColor: sc.border }}
          >
            <span className="pc-stock-dot" style={{ background: sc.dot }} />
            {sc.label}
          </span>
        </div>

        {/* Body */}
        <div className="pc-body">
          <div className="pc-name">{item.itemName || "Unnamed Item"}</div>

          {(item.sheetName || item.description) && (
            <span className="pc-sheet-tag">
              {item.sheetName || item.description}
            </span>
          )}

          {/* ── KEY METRICS: QTY + MRP ── */}
          <div className="pc-metrics" ref={qtyRef}>
            {/* QTY — always shown, stock-color themed */}
            <div
              className="pc-qty-block"
              style={{
                background: sc.bg,
                borderColor: sc.border,
                color: sc.color,
              }}
            >
              <span className="pc-qty-label">Quantity</span>
              <span className="pc-qty-value">{item.quantity ?? "—"}</span>
              <span className="pc-qty-unit">units</span>
            </div>

            {/* MRP — shown when available */}
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

          {/* Description (only when both sheetName and description exist) */}
          {item.description && item.sheetName && (
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
