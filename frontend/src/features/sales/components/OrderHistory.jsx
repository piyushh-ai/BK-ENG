import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { useSales } from "../hooks/useSales";

// ── Helpers ───────────────────────────────────────────────────
function useDebounce(value, delay = 420) {
  const [deb, setDeb] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDeb(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return deb;
}

const STATUS_META = {
  pending:   { label: "Pending",   color: "#b45309", bg: "#fef3c7" },
  completed: { label: "Completed", color: "#15803d", bg: "#dcfce7" },
  cancelled: { label: "Cancelled", color: "#b91c1c", bg: "#fee2e2" },
  partial:   { label: "Partial",   color: "#6d28d9", bg: "#ede9fe" },
};

const StatusBadge = ({ status }) => {
  const meta = STATUS_META[status] || { label: status, color: "#555", bg: "#eee" };
  return (
    <span style={{
      fontSize: "10.5px",
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "3px 10px",
      borderRadius: "20px",
      background: meta.bg,
      color: meta.color,
    }}>
      {meta.label}
    </span>
  );
};

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const dateStr = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${dateStr} • ${timeStr}`;
};

const downloadImage = async (url) => {
  try {
    const response = await fetch(url, { mode: 'cors' });
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = `order-image-${Date.now()}.png`; // fallback name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("Error downloading image:", error);
    // fallback if cors is locked by Cloudinary
    window.open(url, '_blank');
  }
};

// ── Modals ────────────────────────────────────────────────────

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(imgRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" });
    }
  }, [isOpen, imageUrl]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div ref={overlayRef} className="oh-modal-overlay oh-img-overlay" onClick={onClose}>
      <button className="oh-img-close" onClick={onClose}>✕</button>
      <div className="oh-img-container" onClick={(e) => e.stopPropagation()}>
        <img ref={imgRef} src={imageUrl} alt="Full screen preview" className="oh-img-full" />
        <button className="oh-img-download" onClick={() => downloadImage(imageUrl)}>
          📥 Download Image
        </button>
      </div>
    </div>
  );
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, orderName, loading }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(modalRef.current, { scale: 0.9, opacity: 0, y: 10 }, { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.5)" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="oh-modal-overlay oh-overlay-small">
      <div ref={modalRef} className="oh-modal oh-modal-small">
        <div className="oh-modal-icon-danger">⚠️</div>
        <h3 className="oh-modal-title">Delete Order?</h3>
        <p className="oh-modal-text">
          Are you sure you want to delete the order for <strong>{orderName}</strong>? This action cannot be undone.
        </p>
        <div className="oh-modal-actions">
          <button className="oh-btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="oh-btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailModal = ({ isOpen, onClose, order, onImageClick }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(modalRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" });
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  return (
    <div ref={overlayRef} className="oh-modal-overlay oh-overlay-large" onClick={onClose}>
      <div ref={modalRef} className="oh-modal oh-modal-large" onClick={(e) => e.stopPropagation()}>
        <button className="oh-modal-close" onClick={onClose}>✕</button>
        
        <div className="oh-d-header">
          <div>
            <h2 className="oh-d-party">{order.partyName}</h2>
            <div className="oh-d-meta">
              <span>{formatDate(order.createdAt)}</span> • <span>Order #{order._id.slice(-6).toUpperCase()}</span>
            </div>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="oh-d-body">
          
          {order.status !== "pending" && order.remark && (
            <div className="oh-d-section">
              <h4 className="oh-d-label" style={{ color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>⚠️</span> Admin Remark
              </h4>
              <div className="oh-d-remark">
                {order.remark}
              </div>
            </div>
          )}

          <div className="oh-d-section">
            <h4 className="oh-d-label">Description</h4>
            <div className="oh-d-desc">{order.description || <span style={{opacity:0.5}}>No description provided.</span>}</div>
          </div>

          {order.images?.length > 0 && (
            <div className="oh-d-section">
               <h4 className="oh-d-label">Images ({order.images.length})</h4>
               <div className="oh-d-image-grid">
                 {order.images.map((img, i) => (
                   <div key={i} className="oh-d-img-link" onClick={(e) => { e.stopPropagation(); onImageClick(img.url); }}>
                     <img src={img.url} alt={`attachment-${i}`} className="oh-d-img" />
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Single Order Row / Card ───────────────────────────────────
const OrderCard = ({ order, isLatest, onDeleteRequest, onClickDetail, onImageClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  const canDelete = order.status === "pending";

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteRequest(order);
  };

  return (
    <div ref={cardRef} className={`oh-card${isLatest ? " oh-card-latest" : ""}`} onClick={() => onClickDetail(order)}>
      {isLatest && (
        <div className="oh-latest-badge">✦ Latest</div>
      )}

      <div className="oh-card-header">
        <div>
          <div className="oh-party">{order.partyName}</div>
          <div className="oh-date">{formatDate(order.createdAt)}</div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {order.description && (
        <div className="oh-desc">{order.description}</div>
      )}

      {/* Images row */}
      {order.images?.length > 0 && (
        <div className="oh-thumbs">
          {order.images.slice(0, 4).map((img, i) => (
            <div key={i} className="oh-thumb-wrapper" onClick={(e) => { e.stopPropagation(); onImageClick(img.url); }}>
              <img src={img.url} alt={`order-img-${i}`} className="oh-thumb" />
            </div>
          ))}
          {order.images.length > 4 && (
            <div className="oh-thumb-more" onClick={(e) => { e.stopPropagation(); onClickDetail(order); }}>+{order.images.length - 4}</div>
          )}
        </div>
      )}

      <div className="oh-card-footer">
        <span className="oh-order-id">#{order._id.slice(-6).toUpperCase()}</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="oh-view-btn" onClick={(e) => { e.stopPropagation(); onClickDetail(order); }}>
            👁 View
          </button>
          {canDelete && (
            <button
              className="oh-del-btn"
              onClick={handleDeleteClick}
              title="Delete order"
            >
              🗑 Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main OrderHistory ─────────────────────────────────────────
const OrderHistory = () => {
  const { fetchMyOrders, searchOrders, deleteOrder } = useSales();
  const { myOrders, ordersPagination, orderLoading, searchResults } = useSelector((s) => s.sales);

  const [query, setQuery]         = useState("");
  const [isSearching, setSearch]  = useState(false); // are we in search mode?
  const [page, setPage]           = useState(1);

  // Modal states
  const [detailOrder, setDetailOrder] = useState(null);
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const debouncedQuery = useDebounce(query, 400);

  const wrapRef    = useRef(null);
  const headerRef  = useRef(null);
  const searchRef  = useRef(null);
  const listRef    = useRef(null);

  // ── Entrance animation ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headerRef.current, searchRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.1 }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  // ── Initial load ────────────────────────────────────────────
  useEffect(() => {
    fetchMyOrders({ page, limit: 10 });
  }, [page]);

  // ── Debounced search ────────────────────────────────────────
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setSearch(true);
      searchOrders(debouncedQuery.trim());
    } else {
      setSearch(false);
    }
  }, [debouncedQuery]);

  const confirmDelete = async () => {
    if (!deleteConfirmTarget) return;
    setIsDeleting(true);
    try {
      await deleteOrder(deleteConfirmTarget._id);
      setDeleteConfirmTarget(null);
    } catch (e) {
      alert(e.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const displayOrders = isSearching ? searchResults : myOrders;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .oh-wrap {
          max-width: 680px;
          margin: 0 auto;
          font-family: 'DM Sans', sans-serif;
        }

        /* Header */
        .oh-header { margin-bottom: 24px; }
        .oh-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .oh-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 2px;
          background: var(--color-primary);
          border-radius: 2px;
        }
        .oh-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -0.6px;
        }
        .oh-sub {
          font-size: 13.5px;
          color: var(--color-on-surface-variant);
          margin-top: 4px;
        }

        /* Search bar */
        .oh-search-wrap {
          position: relative;
          margin-bottom: 24px;
        }
        .oh-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          pointer-events: none;
        }
        .oh-search {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 40px 12px 42px;
          background: var(--color-surface-container-lowest);
          border: 1.5px solid var(--color-outline-variant);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--color-on-surface);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .oh-search::placeholder { color: var(--color-outline); }
        .oh-search:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
        }
        .oh-search-clear {
          position: absolute;
          right: 12px;
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
        }
        .oh-search-clear:hover { background: var(--color-surface-container-high); }

        /* Order card */
        .oh-card {
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 14px;
          position: relative;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          overflow: hidden;
          cursor: pointer;
        }
        .oh-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.06);
          border-color: var(--color-outline);
          transform: translateY(-2px);
        }
        .oh-card-latest {
          border-color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 3%, var(--color-surface-container-lowest));
        }
        .oh-latest-badge {
          position: absolute;
          top: 14px; right: 14px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          padding: 3px 10px;
          border-radius: 20px;
        }

        .oh-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
          padding-right: 70px; /* space for latest badge */
        }
        .oh-party {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: var(--color-on-surface);
          letter-spacing: -0.2px;
        }
        .oh-date {
          font-size: 12.5px;
          color: var(--color-on-surface-variant);
          margin-top: 3px;
        }
        .oh-desc {
          font-size: 13.5px;
          color: var(--color-on-surface-variant);
          margin-bottom: 14px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Image thumbnails */
        .oh-thumbs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .oh-thumb-wrapper {
          display: block;
          border-radius: 8px;
          overflow: hidden;
          background: var(--color-surface-container);
        }
        .oh-thumb {
          width: 54px; height: 54px;
          object-fit: cover;
          display: block;
          transition: transform 0.2s, opacity 0.2s;
        }
        .oh-thumb-wrapper:hover .oh-thumb { transform: scale(1.1); opacity: 0.9; }
        .oh-thumb-more {
          width: 54px; height: 54px;
          border-radius: 8px;
          background: var(--color-surface-container);
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-on-surface-variant);
        }
        .oh-thumb-more:hover { color: var(--color-primary); }

        .oh-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px dashed var(--color-outline-variant);
        }
        .oh-order-id {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-outline);
          font-family: 'DM Sans', sans-serif;
        }
        
        .oh-view-btn {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 10%, transparent);
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .oh-view-btn:hover { background: color-mix(in srgb, var(--color-primary) 20%, transparent); }

        .oh-del-btn {
          font-size: 12px;
          font-weight: 600;
          color: #b91c1c;
          background: #fee2e2;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .oh-del-btn:hover:not(:disabled) { background: #fca5a5; }
        .oh-del-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Empty */
        .oh-empty {
          text-align: center;
          padding: 64px 20px;
          color: var(--color-on-surface-variant);
        }
        .oh-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .oh-empty-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--color-on-surface);
          margin-bottom: 6px;
          letter-spacing: -0.3px;
        }
        .oh-empty-sub { font-size: 13.5px; }

        /* Loader */
        .oh-loader {
          text-align: center;
          padding: 40px;
          color: var(--color-on-surface-variant);
          font-size: 13.5px;
        }

        /* Pagination */
        .oh-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .oh-pg-info {
          font-size: 12.5px;
          color: var(--color-on-surface-variant);
        }
        .oh-pg-btns { display: flex; gap: 8px; }
        .oh-pg-btn {
          padding: 7px 16px;
          border-radius: 8px;
          border: 1.5px solid var(--color-outline-variant);
          background: var(--color-surface-container-lowest);
          font-size: 13px;
          color: var(--color-on-surface-variant);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.15s;
        }
        .oh-pg-btn:hover:not(:disabled) {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .oh-pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* search mode label */
        .oh-search-label {
          font-size: 12px;
          color: var(--color-on-surface-variant);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .oh-search-label span {
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          color: var(--color-primary);
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 12px;
        }

          /* Image Modal adjustments */
          .oh-img-overlay {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(8px);
            z-index: 1000000; /* Highest priority */
          }
          .oh-img-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            max-width: 90vw;
            max-height: 90vh;
          }
          .oh-img-full {
            max-width: 100%;
            max-height: calc(90vh - 80px);
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          }
          .oh-img-close {
            position: absolute;
            top: 24px; right: 24px;
            width: 44px; height: 44px;
            background: rgba(255,255,255,0.1);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            transition: background 0.2s;
            display: grid;
            place-items: center;
          }
          .oh-img-close:hover { background: rgba(255,255,255,0.25); }
          .oh-img-download {
            padding: 12px 24px;
            background: var(--color-primary);
            color: var(--color-on-primary);
            border: none;
            border-radius: 30px;
            font-family: 'DM Sans', sans-serif;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0,0,0,0.3);
            transition: transform 0.2s, background 0.2s;
          }
          .oh-img-download:hover { transform: translateY(-2px); filter: brightness(1.1); }
          
        /* --- Custom Modals --- */
        .oh-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          z-index: 999999; /* Increased to completely cover bottom mobile navbars */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'DM Sans', sans-serif;
        }
        .oh-modal {
          background: var(--color-surface-container-lowest);
          border-radius: 20px;
          border: 1px solid var(--color-outline-variant);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        /* Small Modal for Confirm */
        .oh-modal-small {
          width: 100%;
          max-width: 400px;
          padding: 30px;
          text-align: center;
        }
        .oh-modal-icon-danger {
          font-size: 40px;
          margin-bottom: 16px;
        }
        .oh-modal-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 10px 0;
          color: var(--color-on-surface);
        }
        .oh-modal-text {
          font-size: 14.5px;
          color: var(--color-on-surface-variant);
          margin-bottom: 24px;
          line-height: 1.5;
        }
        .oh-modal-actions {
          display: flex;
          gap: 12px;
        }
        .oh-btn-cancel {
          flex: 1;
          padding: 12px;
          background: var(--color-surface-container);
          border: none;
          border-radius: 10px;
          font-weight: 600;
          color: var(--color-on-surface);
          cursor: pointer;
          transition: background 0.15s;
        }
        .oh-btn-cancel:hover { background: var(--color-surface-container-high); }
        .oh-btn-danger {
          flex: 1;
          padding: 12px;
          background: #dc2626;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          transition: background 0.15s;
        }
        .oh-btn-danger:hover { background: #b91c1c; }
        .oh-btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Large Modal for Details */
        .oh-modal-large {
          width: 100%;
          max-width: 600px;
          padding: 0;
        }
        .oh-modal-close {
          position: absolute;
          top: 16px; right: 16px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--color-surface-container);
          border: none;
          font-size: 14px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          z-index: 10;
        }
        .oh-modal-close:hover { background: var(--color-surface-container-high); transform: scale(1.05); }

        .oh-d-header {
          padding: 30px 30px 20px;
          border-bottom: 1px solid var(--color-outline-variant);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }
        .oh-d-party {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 6px 0;
          color: var(--color-on-surface);
          letter-spacing: -0.5px;
        }
        .oh-d-meta {
          font-size: 13px;
          color: var(--color-on-surface-variant);
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .oh-d-body {
          padding: 24px 30px 40px;
        }
        .oh-d-section {
          margin-bottom: 24px;
        }
        .oh-d-section:last-child { margin-bottom: 0; }
        .oh-d-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-outline);
          margin: 0 0 10px 0;
        }
        .oh-d-desc {
          font-size: 15px;
          line-height: 1.6;
          color: var(--color-on-surface);
          background: var(--color-surface-container-lowest);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--color-outline-variant);
          white-space: pre-wrap;
        }
        
        .oh-d-remark {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          color: #b45309;
          background: #fffbeb;
          padding: 14px 16px;
          border-radius: 10px;
          border-left: 4px solid #f59e0b;
          white-space: pre-wrap;
        }
        
        .oh-d-image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
        }
        .oh-d-img-link {
          display: block;
          border-radius: 12px;
          overflow: hidden;
          background: var(--color-surface-container);
          aspect-ratio: 1;
          border: 1px solid var(--color-outline-variant);
          position: relative;
        }
        .oh-d-img-link:hover .oh-d-img { transform: scale(1.05); }
        .oh-d-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        
        @media (max-width: 768px) {
          /* Remove wrap padding — sections handle their own spacing */
          .oh-wrap { padding: 0; }

          /* ── Hero header — gradient card like other pages ── */
          .oh-header {
            background: linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 70%, #1e40af) 100%);
            color: var(--color-on-primary);
            padding: 28px 16px 24px;
            margin-bottom: 0;
            position: relative;
            overflow: hidden;
          }
          .oh-header::before {
            content: '';
            position: absolute; top: -40px; right: -40px;
            width: 160px; height: 160px; border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
            pointer-events: none;
          }
          .oh-eyebrow { color: rgba(255,255,255,0.75); }
          .oh-eyebrow::before { background: rgba(255,255,255,0.75); }
          .oh-title { font-size: 28px; color: #fff; margin-bottom: 4px; }
          .oh-sub { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 0; }

          /* Search */
          .oh-search-wrap { margin: 14px 14px 0; }

          /* Cards */
          .oh-card { margin: 10px 14px 0; border-radius: 14px; padding: 16px; }
          .oh-card:hover { transform: none; }
          .oh-party { font-size: 15px; }
          .oh-date { font-size: 11.5px; }
          .oh-thumb { width: 46px; height: 46px; }
          .oh-thumb-more { width: 46px; height: 46px; font-size: 11px; }
          .oh-view-btn, .oh-del-btn { padding: 7px 12px; font-size: 12px; }

          /* Search label + pagination */
          .oh-search-label { margin: 10px 14px 0; }
          .oh-pagination { padding: 0 14px; margin-top: 16px; }
          .oh-empty { padding: 48px 20px; }
          .oh-loader { padding: 40px 20px; }

          /* Modals */
          .oh-overlay-large { padding: 20px 0 0 0; align-items: flex-end; }
          .oh-overlay-small { padding: 20px; align-items: center; }
          .oh-modal-large {
            border-radius: 24px 24px 0 0;
            margin-top: auto; max-height: 85vh;
            border-bottom: none; width: 100%;
            padding-bottom: env(safe-area-inset-bottom, 20px);
          }
          .oh-d-header { padding: 24px 48px 16px 20px; flex-direction: column; gap: 12px; }
          .oh-d-body { padding: 16px 20px 40px; }
          .oh-modal-close { top: 16px; right: 16px; background: var(--color-surface-container-high); }
          .oh-d-party { font-size: 20px; margin-bottom: 2px; }
          .oh-d-desc { font-size: 14px; padding: 14px; }
          .oh-d-image-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 10px; }
          .oh-modal-small { padding: 28px 20px 24px; width: 100%; margin: 0 auto; }
          .oh-modal-icon-danger { font-size: 34px; margin-bottom: 12px; }
          .oh-modal-title { font-size: 20px; }
          .oh-modal-text { font-size: 13.5px; margin-bottom: 24px; }
          .oh-modal-actions { flex-direction: column; gap: 10px; }
          .oh-btn-cancel, .oh-btn-danger { width: 100%; padding: 14px; font-size: 14.5px; }
          .oh-img-close { top: 12px; right: 12px; width: 36px; height: 36px; font-size: 16px; }
          .oh-img-full { max-height: calc(90vh - 70px); }
          .oh-img-download { width: 100%; text-align: center; }
        }
      `}</style>

      <div ref={wrapRef} className="oh-wrap">
        {/* Header */}
        <div ref={headerRef} className="oh-header">
          <div className="oh-eyebrow">Order History</div>
          <div className="oh-title">My Orders</div>
          <div className="oh-sub">Track and manage all your submitted orders.</div>
        </div>

        {/* Search */}
        <div ref={searchRef} className="oh-search-wrap">
          <span className="oh-search-icon">🔍</span>
          <input
            className="oh-search"
            type="text"
            placeholder="Search by party name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="oh-search-clear" onClick={() => setQuery("")} title="Clear">✕</button>
          )}
        </div>

        {/* Contents */}
        {orderLoading && displayOrders.length === 0 ? (
          <div className="oh-loader">Loading orders…</div>
        ) : displayOrders.length === 0 ? (
          <div className="oh-empty">
            <div className="oh-empty-icon">{isSearching ? "🔎" : "📋"}</div>
            <div className="oh-empty-title">
              {isSearching ? "No results found" : "No orders yet"}
            </div>
            <div className="oh-empty-sub">
              {isSearching
                ? `No orders match "${query}". Try a different name.`
                : "Your submitted orders will appear here."}
            </div>
          </div>
        ) : (
          <>
            {isSearching && (
              <div className="oh-search-label">
                Showing results for <span>{query}</span> — {displayOrders.length} found
              </div>
            )}

            <div ref={listRef}>
              {displayOrders.map((order, idx) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  isLatest={!isSearching && idx === 0}
                  onDeleteRequest={setDeleteConfirmTarget}
                  onClickDetail={setDetailOrder}
                  onImageClick={setPreviewImage}
                />
              ))}
            </div>

            {/* Pagination (only in normal mode) */}
            {!isSearching && ordersPagination && ordersPagination.totalPages > 1 && (
              <div className="oh-pagination">
                <span className="oh-pg-info">
                  Page {ordersPagination.currentPage} of {ordersPagination.totalPages}
                  &nbsp;· {ordersPagination.total} orders total
                </span>
                <div className="oh-pg-btns">
                  <button
                    className="oh-pg-btn"
                    disabled={!ordersPagination.hasPrevPage}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    ← Prev
                  </button>
                  <button
                    className="oh-pg-btn"
                    disabled={!ordersPagination.hasNextPage}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals placed outside main flow */}
      <ConfirmModal 
        isOpen={!!deleteConfirmTarget} 
        onClose={() => setDeleteConfirmTarget(null)} 
        onConfirm={confirmDelete} 
        orderName={deleteConfirmTarget?.partyName}
        loading={isDeleting}
      />

      <DetailModal 
        isOpen={!!detailOrder} 
        onClose={() => setDetailOrder(null)} 
        order={detailOrder} 
        onImageClick={setPreviewImage}
      />

      <ImageModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage}
      />
    </>
  );
};

export default OrderHistory;