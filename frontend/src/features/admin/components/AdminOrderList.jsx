import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────
   Status Colors
───────────────────────────────────────────── */
const STATUS_COLORS = {
  pending:   { bg: "#fef9c3", text: "#92400e", dot: "#f59e0b" },
  completed: { bg: "#dcfce7", text: "#166534", dot: "#22c55e" },
  cancelled: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
  partial:   { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
};
const getStatusColor = (s) =>
  STATUS_COLORS[s] || { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" };

/* ─────────────────────────────────────────────
   Responsive hook
───────────────────────────────────────────── */
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 900 : false
  );
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 900);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isDesktop;
};

/* ─────────────────────────────────────────────
   Order Card
───────────────────────────────────────────── */
const OrderCard = ({ order, isLatest, searchQuery }) => {
  const navigate = useNavigate();
  const sColor = getStatusColor(order.status);
  const dt = new Date(order.createdAt);

  return (
    <div
      id={`order-${order._id}`}
      onClick={() => navigate(`/admin/order/${order._id}`)}
      style={{
        borderRadius: 14,
        border: `1.5px solid ${isLatest ? "var(--color-primary)" : "#e5e7eb"}`,
        background: isLatest ? "rgba(99,102,241,0.04)" : "#fff",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        position: "relative",
        cursor: "pointer",
        transition: "box-shadow 0.15s, transform 0.1s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(99,102,241,0.12)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {isLatest && (
        <span style={{
          position: "absolute", top: -1, right: 12,
          background: "var(--color-primary)", color: "#fff",
          fontSize: 8, fontWeight: 900, letterSpacing: "0.12em",
          textTransform: "uppercase", padding: "2px 8px",
          borderRadius: "0 0 6px 6px",
        }}>NEW</span>
      )}

      <div style={{
        display: "flex", alignItems: "center",
        padding: "12px 14px", gap: 10,
        userSelect: "none",
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: sColor.dot, flexShrink: 0,
        }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 14, fontWeight: 800, color: "#111827",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {order.partyName}
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginTop: 2 }}>
            {dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
            {" · "}
            {dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            {order.images?.length > 0 && ` · 📷 ${order.images.length}`}
          </div>
        </div>

        <span style={{
          padding: "3px 9px", fontSize: 9, fontWeight: 800,
          letterSpacing: "0.06em", textTransform: "uppercase",
          borderRadius: 8, background: sColor.bg, color: sColor.text,
          flexShrink: 0,
        }}>
          {order.status}
        </span>

        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#d1d5db" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Stats bar (desktop only)
───────────────────────────────────────────── */
const StatsBar = ({ allOrders }) => {
  const counts = useMemo(() => {
    if (!allOrders) return {};
    return allOrders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {});
  }, [allOrders]);

  const stats = [
    { label: "Total", value: allOrders?.length || 0, color: "#6366f1", bg: "#eef2ff" },
    { label: "Pending",   value: counts.pending   || 0, color: STATUS_COLORS.pending.text,   bg: STATUS_COLORS.pending.bg },
    { label: "Completed", value: counts.completed || 0, color: STATUS_COLORS.completed.text, bg: STATUS_COLORS.completed.bg },
    { label: "Partial",   value: counts.partial   || 0, color: STATUS_COLORS.partial.text,   bg: STATUS_COLORS.partial.bg },
    { label: "Cancelled", value: counts.cancelled || 0, color: STATUS_COLORS.cancelled.text, bg: STATUS_COLORS.cancelled.bg },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 12,
      marginBottom: 24,
    }}>
      {stats.map(({ label, value, color, bg }) => (
        <div key={label} style={{
          background: "#fff",
          borderRadius: 14,
          border: "1.5px solid #e5e7eb",
          padding: "14px 16px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, marginBottom: 6 }}>
            {label}
          </div>
          <div style={{
            fontSize: 26, fontWeight: 900, color,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            lineHeight: 1,
          }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const AdminOrderList = () => {
  const allOrders = useSelector((s) => s.admin.allOrders);
  const loading   = useSelector((s) => s.admin.loading);
  const { handleSearchOrders } = useAdmin();
  const isDesktop = useIsDesktop();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // desktop only
  const [searchParams] = useSearchParams();
  const highlightOrderId = searchParams.get("orderId");
  const listRef = useRef(null);

  useEffect(() => {
    const h = setTimeout(() => handleSearchOrders(searchQuery), 450);
    return () => clearTimeout(h);
  }, [searchQuery]);

  useEffect(() => {
    if (allOrders?.length > 0 && listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.35, ease: "power2.out" }
      );
      if (highlightOrderId) {
        setTimeout(() => {
          const el = document.getElementById(`order-${highlightOrderId}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            gsap.fromTo(el,
              { boxShadow: "0 0 0 3px var(--color-primary)" },
              { boxShadow: "0 0 0 0px var(--color-primary)", duration: 1.8, ease: "power2.out", delay: 0.4 }
            );
          }
        }, 600);
      }
    }
  }, [allOrders, highlightOrderId]);

  const groupedOrders = useMemo(() => {
    if (!allOrders) return {};
    const filtered = filterStatus === "all"
      ? allOrders
      : allOrders.filter(o => o.status === filterStatus);
    return filtered.reduce((acc, order) => {
      const name = order.user?.name || "Unknown Salesman";
      if (!acc[name]) acc[name] = [];
      acc[name].push(order);
      return acc;
    }, {});
  }, [allOrders, filterStatus]);

  const SearchBar = () => (
    <div style={{ position: "relative" }}>
      <svg
        style={{
          position: "absolute", left: 13, top: "50%",
          transform: "translateY(-50%)", width: 16, height: 16,
          color: "#9ca3af", pointerEvents: "none",
        }}
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search by party name…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%", paddingLeft: 40, paddingRight: 16,
          paddingTop: 12, paddingBottom: 12,
          borderRadius: 14, border: "1.5px solid var(--color-outline-variant)",
          background: "var(--color-surface-container-lowest)",
          color: "var(--color-on-surface)",
          fontSize: 14, fontWeight: 600, outline: "none",
          boxSizing: "border-box", transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--color-outline-variant)")}
      />
    </div>
  );

  const OrderGrid = () => (
    Object.keys(groupedOrders).length === 0 ? (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontSize: 14 }}>
        {searchQuery ? "No orders found." : "No orders yet."}
      </div>
    ) : (
      <div
        ref={listRef}
        style={{
          display: "flex", flexDirection: "column", gap: 16,
        }}
      >
        {Object.entries(groupedOrders).map(([salesman, orders]) => (
          <div
            key={salesman}
            style={{
              background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)",
              borderRadius: 18, padding: "14px 12px",
              border: "1.5px solid var(--color-outline-variant)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            {/* Salesman header */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              marginBottom: 12, paddingBottom: 10,
              borderBottom: "1px solid var(--color-outline-variant)",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "2px solid var(--color-primary)",
                overflow: "hidden", flexShrink: 0, background: "#fff",
              }}>
                <img
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${salesman}`}
                  style={{ width: "100%", height: "100%" }} alt="Avatar"
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 15, fontWeight: 800, color: "var(--color-on-surface)",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {salesman}
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: "var(--color-primary)",
                  marginTop: 1, textTransform: "uppercase", letterSpacing: "0.06em",
                }}>
                  {orders.length} {orders.length === 1 ? "order" : "orders"}
                </div>
              </div>
            </div>

            {/* Order cards — 2-col grid on desktop */}
            <div style={{
              display: isDesktop ? "grid" : "flex",
              gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined,
              flexDirection: isDesktop ? undefined : "column",
              gap: 8,
            }}>
              {orders.map((order, index) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  index={index}
                  isLatest={index === 0 && !searchQuery}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  );

  /* ── DESKTOP layout ── */
  if (isDesktop) {
    const STATUS_FILTERS = ["all", "pending", "completed", "partial", "cancelled"];

    return (
      <div style={{ width: "100%", padding: "0 0 40px" }}>

        {/* Stats bar */}
        {!loading && allOrders?.length > 0 && <StatsBar allOrders={allOrders} />}

        {/* Search + filter row */}
        <div style={{
          display: "flex", gap: 12, marginBottom: 20, alignItems: "center",
        }}>
          <div style={{ flex: 1 }}>
            <SearchBar />
          </div>

          {/* Status filter pills */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {STATUS_FILTERS.map((s) => {
              const sc = s === "all"
                ? { bg: "#eef2ff", text: "#4338ca", dot: "#6366f1" }
                : getStatusColor(s);
              const isActive = filterStatus === s;
              return (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    fontSize: 12, fontWeight: 700,
                    textTransform: "capitalize",
                    border: isActive ? `1.5px solid ${sc.dot}` : "1.5px solid #e5e7eb",
                    background: isActive ? sc.bg : "#fff",
                    color: isActive ? sc.text : "#6b7280",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading or list */}
        {loading && (!allOrders || allOrders.length === 0) ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontWeight: 600 }}>
            Loading orders…
          </div>
        ) : (
          <OrderGrid />
        )}
      </div>
    );
  }

  /* ── MOBILE layout (original) ── */
  return (
    <div style={{ width: "100%", padding: "0 0 40px" }}>
      <div style={{ marginBottom: 20 }}>
        <SearchBar />
      </div>

      {loading && (!allOrders || allOrders.length === 0) ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontWeight: 600 }}>
          Loading orders…
        </div>
      ) : (
        <OrderGrid />
      )}
    </div>
  );
};

export default AdminOrderList;