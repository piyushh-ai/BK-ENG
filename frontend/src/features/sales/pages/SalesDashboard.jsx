import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import SalesNavbar from "../components/SalesNavbar";
import ProductCard from "../components/ProductCard";
import CreateOrder from "../components/CreateOrder";
import OrderHistory from "../components/OrderHistory";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import OverviewSection from "../components/OverviewSection";
import SheetBar from "../components/SheetBar";

import { getCompanySheets, getCompanyStock, getBoschStock, masterSearch, normalizeError } from "../services/sales.api";

function useDebounce(value, delay = 380) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const SalesDashboard = ({ hideNavbar = false, adminTab = null }) => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = adminTab || tab || "overview";
  const LIMIT = 12;
  const searchRef = useRef(null);
  // Increment this key every time we navigate to history so OrderHistory
  // always remounts (triggering a fresh fetchMyOrders) after a new order.
  const [historyKey, setHistoryKey] = useState(0);

  const [sheets, setSheets] = useState([]);
  const [sheetsLoading, setSheetsLoading] = useState(false);
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
  const [mobileView, setMobileView] = useState("grid");
  const [networkError, setNetworkError] = useState("");

  const sheetParam = searchParams.get("sheet");
  const selectedSheet = sheetParam
    ? sheets.find((s) => (s.sheetName || s) === sheetParam) || sheetParam
    : sheets.length > 0 ? sheets[0] : null;

  useEffect(() => {
    if (!debouncedMaster.trim()) { setMasterResults([]); return; }
    const ctrl = new AbortController();
    const run = async () => {
      setMasterLoading(true);
      try {
        const d = await masterSearch({ search: debouncedMaster, limit: 12 }, ctrl.signal);
        setMasterResults(d.results || []);
      } catch (e) {
        if (e?.name !== "CanceledError" && e?.name !== "AbortError") console.error(e);
      } finally { setMasterLoading(false); }
    };
    run();
    return () => ctrl.abort();
  }, [debouncedMaster]);

  useEffect(() => {
    const ctrl = new AbortController();
    const load = async () => {
      setSheetsLoading(true);
      try {
        const d = await getCompanySheets(ctrl.signal);
        setSheets(d.companySheets || []);
      } catch (e) {
        if (e?.name !== "CanceledError" && e?.name !== "AbortError") {
          setNetworkError(normalizeError(e));
        }
      } finally { setSheetsLoading(false); }
    };
    load();
    return () => ctrl.abort();
  }, []);

  useEffect(() => { setPage(1); }, [debouncedSearch, selectedSheet, activeTab]);

  useEffect(() => {
    if (activeTab !== "company" && activeTab !== "bosch") { setStockLoading(false); return; }
    const ctrl = new AbortController();
    const load = async () => {
      setStockLoading(true); setStock([]); setNetworkError("");
      try {
        let data;
        if (activeTab === "company" && selectedSheet) {
          const sn = typeof selectedSheet === "string" ? selectedSheet : selectedSheet.sheetName;
          data = await getCompanyStock(sn, { page, limit: LIMIT, search: debouncedSearch }, ctrl.signal);
        } else if (activeTab === "bosch") {
          data = await getBoschStock({ page, limit: LIMIT, search: debouncedSearch }, ctrl.signal);
        }
        if (data) { setStock(data.boschStock || data.companyStock || []); setPagination(data.pagination || null); }
      } catch (e) {
        if (e?.name !== "CanceledError" && e?.name !== "AbortError") {
          setNetworkError(normalizeError(e));
        }
      } finally { setStockLoading(false); }
    };
    load();
    return () => ctrl.abort();
  }, [activeTab, selectedSheet, page, debouncedSearch]);

  const handleTabChange = useCallback((t) => {
    navigate(adminTab ? `/admin/${t}` : `/sales/${t}`);
    setSearchInput(""); setPage(1);
    // Force OrderHistory to remount & refetch when navigating to history
    if (t === "history") setHistoryKey((k) => k + 1);
  }, [adminTab, navigate]);

  const handleSheetSelect = useCallback((sheet) => {
    const name = typeof sheet === "string" ? sheet : sheet.sheetName;
    setSearchParams({ sheet: name }); setSearchInput(""); setPage(1);
  }, [setSearchParams]);

  const isStockTab = activeTab === "company" || activeTab === "bosch";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes sdSkeletonPulse{0%,100%{opacity:1}50%{opacity:0.55}}
        @keyframes sdDropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes sdOverlayIn{from{opacity:0}to{opacity:1}}
        @keyframes sdDrawerUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        .sd-root{min-height:100svh;background:var(--color-background);font-family:'DM Sans',sans-serif;}
        .sd-content{max-width:1400px;margin:0 auto;padding:28px 28px 60px;}
        .sd-page-header{margin-bottom:24px;}
        .sd-page-title{font-family:'Bricolage Grotesque',sans-serif;font-size:26px;font-weight:800;color:var(--color-on-surface);letter-spacing:-0.7px;margin-bottom:4px;}
        .sd-page-sub{font-size:13.5px;color:var(--color-on-surface-variant);}
        .sd-controls{display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap;}
        .sd-search-wrap{flex:1;min-width:220px;max-width:480px;position:relative;}
        .sd-search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--color-outline);font-size:14px;pointer-events:none;}
        .sd-search{width:100%;padding:11px 14px 11px 40px;background:var(--color-surface-container-lowest);border:1.5px solid var(--color-outline-variant);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13.5px;color:var(--color-on-surface);outline:none;transition:all 0.18s;box-sizing:border-box;}
        .sd-search::placeholder{color:var(--color-outline);}
        .sd-search:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px var(--color-primary-fixed-dim);}
        .sd-search-clear{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:var(--color-surface-container);border:none;border-radius:6px;width:22px;height:22px;cursor:pointer;font-size:11px;color:var(--color-on-surface-variant);display:grid;place-items:center;}
        .sd-result-count{font-size:12.5px;color:var(--color-on-surface-variant);white-space:nowrap;}
        .sd-view-toggle{display:none;align-items:center;gap:4px;background:var(--color-surface-container);border:1.5px solid var(--color-outline-variant);border-radius:10px;padding:4px;flex-shrink:0;}
        .sd-view-btn{width:32px;height:32px;border:none;border-radius:7px;background:transparent;cursor:pointer;display:grid;place-items:center;color:var(--color-on-surface-variant);transition:all 0.15s;font-size:15px;}
        .sd-view-btn.active{background:var(--color-primary);color:var(--color-on-primary);}
        .sd-sheet-picker-btn{display:none;width:100%;padding:12px 16px;background:var(--color-surface-container-lowest);border:1.5px solid var(--color-outline-variant);border-radius:12px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:var(--color-on-surface);cursor:pointer;align-items:center;justify-content:space-between;gap:8px;text-align:left;transition:border-color 0.18s;}
        .sd-sheet-picker-btn:active{background:var(--color-surface-container);}
        .sd-sheet-picker-selected{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
        .sd-sheet-picker-meta{font-size:11px;color:var(--color-outline);font-weight:500;flex-shrink:0;}
        .sd-sheet-picker-arrow{font-size:13px;color:var(--color-outline);flex-shrink:0;}
        .sd-drawer-overlay{display:none;position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,0.45);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);animation:sdOverlayIn 0.22s ease both;}
        .sd-drawer-overlay.open{display:block;}
        .sd-sheet-drawer{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:var(--color-surface-container-lowest);border-radius:24px 24px 0 0;padding:0 0 env(safe-area-inset-bottom,16px);box-shadow:0 -8px 40px rgba(0,0,0,0.18);max-height:82svh;display:flex;flex-direction:column;animation:sdDrawerUp 0.32s cubic-bezier(0.32,0.72,0,1) both;}
        .sd-drawer-handle{width:36px;height:4px;border-radius:2px;background:var(--color-outline-variant);margin:12px auto 0;flex-shrink:0;}
        .sd-drawer-header{padding:16px 20px 12px;border-bottom:1px solid var(--color-outline-variant);flex-shrink:0;}
        .sd-drawer-title{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;color:var(--color-on-surface);margin-bottom:12px;}
        .sd-drawer-search{width:100%;padding:10px 16px 10px 40px;background:var(--color-surface-container);border:1.5px solid var(--color-outline-variant);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--color-on-surface);outline:none;box-sizing:border-box;transition:border-color 0.18s;}
        .sd-drawer-search:focus{border-color:var(--color-primary);}
        .sd-drawer-search::placeholder{color:var(--color-outline);}
        .sd-drawer-search-wrap{position:relative;}
        .sd-drawer-search-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);font-size:14px;pointer-events:none;color:var(--color-outline);}
        .sd-drawer-list{overflow-y:auto;flex:1;padding:8px 12px 16px;-webkit-overflow-scrolling:touch;}
        .sd-drawer-item{width:100%;border:none;background:transparent;padding:13px 14px;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;color:var(--color-on-surface);cursor:pointer;text-align:left;display:flex;align-items:center;justify-content:space-between;gap:12px;transition:background 0.15s;}
        .sd-drawer-item:hover,.sd-drawer-item:active{background:var(--color-surface-container);}
        .sd-drawer-item.active{background:color-mix(in srgb,var(--color-primary) 12%,transparent);color:var(--color-primary);font-weight:700;}
        .sd-drawer-item-check{font-size:16px;flex-shrink:0;}
        .sd-drawer-empty{text-align:center;padding:32px 20px;color:var(--color-on-surface-variant);font-size:14px;font-family:'DM Sans',sans-serif;}
        .sd-sheet-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;}
        .sd-sheet-chip{padding:7px 16px;border-radius:20px;border:1.5px solid var(--color-outline-variant);background:var(--color-surface-container-lowest);font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:500;color:var(--color-on-surface-variant);cursor:pointer;transition:all 0.16s;white-space:nowrap;}
        .sd-sheet-chip:hover{border-color:var(--color-primary);color:var(--color-primary);}
        .sd-sheet-chip.active{background:var(--color-primary);border-color:var(--color-primary);color:var(--color-on-primary);font-weight:600;}
        .sd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;}
        .sd-grid.list-view{grid-template-columns:1fr;gap:8px;}
        .sd-grid.list-view>*{border-radius:12px!important;}
        .sd-pagination-wrap{margin-top:24px;}
        .sd-overview-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin-top:24px;}
        .sd-hero-card{background:linear-gradient(135deg,var(--color-primary) 0%,color-mix(in srgb,var(--color-primary) 70%,#1e40af) 100%);border-radius:28px;padding:40px 36px;color:var(--color-on-primary);display:flex;flex-direction:column;justify-content:center;position:relative;z-index:10;grid-column:1/-1;}
        .sd-hero-card::before{content:'';position:absolute;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%);pointer-events:none;}
        .sd-hero-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;opacity:0.75;margin-bottom:12px;font-family:'DM Sans',sans-serif;}
        .sd-hero-title{font-family:'Bricolage Grotesque',sans-serif;font-size:36px;font-weight:800;margin-bottom:14px;letter-spacing:-1.2px;line-height:1.1;}
        .sd-hero-sub{font-size:15px;opacity:0.8;max-width:420px;line-height:1.6;margin-bottom:28px;font-family:'DM Sans',sans-serif;}
        .sd-stat-card{background:var(--color-surface-container-lowest);border:1px solid var(--color-outline-variant);border-radius:22px;padding:24px 22px;display:flex;align-items:center;gap:18px;cursor:pointer;position:relative;overflow:hidden;transition:border-color 0.25s,box-shadow 0.25s,transform 0.25s;}
        .sd-stat-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,0.10);}
        .sd-stat-icon{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;font-size:22px;flex-shrink:0;transition:transform 0.3s;}
        .sd-stat-card:hover .sd-stat-icon{transform:scale(1.12) rotate(-6deg);}
        .sd-stat-content{flex:1;min-width:0;}
        .sd-stat-label{font-size:11px;color:var(--color-on-surface-variant);font-weight:700;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:6px;font-family:'DM Sans',sans-serif;}
        .sd-stat-value{font-family:'Bricolage Grotesque',sans-serif;font-size:30px;font-weight:800;color:var(--color-on-surface);letter-spacing:-0.5px;line-height:1;}
        .sd-stat-arrow{font-size:16px;color:var(--color-outline);transition:transform 0.25s,color 0.25s;flex-shrink:0;}
        .sd-stat-card:hover .sd-stat-arrow{transform:translateX(4px);color:var(--color-primary);}
        .sd-global-search-wrap{position:relative;z-index:500;}
        .sd-global-results{position:absolute;top:calc(100% + 8px);left:0;right:0;background:var(--color-surface-container-lowest);backdrop-filter:blur(20px);border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,0.22);border:1px solid var(--color-outline-variant);max-height:420px;overflow-y:auto;z-index:99999;padding:8px;animation:sdDropIn 0.2s ease both;}
        .sd-result-item{padding:12px 16px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;transition:background 0.15s;font-family:'DM Sans',sans-serif;color:var(--color-on-surface);}
        .sd-result-item:hover{background:var(--color-surface-container);}
        .sd-result-title{font-size:15px;font-weight:600;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
        .sd-result-sub{font-size:12px;color:var(--color-on-surface-variant);margin-top:4px;}
        .sd-result-badge{font-size:10px;font-weight:700;padding:5px 10px;border-radius:20px;text-transform:uppercase;white-space:nowrap;flex-shrink:0;border:1px solid currentColor;}
        .sd-result-badge.bosch{background:#ffdad6;color:#ba1a1a;}
        .sd-result-badge.company{background:#c8f5d4;color:#1a6b2e;}
        .sd-global-empty{padding:24px;text-align:center;color:var(--color-on-surface-variant);font-size:14px;}
        .sd-marquee-outer{padding:28px 0 0;grid-column:1/-1;}
        .sd-marquee-label{font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-on-surface-variant);opacity:0.6;margin-bottom:14px;padding:0 36px;font-family:'DM Sans',sans-serif;}
        .sd-marquee-track{overflow:hidden;-webkit-mask-image:linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%);mask-image:linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%);}
        .sd-marquee-inner{display:flex;align-items:center;gap:16px;width:max-content;padding:4px 0 12px;}
        .sd-logo-pill{background:var(--color-surface-container-lowest);border:1px solid var(--color-outline-variant);border-radius:16px;padding:12px 20px;display:flex;align-items:center;justify-content:center;height:64px;min-width:110px;flex-shrink:0;transition:box-shadow 0.2s,border-color 0.2s;}
        .sd-logo-pill:hover{border-color:var(--color-primary);box-shadow:0 4px 16px rgba(0,0,0,0.10);}
        .sd-logo-img{height:36px;max-width:90px;object-fit:contain;filter:grayscale(0.2);opacity:0.85;transition:filter 0.2s,opacity 0.2s;}
        .sd-logo-pill:hover .sd-logo-img{filter:grayscale(0);opacity:1;}
        @media(max-width:768px){
          .sd-root{padding-bottom:calc(68px + env(safe-area-inset-bottom,0px));}
          .sd-content{padding:0 0 16px;}
          .sd-page-header{padding:14px 14px 0;margin-bottom:0;}
          .sd-page-title{font-size:20px;}
          .sd-page-sub{font-size:12.5px;}
          .sd-sheet-bar{display:none!important;}
          .sd-sheet-picker-btn{display:flex;}
          .sd-sheet-picker-wrap{position:sticky;top:56px;z-index:40;background:var(--color-background);padding:10px 14px;border-bottom:1px solid var(--color-outline-variant);}
          .sd-controls{position:sticky;top:calc(56px + 57px);z-index:39;background:var(--color-background);padding:10px 14px;border-bottom:1px solid var(--color-outline-variant);flex-wrap:nowrap;gap:8px;margin-bottom:10px;}
          .sd-controls.no-sheet-bar{top:56px;}
          .sd-search-wrap{min-width:0;max-width:100%;flex:1;}
          .sd-search{padding:9px 36px;font-size:13px;border-radius:10px;}
          .sd-result-count{font-size:11px;white-space:nowrap;flex-shrink:0;}
          .sd-view-toggle{display:flex;}
          .sd-grid{padding:0 14px;grid-template-columns:1fr 1fr;gap:10px;}
          .sd-grid.list-view{grid-template-columns:1fr;gap:8px;}
          .sd-pagination-wrap{padding:0 14px;margin-top:20px;}
          #pagination-prev,#pagination-next{padding:6px 10px!important;font-size:12px!important;}
          .sd-hero-card{padding:24px 20px;border-radius:20px;margin:14px 14px 0;}
          .sd-hero-title{font-size:24px;letter-spacing:-0.8px;}
          .sd-hero-sub{font-size:13.5px;margin-bottom:18px;max-width:100%;}
          .sd-hero-eyebrow{font-size:10px;margin-bottom:8px;}
          .sd-overview-grid{grid-template-columns:1fr;gap:10px;margin-top:14px;padding:0 14px 14px;}
          .sd-stat-card{padding:16px 14px;border-radius:16px;}
          .sd-stat-value{font-size:26px;}
          .sd-stat-icon{width:44px;height:44px;font-size:18px;}
          .sd-marquee-outer{padding:20px 0 0;}
          .sd-marquee-label{padding:0 14px;margin-bottom:10px;}
          .sd-logo-pill{height:52px;min-width:88px;padding:10px 14px;border-radius:12px;}
          .sd-logo-img{height:28px;max-width:70px;}
        }
        @media(max-width:400px){.sd-grid{grid-template-columns:1fr;}}
        .sd-net-error{
          display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
          padding:12px 20px;background:#fef3c7;border-bottom:1.5px solid #f59e0b;
          font-family:'DM Sans',sans-serif;font-size:13.5px;color:#92400e;font-weight:500;
        }
        :root[data-theme="dark"] .sd-net-error{background:#2d1a00;border-color:#78350f;color:#fde68a;}
        .sd-net-reload{
          padding:6px 16px;background:#f59e0b;color:#fff;border:none;border-radius:8px;
          font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;
          white-space:nowrap;transition:opacity 0.15s;
        }
        .sd-net-reload:hover{opacity:0.88;}
      `}</style>

      <div className="sd-root" style={hideNavbar ? { minHeight: "auto" } : {}}>
        {!hideNavbar && <SalesNavbar activeTab={activeTab} onTabChange={handleTabChange} />}

        {networkError && (
          <div className="sd-net-error" role="alert">
            <span>⚠️ {networkError}</span>
            <button className="sd-net-reload" onClick={() => window.location.reload()}>
              Reload Page
            </button>
          </div>
        )}

        <div className="sd-content">
          {activeTab !== "overview" && activeTab !== "settings" && (
            <div className="sd-page-header">
              <h1 className="sd-page-title">
                {activeTab === "company" && "Company Stock"}
                {activeTab === "bosch"   && "Bosch Stock"}
                {activeTab === "orders"  && "New Order"}
                {activeTab === "history" && "Order History"}
              </h1>
              <p className="sd-page-sub">
                {activeTab === "company" && "Browse company inventory sheets"}
                {activeTab === "bosch"   && "Search Bosch parts"}
                {activeTab === "orders"  && "Punch a new sales order"}
                {activeTab === "history" && "View all past orders"}
              </p>
            </div>
          )}

          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <OverviewSection
              sheets={sheets} sheetsLoading={sheetsLoading}
              masterQuery={masterQuery} setMasterQuery={setMasterQuery}
              masterResults={masterResults} masterLoading={masterLoading}
              handleTabChange={handleTabChange} handleSheetSelect={handleSheetSelect}
              setSearchInput={setSearchInput}
            />
          )}

          {/* ── STOCK TABS ── */}
          {isStockTab && (
            <>
              {activeTab === "company" && (
                <SheetBar
                  sheets={sheets} sheetsLoading={sheetsLoading}
                  selectedSheet={selectedSheet} onSheetSelect={handleSheetSelect}
                />
              )}

              {/* Controls */}
              <div className={`sd-controls${activeTab === "bosch" ? " no-sheet-bar" : ""}`}>
                <div className="sd-search-wrap">
                  <span className="sd-search-icon">🔍</span>
                  <input
                    ref={searchRef} id="sd-search-input" className="sd-search" type="text"
                    placeholder="Search part no, name…" value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  {searchInput && (
                    <button className="sd-search-clear" id="sd-search-clear"
                      onClick={() => { setSearchInput(""); searchRef.current?.focus(); }}>✕</button>
                  )}
                </div>
                {pagination && (
                  <span className="sd-result-count">
                    {pagination.totalDocuments}{debouncedSearch ? ` for "${debouncedSearch}"` : " items"}
                  </span>
                )}
                <div className="sd-view-toggle">
                  <button className={`sd-view-btn${mobileView === "grid" ? " active" : ""}`} onClick={() => setMobileView("grid")} title="Grid view">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>
                  </button>
                  <button className={`sd-view-btn${mobileView === "list" ? " active" : ""}`} onClick={() => setMobileView("list")} title="List view">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="3" rx="1.5"/><rect x="1" y="6.5" width="14" height="3" rx="1.5"/><rect x="1" y="11" width="14" height="3" rx="1.5"/></svg>
                  </button>
                </div>
              </div>

              {/* Grid */}
              <div className={`sd-grid${mobileView === "list" ? " list-view" : ""}`}>
                {stockLoading
                  ? Array.from({ length: LIMIT }).map((_, i) => <SkeletonCard key={i} />)
                  : stock.length === 0
                  ? <EmptyState search={debouncedSearch} />
                  : stock.map((item) => <ProductCard key={item._id} item={item} />)}
              </div>

              {!stockLoading && (
                <div className="sd-pagination-wrap">
                  <Pagination pagination={pagination} onPageChange={setPage} />
                </div>
              )}
            </>
          )}

          {activeTab === "orders"  && <CreateOrder onSuccess={() => handleTabChange("history")} />}
          {activeTab === "history" && <OrderHistory key={historyKey} />}
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;