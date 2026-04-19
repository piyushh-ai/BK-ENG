import React, { useState, useEffect, useRef } from "react";
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

// ── Debounce helper ──────────────────────────────────────────────────
function useDebounce(value, delay = 380) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ── Skeleton loader card ─────────────────────────────────────────────
const SkeletonCard = () => (
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
      <div
        style={{
          height: "18px",
          background: "var(--color-surface-container)",
          borderRadius: "6px",
          marginBottom: "10px",
          width: "70%",
        }}
      />
      <div
        style={{
          height: "13px",
          background: "var(--color-surface-container)",
          borderRadius: "6px",
          marginBottom: "16px",
          width: "45%",
        }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          style={{
            height: "48px",
            flex: 1,
            background: "var(--color-surface-container)",
            borderRadius: "8px",
          }}
        />
        <div
          style={{
            height: "48px",
            flex: 1,
            background: "var(--color-surface-container)",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
    <div style={{ padding: "0 20px 16px" }}>
      <div
        style={{
          height: "40px",
          background: "var(--color-surface-container)",
          borderRadius: "10px",
        }}
      />
    </div>
  </div>
);

// ── Empty state ──────────────────────────────────────────────────────
const EmptyState = ({ search }) => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
    );
  }, []);
  return (
    <div
      ref={ref}
      style={{
        gridColumn: "1 / -1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        color: "var(--color-on-surface-variant)",
        fontFamily: "'DM Sans', sans-serif",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "24px",
          marginBottom: "20px",
          background: "var(--color-surface-container)",
          display: "grid",
          placeItems: "center",
          fontSize: "36px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        🔍
      </div>
      <div
        style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "var(--color-on-surface)",
          marginBottom: "8px",
          letterSpacing: "-0.3px",
        }}
      >
        {search ? "No results found" : "No items available"}
      </div>
      <div style={{ fontSize: "14px", maxWidth: "320px", lineHeight: 1.6 }}>
        {search
          ? `We couldn't find anything matching "${search}". Try different keywords or clear the search.`
          : "There are no items to display in this category."}
      </div>
    </div>
  );
};

// ── Pagination ───────────────────────────────────────────────────────
const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;
  const { currentPage, totalPages, totalDocuments, pageSize } = pagination;
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalDocuments);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "32px",
        padding: "0 4px",
        fontFamily: "'DM Sans', sans-serif",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <span
        style={{ fontSize: "12.5px", color: "var(--color-on-surface-variant)" }}
      >
        Showing {from}–{to} of <strong>{totalDocuments}</strong> items
      </span>
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          style={{
            padding: "7px 14px",
            borderRadius: "8px",
            border: "1.5px solid var(--color-outline-variant)",
            background: "var(--color-surface-container-lowest)",
            cursor: "pointer",
            fontSize: "13px",
            color: "var(--color-on-surface-variant)",
            transition: "all 0.15s",
            opacity: !pagination.hasPrevPage ? 0.4 : 1,
          }}
          id="pagination-prev"
        >
          ← Prev
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              style={{
                padding: "7px 4px",
                color: "var(--color-outline)",
                fontSize: "13px",
              }}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              id={`pagination-page-${p}`}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border:
                  p === currentPage
                    ? "none"
                    : "1.5px solid var(--color-outline-variant)",
                background:
                  p === currentPage
                    ? "var(--color-primary)"
                    : "var(--color-surface-container-lowest)",
                color:
                  p === currentPage
                    ? "var(--color-on-primary)"
                    : "var(--color-on-surface-variant)",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: p === currentPage ? 700 : 400,
                transition: "all 0.15s",
              }}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!pagination.hasNextPage}
          style={{
            padding: "7px 14px",
            borderRadius: "8px",
            border: "1.5px solid var(--color-outline-variant)",
            background: "var(--color-surface-container-lowest)",
            cursor: "pointer",
            fontSize: "13px",
            color: "var(--color-on-surface-variant)",
            transition: "all 0.15s",
            opacity: !pagination.hasNextPage ? 0.4 : 1,
          }}
          id="pagination-next"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════
// OVERVIEW SECTION (extracted for GSAP animations)
// ══════════════════════════════════════════════════════════════════════
const OverviewSection = ({
  sheets,
  sheetsLoading,
  masterQuery,
  setMasterQuery,
  masterResults,
  masterLoading,
  handleTabChange,
  handleSheetSelect,
  setSearchInput,
}) => {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const searchRef2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance — no scale to avoid layout shifts on mobile
      gsap.fromTo(
        heroRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
          // clearProps ensures no residual transform after animation
          onComplete: () =>
            gsap.set(heroRef.current, { clearProps: "transform" }),
        },
      );
      // Hero children stagger
      gsap.fromTo(
        heroRef.current.children,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.2,
          onComplete: () =>
            gsap.set(heroRef.current.children, { clearProps: "transform" }),
        },
      );
      // Search bar
      if (searchRef2.current) {
        gsap.fromTo(
          searchRef2.current,
          { x: -16, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.35,
            onComplete: () =>
              gsap.set(searchRef2.current, { clearProps: "transform" }),
          },
        );
      }
      // Stat cards — no scale, only y
      const cards = cardsRef.current?.querySelectorAll(".sd-stat-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.4,
            onComplete: () => gsap.set(cards, { clearProps: "transform" }),
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const statCards = [
    {
      id: "company",
      icon: "🏢",
      label: "Company Sheets",
      value: sheetsLoading ? "…" : sheets.length || 0,
      bg: "var(--color-secondary-container)",
      color: "var(--color-on-secondary-container)",
    },
    {
      id: "bosch",
      icon: "⚙️",
      label: "Bosch Parts",
      value: "Live",
      bg: "color-mix(in srgb, #ba1a1a 18%, transparent)",
      color: "#ba1a1a",
    },
    {
      id: "history",
      icon: "📦",
      label: "Pending Orders",
      value: "0",
      bg: "var(--color-tertiary-fixed, #d0f0e8)",
      color: "var(--color-on-tertiary-fixed, #0a3d2e)",
    },
  ];

  return (
    <div>
      {/* ── Hero Card ── */}
      <div className="sd-hero-card" ref={heroRef}>
        <div className="sd-hero-eyebrow">B.K Engineering · Sales Portal</div>
        <h1 className="sd-hero-title">Sales Gateway</h1>
        <p className="sd-hero-sub">
          Search instantly across Bosch and Company inventory all in one
          place.
        </p>

        {/* Global Search */}
        <div
          className="sd-global-search-wrap"
          ref={searchRef2}
          style={{
            position: "relative",
            maxWidth: "580px",
            width: "100%",
            marginTop: "4px",
          }}
        >
          <input
            type="text"
            className="sd-search"
            placeholder="Search part numbers, item names..."
            value={masterQuery}
            onChange={(e) => setMasterQuery(e.target.value)}
            style={{
              padding: "15px 20px 15px 50px",
              fontSize: "15px",
              borderRadius: "14px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
              background: "rgba(255,255,255,0.13)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              color: "#fff",
              backdropFilter: "blur(12px)",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.borderColor = "rgba(255,255,255,0.5)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255,255,255,0.13)";
              e.target.style.borderColor = "rgba(255,255,255,0.25)";
            }}
          />
          <span
            style={{
              position: "absolute",
              zIndex: 100,
              left: "17px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "17px",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          {masterQuery && (
            <button
              onClick={() => setMasterQuery("")}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: "6px",
                width: "26px",
                height: "26px",
                cursor: "pointer",
                color: "#fff",
                fontSize: "11px",
                display: "grid",
                placeItems: "center",
              }}
            >
              ✕
            </button>
          )}

          {/* Dropdown */}
          {masterQuery && (
            <div className="sd-global-results">
              {masterLoading ? (
                <div className="sd-global-empty">Searching…</div>
              ) : masterResults.length === 0 ? (
                <div className="sd-global-empty">No results found</div>
              ) : (
                masterResults.map((item) => (
                  <div
                    key={item._id}
                    className="sd-result-item"
                    onClick={() => {
                      handleTabChange(
                        item.source === "bosch" ? "bosch" : "company",
                      );
                      if (item.source === "company")
                        handleSheetSelect(item.sheetName);
                      setSearchInput(item.partno || item.itemName);
                      setMasterQuery("");
                    }}
                  >
                    <div style={{ overflow: "hidden", paddingRight: "12px" }}>
                      <div className="sd-result-title">
                        {item.itemName || "Unnamed"}
                      </div>
                      <div className="sd-result-sub">
                        PN: {item.partno || "N/A"}
                      </div>
                    </div>
                    <div
                      className={`sd-result-badge ${item.source === "bosch" ? "bosch" : "company"}`}
                    >
                      {item.source === "bosch"
                        ? "Bosch"
                        : item.sheetName || "Company"}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="sd-overview-grid" ref={cardsRef}>
        {statCards.map(({ id, icon, label, value, bg, color }) => (
          <div
            className="sd-stat-card"
            key={id}
            onClick={() => handleTabChange(id)}
          >
            <div className="sd-stat-icon" style={{ background: bg, color }}>
              {icon}
            </div>
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
};

// ══════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ══════════════════════════════════════════════════════════════════════
const SalesDashboard = ({ hideNavbar = false, adminTab = null }) => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = adminTab || tab || "overview";

  // Company tab state
  const [sheets, setSheets] = useState([]);
  const [sheetsLoading, setSheetsLoading] = useState(false);

  const sheetParam = searchParams.get("sheet");
  const selectedSheet = sheetParam
    ? sheets.find((s) => (s.sheetName || s) === sheetParam) || sheetParam
    : sheets.length > 0
      ? sheets[0]
      : null;

  // Stock state
  const [stock, setStock] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [stockLoading, setStockLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  // Master Search state
  const [masterQuery, setMasterQuery] = useState("");
  const debouncedMaster = useDebounce(masterQuery, 350);
  const [masterResults, setMasterResults] = useState([]);
  const [masterLoading, setMasterLoading] = useState(false);

  const LIMIT = 12;
  const searchRef = useRef(null);

  // ── Fetch Master Search ────────────────────────────────────────────
  useEffect(() => {
    if (!debouncedMaster.trim()) {
      setMasterResults([]);
      return;
    }
    const fetchMaster = async () => {
      setMasterLoading(true);
      try {
        const data = await masterSearch({ search: debouncedMaster, limit: 12 });
        setMasterResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setMasterLoading(false);
      }
    };
    fetchMaster();
  }, [debouncedMaster]);

  // ── Fetch company sheets on mount ──────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setSheetsLoading(true);
      try {
        const data = await getCompanySheets();
        setSheets(data.companySheets || []);
      } catch (err) {
        console.error(err);
      } finally {
        setSheetsLoading(false);
      }
    };
    load();
  }, []);

  // ── Reset page when search changes ────────────────────────────────
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedSheet, activeTab]);

  // ── Fetch stock whenever dependencies change ───────────────────────
  useEffect(() => {
    const load = async () => {
      setStockLoading(true);
      setStock([]);
      try {
        let data;
        if (activeTab === "company" && selectedSheet) {
          const sheetName =
            typeof selectedSheet === "string"
              ? selectedSheet
              : selectedSheet.sheetName;
          data = await getCompanyStock(sheetName, {
            page,
            limit: LIMIT,
            search: debouncedSearch,
          });
        } else if (activeTab === "bosch") {
          data = await getBoschStock({
            page,
            limit: LIMIT,
            search: debouncedSearch,
          });
        } else {
          setStockLoading(false);
          return;
        }

        const items = data.boschStock || data.companyStock || [];
        setStock(items);
        setPagination(data.pagination || null);
      } catch (err) {
        console.error(err);
      } finally {
        setStockLoading(false);
      }
    };
    if (activeTab === "company" || activeTab === "bosch") {
      load();
    } else {
      setStockLoading(false);
    }
  }, [activeTab, selectedSheet, page, debouncedSearch]);

  const handleTabChange = (newTab) => {
    if (adminTab) {
      navigate(`/admin/${newTab}`);
    } else {
      navigate(`/sales/${newTab}`);
    }
    setSearchInput("");
    setPage(1);
  };

  const handleSheetSelect = (sheet) => {
    const name = typeof sheet === "string" ? sheet : sheet.sheetName;
    setSearchParams({ sheet: name });
    setSearchInput("");
    setPage(1);
  };

  const isStockTab = activeTab === "company" || activeTab === "bosch";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes sdSkeletonPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }

        .sd-root {
          min-height: 100svh;
          background: var(--color-background);
          font-family: 'DM Sans', sans-serif;
        }

        .sd-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 28px 28px 60px;
        }
        @media (max-width: 768px) {
          .sd-root { 
    padding-bottom: calc(68px + env(safe-area-inset-bottom, 16px));  /* ✅ */
  }
          .sd-content {
            padding: 14px 14px 24px;
          }
        }

        /* ── Page header ── */
        .sd-page-header {
          margin-bottom: 24px;
        }
        .sd-page-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -0.7px;
          margin-bottom: 4px;
        }
        .sd-page-sub {
          font-size: 13.5px;
          color: var(--color-on-surface-variant);
        }

        /* ── Controls bar ── */
        .sd-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .sd-search-wrap {
          flex: 1;
          min-width: 220px;
          max-width: 480px;
          position: relative;
        }
        .sd-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-outline);
          font-size: 14px;
          pointer-events: none;
        }
        .sd-search {
          width: 100%;
          padding: 11px 14px 11px 40px;
          background: var(--color-surface-container-lowest);
          border: 1.5px solid var(--color-outline-variant);
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: var(--color-on-surface);
          outline: none;
          transition: all 0.18s;
          box-sizing: border-box;
        }
        .sd-search::placeholder { color: var(--color-outline); }
        .sd-search:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-fixed-dim);
          background: var(--color-surface-container-lowest);
        }
        .sd-search-clear {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--color-surface-container);
          border: none;
          border-radius: 6px;
          width: 22px; height: 22px;
          cursor: pointer;
          font-size: 11px;
          color: var(--color-on-surface-variant);
          display: grid; place-items: center;
          transition: all 0.15s;
        }
        .sd-search-clear:hover { background: var(--color-surface-container-high); }

        .sd-result-count {
          font-size: 12.5px;
          color: var(--color-on-surface-variant);
          white-space: nowrap;
        }

        /* ── Sheet selector ── */
        .sd-sheet-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .sd-sheet-chip {
          padding: 7px 16px;
          border-radius: 20px;
          border: 1.5px solid var(--color-outline-variant);
          background: var(--color-surface-container-lowest);
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--color-on-surface-variant);
          cursor: pointer;
          transition: all 0.16s;
          white-space: nowrap;
        }
        .sd-sheet-chip:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary-fixed) 20%, transparent);
        }
        .sd-sheet-chip.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-on-primary);
          font-weight: 600;
        }

        /* ── Grid ── */
        .sd-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        /* ── Overview Dashboard Cards ── */
        .sd-overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }
        .sd-hero-card {
          background: linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 70%, var(--color-secondary, #1e40af)) 100%);
          border-radius: 28px;
          padding: 40px 36px;
          color: var(--color-on-primary);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 10;
          grid-column: 1 / -1;
          /* NO overflow:hidden — it clips the search dropdown */
          /* Decorative circles handled via pointer-events:none pseudo-elements */
        }
        .sd-hero-card::before {
          content: '';
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%);
          pointer-events: none;
        }
        .sd-hero-card::after {
          content: '';
          position: absolute;
          bottom: -60px; left: 20%;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 70%);
          pointer-events: none;
        }
        .sd-hero-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.75;
          margin-bottom: 12px;
          font-family: 'DM Sans', sans-serif;
        }
        .sd-hero-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 14px;
          letter-spacing: -1.2px;
          line-height: 1.1;
        }
        .sd-hero-sub {
          font-size: 15px;
          opacity: 0.8;
          max-width: 420px;
          line-height: 1.6;
          margin-bottom: 28px;
          font-family: 'DM Sans', sans-serif;
        }
        
        .sd-stat-card {
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 22px;
          padding: 24px 22px;
          display: flex;
          align-items: center;
          gap: 18px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .sd-stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .sd-stat-card:hover::before { opacity: 1; }
        .sd-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.10);
          border-color: color-mix(in srgb, var(--color-primary) 35%, var(--color-outline-variant));
        }
        .sd-stat-card:active { transform: translateY(-2px); }
        .sd-stat-icon {
          width: 54px; height: 54px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          font-size: 22px;
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .sd-stat-card:hover .sd-stat-icon { transform: scale(1.12) rotate(-6deg); }
        .sd-stat-content { flex: 1; min-width: 0; }
        .sd-stat-label {
          font-size: 11px;
          color: var(--color-on-surface-variant);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 6px;
          font-family: 'DM Sans', sans-serif;
        }
        .sd-stat-value {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -0.5px;
          line-height: 1;
        }
        .sd-stat-arrow {
          font-size: 16px;
          color: var(--color-outline);
          transition: transform 0.25s ease, color 0.25s ease;
          flex-shrink: 0;
        }
        .sd-stat-card:hover .sd-stat-arrow {
          transform: translateX(4px);
          color: var(--color-primary);
        }

        /* ── Global Search Dropdown \u2500\u2500 */
        .sd-global-search-wrap {
          position: relative;
          z-index: 500;
        }
        .sd-global-results {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: var(--color-surface-container-lowest);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.22), 0 4px 16px rgba(0,0,0,0.1);
          border: 1px solid var(--color-outline-variant);
          max-height: 420px;
          overflow-y: auto;
          z-index: 99999;
          padding: 8px;
          animation: sdDropIn 0.2s cubic-bezier(0.34, 1.4, 0.64, 1) both;
        }
        @keyframes sdDropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sd-result-item {
          padding: 12px 16px;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'DM Sans', sans-serif;
          color: var(--color-on-surface);
        }
        .sd-result-item:hover {
          background: var(--color-surface-container);
        }
        
        .sd-result-title {
          font-size: 15px;
          font-weight: 600;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        
        .sd-result-sub {
          font-size: 12px;
          color: var(--color-on-surface-variant);
          margin-top: 4px;
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        
        .sd-result-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: 20px;
          text-transform: uppercase;
          white-space: nowrap;
          flex-shrink: 0;
          border: 1px solid currentColor;
        }
        
        .sd-result-badge.bosch { background: #ffdad6; color: #ba1a1a; }
        .sd-result-badge.company { background: #c8f5d4; color: #1a6b2e; }

        .sd-global-empty {
           padding: 24px;
           text-align: center;
           color: var(--color-on-surface-variant);
           font-size: 14px;
           font-family: 'DM Sans', sans-serif;
        }

        /* ── Placeholder tabs ── */
        .sd-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
          color: var(--color-on-surface-variant);
          text-align: center;
          gap: 12px;
        }
        .sd-placeholder-icon { font-size: 56px; }
        .sd-placeholder-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--color-on-surface);
          letter-spacing: -0.4px;
        }
        .sd-placeholder-sub { font-size: 14px; max-width: 360px; line-height: 1.6; }

        @media (max-width: 768px) {
          /* Content padding — leave bottom space for fixed nav */
          .sd-root { padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px)); }
          .sd-content { padding: 14px 12px 16px; }

          /* Overview hero card — compact on mobile */
          .sd-hero-card {
            padding: 24px 20px;
            border-radius: 20px;
          }
          .sd-hero-title { font-size: 24px; letter-spacing: -0.8px; }
          .sd-hero-sub {
            font-size: 13.5px;
            margin-bottom: 18px;
            max-width: 100%;
          }
          .sd-hero-eyebrow { font-size: 10px; margin-bottom: 8px; }

          /* Overview grid — single column */
          .sd-overview-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-top: 16px;
          }
          .sd-stat-card { padding: 18px 16px; border-radius: 18px; }
          .sd-stat-value { font-size: 26px; }
          .sd-stat-icon { width: 46px; height: 46px; font-size: 18px; }

          /* Stock grid */
          .sd-grid { grid-template-columns: 1fr; }
          .sd-controls { flex-direction: column; align-items: stretch; }
          .sd-search-wrap { max-width: 100%; }
        }
      `}</style>

      <div className="sd-root" style={hideNavbar ? { minHeight: "auto" } : {}}>
        {!hideNavbar && <SalesNavbar activeTab={activeTab} onTabChange={handleTabChange} />}

        <div className="sd-content">
          {/* ── Page header (Hidden on Overview for a cleaner look) ── */}
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

          {/* ══ OVERVIEW TAB ════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <OverviewSection
              sheets={sheets}
              sheetsLoading={sheetsLoading}
              masterQuery={masterQuery}
              setMasterQuery={setMasterQuery}
              masterResults={masterResults}
              masterLoading={masterLoading}
              handleTabChange={handleTabChange}
              handleSheetSelect={handleSheetSelect}
              setSearchInput={setSearchInput}
            />
          )}

          {/* ══ COMPANY & BOSCH TAB ═════════════════════════════════ */}
          {isStockTab && (
            <>
              {/* Sheet selector — only for company tab */}
              {activeTab === "company" && (
                <div className="sd-sheet-bar">
                  {sheetsLoading
                    ? [1, 2, 3].map((k) => (
                        <div
                          key={k}
                          style={{
                            width: "90px",
                            height: "34px",
                            background: "var(--color-surface-container)",
                            borderRadius: "20px",
                            animation:
                              "sdSkeletonPulse 1.4s ease-in-out infinite",
                          }}
                        />
                      ))
                    : sheets.map((sheet) => {
                        const name =
                          typeof sheet === "string" ? sheet : sheet.sheetName;
                        const sel =
                          typeof selectedSheet === "string"
                            ? selectedSheet
                            : selectedSheet?.sheetName;
                        return (
                          <button
                            key={name}
                            className={`sd-sheet-chip${name === sel ? " active" : ""}`}
                            onClick={() => handleSheetSelect(sheet)}
                            id={`sheet-chip-${name}`}
                          >
                            {name}
                          </button>
                        );
                      })}
                </div>
              )}

              {/* Controls */}
              <div className="sd-controls">
                <div className="sd-search-wrap">
                  <span className="sd-search-icon">🔍</span>
                  <input
                    ref={searchRef}
                    id="sd-search-input"
                    className="sd-search"
                    type="text"
                    placeholder="Search by part no, name, description…"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  {searchInput && (
                    <button
                      className="sd-search-clear"
                      onClick={() => {
                        setSearchInput("");
                        searchRef.current?.focus();
                      }}
                      id="sd-search-clear"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {pagination && (
                  <span className="sd-result-count">
                    {pagination.totalDocuments} item
                    {pagination.totalDocuments !== 1 ? "s" : ""}
                    {debouncedSearch ? ` for "${debouncedSearch}"` : ""}
                  </span>
                )}
              </div>

              {/* Grid */}
              <div className="sd-grid">
                {stockLoading ? (
                  Array.from({ length: LIMIT }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                ) : stock.length === 0 ? (
                  <EmptyState search={debouncedSearch} />
                ) : (
                  stock.map((item) => (
                    <ProductCard key={item._id} item={item} />
                  ))
                )}
              </div>

              {/* Pagination */}
              {!stockLoading && (
                <Pagination pagination={pagination} onPageChange={setPage} />
              )}
            </>
          )}

          {/* ══ ORDERS TAB ══════════════════════════════════════════ */}
          {activeTab === "orders" && (
            <CreateOrder onSuccess={() => handleTabChange("history")} />
          )}

          {/* ══ HISTORY TAB ══════════════════════════════════════════ */}
          {activeTab === "history" && (
            <OrderHistory />
          )}
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;
