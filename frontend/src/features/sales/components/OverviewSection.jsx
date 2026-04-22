/**
 * OverviewSection — Hero card, brand marquee, and stat cards
 * Extracted from SalesDashboard.jsx for better maintainability.
 */
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const LOGOS = [
  { src: "/campany_images/ascot1.png",     name: "Ascot" },
  { src: "/campany_images/Bosch_logo.png", name: "Bosch" },
  { src: "/campany_images/delphi_tvs.png", name: "Delphi TVS" },
  { src: "/campany_images/gy.png",         name: "GY" },
  { src: "/campany_images/lucas.png",      name: "Lucas" },
  { src: "/campany_images/nbc.png",        name: "NBC" },
  { src: "/campany_images/rmp.png",        name: "RMP" },
];

const OverviewSection = React.memo(({
  sheets, sheetsLoading,
  masterQuery, setMasterQuery,
  masterResults, masterLoading,
  handleTabChange, handleSheetSelect, setSearchInput,
}) => {
  const heroRef    = useRef(null);
  const cardsRef   = useRef(null);
  const searchRef2 = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeAnim = useRef(null);

  // ── Infinite marquee ──
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    // Wait one frame so scrollWidth is correct
    const id = requestAnimationFrame(() => {
      const totalW = el.scrollWidth / 2;
      marqueeAnim.current = gsap.to(el, {
        x: -totalW, duration: 22, ease: "none", repeat: -1,
        onRepeat: () => gsap.set(el, { x: 0 }),
      });
    });
    el.addEventListener("mouseenter", () => marqueeAnim.current?.pause());
    el.addEventListener("mouseleave", () => marqueeAnim.current?.resume());
    return () => {
      cancelAnimationFrame(id);
      marqueeAnim.current?.kill();
    };
  }, []);

  // ── Entrance animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(heroRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 })
        .fromTo(heroRef.current.children, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.09 }, "-=0.45")
        .fromTo(searchRef2.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, "-=0.3");
      const cards = cardsRef.current?.querySelectorAll(".sd-stat-card");
      if (cards?.length) {
        tl.fromTo(cards,
          { y: 28, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)",
            onComplete: () => gsap.set(cards, { clearProps: "transform" }) },
          "-=0.2"
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const statCards = [
    { id: "company", icon: "🏢", label: "Company Sheets", value: sheetsLoading ? "…" : sheets.length || 0, bg: "var(--color-secondary-container)", color: "var(--color-on-secondary-container)" },
    { id: "bosch",   icon: "⚙️", label: "Bosch Parts",    value: "Live",  bg: "color-mix(in srgb, #ba1a1a 18%, transparent)", color: "#ba1a1a" },
    { id: "history", icon: "📦", label: "Order History",  value: "View",  bg: "var(--color-tertiary-fixed, #d0f0e8)", color: "var(--color-on-tertiary-fixed, #0a3d2e)" },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <div className="sd-hero-card" ref={heroRef}>
        <div className="sd-hero-eyebrow">B.K Engineering · Sales Portal</div>
        <h1 className="sd-hero-title">Sales Gateway</h1>
        <p className="sd-hero-sub">Search instantly across Bosch and Company inventory all in one place.</p>

        {/* Global Search */}
        <div className="sd-global-search-wrap" ref={searchRef2} style={{ position: "relative", maxWidth: "580px", width: "100%", marginTop: "4px" }}>
          <input
            type="text" className="sd-search"
            placeholder="Search part numbers, item names..."
            value={masterQuery} onChange={(e) => setMasterQuery(e.target.value)}
            style={{ padding: "15px 20px 15px 50px", fontSize: "15px", borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.14)", background: "rgba(255,255,255,0.13)", border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", backdropFilter: "blur(12px)", width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "'DM Sans', sans-serif" }}
            onFocus={(e) => { e.target.style.background = "rgba(255,255,255,0.2)"; e.target.style.borderColor = "rgba(255,255,255,0.5)"; }}
            onBlur={(e) => { e.target.style.background = "rgba(255,255,255,0.13)"; e.target.style.borderColor = "rgba(255,255,255,0.25)"; }}
          />
          <span style={{ position: "absolute", zIndex: 100, left: "17px", top: "50%", transform: "translateY(-50%)", fontSize: "17px", pointerEvents: "none" }}>🔍</span>
          {masterQuery && (
            <button onClick={() => setMasterQuery("")} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "6px", width: "26px", height: "26px", cursor: "pointer", color: "#fff", fontSize: "11px", display: "grid", placeItems: "center" }}>✕</button>
          )}
          {masterQuery && (
            <div className="sd-global-results">
              {masterLoading
                ? <div className="sd-global-empty">Searching…</div>
                : masterResults.length === 0
                ? <div className="sd-global-empty">No results found</div>
                : masterResults.map((item) => (
                  <div
                    key={item._id} className="sd-result-item"
                    onClick={() => {
                      handleTabChange(item.source === "bosch" ? "bosch" : "company");
                      if (item.source === "company") handleSheetSelect(item.sheetName);
                      setSearchInput(item.partno || item.itemName);
                      setMasterQuery("");
                    }}
                  >
                    <div style={{ overflow: "hidden", paddingRight: "12px" }}>
                      <div className="sd-result-title">{item.itemName || "Unnamed"}</div>
                      <div className="sd-result-sub">PN: {item.partno || "N/A"}</div>
                    </div>
                    <div className={`sd-result-badge ${item.source === "bosch" ? "bosch" : "company"}`}>
                      {item.source === "bosch" ? "Bosch" : item.sheetName || "Company"}
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>

      {/* ── Brand Logo Marquee ── */}
      <div className="sd-marquee-outer">
        <div className="sd-marquee-label">Our Brands</div>
        <div className="sd-marquee-track">
          <div className="sd-marquee-inner" ref={marqueeRef}>
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div className="sd-logo-pill" key={i}>
                <img src={logo.src} alt={logo.name} className="sd-logo-img" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="sd-overview-grid" ref={cardsRef}>
        {statCards.map(({ id, icon, label, value, bg, color }) => (
          <div className="sd-stat-card" key={id} onClick={() => handleTabChange(id)}>
            <div className="sd-stat-icon" style={{ background: bg, color }}>{icon}</div>
            <div className="sd-stat-content">
              <div className="sd-stat-label">{label}</div>
              <div className="sd-stat-value">{value}</div>
            </div>
            <span className="sd-stat-arrow">→</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default OverviewSection;
