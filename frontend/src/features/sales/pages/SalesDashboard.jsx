import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { gsap } from "gsap";
import SalesNavbar from "../components/SalesNavbar";
import ProductCard from "../components/ProductCard";
import CreateOrder from "../components/CreateOrder";
import OrderHistory from "../components/OrderHistory";
import {
  getCompanySheets,
  getCompanyStock,
  getBoschStock,
  masterSearch,
} from "../services/sales.api";

function useDebounce(value, delay = 380) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const SkeletonCard = React.memo(() => (
  <div
    style={{
      background: "var(--color-surface-container-lowest)",
      border: "1px solid var(--color-outline-variant)",
      borderRadius: "16px",
      padding: "0",
      overflow: "hidden",
      animation: "sdSkeletonPulse 1.4s ease-in-out infinite",
    }}
  >
    <div
      style={{
        height: "56px",
        background: "var(--color-surface-container)",
        borderBottom: "1px solid var(--color-outline-variant)",
      }}
    />
    <div style={{ padding: "16px 20px" }}>
      <div style={{ height: "18px", background: "var(--color-surface-container)", borderRadius: "6px", marginBottom: "10px", width: "70%" }} />
      <div style={{ height: "13px", background: "var(--color-surface-container)", borderRadius: "6px", marginBottom: "16px", width: "45%" }} />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ height: "48px", flex: 1, background: "var(--color-surface-container)", borderRadius: "8px" }} />
        <div style={{ height: "48px", flex: 1, background: "var(--color-surface-container)", borderRadius: "8px" }} />
      </div>
    </div>
    <div style={{ padding: "0 20px 16px" }}>
      <div style={{ height: "40px", background: "var(--color-surface-container)", borderRadius: "10px" }} />
    </div>
  </div>
));

const EmptyState = React.memo(({ search }) => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
  }, []);
  return (
    <div ref={ref} style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", color: "var(--color-on-surface-variant)", fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>
      <div style={{ width: "80px", height: "80px", borderRadius: "24px", marginBottom: "20px", background: "var(--color-surface-container)", display: "grid", placeItems: "center", fontSize: "36px", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>🔍</div>
      <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--color-on-surface)", marginBottom: "8px", letterSpacing: "-0.3px" }}>
        {search ? "No results found" : "No items available"}
      </div>
      <div style={{ fontSize: "14px", maxWidth: "320px", lineHeight: 1.6 }}>
        {search ? `We couldn't find anything matching "${search}". Try different keywords.` : "There are no items to display in this category."}
      </div>
    </div>
  );
});

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

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "24px", padding: "0 4px", fontFamily: "'DM Sans', sans-serif", flexWrap: "wrap", gap: "12px" }}>
      <span style={{ fontSize: "12.5px", color: "var(--color-on-surface-variant)" }}>
        {from}–{to} of <strong>{totalDocuments}</strong>
      </span>
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={!pagination.hasPrevPage} id="pagination-prev"
          style={{ padding: "7px 14px", borderRadius: "8px", border: "1.5px solid var(--color-outline-variant)", background: "var(--color-surface-container-lowest)", cursor: "pointer", fontSize: "13px", color: "var(--color-on-surface-variant)", opacity: !pagination.hasPrevPage ? 0.4 : 1 }}>
          ← Prev
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} style={{ padding: "7px 4px", color: "var(--color-outline)", fontSize: "13px" }}>…</span>
          ) : (
            <button key={p} onClick={() => onPageChange(p)} id={`pagination-page-${p}`}
              style={{ width: "36px", height: "36px", borderRadius: "8px", border: p === currentPage ? "none" : "1.5px solid var(--color-outline-variant)", background: p === currentPage ? "var(--color-primary)" : "var(--color-surface-container-lowest)", color: p === currentPage ? "var(--color-on-primary)" : "var(--color-on-surface-variant)", cursor: "pointer", fontSize: "13px", fontWeight: p === currentPage ? 700 : 400 }}>
              {p}
            </button>
          )
        )}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={!pagination.hasNextPage} id="pagination-next"
          style={{ padding: "7px 14px", borderRadius: "8px", border: "1.5px solid var(--color-outline-variant)", background: "var(--color-surface-container-lowest)", cursor: "pointer", fontSize: "13px", color: "var(--color-on-surface-variant)", opacity: !pagination.hasNextPage ? 0.4 : 1 }}>
          Next →
        </button>
      </div>
    </div>
  );
});

const OverviewSection = React.memo(({ sheets, sheetsLoading, masterQuery, setMasterQuery, masterResults, masterLoading, handleTabChange, handleSheetSelect, setSearchInput }) => {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const searchRef2 = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeAnim = useRef(null);

  const LOGOS = [
    { src: "/campany_images/ascot1.png",    name: "Ascot" },
    { src: "/campany_images/Bosch_logo.png", name: "Bosch" },
    { src: "/campany_images/delphi_tvs.png", name: "Delphi TVS" },
    { src: "/campany_images/gy.png",         name: "GY" },
    { src: "/campany_images/lucas.png",      name: "Lucas" },
    { src: "/campany_images/nbc.png",        name: "NBC" },
    { src: "/campany_images/rmp.png",        name: "RMP" },
  ];

  // Infinite marquee with GSAP
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const totalW = el.scrollWidth / 2;
    marqueeAnim.current = gsap.to(el, {
      x: -totalW, duration: 22, ease: "none", repeat: -1,
      onRepeat: () => gsap.set(el, { x: 0 }),
    });
    el.addEventListener("mouseenter", () => marqueeAnim.current?.pause());
    el.addEventListener("mouseleave", () => marqueeAnim.current?.resume());
    return () => { marqueeAnim.current?.kill(); };
  }, []);

  // Hero + cards entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(heroRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 })
        .fromTo(heroRef.current.children, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.09 }, "-=0.45")
        .fromTo(searchRef2.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, "-=0.3");
      const cards = cardsRef.current?.querySelectorAll(".sd-stat-card");
      if (cards?.length) tl.fromTo(cards, { y: 28, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)", onComplete: () => gsap.set(cards, { clearProps: "transform" }) }, "-=0.2");
    });
    return () => ctx.revert();
  }, []);

  const statCards = [
    { id: "company", icon: "🏢", label: "Company Sheets", value: sheetsLoading ? "…" : sheets.length || 0, bg: "var(--color-secondary-container)", color: "var(--color-on-secondary-container)" },
    { id: "bosch",   icon: "⚙️", label: "Bosch Parts",    value: "Live", bg: "color-mix(in srgb, #ba1a1a 18%, transparent)", color: "#ba1a1a" },
    { id: "history", icon: "📦", label: "Order History",  value: "View", bg: "var(--color-tertiary-fixed, #d0f0e8)", color: "var(--color-on-tertiary-fixed, #0a3d2e)" },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <div className="sd-hero-card" ref={heroRef}>
        <div className="sd-hero-eyebrow">B.K Engineering · Sales Portal</div>
        <h1 className="sd-hero-title">Sales Gateway</h1>
        <p className="sd-hero-sub">Search instantly across Bosch and Company inventory all in one place.</p>
        <div className="sd-global-search-wrap" ref={searchRef2} style={{ position: "relative", maxWidth: "580px", width: "100%", marginTop: "4px" }}>
          <input type="text" className="sd-search" placeholder="Search part numbers, item names..." value={masterQuery} onChange={(e) => setMasterQuery(e.target.value)}
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
              {masterLoading ? <div className="sd-global-empty">Searching…</div>
                : masterResults.length === 0 ? <div className="sd-global-empty">No results found</div>
                : masterResults.map((item) => (
                  <div key={item._id} className="sd-result-item" onClick={() => { handleTabChange(item.source === "bosch" ? "bosch" : "company"); if (item.source === "company") handleSheetSelect(item.sheetName); setSearchInput(item.partno || item.itemName); setMasterQuery(""); }}>
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

const SalesDashboard = ({ hideNavbar = false, adminTab = null }) => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = adminTab || tab || "overview";

  const [sheets, setSheets] = useState([]);
  const [sheetsLoading, setSheetsLoading] = useState(false);

  const sheetParam = searchParams.get("sheet");
  const selectedSheet = sheetParam
    ? sheets.find((s) => (s.sheetName || s) === sheetParam) || sheetParam
    : sheets.length > 0 ? sheets[0] : null;

  const [stock, setStock] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [stockLoading, setStockLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  const [masterQuery, setMasterQuery] = useState("");
  const debouncedMaster = useDebounce(masterQuery, 350);
  const [masterResults, setMasterResults] = useState([]);
  const [masterLoading, setMasterLoading] = useState(false);

  // Mobile view toggle: "grid" | "list"
  const [mobileView, setMobileView] = useState("grid");

  // Mobile sheet drawer
  const [sheetDrawerOpen, setSheetDrawerOpen] = useState(false);
  const [sheetSearch, setSheetSearch] = useState("");

  const LIMIT = 12;
  const searchRef = useRef(null);

  useEffect(() => {
    if (!debouncedMaster.trim()) { setMasterResults([]); return; }
    const fetchMaster = async () => {
      setMasterLoading(true);
      try { const data = await masterSearch({ search: debouncedMaster, limit: 12 }); setMasterResults(data.results || []); }
      catch (err) { console.error(err); }
      finally { setMasterLoading(false); }
    };
    fetchMaster();
  }, [debouncedMaster]);

  useEffect(() => {
    const load = async () => {
      setSheetsLoading(true);
      try { const data = await getCompanySheets(); setSheets(data.companySheets || []); }
      catch (err) { console.error(err); }
      finally { setSheetsLoading(false); }
    };
    load();
  }, []);

  useEffect(() => { setPage(1); }, [debouncedSearch, selectedSheet, activeTab]);

  useEffect(() => {
    const load = async () => {
      setStockLoading(true); setStock([]);
      try {
        let data;
        if (activeTab === "company" && selectedSheet) {
          const sheetName = typeof selectedSheet === "string" ? selectedSheet : selectedSheet.sheetName;
          data = await getCompanyStock(sheetName, { page, limit: LIMIT, search: debouncedSearch });
        } else if (activeTab === "bosch") {
          data = await getBoschStock({ page, limit: LIMIT, search: debouncedSearch });
        } else { setStockLoading(false); return; }
        setStock(data.boschStock || data.companyStock || []);
        setPagination(data.pagination || null);
      } catch (err) { console.error(err); }
      finally { setStockLoading(false); }
    };
    if (activeTab === "company" || activeTab === "bosch") load();
    else setStockLoading(false);
  }, [activeTab, selectedSheet, page, debouncedSearch]);

  const handleTabChange = useCallback((newTab) => {
    navigate(adminTab ? `/admin/${newTab}` : `/sales/${newTab}`);
    setSearchInput(""); setPage(1);
  }, [adminTab, navigate]);

  const handleSheetSelect = useCallback((sheet) => {
    const name = typeof sheet === "string" ? sheet : sheet.sheetName;
    setSearchParams({ sheet: name }); setSearchInput(""); setPage(1);
  }, [setSearchParams]);

  const isStockTab = activeTab === "company" || activeTab === "bosch";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes sdSkeletonPulse { 0%,100%{opacity:1} 50%{opacity:0.55} }

        .sd-root { min-height:100svh; background:var(--color-background); font-family:'DM Sans',sans-serif; }
        .sd-content { max-width:1400px; margin:0 auto; padding:28px 28px 60px; }

        .sd-page-header { margin-bottom:24px; }
        .sd-page-title { font-family:'Bricolage Grotesque',sans-serif; font-size:26px; font-weight:800; color:var(--color-on-surface); letter-spacing:-0.7px; margin-bottom:4px; }
        .sd-page-sub { font-size:13.5px; color:var(--color-on-surface-variant); }

        /* Controls */
        .sd-controls { display:flex; align-items:center; gap:12px; margin-bottom:20px; flex-wrap:wrap; }
        .sd-search-wrap { flex:1; min-width:220px; max-width:480px; position:relative; }
        .sd-search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--color-outline); font-size:14px; pointer-events:none; }
        .sd-search { width:100%; padding:11px 14px 11px 40px; background:var(--color-surface-container-lowest); border:1.5px solid var(--color-outline-variant); border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13.5px; color:var(--color-on-surface); outline:none; transition:all 0.18s; box-sizing:border-box; }
        .sd-search::placeholder { color:var(--color-outline); }
        .sd-search:focus { border-color:var(--color-primary); box-shadow:0 0 0 3px var(--color-primary-fixed-dim); }
        .sd-search-clear { position:absolute; right:10px; top:50%; transform:translateY(-50%); background:var(--color-surface-container); border:none; border-radius:6px; width:22px; height:22px; cursor:pointer; font-size:11px; color:var(--color-on-surface-variant); display:grid; place-items:center; }
        .sd-result-count { font-size:12.5px; color:var(--color-on-surface-variant); white-space:nowrap; }

        /* View toggle button */
        .sd-view-toggle { display:none; align-items:center; gap:4px; background:var(--color-surface-container); border:1.5px solid var(--color-outline-variant); border-radius:10px; padding:4px; flex-shrink:0; }
        .sd-view-btn { width:32px; height:32px; border:none; border-radius:7px; background:transparent; cursor:pointer; display:grid; place-items:center; color:var(--color-on-surface-variant); transition:all 0.15s; font-size:15px; }
        .sd-view-btn.active { background:var(--color-primary); color:var(--color-on-primary); }

        /* ── Mobile Sheet Picker Trigger ── */
        .sd-sheet-picker-btn {
          display: none;
          width: 100%;
          padding: 12px 16px;
          background: var(--color-surface-container-lowest);
          border: 1.5px solid var(--color-outline-variant);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          color: var(--color-on-surface);
          cursor: pointer;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          text-align: left;
          transition: border-color 0.18s;
          margin-bottom: 0;
        }
        .sd-sheet-picker-btn:active { background: var(--color-surface-container); }
        .sd-sheet-picker-selected { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sd-sheet-picker-meta { font-size: 11px; color: var(--color-outline); font-weight: 500; flex-shrink: 0; }
        .sd-sheet-picker-arrow { font-size: 13px; color: var(--color-outline); flex-shrink: 0; }

        /* ── Bottom Drawer Overlay ── */
        .sd-drawer-overlay {
          display: none;
          position: fixed; inset: 0; z-index: 9998;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: sdOverlayIn 0.22s ease both;
        }
        .sd-drawer-overlay.open { display: block; }
        @keyframes sdOverlayIn { from{opacity:0} to{opacity:1} }

        /* ── Bottom Drawer ── */
        .sd-sheet-drawer {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 9999;
          background: var(--color-surface-container-lowest);
          border-radius: 24px 24px 0 0;
          padding: 0 0 env(safe-area-inset-bottom, 16px);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.18);
          max-height: 82svh;
          display: flex; flex-direction: column;
          animation: sdDrawerUp 0.32s cubic-bezier(0.32,0.72,0,1) both;
          transform-origin: bottom;
        }
        @keyframes sdDrawerUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        .sd-drawer-handle {
          width: 36px; height: 4px; border-radius: 2px;
          background: var(--color-outline-variant);
          margin: 12px auto 0;
          flex-shrink: 0;
        }
        .sd-drawer-header {
          padding: 16px 20px 12px;
          border-bottom: 1px solid var(--color-outline-variant);
          flex-shrink: 0;
        }
        .sd-drawer-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 18px; font-weight: 700;
          color: var(--color-on-surface);
          margin-bottom: 12px;
        }
        .sd-drawer-search {
          width: 100%; padding: 10px 16px 10px 40px;
          background: var(--color-surface-container);
          border: 1.5px solid var(--color-outline-variant);
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: var(--color-on-surface);
          outline: none; box-sizing: border-box;
          transition: border-color 0.18s;
        }
        .sd-drawer-search:focus { border-color: var(--color-primary); }
        .sd-drawer-search::placeholder { color: var(--color-outline); }
        .sd-drawer-search-wrap { position: relative; }
        .sd-drawer-search-icon {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          font-size: 14px; pointer-events: none; color: var(--color-outline);
        }
        .sd-drawer-list {
          overflow-y: auto; flex: 1;
          padding: 8px 12px 16px;
          -webkit-overflow-scrolling: touch;
        }
        .sd-drawer-item {
          width: 100%; border: none; background: transparent;
          padding: 13px 14px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
          color: var(--color-on-surface);
          cursor: pointer; text-align: left; display: flex;
          align-items: center; justify-content: space-between;
          gap: 12px; transition: background 0.15s;
        }
        .sd-drawer-item:hover, .sd-drawer-item:active { background: var(--color-surface-container); }
        .sd-drawer-item.active {
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          color: var(--color-primary); font-weight: 700;
        }
        .sd-drawer-item-check { font-size: 16px; flex-shrink: 0; }
        .sd-drawer-empty {
          text-align: center; padding: 32px 20px;
          color: var(--color-on-surface-variant); font-size: 14px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Brand Marquee ── */
        .sd-marquee-outer {
          padding: 28px 0 0;
          grid-column: 1 / -1;
        }
        .sd-marquee-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--color-on-surface-variant);
          opacity: 0.6; margin-bottom: 14px; padding: 0 36px;
          font-family: 'DM Sans', sans-serif;
        }
        .sd-marquee-track {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .sd-marquee-inner {
          display: flex; align-items: center; gap: 16px;
          width: max-content; padding: 4px 0 12px;
        }
        .sd-logo-pill {
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 16px;
          padding: 12px 20px;
          display: flex; align-items: center; justify-content: center;
          height: 64px; min-width: 110px;
          flex-shrink: 0;
          transition: box-shadow 0.2s, border-color 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .sd-logo-pill:hover {
          border-color: var(--color-primary);
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
        }
        .sd-logo-img {
          height: 36px; max-width: 90px;
          object-fit: contain; object-position: center;
          filter: grayscale(0.2); opacity: 0.85;
          transition: filter 0.2s, opacity 0.2s;
        }
        .sd-logo-pill:hover .sd-logo-img { filter: grayscale(0); opacity: 1; }

        /* Sheet bar */

        .sd-sheet-bar { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px; }
        .sd-sheet-chip { padding:7px 16px; border-radius:20px; border:1.5px solid var(--color-outline-variant); background:var(--color-surface-container-lowest); font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:500; color:var(--color-on-surface-variant); cursor:pointer; transition:all 0.16s; white-space:nowrap; }
        .sd-sheet-chip:hover { border-color:var(--color-primary); color:var(--color-primary); }
        .sd-sheet-chip.active { background:var(--color-primary); border-color:var(--color-primary); color:var(--color-on-primary); font-weight:600; }

        /* Grid */
        .sd-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px,1fr)); gap:16px; }

        /* List view */
        .sd-grid.list-view { grid-template-columns:1fr; gap:8px; }
        .sd-grid.list-view > * { border-radius:12px !important; }

        /* Overview */
        .sd-overview-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:20px; margin-top:24px; }
        .sd-hero-card { background:linear-gradient(135deg,var(--color-primary) 0%,color-mix(in srgb,var(--color-primary) 70%,var(--color-secondary,#1e40af)) 100%); border-radius:28px; padding:40px 36px; color:var(--color-on-primary); display:flex; flex-direction:column; justify-content:center; position:relative; z-index:10; grid-column:1/-1; }
        .sd-hero-card::before { content:''; position:absolute; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle,rgba(255,255,255,0.12) 0%,rgba(255,255,255,0) 70%); pointer-events:none; }
        .sd-hero-card::after { content:''; position:absolute; bottom:-60px; left:20%; width:200px; height:200px; border-radius:50%; background:radial-gradient(circle,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0) 70%); pointer-events:none; }
        .sd-hero-eyebrow { font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; opacity:0.75; margin-bottom:12px; font-family:'DM Sans',sans-serif; }
        .sd-hero-title { font-family:'Bricolage Grotesque',sans-serif; font-size:36px; font-weight:800; margin-bottom:14px; letter-spacing:-1.2px; line-height:1.1; }
        .sd-hero-sub { font-size:15px; opacity:0.8; max-width:420px; line-height:1.6; margin-bottom:28px; font-family:'DM Sans',sans-serif; }
        .sd-stat-card { background:var(--color-surface-container-lowest); border:1px solid var(--color-outline-variant); border-radius:22px; padding:24px 22px; display:flex; align-items:center; gap:18px; cursor:pointer; position:relative; overflow:hidden; transition:border-color 0.25s,box-shadow 0.25s,transform 0.25s; }
        .sd-stat-card:hover { transform:translateY(-5px); box-shadow:0 16px 40px rgba(0,0,0,0.10); border-color:color-mix(in srgb,var(--color-primary) 35%,var(--color-outline-variant)); }
        .sd-stat-icon { width:54px; height:54px; border-radius:16px; display:grid; place-items:center; font-size:22px; flex-shrink:0; transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .sd-stat-card:hover .sd-stat-icon { transform:scale(1.12) rotate(-6deg); }
        .sd-stat-content { flex:1; min-width:0; }
        .sd-stat-label { font-size:11px; color:var(--color-on-surface-variant); font-weight:700; text-transform:uppercase; letter-spacing:0.07em; margin-bottom:6px; font-family:'DM Sans',sans-serif; }
        .sd-stat-value { font-family:'Bricolage Grotesque',sans-serif; font-size:30px; font-weight:800; color:var(--color-on-surface); letter-spacing:-0.5px; line-height:1; }
        .sd-stat-arrow { font-size:16px; color:var(--color-outline); transition:transform 0.25s,color 0.25s; flex-shrink:0; }
        .sd-stat-card:hover .sd-stat-arrow { transform:translateX(4px); color:var(--color-primary); }

        /* Global search dropdown */
        .sd-global-search-wrap { position:relative; z-index:500; }
        .sd-global-results { position:absolute; top:calc(100% + 8px); left:0; right:0; background:var(--color-surface-container-lowest); backdrop-filter:blur(20px); border-radius:18px; box-shadow:0 20px 60px rgba(0,0,0,0.22); border:1px solid var(--color-outline-variant); max-height:420px; overflow-y:auto; z-index:99999; padding:8px; animation:sdDropIn 0.2s cubic-bezier(0.34,1.4,0.64,1) both; }
        @keyframes sdDropIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .sd-result-item { padding:12px 16px; border-radius:10px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; transition:background 0.15s; font-family:'DM Sans',sans-serif; color:var(--color-on-surface); }
        .sd-result-item:hover { background:var(--color-surface-container); }
        .sd-result-title { font-size:15px; font-weight:600; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; }
        .sd-result-sub { font-size:12px; color:var(--color-on-surface-variant); margin-top:4px; }
        .sd-result-badge { font-size:10px; font-weight:700; padding:5px 10px; border-radius:20px; text-transform:uppercase; white-space:nowrap; flex-shrink:0; border:1px solid currentColor; }
        .sd-result-badge.bosch { background:#ffdad6; color:#ba1a1a; }
        .sd-result-badge.company { background:#c8f5d4; color:#1a6b2e; }
        .sd-global-empty { padding:24px; text-align:center; color:var(--color-on-surface-variant); font-size:14px; }

        .sd-placeholder { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:100px 20px; color:var(--color-on-surface-variant); text-align:center; gap:12px; }
        .sd-placeholder-icon { font-size:56px; }
        .sd-placeholder-title { font-family:'Bricolage Grotesque',sans-serif; font-size:22px; font-weight:700; color:var(--color-on-surface); letter-spacing:-0.4px; }
        .sd-placeholder-sub { font-size:14px; max-width:360px; line-height:1.6; }

        /* ════════════════════════════════════════
           MOBILE OVERRIDES
        ════════════════════════════════════════ */
        @media (max-width: 768px) {
          .sd-root { padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px)); }
          .sd-content { padding: 0 0 16px; }

          /* Page header inside content */
          .sd-page-header { padding: 14px 14px 0; margin-bottom: 0; }
          .sd-page-title { font-size: 20px; }
          .sd-page-sub { font-size: 12.5px; }

          /* ── Sheet bar: hide on mobile, replaced by drawer ── */
          .sd-sheet-bar { display: none !important; }

          /* ── Sheet picker button: visible only on mobile ── */
          .sd-sheet-picker-btn { display: flex; }
          .sd-sheet-picker-wrap {
            position: sticky;
            top: 56px;
            z-index: 40;
            background: var(--color-background);
            padding: 10px 14px;
            border-bottom: 1px solid var(--color-outline-variant);
          }

          /* ── Controls bar — sticky below sheet picker ── */
          .sd-controls {
            position: sticky;
            top: calc(56px + 57px); /* navbar(56) + sheet-picker(57) */
            z-index: 39;
            background: var(--color-background);
            padding: 10px 14px;
            border-bottom: 1px solid var(--color-outline-variant);
            flex-wrap: nowrap;
            gap: 8px;
            margin-bottom: 10px;
          }
          /* bosch tab has no sheet bar — controls sit right under navbar */
          .sd-controls.no-sheet-bar {
            top: 56px;
          }
          .sd-search-wrap { min-width: 0; max-width: 100%; flex: 1; }
          .sd-search { padding: 9px 36px 9px 36px; font-size: 13px; border-radius: 10px; }
          .sd-result-count { font-size: 11px; white-space: nowrap; flex-shrink: 0; }

          /* Show view toggle on mobile */
          .sd-view-toggle { display: flex; }

          /* Grid inside sd-content padding */
          .sd-grid { padding: 0 14px; grid-template-columns: 1fr 1fr; gap: 10px; }
          .sd-grid.list-view { grid-template-columns: 1fr; gap: 8px; }

          /* Pagination */
          .sd-pagination-wrap { padding: 0 14px; margin-top: 20px; }
          #pagination-prev, #pagination-next { padding: 6px 10px !important; font-size: 12px !important; }

          /* Overview */
          .sd-hero-card { padding: 24px 20px; border-radius: 20px; margin: 14px 14px 0; }
          .sd-hero-title { font-size: 24px; letter-spacing: -0.8px; }
          .sd-hero-sub { font-size: 13.5px; margin-bottom: 18px; max-width: 100%; }
          .sd-hero-eyebrow { font-size: 10px; margin-bottom: 8px; }
          .sd-overview-grid { grid-template-columns: 1fr; gap: 10px; margin-top: 14px; padding: 0 14px 14px; }
          .sd-stat-card { padding: 16px 14px; border-radius: 16px; }
          .sd-stat-value { font-size: 26px; }
          .sd-stat-icon { width: 44px; height: 44px; font-size: 18px; }

          /* Marquee mobile */
          .sd-marquee-outer { padding: 20px 0 0; }
          .sd-marquee-label { padding: 0 14px; margin-bottom: 10px; }
          .sd-logo-pill { height: 52px; min-width: 88px; padding: 10px 14px; border-radius: 12px; }
          .sd-logo-img { height: 28px; max-width: 70px; }
        }

        @media (max-width: 400px) {
          .sd-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sd-root" style={hideNavbar ? { minHeight: "auto" } : {}}>
        {!hideNavbar && <SalesNavbar activeTab={activeTab} onTabChange={handleTabChange} />}

        <div className="sd-content">
          {/* Page header */}
          {activeTab !== "overview" && (
            <div className="sd-page-header">
              <h1 className="sd-page-title">
                {activeTab === "company" && "Company Stock"}
                {activeTab === "bosch" && "Bosch Stock"}
                {activeTab === "orders" && "New Order"}
                {activeTab === "history" && "Order History"}
              </h1>
              <p className="sd-page-sub">
                {activeTab === "company" && "Browse company inventory sheets"}
                {activeTab === "bosch" && "Search Bosch parts"}
                {activeTab === "orders" && "Punch a new sales order"}
                {activeTab === "history" && "View all past orders"}
              </p>
            </div>
          )}

          {/* ══ OVERVIEW ══ */}
          {activeTab === "overview" && (
            <OverviewSection
              sheets={sheets} sheetsLoading={sheetsLoading}
              masterQuery={masterQuery} setMasterQuery={setMasterQuery}
              masterResults={masterResults} masterLoading={masterLoading}
              handleTabChange={handleTabChange} handleSheetSelect={handleSheetSelect}
              setSearchInput={setSearchInput}
            />
          )}

          {/* ══ COMPANY / BOSCH STOCK TAB ══ */}
          {isStockTab && (
            <>
              {/* Sheet chips — desktop only */}
              {activeTab === "company" && (
                <>
                  {/* Desktop chip bar */}
                  <div className="sd-sheet-bar">
                    {sheetsLoading
                      ? [1, 2, 3].map((k) => (
                          <div key={k} style={{ width: "80px", height: "32px", flexShrink: 0, background: "var(--color-surface-container)", borderRadius: "20px", animation: "sdSkeletonPulse 1.4s ease-in-out infinite" }} />
                        ))
                      : sheets.map((sheet) => {
                          const name = typeof sheet === "string" ? sheet : sheet.sheetName;
                          const sel = typeof selectedSheet === "string" ? selectedSheet : selectedSheet?.sheetName;
                          return (
                            <button key={name} className={`sd-sheet-chip${name === sel ? " active" : ""}`} onClick={() => handleSheetSelect(sheet)} id={`sheet-chip-${name}`}>
                              {name}
                            </button>
                          );
                        })}
                  </div>

                  {/* Mobile: compact trigger button */}
                  <div className="sd-sheet-picker-wrap">
                    <button
                      className="sd-sheet-picker-btn"
                      onClick={() => { setSheetDrawerOpen(true); setSheetSearch(""); }}
                      id="sd-sheet-picker-trigger"
                    >
                      <span style={{ fontSize: "16px", flexShrink: 0 }}>🏢</span>
                      <span className="sd-sheet-picker-selected">
                        {sheetsLoading ? "Loading sheets…" : (typeof selectedSheet === "string" ? selectedSheet : selectedSheet?.sheetName) || "Select sheet"}
                      </span>
                      <span className="sd-sheet-picker-meta">{sheets.length} sheets</span>
                      <span className="sd-sheet-picker-arrow">▾</span>
                    </button>
                  </div>

                  {/* Mobile: Bottom Sheet Drawer */}
                  {sheetDrawerOpen && (
                    <>
                      <div className="sd-drawer-overlay open" onClick={() => setSheetDrawerOpen(false)} />
                      <div className="sd-sheet-drawer">
                        <div className="sd-drawer-handle" />
                        <div className="sd-drawer-header">
                          <div className="sd-drawer-title">Select Company Sheet</div>
                          <div className="sd-drawer-search-wrap">
                            <span className="sd-drawer-search-icon">🔍</span>
                            <input
                              className="sd-drawer-search"
                              type="text"
                              placeholder="Search sheets…"
                              value={sheetSearch}
                              onChange={(e) => setSheetSearch(e.target.value)}
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="sd-drawer-list">
                          {(() => {
                            const selName = typeof selectedSheet === "string" ? selectedSheet : selectedSheet?.sheetName;
                            const filtered = sheets.filter((s) => {
                              const n = typeof s === "string" ? s : s.sheetName;
                              return n.toLowerCase().includes(sheetSearch.toLowerCase());
                            });
                            if (filtered.length === 0) return <div className="sd-drawer-empty">No sheets found</div>;
                            return filtered.map((sheet) => {
                              const name = typeof sheet === "string" ? sheet : sheet.sheetName;
                              const isActive = name === selName;
                              return (
                                <button
                                  key={name}
                                  className={`sd-drawer-item${isActive ? " active" : ""}`}
                                  onClick={() => { handleSheetSelect(sheet); setSheetDrawerOpen(false); }}
                                >
                                  {name}
                                  {isActive && <span className="sd-drawer-item-check">✓</span>}
                                </button>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Search + view toggle */}
              <div className={`sd-controls${activeTab === "bosch" ? " no-sheet-bar" : ""}`}>
                <div className="sd-search-wrap">
                  <span className="sd-search-icon">🔍</span>
                  <input
                    ref={searchRef} id="sd-search-input" className="sd-search" type="text"
                    placeholder="Search part no, name…" value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  {searchInput && (
                    <button className="sd-search-clear" onClick={() => { setSearchInput(""); searchRef.current?.focus(); }} id="sd-search-clear">✕</button>
                  )}
                </div>

                {/* Item count */}
                {pagination && (
                  <span className="sd-result-count">
                    {pagination.totalDocuments}{debouncedSearch ? ` for "${debouncedSearch}"` : " items"}
                  </span>
                )}

                {/* Mobile view toggle — grid vs list */}
                <div className="sd-view-toggle">
                  <button
                    className={`sd-view-btn${mobileView === "grid" ? " active" : ""}`}
                    onClick={() => setMobileView("grid")}
                    title="Grid view"
                  >
                    {/* 2x2 grid icon */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <rect x="1" y="1" width="6" height="6" rx="1.5"/>
                      <rect x="9" y="1" width="6" height="6" rx="1.5"/>
                      <rect x="1" y="9" width="6" height="6" rx="1.5"/>
                      <rect x="9" y="9" width="6" height="6" rx="1.5"/>
                    </svg>
                  </button>
                  <button
                    className={`sd-view-btn${mobileView === "list" ? " active" : ""}`}
                    onClick={() => setMobileView("list")}
                    title="List view"
                  >
                    {/* list icon */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <rect x="1" y="2" width="14" height="3" rx="1.5"/>
                      <rect x="1" y="6.5" width="14" height="3" rx="1.5"/>
                      <rect x="1" y="11" width="14" height="3" rx="1.5"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              <div className={`sd-grid${mobileView === "list" ? " list-view" : ""}`}>
                {stockLoading
                  ? Array.from({ length: LIMIT }).map((_, i) => <SkeletonCard key={i} />)
                  : stock.length === 0
                  ? <EmptyState search={debouncedSearch} />
                  : stock.map((item) => <ProductCard key={item._id} item={item} />)}
              </div>

              {/* Pagination */}
              {!stockLoading && (
                <div className="sd-pagination-wrap">
                  <Pagination pagination={pagination} onPageChange={setPage} />
                </div>
              )}
            </>
          )}

          {/* ══ ORDERS ══ */}
          {activeTab === "orders" && <CreateOrder onSuccess={() => handleTabChange("history")} />}

          {/* ══ HISTORY ══ */}
          {activeTab === "history" && <OrderHistory />}
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;