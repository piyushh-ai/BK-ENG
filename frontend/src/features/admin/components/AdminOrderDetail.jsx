import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

const STATUSES = ["pending", "completed", "partial", "cancelled"];

/* ─────────────────────────────────────────────
   Detect React Native WebView
───────────────────────────────────────────── */
const isReactNativeWebView = () =>
  typeof window !== "undefined" && !!window.ReactNativeWebView;

/* ─────────────────────────────────────────────
   Download helper — RN WebView safe
───────────────────────────────────────────── */
const downloadImage = async (url) => {
  // React Native WebView: post message to native handler
  if (isReactNativeWebView()) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "DOWNLOAD_IMAGE", url })
    );
    return;
  }
  // Web: blob download
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
    window.open(url, "_blank");
  }
};

/* ─────────────────────────────────────────────
   Nav button style for image viewer
───────────────────────────────────────────── */
const navBtnStyle = {
  width: 44, height: 44, borderRadius: "50%",
  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
  border: "none", color: "#fff", fontSize: 22, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

/* ─────────────────────────────────────────────
   WhatsApp-style Image Viewer (portal)
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

  useEffect(() => { setLoaded(false); }, [currentIdx]);

  const prev = useCallback(() => {
    setCurrentIdx(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrentIdx(i => (i + 1) % images.length);
  }, [images.length]);

  const onTouchStart = (e) => setDragStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (dragStart === null) return;
    const diff = dragStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setDragStart(null);
  };

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

  if (!isOpen || !images?.length) return null;
  const currentUrl = images[currentIdx]?.url;

  return createPortal(
    <div
      ref={overlayRef}
      style={{
        position: "fixed", inset: 0, zIndex: 99999999,
        background: "#000", display: "flex", flexDirection: "column",
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
        <button onClick={onClose} style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          border: "none", color: "#fff", fontSize: 22, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>‹</button>

        {images.length > 1 && (
          <span style={{
            color: "#fff", fontSize: 14, fontWeight: 700,
            background: "rgba(0,0,0,0.4)", padding: "4px 14px",
            borderRadius: 20, backdropFilter: "blur(6px)",
          }}>
            {currentIdx + 1} / {images.length}
          </span>
        )}

        {/* Download button — RN WebView safe */}
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
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600 }}>
            Loading…
          </div>
        )}
        <img
          ref={imgRef}
          src={currentUrl}
          alt={`Image ${currentIdx + 1}`}
          onLoad={() => setLoaded(true)}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
            display: loaded ? "block" : "none", userSelect: "none",
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
          <div style={{ display: "flex", gap: 6 }}>
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIdx(i)}
                style={{
                  width: i === currentIdx ? 20 : 6, height: 6, borderRadius: 3,
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

/* ─────────────────────────────────────────────
   Delete Confirm Modal
───────────────────────────────────────────── */
const DeleteConfirmModal = ({ isOpen, onConfirm, onCancel, isDeleting }) => {
  if (!isOpen) return null;
  return createPortal(
    <div style={{ position:"fixed",inset:0,zIndex:99999,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)",animation:"aodOverlay 0.2s ease" }}>
      <div style={{ width:"100%",maxWidth:480,background:"var(--color-surface-container-lowest)",borderRadius:"24px 24px 0 0",padding:"24px 20px calc(24px + env(safe-area-inset-bottom,0px))",boxShadow:"0 -8px 40px rgba(0,0,0,0.2)" }}>
        <div style={{ width:36,height:4,borderRadius:2,background:"var(--color-outline-variant)",margin:"0 auto 20px" }} />
        <div style={{ fontSize:22,textAlign:"center",marginBottom:8 }}>🗑️</div>
        <div style={{ fontSize:18,fontWeight:800,color:"var(--color-on-surface)",textAlign:"center",fontFamily:"'Bricolage Grotesque',sans-serif",marginBottom:6 }}>Delete Order?</div>
        <div style={{ fontSize:13,color:"var(--color-on-surface-variant)",textAlign:"center",marginBottom:24,lineHeight:1.5 }}>This action is permanent and cannot be undone.</div>
        <button onClick={onConfirm} disabled={isDeleting} style={{ width:"100%",padding:"14px",borderRadius:14,border:"none",background:"#dc2626",color:"#fff",fontSize:15,fontWeight:800,cursor:isDeleting?"not-allowed":"pointer",opacity:isDeleting?0.6:1,fontFamily:"'Bricolage Grotesque',sans-serif",marginBottom:10,transition:"opacity 0.2s" }}>
          {isDeleting ? "Deleting…" : "Yes, Delete"}
        </button>
        <button onClick={onCancel} style={{ width:"100%",padding:"14px",borderRadius:14,border:"1.5px solid var(--color-outline-variant)",background:"var(--color-surface-container)",color:"var(--color-on-surface)",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }}>Cancel</button>
      </div>
    </div>,
    document.body
  );
};

/* ─────────────────────────────────────────────
   Section wrapper
───────────────────────────────────────────── */
const Section = ({ label, children, noBorder }) => (
  <div style={{ padding:"14px 16px", borderBottom: noBorder?"none":"1px solid var(--color-outline-variant)" }}>
    <div style={{ fontSize:10,fontWeight:800,color:"var(--color-outline)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8,fontFamily:"'DM Sans',sans-serif" }}>{label}</div>
    {children}
  </div>
);

/* ─────────────────────────────────────────────
   InfoBlock — defined OUTSIDE AdminOrderDetail
   so it is not recreated on every render
───────────────────────────────────────────── */
const InfoBlock = ({ order, isDesktop, onImageClick }) => {
  const dt = new Date(order.createdAt);
  return (
    <>
      {/* Party Info */}
      <Section label="Party info">
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:44,height:44,borderRadius:"50%",border:"2px solid var(--color-primary)",overflow:"hidden",flexShrink:0,background:"var(--color-surface-container)" }}>
            <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${order.user?.name}`} style={{ width:"100%",height:"100%" }} alt="" />
          </div>
          <div>
            <div style={{ fontSize:16,fontWeight:800,color:"var(--color-on-surface)",fontFamily:"'Bricolage Grotesque',sans-serif" }}>{order.partyName}</div>
            <div style={{ fontSize:12,color:"var(--color-on-surface-variant)",fontWeight:600,marginTop:2 }}>by {order.user?.name || "Unknown Salesman"}</div>
          </div>
        </div>
      </Section>

      {/* Description */}
      {order.description && (
        <Section label="Description">
          <p style={{ fontSize:14,color:"var(--color-on-surface)",lineHeight:1.65,margin:0,whiteSpace:"pre-wrap" }}>{order.description}</p>
        </Section>
      )}

      {/* Images */}
      {order.images?.length > 0 && (
        <Section label={`Images · ${order.images.length}`}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {order.images.slice(0, isDesktop ? 8 : 6).map((img, i) => (
              <div
                key={i}
                onClick={() => onImageClick(i)}
                style={{
                  width: isDesktop ? 84 : 72,
                  height: isDesktop ? 84 : 72,
                  borderRadius: 10,
                  border: "1.5px solid #e5e7eb", overflow: "hidden",
                  cursor: "pointer", flexShrink: 0, position: "relative",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={img.url} alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {i === (isDesktop ? 7 : 5) && order.images.length > (isDesktop ? 8 : 6) && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(0,0,0,0.55)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 13, fontWeight: 800,
                  }}>
                    +{order.images.length - (isDesktop ? 8 : 6)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Existing Remark */}
      {order.remark && (
        <Section label="Remark from admin">
          <div style={{ fontSize:13,color:"var(--color-on-surface)",fontStyle:"italic",background:"var(--color-surface-container)",borderRadius:10,padding:"10px 14px",border:"1px solid var(--color-outline-variant)",lineHeight:1.6 }}>💬 {order.remark}</div>
        </Section>
      )}

      {/* Submitted */}
      <Section label="Submitted" noBorder>
        <div style={{ fontSize:13,color:"var(--color-on-surface)",fontWeight:600 }}>
          {dt.toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
          {" · "}
          {dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </Section>
    </>
  );
};

/* ─────────────────────────────────────────────
   ActionBlock
───────────────────────────────────────────── */
const ActionBlock = ({ isDesktop,newStatus,setNewStatus,remark,setRemark,isUpdating,saveSuccess,onSave,onDelete }) => (
  <div style={{ background:"var(--color-surface-container-lowest)",borderRadius:20,border:"1.5px solid var(--color-outline-variant)",overflow:"hidden" }}>
    <style>{`@keyframes aodOverlay{from{opacity:0}to{opacity:1}}`}</style>
    {/* Status */}
    <div style={{ padding:"16px 16px 12px" }}>
      <div style={{ fontSize:10,fontWeight:800,color:"var(--color-outline)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12,fontFamily:"'DM Sans',sans-serif" }}>Update Status</div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
        {STATUSES.map((s) => {
          const sc = getStatusColor(s);
          const isSelected = newStatus === s;
          return (
            <button key={s} onClick={() => setNewStatus(s)} style={{ padding:"12px 0",fontSize:13,fontWeight:700,borderRadius:14,cursor:"pointer",textTransform:"capitalize",background:isSelected?sc.bg:"var(--color-surface-container)",color:isSelected?sc.text:"var(--color-on-surface-variant)",border:isSelected?`2px solid ${sc.dot}`:"1.5px solid var(--color-outline-variant)",transition:"all 0.15s",display:"flex",alignItems:"center",justifyContent:"center",gap:6,fontFamily:"'DM Sans',sans-serif" }}>
              {isSelected && <div style={{ width:7,height:7,borderRadius:"50%",background:sc.dot,flexShrink:0 }} />}
              {s}
            </button>
          );
        })}
      </div>
    </div>
    {/* Remark */}
    <div style={{ padding:"0 16px 14px" }}>
      <div style={{ fontSize:10,fontWeight:800,color:"var(--color-outline)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8,fontFamily:"'DM Sans',sans-serif" }}>Remark for Salesman</div>
      <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Leave a note for the salesman…" rows={isDesktop?4:3}
        style={{ width:"100%",background:"var(--color-surface-container)",border:"1.5px solid var(--color-outline-variant)",color:"var(--color-on-surface)",fontSize:14,borderRadius:12,padding:"11px 14px",outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box",lineHeight:1.5 }}
        onFocus={(e) => (e.target.style.borderColor="var(--color-primary)")}
        onBlur={(e) => (e.target.style.borderColor="var(--color-outline-variant)")}
      />
    </div>
    {/* Buttons */}
    <div style={{ padding:"0 16px 16px",display:"flex",gap:8 }}>
      <button onClick={onSave} disabled={isUpdating} style={{ flex:1,padding:"14px",fontSize:14,fontWeight:800,background:saveSuccess?"#22c55e":"var(--color-primary)",color:"var(--color-on-primary)",border:"none",borderRadius:14,cursor:isUpdating?"not-allowed":"pointer",opacity:isUpdating?0.7:1,transition:"background 0.3s",fontFamily:"'Bricolage Grotesque',sans-serif",letterSpacing:"-0.1px" }}>
        {isUpdating?"Saving…":saveSuccess?"✓ Saved!":"Save Changes"}
      </button>
      <button onClick={onDelete} style={{ width:50,height:50,borderRadius:14,flexShrink:0,background:"color-mix(in srgb,#dc2626 10%,transparent)",color:"#dc2626",border:"1.5px solid color-mix(in srgb,#dc2626 25%,transparent)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,transition:"background 0.2s" }}
        onMouseEnter={e=>e.currentTarget.style.background="color-mix(in srgb,#dc2626 18%,transparent)"}
        onMouseLeave={e=>e.currentTarget.style.background="color-mix(in srgb,#dc2626 10%,transparent)"}>
        🗑️
      </button>
    </div>
  </div>
);

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
   Main Detail Page
───────────────────────────────────────────── */
const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const allOrders = useSelector((s) => s.admin.allOrders);
  const { handleUpdateOrderStatus, handleDeleteOrder, handleSearchOrders } = useAdmin();
  const isDesktop = useIsDesktop();

  const order = allOrders?.find((o) => o._id === orderId);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [newStatus,   setNewStatus]   = useState("");
  const [remark,      setRemark]      = useState("");
  const [isUpdating,  setIsUpdating]  = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [viewerOpen,  setViewerOpen]  = useState(false);
  const [viewerStart, setViewerStart] = useState(0);
  const pageRef = useRef(null);

  // Sync form state whenever the order itself changes in Redux
  useEffect(() => {
    if (order) {
      setNewStatus(order.status);
      setRemark(order.remark || "");
    }
  }, [order?.status, order?.remark, order?._id]);

  useEffect(() => {
    // If the user navigates directly to this route via a deep link, allOrders might be empty.
    if (!allOrders || allOrders.length === 0) {
      handleSearchOrders("");
    }
  }, []);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (allOrders && allOrders.length > 0 && !order) {
      navigate("/admin/all_orders", { replace: true });
    }
  }, [allOrders, order]);

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      await handleUpdateOrderStatus(order._id, { status: newStatus, remark });
      // Optimistic Redux update handles the UI — no full refetch needed
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch {
      // error handled in hook
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = () => setDeleteModalOpen(true);

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await handleDeleteOrder(order._id);
      navigate(-1);
    } catch {
      setIsDeleting(false);
      setDeleteModalOpen(false);
    }
  };

  // ✅ ALL hooks must be before any early return
  const handleImageClick = useCallback((i) => {
    setViewerStart(i);
    setViewerOpen(true);
  }, []);

  // Derived values (not hooks, but kept together for clarity)
  const dt = order ? new Date(order.createdAt) : null;
  const currentSColor = getStatusColor(newStatus || order?.status);

  if (!order) return (
    <div style={{ textAlign:"center",padding:"80px 20px",color:"var(--color-on-surface-variant)",fontWeight:600,fontSize:14 }}>
      Loading…
    </div>
  );

  /* ── DESKTOP layout ── */
  if (isDesktop) {
    return (
      <div ref={pageRef} style={{ width: "100%", minHeight: "100vh", background: "#f8fafc" }}>

        {/* Desktop Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          padding: "16px 32px",
          borderBottom: "1px solid #e5e7eb",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", borderRadius: 10,
              background: "#f3f4f6", border: "none",
              cursor: "pointer", fontSize: 13, fontWeight: 700,
              color: "#374151", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#e5e7eb"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#f3f4f6"}
          >
            ‹ Back
          </button>

          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 20, fontWeight: 800, color: "#111827",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}>
              Order Detail
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>
              {dt.toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
              {" · "}
              {dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>

          {/* Live status badge */}
          <span style={{
            padding: "6px 16px", borderRadius: 20,
            background: currentSColor.bg, color: currentSColor.text,
            fontSize: 11, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "0.06em",
            transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: currentSColor.dot, display: "inline-block",
            }} />
            {newStatus || order.status}
          </span>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 24,
          padding: "28px 32px 48px",
          maxWidth: 1200,
          margin: "0 auto",
        }}>

          {/* LEFT — Order Info */}
          <div style={{
            background: "#fff",
            borderRadius: 18,
            border: "1.5px solid #e5e7eb",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid #f3f4f6",
              background: "linear-gradient(135deg, #f8fafc 0%, #fff 100%)",
            }}>
              <div style={{
                fontSize: 11, fontWeight: 800, color: "#9ca3af",
                textTransform: "uppercase", letterSpacing: "0.1em",
              }}>Order Information</div>
            </div>
            <InfoBlock order={order} isDesktop={isDesktop} onImageClick={handleImageClick} />
          </div>

          {/* RIGHT — Sidebar: avatar stats + action panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Salesman card */}
            <div style={{
              background: "#fff", borderRadius: 18,
              border: "1.5px solid #e5e7eb",
              padding: "20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}>
              <div style={{
                fontSize: 10, fontWeight: 800, color: "#9ca3af",
                textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14,
              }}>
                Submitted by
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  border: "2.5px solid var(--color-primary)",
                  overflow: "hidden", flexShrink: 0, background: "#fff",
                  boxShadow: "0 2px 8px rgba(99,102,241,0.2)",
                }}>
                  <img
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${order.user?.name}`}
                    style={{ width: "100%", height: "100%" }} alt=""
                  />
                </div>
                <div>
                  <div style={{
                    fontSize: 16, fontWeight: 800, color: "#111827",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}>
                    {order.user?.name || "Unknown Salesman"}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, marginTop: 2 }}>
                    Party: <span style={{ color: "#374151" }}>{order.partyName}</span>
                  </div>
                </div>
              </div>

              {/* Quick stats row */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: 8, marginTop: 16,
              }}>
                {[
                  { label: "Images", value: order.images?.length || 0, icon: "📷" },
                  { label: "Status", value: newStatus || order.status, icon: "●" },
                ].map(({ label, value, icon }) => (
                  <div key={label} style={{
                    background: "#f8fafc", borderRadius: 12,
                    padding: "10px 12px", border: "1px solid #f3f4f6",
                  }}>
                    <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, marginBottom: 4 }}>
                      {icon} {label}
                    </div>
                    <div style={{
                      fontSize: 14, fontWeight: 800, color: "#111827",
                      textTransform: "capitalize",
                    }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action panel */}
            <ActionBlock
              isDesktop={isDesktop}
              newStatus={newStatus} setNewStatus={setNewStatus}
              remark={remark} setRemark={setRemark}
              isUpdating={isUpdating} saveSuccess={saveSuccess}
              onSave={handleSave} onDelete={handleDelete}
            />
          </div>
        </div>

        <ImageViewer
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          images={order.images || []}
          startIndex={viewerStart}
        />
      </div>
    );
  }

  /* ── MOBILE layout (original) ── */
  return (
    <div ref={pageRef} style={{ width:"100%",maxWidth:560,margin:"0 auto",paddingBottom:"calc(88px + env(safe-area-inset-bottom,0px))",background:"var(--color-background)" }}>

      {/* Top Header */}
      <div style={{
        display:"flex",alignItems:"center",gap:12,
        padding:"14px 16px 12px",
        borderBottom:"1px solid var(--color-outline-variant)",
        position:"sticky",top:0,
        background:"color-mix(in srgb,var(--color-surface-container-lowest) 92%,transparent)",
        backdropFilter:"blur(16px)",
        zIndex:10,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            width:36,height:36,borderRadius:"50%",
            background:"var(--color-surface-container)",border:"none",
            cursor:"pointer",fontSize:20,
            display:"flex",alignItems:"center",justifyContent:"center",
            flexShrink:0,color:"var(--color-on-surface)",
          }}
        >‹</button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize:16,fontWeight:800,color:"var(--color-on-surface)",fontFamily:"'Bricolage Grotesque',sans-serif" }}>Order Detail</div>
          <div style={{ fontSize:11,color:"var(--color-on-surface-variant)",fontWeight:600,marginTop:1 }}>
            {dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            {" · "}
            {dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        <span style={{
          padding: "4px 12px", borderRadius: 20,
          background: currentSColor.bg, color: currentSColor.text,
          fontSize: 10, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.06em",
          flexShrink: 0, transition: "all 0.2s",
        }}>
          {newStatus || order.status}
        </span>
      </div>

      <InfoBlock order={order} isDesktop={isDesktop} onImageClick={handleImageClick} />

      {/* Update panel */}
      <div style={{ margin:"16px 16px 0" }}>
        <ActionBlock isDesktop={isDesktop} newStatus={newStatus} setNewStatus={setNewStatus}
          remark={remark} setRemark={setRemark} isUpdating={isUpdating} saveSuccess={saveSuccess}
          onSave={handleSave} onDelete={handleDelete} />
      </div>

      <DeleteConfirmModal isOpen={deleteModalOpen} onConfirm={confirmDelete} onCancel={() => setDeleteModalOpen(false)} isDeleting={isDeleting} />

      <ImageViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        images={order.images || []}
        startIndex={viewerStart}
      />
    </div>
  );
};

export default AdminOrderDetail;