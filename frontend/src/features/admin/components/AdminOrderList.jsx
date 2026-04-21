import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────
   WhatsApp-style Image Viewer
───────────────────────────────────────────── */
const ImageViewer = ({ isOpen, onClose, images, startIndex }) => {
  const [currentIdx, setCurrentIdx] = useState(startIndex || 0);
  const [loaded, setLoaded] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(startIndex || 0);
      setLoaded(false);
      document.body.style.overflow = "hidden";
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.18 });
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, startIndex]);

  useEffect(() => {
    setLoaded(false);
  }, [currentIdx]);

  const prev = useCallback(() => {
    setCurrentIdx(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrentIdx(i => (i + 1) % images.length);
  }, [images.length]);

  // Swipe support
  const onTouchStart = (e) => setDragStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (dragStart === null) return;
    const diff = dragStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setDragStart(null);
  };

  // Keyboard
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, prev, next, onClose]);

  // Blob download — works on mobile/WebView
  const downloadImage = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `order-image-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
    } catch {
      // Fallback for WebView
      window.open(url, "_blank");
    }
  };

  if (!isOpen || !images?.length) return null;

  const currentUrl = images[currentIdx]?.url;

  return createPortal(
    <div
      ref={overlayRef}
      style={{
        position: "fixed", inset: 0, zIndex: 99999999,
        background: "#000",
        display: "flex", flexDirection: "column",
        touchAction: "pan-y",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
        padding: "48px 16px 16px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button
          onClick={onClose}
          style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            border: "none", color: "#fff", fontSize: 22, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >‹</button>

        {images.length > 1 && (
          <span style={{
            color: "#fff", fontSize: 14, fontWeight: 700,
            background: "rgba(0,0,0,0.4)", padding: "4px 14px",
            borderRadius: 20, backdropFilter: "blur(6px)",
          }}>
            {currentIdx + 1} / {images.length}
          </span>
        )}

        <button
          onClick={() => downloadImage(currentUrl)}
          style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            border: "none", color: "#fff", fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >↓</button>
      </div>

      {/* Main image */}
      <div
        style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "80px 0 100px",
        }}
        onClick={onClose}
      >
        {!loaded && (
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600 }}>Loading…</div>
        )}
        <img
          ref={imgRef}
          src={currentUrl}
          alt={`Image ${currentIdx + 1}`}
          onLoad={() => setLoaded(true)}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: "100%", maxHeight: "100%",
            objectFit: "contain",
            display: loaded ? "block" : "none",
            userSelect: "none",
          }}
        />
      </div>

      {/* Bottom nav */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "16px 20px 36px",
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={prev} style={navBtnStyle}>‹</button>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: 6 }}>
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIdx(i)}
                style={{
                  width: i === currentIdx ? 20 : 6,
                  height: 6, borderRadius: 3,
                  background: i === currentIdx ? "#fff" : "rgba(255,255,255,0.35)",
                  transition: "all 0.2s", cursor: "pointer",
                }}
              />
            ))}
          </div>

          <button onClick={next} style={navBtnStyle}>›</button>
        </div>
      )}
    </div>,
    document.body
  );
};

const navBtnStyle = {
  width: 44, height: 44, borderRadius: "50%",
  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
  border: "none", color: "#fff", fontSize: 22, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

/* ─────────────────────────────────────────────
   Status Colors
───────────────────────────────────────────── */
const STATUS_COLORS = {
  pending:   { bg: "#fef9c3", text: "#92400e", dot: "#f59e0b" },
  completed: { bg: "#dcfce7", text: "#166534", dot: "#22c55e" },
  cancelled: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
  partial:   { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
};
const getStatusColor = (s) => STATUS_COLORS[s] || { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" };

/* ─────────────────────────────────────────────
   Compact Order Card (collapsed + expanded)
───────────────────────────────────────────── */
const OrderCard = ({ order, index, isLatest, searchQuery, onStatusClick, onDeleteClick, onImageClick }) => {
  const [expanded, setExpanded] = useState(false);
  const bodyRef = useRef(null);
  const sColor = getStatusColor(order.status);
  const dt = new Date(order.createdAt);

  const toggle = () => {
    setExpanded(prev => {
      if (!prev && bodyRef.current) {
        gsap.fromTo(bodyRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.25, ease: "power2.out" }
        );
      }
      return !prev;
    });
  };

  return (
    <div
      id={`order-${order._id}`}
      style={{
        borderRadius: 14,
        border: `1.5px solid ${isLatest ? "var(--color-primary)" : "#e5e7eb"}`,
        background: isLatest ? "rgba(99,102,241,0.04)" : "#fff",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        position: "relative",
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

      {/* ── Collapsed Row (always visible) ── */}
      <div
        onClick={toggle}
        style={{
          display: "flex", alignItems: "center",
          padding: "11px 14px", gap: 10, cursor: "pointer",
          userSelect: "none",
        }}
      >
        {/* Status dot */}
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: sColor.dot, flexShrink: 0,
        }} />

        {/* Party name */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 14, fontWeight: 800, color: "#111827",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {order.partyName}
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginTop: 1 }}>
            {dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
            {" · "}
            {dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            {order.images?.length > 0 && ` · 📷 ${order.images.length}`}
          </div>
        </div>

        {/* Status pill */}
        <span style={{
          padding: "3px 9px", fontSize: 9, fontWeight: 800,
          letterSpacing: "0.06em", textTransform: "uppercase",
          borderRadius: 8, background: sColor.bg, color: sColor.text,
          flexShrink: 0,
        }}>
          {order.status}
        </span>

        {/* Chevron */}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* ── Expanded Body ── */}
      {expanded && (
        <div
          ref={bodyRef}
          style={{
            borderTop: "1px solid #f3f4f6",
            padding: "12px 14px 14px",
            display: "flex", flexDirection: "column", gap: 10,
          }}
        >
          {/* Description */}
          {order.description && (
            <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.55, margin: 0 }}>
              {order.description}
            </p>
          )}

          {/* Remark */}
          {order.remark && (
            <div style={{
              fontSize: 12, color: "#374151", background: "#f9fafb",
              borderRadius: 10, padding: "8px 12px",
              border: "1px solid #e5e7eb", fontStyle: "italic",
              lineHeight: 1.5,
            }}>
              💬 {order.remark}
            </div>
          )}

          {/* Images grid */}
          {order.images?.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {order.images.slice(0, 6).map((img, i) => (
                <div
                  key={i}
                  onClick={() => onImageClick(order.images, i)}
                  style={{
                    width: 60, height: 60, borderRadius: 10,
                    border: "1.5px solid #e5e7eb",
                    overflow: "hidden", cursor: "pointer", flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <img
                    src={img.url} alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  {i === 5 && order.images.length > 6 && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(0,0,0,0.55)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 13, fontWeight: 800,
                    }}>+{order.images.length - 6}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Date full */}
          <div style={{
            fontSize: 11, color: "#9ca3af", fontWeight: 600,
            display: "flex", gap: 10, flexWrap: "wrap",
          }}>
            <span>📅 {dt.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</span>
            <span>🕒 {dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, paddingTop: 4 }}>
            <button
              onClick={() => onStatusClick(order)}
              style={{
                flex: 1, padding: "10px 0", fontSize: 13, fontWeight: 700,
                background: "var(--color-primary)", color: "#fff",
                border: "none", borderRadius: 12, cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              ✎ Resolve Status
            </button>
            <button
              onClick={() => onDeleteClick(order._id)}
              style={{
                width: 42, height: 42, borderRadius: 12,
                background: "#fef2f2", color: "#ef4444",
                border: "1px solid #fecaca", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 17, flexShrink: 0,
              }}
            >🗑️</button>
          </div>
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
  const loading   = useSelector((s) => s.admin.loading);
  const { handleSearchOrders, handleUpdateOrderStatus, handleDeleteOrder } = useAdmin();

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrder,   setSelectedOrder]   = useState(null);
  const [newStatus,       setNewStatus]       = useState("");
  const [remark,          setRemark]          = useState("");
  const [isUpdating,      setIsUpdating]      = useState(false);
  const [searchQuery,     setSearchQuery]     = useState("");

  // Image viewer
  const [viewerOpen,   setViewerOpen]   = useState(false);
  const [viewerImages, setViewerImages] = useState([]);
  const [viewerStart,  setViewerStart]  = useState(0);

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
    return allOrders.reduce((acc, order) => {
      const name = order.user?.name || "Unknown Salesman";
      if (!acc[name]) acc[name] = [];
      acc[name].push(order);
      return acc;
    }, {});
  }, [allOrders]);

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setRemark(order.remark || "");
    setStatusModalOpen(true);
  };

  const submitStatusUpdate = async () => {
    setIsUpdating(true);
    await handleUpdateOrderStatus(selectedOrder._id, { status: newStatus, remark });
    await handleSearchOrders(searchQuery);
    setIsUpdating(false);
    setStatusModalOpen(false);
    setSelectedOrder(null);
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm("Permanently delete this order?")) {
      await handleDeleteOrder(orderId);
      handleSearchOrders(searchQuery);
    }
  };

  const openViewer = (images, startIndex) => {
    setViewerImages(images);
    setViewerStart(startIndex);
    setViewerOpen(true);
  };

  return (
    <div style={{ width: "100%", padding: "0 0 40px" }}>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ position: "relative" }}>
          <svg
            style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af", pointerEvents: "none" }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
      </div>

      {/* Content */}
      {loading && (!allOrders || allOrders.length === 0) ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontWeight: 600 }}>
          Loading orders…
        </div>
      ) : Object.keys(groupedOrders).length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontSize: 14 }}>
          {searchQuery ? "No orders found." : "No orders yet."}
        </div>
      ) : (
        <div ref={listRef} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-primary)", marginTop: 1, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {orders.length} {orders.length === 1 ? "order" : "orders"}
                  </div>
                </div>
              </div>

              {/* Order cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {orders.map((order, index) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    index={index}
                    isLatest={index === 0 && !searchQuery}
                    searchQuery={searchQuery}
                    onStatusClick={openStatusModal}
                    onDeleteClick={deleteOrder}
                    onImageClick={openViewer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Viewer */}
      <ImageViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        images={viewerImages}
        startIndex={viewerStart}
      />

      {/* Status Modal – bottom sheet */}
      {statusModalOpen && selectedOrder && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999999,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
        }}>
          <div style={{
            background: "#fff", borderRadius: "22px 22px 0 0",
            width: "100%", maxWidth: 560,
            boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          }}>
            {/* Handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: "#e5e7eb" }} />
            </div>

            {/* Header */}
            <div style={{ padding: "12px 20px", borderBottom: "1px solid #f3f4f6" }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", color: "#111827" }}>
                Update Order
              </h3>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "3px 0 0", fontWeight: 600 }}>
                {selectedOrder.partyName}
              </p>
            </div>

            {/* Body */}
            <div style={{ padding: "16px 20px", background: "#f9fafb", display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 7 }}>
                  Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{
                    width: "100%", background: "#fff", border: "1.5px solid #e5e7eb",
                    color: "#111827", fontWeight: 600, fontSize: 14,
                    borderRadius: 12, padding: "11px 14px", outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="partial">Partial</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 7 }}>
                  Remark
                </label>
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Leave a note for the salesman…"
                  rows={3}
                  style={{
                    width: "100%", background: "#fff", border: "1.5px solid #e5e7eb",
                    color: "#111827", fontSize: 14, borderRadius: 12,
                    padding: "11px 14px", outline: "none", resize: "vertical",
                    fontFamily: "inherit", boxSizing: "border-box", lineHeight: 1.5,
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: "12px 20px 28px", display: "flex", gap: 10, borderTop: "1px solid #f3f4f6" }}>
              <button
                onClick={() => setStatusModalOpen(false)}
                disabled={isUpdating}
                style={{
                  flex: 1, padding: "13px", fontSize: 14, fontWeight: 700,
                  background: "#f3f4f6", color: "#374151", border: "none",
                  borderRadius: 12, cursor: "pointer",
                }}
              >Cancel</button>
              <button
                onClick={submitStatusUpdate}
                disabled={isUpdating}
                style={{
                  flex: 1, padding: "13px", fontSize: 14, fontWeight: 700,
                  background: "var(--color-primary)", color: "#fff", border: "none",
                  borderRadius: 12, cursor: "pointer", opacity: isUpdating ? 0.6 : 1,
                }}
              >{isUpdating ? "Saving…" : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;