import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────
   Image Modal – mobile-first, WebView-safe
───────────────────────────────────────────── */
const ImageModal = ({ isOpen, onClose, imageUrl, allImages, currentIndex, onNavigate }) => {
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (isOpen && overlayRef.current && imgRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(imgRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)", delay: 0.05 });
    }
  }, [isOpen, currentIndex]);

  /**
   * WebView-safe download:
   * 1. Try anchor download (works in most browsers)
   * 2. Fallback: open in new tab (WebView will handle / share)
   */
  const downloadImage = (url) => {
    try {
      const a = document.createElement("a");
      a.href = url;
      a.download = `order-image-${Date.now()}.jpg`;
      a.target = "_blank";           // ensures WebView opens it
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      window.open(url, "_blank");
    }
  };

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999999,
        background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0",                 // no outer padding – content handles it
        touchAction: "none",
      }}
    >
      {/* Close Button – bright pill, top-center, impossible to miss */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 104, left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          background: "#ffffff",
          border: "none",
          color: "#111827",
          fontSize: 14, fontWeight: 800,
          padding: "10px 24px",
          borderRadius: 50,
          cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
        }}
      >
        ✕ &nbsp;Close
      </button>

      {/* Counter */}
      {allImages?.length > 1 && (
        <div style={{
          position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          color: "#fff", fontSize: 13, fontWeight: 700,
          padding: "4px 14px", borderRadius: 20,
        }}>
          {currentIndex + 1} / {allImages.length}
        </div>
      )}

      {/* Image container – stop click propagation */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", height: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "60px 16px 100px",
          boxSizing: "border-box",
        }}
      >
        <img
          ref={imgRef}
          src={imageUrl}
          alt="preview"
          style={{
            maxWidth: "100%", maxHeight: "100%",
            objectFit: "contain", borderRadius: 12,
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
          }}
        />
      </div>

      {/* Bottom bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "16px 20px 28px",
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        }}
      >
        {/* Prev */}
        {allImages?.length > 1 && (
          <button
            onClick={() => onNavigate("prev")}
            style={{
              background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
              width: 44, height: 44, borderRadius: "50%", fontSize: 20, cursor: "pointer",
              backdropFilter: "blur(6px)",
            }}
          >‹</button>
        )}

        {/* Download */}
        <button
          onClick={() => downloadImage(imageUrl)}
          style={{
            padding: "12px 28px",
            background: "var(--color-primary, #6366f1)", color: "#fff",
            border: "none", borderRadius: 14, fontWeight: 700, fontSize: 15,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)", letterSpacing: "0.02em",
            flex: allImages?.length > 1 ? "1" : "0 1 220px",
            justifyContent: "center", maxWidth: 280,
          }}
        >
          📥 Download
        </button>

        {/* Next */}
        {allImages?.length > 1 && (
          <button
            onClick={() => onNavigate("next")}
            style={{
              background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
              width: 44, height: 44, borderRadius: "50%", fontSize: 20, cursor: "pointer",
              backdropFilter: "blur(6px)",
            }}
          >›</button>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Status badge colours
───────────────────────────────────────────── */
const STATUS_COLORS = {
  pending:   { bg: "#fef08a", text: "#854d0e" },
  completed: { bg: "#bbf7d0", text: "#166534" },
  cancelled: { bg: "#fecaca", text: "#991b1b" },
  partial:   { bg: "#bfdbfe", text: "#1e40af" },
};
const getStatusColor = (s) => STATUS_COLORS[s] || { bg: "#e5e7eb", text: "#374151" };

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const AdminOrderList = () => {
  const allOrders  = useSelector((s) => s.admin.allOrders);
  const loading    = useSelector((s) => s.admin.loading);
  const { handleSearchOrders, handleUpdateOrderStatus, handleDeleteOrder } = useAdmin();

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrder,   setSelectedOrder]   = useState(null);
  const [newStatus,       setNewStatus]       = useState("");
  const [remark,          setRemark]          = useState("");
  const [isUpdating,      setIsUpdating]      = useState(false);
  const [searchQuery,     setSearchQuery]     = useState("");

  // Image gallery state
  const [imgModalOpen,   setImgModalOpen]    = useState(false);
  const [galleryImages,  setGalleryImages]   = useState([]);
  const [galleryIndex,   setGalleryIndex]    = useState(0);

  const [searchParams] = useSearchParams();
  const highlightOrderId = searchParams.get("orderId");
  const listRef = useRef(null);

  /* Debounced search */
  useEffect(() => {
    const h = setTimeout(() => handleSearchOrders(searchQuery), 450);
    return () => clearTimeout(h);
  }, [searchQuery]);

  /* Animate cards on load */
  useEffect(() => {
    if (allOrders?.length > 0 && listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.45, ease: "power2.out" }
      );

      if (highlightOrderId) {
        setTimeout(() => {
          const el = document.getElementById(`order-${highlightOrderId}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            gsap.fromTo(el,
              { scale: 1.04, boxShadow: "0 0 0 4px var(--color-primary)" },
              { scale: 1, boxShadow: "0 0 0 0px var(--color-primary)", duration: 2, ease: "power2.out", delay: 0.4 }
            );
          }
        }, 600);
      }
    }
  }, [allOrders, highlightOrderId]);

  /* Group by salesman */
  const groupedOrders = useMemo(() => {
    if (!allOrders) return {};
    return allOrders.reduce((acc, order) => {
      const name = order.user?.name || "Unknown Salesman";
      if (!acc[name]) acc[name] = [];
      acc[name].push(order);
      return acc;
    }, {});
  }, [allOrders]);

  /* Modal helpers */
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
    if (window.confirm("Are you sure you want to permanently delete this order? This cannot be undone.")) {
      await handleDeleteOrder(orderId);
      handleSearchOrders(searchQuery);
    }
  };

  /* Gallery helpers */
  const openGallery = (images, startIndex = 0) => {
    setGalleryImages(images);
    setGalleryIndex(startIndex);
    setImgModalOpen(true);
  };

  const navigateGallery = (dir) => {
    setGalleryIndex((i) => {
      if (dir === "prev") return (i - 1 + galleryImages.length) % galleryImages.length;
      return (i + 1) % galleryImages.length;
    });
  };

  /* ── Render ── */
  return (
    <div style={{ width: "100%", position: "relative", padding: "0 0 40px" }}>

      {/* ── Search ── */}
      <div style={{ marginBottom: 24 }}>
        <label style={{
          display: "block", fontSize: 11, fontWeight: 800,
          marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em",
          color: "var(--color-outline)",
        }}>
          Find Orders
        </label>
        <div style={{ position: "relative" }}>
          <svg
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 18, height: 18, color: "#9ca3af" }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by party name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%", paddingLeft: 44, paddingRight: 16,
              paddingTop: 14, paddingBottom: 14,
              borderRadius: 16, border: "2px solid var(--color-outline-variant)",
              background: "var(--color-surface-container-lowest)",
              color: "var(--color-on-surface)",
              fontSize: 15, fontWeight: 600, outline: "none",
              boxSizing: "border-box", transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-outline-variant)")}
          />
        </div>
      </div>

      {/* ── States ── */}
      {loading && (!allOrders || allOrders.length === 0) ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontWeight: 600 }}>
          Loading orders…
        </div>
      ) : Object.keys(groupedOrders).length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
          {searchQuery ? "No orders found for this party name." : "No orders currently in the system."}
        </div>
      ) : (
        <div ref={listRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {Object.entries(groupedOrders).map(([salesman, orders]) => (
            <div
              key={salesman}
              style={{
                background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)",
                borderRadius: 20, padding: "16px 14px",
                border: "1.5px solid var(--color-outline-variant)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Salesman header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                marginBottom: 14, paddingBottom: 12,
                borderBottom: "1.5px solid var(--color-outline-variant)",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  border: "2px solid var(--color-primary)",
                  overflow: "hidden", flexShrink: 0,
                  background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}>
                  <img
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${salesman}`}
                    style={{ width: "100%", height: "100%" }}
                    alt="Avatar"
                  />
                </div>
                <div>
                  <h3 style={{
                    fontSize: 17, fontWeight: 800, margin: 0, lineHeight: 1.2,
                    color: "var(--color-on-surface)",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}>
                    {salesman}
                  </h3>
                  <p style={{ fontSize: 11, fontWeight: 700, margin: "3px 0 0", color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                  </p>
                </div>
              </div>

              {/* Orders – single column on mobile */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {orders.map((order, index) => {
                  const sColor = getStatusColor(order.status);
                  const dt     = new Date(order.createdAt);
                  const isLatest = index === 0 && !searchQuery;

                  return (
                    <div
                      id={`order-${order._id}`}
                      key={order._id}
                      style={{
                        position: "relative",
                        padding: "14px 14px 14px",
                        borderRadius: 16,
                        border: `1.5px solid ${isLatest ? "var(--color-primary)" : "var(--color-outline-variant)"}`,
                        background: isLatest ? "rgba(99,102,241,0.05)" : "#fff",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                        display: "flex", flexDirection: "column", gap: 10,
                      }}
                    >
                      {isLatest && (
                        <span style={{
                          position: "absolute", top: -10, right: 12,
                          background: "var(--color-primary)", color: "#fff",
                          fontSize: 9, fontWeight: 900, letterSpacing: "0.12em",
                          textTransform: "uppercase", padding: "3px 10px",
                          borderRadius: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}>Latest</span>
                      )}

                      {/* Party + Status row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                            Party
                          </div>
                          <div style={{
                            fontSize: 16, fontWeight: 800, color: "#111827",
                            lineHeight: 1.2, wordBreak: "break-word",
                          }}>
                            {order.partyName}
                          </div>
                        </div>
                        <span style={{
                          flexShrink: 0, padding: "4px 10px",
                          fontSize: 10, fontWeight: 800, letterSpacing: "0.06em",
                          textTransform: "uppercase", borderRadius: 10,
                          background: sColor.bg, color: sColor.text,
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}>
                          {order.status}
                        </span>
                      </div>

                      {/* Description */}
                      {order.description && (
                        <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {order.description}
                        </div>
                      )}

                      {/* Remark */}
                      {order.remark && (
                        <div style={{
                          fontSize: 12, color: "#374151", background: "#f9fafb",
                          borderRadius: 10, padding: "8px 12px",
                          border: "1px solid #e5e7eb", fontStyle: "italic",
                        }}>
                          💬 {order.remark}
                        </div>
                      )}

                      {/* Images */}
                      {order.images?.length > 0 && (
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {order.images.slice(0, 5).map((img, i) => (
                            <div
                              key={i}
                              onClick={() => openGallery(order.images, i)}
                              style={{
                                width: 56, height: 56, borderRadius: 10,
                                border: "1.5px solid var(--color-outline-variant)",
                                overflow: "hidden", cursor: "pointer",
                                flexShrink: 0, position: "relative",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                              }}
                            >
                              <img
                                src={img.url}
                                alt={`img-${i}`}
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                              />
                              {i === 4 && order.images.length > 5 && (
                                <div style={{
                                  position: "absolute", inset: 0,
                                  background: "rgba(0,0,0,0.55)",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  color: "#fff", fontSize: 13, fontWeight: 800,
                                }}>+{order.images.length - 5}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Date/Time */}
                      <div style={{
                        display: "flex", gap: 12, fontSize: 11, color: "#9ca3af",
                        fontWeight: 600, background: "#f9fafb",
                        padding: "8px 12px", borderRadius: 10,
                        border: "1px solid #f3f4f6", flexWrap: "wrap",
                      }}>
                        <span>📅 {dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                        <span>🕒 {dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>

                      {/* Actions */}
                      <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        paddingTop: 10, borderTop: "1px solid #f3f4f6",
                      }}>
                        <button
                          onClick={() => openStatusModal(order)}
                          style={{
                            padding: "10px 18px", fontSize: 13, fontWeight: 700,
                            background: "var(--color-primary)", color: "#fff",
                            border: "none", borderRadius: 12, cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          Resolve Status
                        </button>

                        <button
                          onClick={() => deleteOrder(order._id)}
                          style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: "#fef2f2", color: "#ef4444",
                            border: "1px solid #fecaca", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 18,
                          }}
                          title="Delete Order"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Image Gallery Modal ── */}
      <ImageModal
        isOpen={imgModalOpen}
        imageUrl={galleryImages[galleryIndex]?.url}
        allImages={galleryImages}
        currentIndex={galleryIndex}
        onNavigate={navigateGallery}
        onClose={() => setImgModalOpen(false)}
      />

      {/* ── Status Update Modal ── */}
      {statusModalOpen && selectedOrder && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999999,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          padding: 0,
        }}>
          <div style={{
            background: "#fff", borderRadius: "24px 24px 0 0",
            width: "100%", maxWidth: 560,
            boxShadow: "0 -8px 40px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}>
            {/* Handle bar */}
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: "#e5e7eb" }} />
            </div>

            {/* Header */}
            <div style={{ padding: "14px 20px 14px", borderBottom: "1px solid #f3f4f6" }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", color: "#111827" }}>
                Update Order
              </h3>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0", fontWeight: 600 }}>
                Party: <span style={{ color: "var(--color-primary)" }}>{selectedOrder.partyName}</span>
              </p>
            </div>

            {/* Body */}
            <div style={{ padding: "18px 20px", background: "#f9fafb", display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  Order Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{
                    width: "100%", background: "#fff", border: "1.5px solid #e5e7eb",
                    color: "#111827", fontWeight: 600, fontSize: 15,
                    borderRadius: 14, padding: "12px 16px", outline: "none",
                    boxSizing: "border-box", appearance: "auto",
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="partial">Partial</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  Admin Remark
                </label>
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Leave an official note for the salesman..."
                  rows={3}
                  style={{
                    width: "100%", background: "#fff", border: "1.5px solid #e5e7eb",
                    color: "#111827", fontSize: 14, borderRadius: 14,
                    padding: "12px 16px", outline: "none", resize: "vertical",
                    fontFamily: "inherit", boxSizing: "border-box", lineHeight: 1.5,
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: "14px 20px 28px", display: "flex", gap: 12,
              borderTop: "1px solid #f3f4f6", background: "#fff",
            }}>
              <button
                onClick={() => setStatusModalOpen(false)}
                disabled={isUpdating}
                style={{
                  flex: 1, padding: "14px", fontSize: 14, fontWeight: 700,
                  background: "#f3f4f6", color: "#374151", border: "none",
                  borderRadius: 14, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={submitStatusUpdate}
                disabled={isUpdating}
                style={{
                  flex: 1, padding: "14px", fontSize: 14, fontWeight: 700,
                  background: "var(--color-primary)", color: "#fff", border: "none",
                  borderRadius: 14, cursor: "pointer", opacity: isUpdating ? 0.6 : 1,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                }}
              >
                {isUpdating ? "Saving…" : "Save Status"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
