import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const STOCK_COLORS = {
  out:  { bg: "#ffdad6", color: "#ba1a1a", label: "Out of Stock", dot: "#ba1a1a" },
  low:  { bg: "#ffddb3", color: "#7a5300", label: "Low Stock",    dot: "#f59e0b" },
  good: { bg: "#c8f5d4", color: "#1a6b2e", label: "In Stock",     dot: "#22c55e" },
};

const getStockLevel = (qty) => {
  const q = parseInt(qty);
  if (isNaN(q) || q === 0) return "out";
  if (q <= 5) return "low";
  return "good";
};

const ProductCard = ({ item }) => {
  const cardRef = useRef(null);
  const shimmerRef = useRef(null);
  const badgeRef = useRef(null);

  const level = getStockLevel(item.quantity);
  const sc = STOCK_COLORS[level];

  // ── Entrance animation (called by parent stagger) ─────────────────
  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 28, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  // ── Mouse hover: 3D tilt + shimmer ────────────────────────────────
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * 5;
    const ry = ((x - cx) / cx) * -5;

    gsap.to(cardRef.current, {
      rotateX: rx, rotateY: ry,
      transformPerspective: 800,
      boxShadow: `0 20px 48px rgba(0,37,66,0.16), ${ry * -1}px ${rx * -1}px 24px color-mix(in srgb, var(--color-primary) 12%, transparent)`,
      duration: 0.25, ease: "power2.out",
    });

    // Shimmer follows mouse
    if (shimmerRef.current) {
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      shimmerRef.current.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.07) 0%, transparent 65%)`;
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0,
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      duration: 0.5, ease: "elastic.out(1, 0.5)",
    });
    if (shimmerRef.current) shimmerRef.current.style.background = "transparent";
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -6, duration: 0.3, ease: "power2.out",
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        .pc-card {
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          cursor: default;
          transform-style: preserve-3d;
          will-change: transform;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: border-color 0.25s ease;
        }
        .pc-card:hover {
          border-color: color-mix(in srgb, var(--color-primary) 50%, var(--color-outline-variant));
        }

        /* Shimmer overlay */
        .pc-shimmer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 20px;
          z-index: 1;
          transition: background 0.1s;
        }

        /* ── Header ── */
        .pc-header {
          padding: 18px 18px 14px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          border-bottom: 1px solid var(--color-outline-variant);
          position: relative;
        }
        .pc-partno {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--color-on-primary-container);
          background: var(--color-primary-container);
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 65%;
          text-transform: uppercase;
        }

        /* Stock badge */
        .pc-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 3px 9px 3px 7px;
          border-radius: 20px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pc-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: pcPulse 2s ease infinite;
        }
        @keyframes pcPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }

        /* ── Body ── */
        .pc-body {
          padding: 16px 18px 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .pc-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--color-on-surface);
          letter-spacing: -0.3px;
          margin-bottom: 6px;
          line-height: 1.25;
        }

        .pc-sheet {
          font-size: 11.5px;
          color: var(--color-on-surface-variant);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pc-sheet-pill {
          background: var(--color-surface-container);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
          color: var(--color-on-surface-variant);
        }

        /* ── Meta chips ── */
        .pc-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
          gap: 8px;
          margin-top: auto;
        }
        .pc-chip {
          background: var(--color-surface-container);
          border: 1px solid var(--color-outline-variant);
          border-radius: 10px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          transition: background 0.15s, border-color 0.15s;
        }
        .pc-chip:hover {
          background: color-mix(in srgb, var(--color-primary) 6%, var(--color-surface-container));
          border-color: color-mix(in srgb, var(--color-primary) 30%, var(--color-outline-variant));
        }
        .pc-chip-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-outline);
        }
        .pc-chip-value {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--color-on-surface);
          line-height: 1;
        }
        .pc-chip-value.desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--color-on-surface-variant);
          line-height: 1.4;
        }

        /* ── SNO watermark on hover ── */
        .pc-sno {
          position: absolute;
          bottom: 12px;
          right: 14px;
          font-size: 9.5px;
          color: var(--color-outline);
          opacity: 0;
          transition: opacity 0.2s;
          font-family: 'DM Sans', sans-serif;
          pointer-events: none;
          z-index: 2;
        }
        .pc-card:hover .pc-sno { opacity: 1; }
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

        {/* SNO */}
        {item.sno && <span className="pc-sno">#{item.sno}</span>}

        {/* Header */}
        <div className="pc-header">
          <span className="pc-partno" title={item.partno}>{item.partno || "N/A"}</span>
          <span
            className="pc-badge"
            ref={badgeRef}
            style={{ background: sc.bg, color: sc.color }}
          >
            <span className="pc-badge-dot" style={{ background: sc.dot }} />
            {sc.label}
          </span>
        </div>

        {/* Body */}
        <div className="pc-body">
          <div className="pc-name">{item.itemName || "Unnamed Item"}</div>

          {(item.sheetName || item.description) && (
            <div className="pc-sheet">
              <span className="pc-sheet-pill">
                {item.sheetName || item.description}
              </span>
            </div>
          )}

          <div className="pc-meta">
            <div className="pc-chip">
              <span className="pc-chip-label">Qty</span>
              <span className="pc-chip-value">{item.quantity ?? "—"}</span>
            </div>

            {item.mrp && (
              <div className="pc-chip">
                <span className="pc-chip-label">MRP</span>
                <span className="pc-chip-value">₹{item.mrp}</span>
              </div>
            )}

            {item.description && item.sheetName && (
              <div className="pc-chip" style={{ gridColumn: "1 / -1" }}>
                <span className="pc-chip-label">Description</span>
                <span className="pc-chip-value desc">{item.description}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
