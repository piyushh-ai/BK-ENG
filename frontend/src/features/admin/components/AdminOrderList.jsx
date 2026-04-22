import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────
   Status Config
───────────────────────────────────────────── */
const STATUS_CONFIG = {
  pending: {
    bg: "#fffbeb",
    text: "#b45309",
    dot: "#f59e0b",
    border: "#fde68a",
  },
  completed: {
    bg: "#f0fdf4",
    text: "#15803d",
    dot: "#22c55e",
    border: "#bbf7d0",
  },
  cancelled: {
    bg: "#fff1f2",
    text: "#be123c",
    dot: "#f43f5e",
    border: "#fecdd3",
  },
  partial: {
    bg: "#eff6ff",
    text: "#1d4ed8",
    dot: "#3b82f6",
    border: "#bfdbfe",
  },
};
const getStatusConfig = (s) =>
  STATUS_CONFIG[s] || {
    bg: "#f9fafb",
    text: "#374151",
    dot: "#9ca3af",
    border: "#e5e7eb",
  };

/* ─────────────────────────────────────────────
   Responsive hook
───────────────────────────────────────────── */
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 900 : false,
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
const OrderCard = ({ order, isLatest }) => {
  const navigate = useNavigate();
  const sc = getStatusConfig(order.status);
  const dt = new Date(order.createdAt);

  return (
    <div
      id={`order-${order._id}`}
      onClick={() => navigate(`/admin/order/${order._id}`)}
      style={{
        borderRadius: 14,
        border: `1px solid ${isLatest ? "#c7d2fe" : "#f1f5f9"}`,
        background: "#ffffff",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transition:
          "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.1)";
        e.currentTarget.style.borderColor = "#c7d2fe";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
        e.currentTarget.style.borderColor = isLatest ? "#c7d2fe" : "#f1f5f9";
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: sc.dot,
          borderRadius: "14px 0 0 14px",
        }}
      />

      {isLatest && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "2px 8px",
            borderRadius: 6,
          }}
        >
          NEW
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "14px 14px 14px 18px",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            flexShrink: 0,
            background: "#f1f5f9",
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(order.partyName || "User")}`}
            style={{ width: "100%", height: "100%" }}
            alt=""
          />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#0f172a",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginBottom: 3,
            }}
          >
            {order.partyName}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#94a3b8",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
            {" · "}
            {dt.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {order.images?.length > 0 && (
              <span
                style={{
                  marginLeft: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "#cbd5e1",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                {order.images.length}
              </span>
            )}
          </div>
        </div>

        {/* Status pill */}
        <div
          style={{
            padding: "4px 10px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            borderRadius: 20,
            background: sc.bg,
            color: sc.text,
            border: `1px solid ${sc.border}`,
            flexShrink: 0,
          }}
        >
          {order.status}
        </div>

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Stats bar
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
    {
      label: "Total",
      value: allOrders?.length || 0,
      color: "#4f46e5",
      bg: "#eef2ff",
      border: "#c7d2fe",
    },
    {
      label: "Pending",
      value: counts.pending || 0,
      ...STATUS_CONFIG.pending,
      color: STATUS_CONFIG.pending.text,
    },
    {
      label: "Completed",
      value: counts.completed || 0,
      ...STATUS_CONFIG.completed,
      color: STATUS_CONFIG.completed.text,
    },
    {
      label: "Partial",
      value: counts.partial || 0,
      ...STATUS_CONFIG.partial,
      color: STATUS_CONFIG.partial.text,
    },
    {
      label: "Cancelled",
      value: counts.cancelled || 0,
      ...STATUS_CONFIG.cancelled,
      color: STATUS_CONFIG.cancelled.text,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 10,
        marginBottom: 20,
      }}
    >
      {stats.map(({ label, value, color, bg, border }) => (
        <div
          key={label}
          style={{
            background: bg || "#fff",
            borderRadius: 12,
            border: `1px solid ${border || "#e2e8f0"}`,
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 6,
              opacity: 0.75,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              lineHeight: 1,
            }}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Custom Select
───────────────────────────────────────────── */
const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#fff",
          border: `1.5px solid ${isOpen ? "#818cf8" : "#e2e8f0"}`,
          borderRadius: 10,
          padding: "7px 12px",
          cursor: "pointer",
          transition: "border-color 0.15s",
          boxShadow: isOpen ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#1e293b",
            whiteSpace: "nowrap",
          }}
        >
          {selectedOption.label}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isOpen ? "#6366f1" : "#94a3b8"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.15s",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 50,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: 4,
            minWidth: "100%",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            animation: "dropdownIn 0.12s ease forwards",
          }}
        >
          {options.map((o) => (
            <div
              key={o.value}
              onClick={() => {
                onChange(o.value);
                setIsOpen(false);
              }}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: o.value === value ? 700 : 500,
                color: o.value === value ? "#4f46e5" : "#475569",
                background: o.value === value ? "#eef2ff" : "transparent",
                transition: "background 0.1s",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
              onMouseEnter={(e) => {
                if (o.value !== value)
                  e.currentTarget.style.background = "#f8fafc";
              }}
              onMouseLeave={(e) => {
                if (o.value !== value)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {o.label}
              {o.value === value && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const AdminOrderList = () => {
  const allOrders = useSelector((s) => s.admin.allOrders);
  const loading = useSelector((s) => s.admin.loading);
  const { handleSearchOrders, handleGetAllOrders } = useAdmin();
  const isDesktop = useIsDesktop();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grouped_salesman");
  const [sortOrder, setSortOrder] = useState("date_desc");

  const [searchParams] = useSearchParams();
  const highlightOrderId = searchParams.get("orderId");
  const listRef = useRef(null);

  useEffect(() => {
    const h = setTimeout(() => {
      if (!searchQuery) handleGetAllOrders(1, 500);
      else handleSearchOrders(searchQuery);
    }, 450);
    return () => clearTimeout(h);
  }, [searchQuery]);

  useEffect(() => {
    const styleId = "aol-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
    if (allOrders?.length > 0 && listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, stagger: 0.035, duration: 0.3, ease: "power2.out" },
      );
      if (highlightOrderId) {
        setTimeout(() => {
          const el = document.getElementById(`order-${highlightOrderId}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            gsap.fromTo(
              el,
              { boxShadow: "0 0 0 3px #6366f1" },
              {
                boxShadow: "0 0 0 0px #6366f1",
                duration: 2,
                ease: "power2.out",
                delay: 0.3,
              },
            );
          }
        }, 600);
      }
    }
  }, [allOrders, highlightOrderId, viewMode, sortOrder]);

  const processedOrders = useMemo(() => {
    if (!allOrders) return { type: "flat", data: [] };
    let filtered =
      filterStatus === "all"
        ? allOrders
        : allOrders.filter((o) => o.status === filterStatus);
    filtered = [...filtered].sort((a, b) => {
      if (sortOrder === "date_desc")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "date_asc")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOrder === "party_asc")
        return a.partyName.localeCompare(b.partyName);
      return 0;
    });
    if (viewMode === "grouped_salesman") {
      const groups = filtered.reduce((acc, order) => {
        const name = order.user?.name || "Unknown Salesman";
        if (!acc[name]) acc[name] = [];
        acc[name].push(order);
        return acc;
      }, {});
      return { type: "grouped", data: groups };
    }
    if (viewMode === "grouped_status") {
      const groups = filtered.reduce((acc, order) => {
        const status = order.status || "unknown";
        if (!acc[status]) acc[status] = [];
        acc[status].push(order);
        return acc;
      }, {});
      return { type: "grouped", data: groups };
    }
    return { type: "flat", data: filtered };
  }, [allOrders, filterStatus, sortOrder, viewMode]);

  /* ── Sub-components ── */
  const SearchBar = () => (
    <div style={{ position: "relative" }}>
      <svg
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          width: 16,
          height: 16,
          color: "#94a3b8",
          pointerEvents: "none",
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search party name…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          paddingLeft: 42,
          paddingRight: 14,
          paddingTop: 12,
          paddingBottom: 12,
          borderRadius: 12,
          border: "1.5px solid #e2e8f0",
          background: "#fff",
          color: "#0f172a",
          fontSize: 14,
          fontWeight: 500,
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#818cf8";
          e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e2e8f0";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );

  const SortFilterBar = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
        padding: "8px 12px",
        background: "#f8fafc",
        borderRadius: 12,
        border: "1px solid #f1f5f9",
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: "#94a3b8",
          letterSpacing: "0.1em",
          flexShrink: 0,
          paddingRight: 2,
        }}
      >
        VIEW
      </span>
      <CustomSelect
        value={viewMode}
        onChange={setViewMode}
        options={[
          { value: "grouped_salesman", label: "By Salesman" },
          { value: "grouped_status", label: "By Status" },
          { value: "flat", label: "Flat List" },
        ]}
      />
      <div
        style={{
          width: 1,
          height: 20,
          background: "#e2e8f0",
          flexShrink: 0,
          margin: "0 4px",
        }}
      />
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: "#94a3b8",
          letterSpacing: "0.1em",
          flexShrink: 0,
          paddingRight: 2,
        }}
      >
        SORT
      </span>
      <CustomSelect
        value={sortOrder}
        onChange={setSortOrder}
        options={[
          { value: "date_desc", label: "Newest First" },
          { value: "date_asc", label: "Oldest First" },
          { value: "party_asc", label: "Party A–Z" },
        ]}
      />
    </div>
  );

  const OrderGrid = () => {
    const isEmpty =
      processedOrders.type === "flat"
        ? processedOrders.data.length === 0
        : Object.keys(processedOrders.data).length === 0;

    if (isEmpty) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "64px 20px",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "#f1f5f9",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>
            {searchQuery ? "No orders found" : "No orders yet"}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>
            {searchQuery
              ? `Try searching something else`
              : "Orders will appear here"}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={listRef}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        {processedOrders.type === "flat" ? (
          <div
            style={{
              display: isDesktop ? "grid" : "flex",
              gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined,
              flexDirection: isDesktop ? undefined : "column",
              gap: 10,
            }}
          >
            {processedOrders.data.map((order, index) => (
              <OrderCard
                key={order._id}
                order={order}
                isLatest={
                  index === 0 && !searchQuery && sortOrder === "date_desc"
                }
              />
            ))}
          </div>
        ) : (
          Object.entries(processedOrders.data).map(([groupName, orders]) => {
            const sc = getStatusConfig(groupName);
            return (
              <div
                key={groupName}
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                }}
              >
                {/* Group header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 16px",
                    background: "#fafbfc",
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  {viewMode === "grouped_salesman" && (
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        flexShrink: 0,
                        overflow: "hidden",
                        border: "1.5px solid #e0e7ff",
                      }}
                    >
                      <img
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(groupName || "User")}`}
                        style={{ width: "100%", height: "100%" }}
                        alt=""
                      />
                    </div>
                  )}
                  {viewMode === "grouped_status" && (
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: sc.bg,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                        border: `1px solid ${sc.border}`,
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: sc.dot,
                        }}
                      />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#0f172a",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textTransform:
                          viewMode === "grouped_status" ? "capitalize" : "none",
                      }}
                    >
                      {groupName}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        fontWeight: 600,
                        marginTop: 1,
                      }}
                    >
                      {orders.length} {orders.length === 1 ? "order" : "orders"}
                    </div>
                  </div>
                  {/* Mini stats row for salesman groups */}
                  {viewMode === "grouped_salesman" &&
                    (() => {
                      const statuses = orders.reduce((a, o) => {
                        a[o.status] = (a[o.status] || 0) + 1;
                        return a;
                      }, {});
                      return (
                        <div style={{ display: "flex", gap: 6 }}>
                          {Object.entries(statuses).map(([s, c]) => {
                            const st = getStatusConfig(s);
                            return (
                              <div
                                key={s}
                                style={{
                                  padding: "2px 8px",
                                  borderRadius: 20,
                                  background: st.bg,
                                  color: st.text,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  border: `1px solid ${st.border}`,
                                  textTransform: "capitalize",
                                }}
                              >
                                {s} · {c}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                </div>

                {/* Cards */}
                <div
                  style={{
                    padding: 12,
                    display: isDesktop ? "grid" : "flex",
                    gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined,
                    flexDirection: isDesktop ? undefined : "column",
                    gap: 10,
                  }}
                >
                  {orders.map((order, index) => (
                    <OrderCard
                      key={order._id}
                      order={order}
                      isLatest={
                        index === 0 && !searchQuery && sortOrder === "date_desc"
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  /* ── DESKTOP ── */
  if (isDesktop) {
    const STATUS_FILTERS = [
      "all",
      "pending",
      "completed",
      "partial",
      "cancelled",
    ];
    return (
      <div style={{ width: "100%", padding: "0 0 48px" }}>
        {!loading && allOrders?.length > 0 && (
          <StatsBar allOrders={allOrders} />
        )}

        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 14,
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <SearchBar />
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {STATUS_FILTERS.map((s) => {
              const sc =
                s === "all"
                  ? {
                      bg: "#eef2ff",
                      text: "#4338ca",
                      dot: "#6366f1",
                      border: "#c7d2fe",
                    }
                  : getStatusConfig(s);
              const isActive = filterStatus === s;
              return (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "capitalize",
                    border: `1.5px solid ${isActive ? sc.border : "#e2e8f0"}`,
                    background: isActive ? sc.bg : "#fff",
                    color: isActive ? sc.text : "#64748b",
                    cursor: "pointer",
                    transition: "all 0.12s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "#c7d2fe";
                      e.currentTarget.style.color = "#4f46e5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.color = "#64748b";
                    }
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <SortFilterBar />

        {loading && (!allOrders || allOrders.length === 0) ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div
              style={{
                display: "inline-flex",
                gap: 6,
                alignItems: "center",
                color: "#94a3b8",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: "spin 1s linear infinite" }}
              >
                <path
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeOpacity="0.3"
                />
                <path d="M21 12a9 9 0 00-9-9" />
              </svg>
              Loading orders…
            </div>
          </div>
        ) : (
          <OrderGrid />
        )}
      </div>
    );
  }

  /* ── MOBILE ── */
  return (
    <div style={{ width: "100%", padding: "0 0 40px" }}>
      <div style={{ marginBottom: 10 }}>
        <SearchBar />
      </div>
      <SortFilterBar />
      {loading && (!allOrders || allOrders.length === 0) ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#94a3b8",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Loading orders…
        </div>
      ) : (
        <OrderGrid />
      )}
    </div>
  );
};

export default AdminOrderList;
