import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSales } from "../hooks/useSales";
import { useSelector } from "react-redux";

const MAX_IMAGES = 7;

const CreateOrder = ({ onSuccess }) => {
  const { createOrder } = useSales();
  const orderLoading = useSelector((s) => s.sales.orderLoading);

  const [partyName, setPartyName]     = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages]           = useState([]); // { file, preview }[]
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [uploadPct, setUploadPct]     = useState(0); // 0-100 during upload

  const cardRef      = useRef(null);
  const fileInputRef = useRef(null);

  // ── Entrance animation (CSS only — no gsap needed for a simple fade-in) ────
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.35s ease, transform 0.35s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  }, []);

  // ── Compress one image on a Web Worker-friendly canvas ──────────────────────
  const compressImage = useCallback((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const MAX_W = 900;
          let w = img.width;
          let h = img.height;
          if (w > MAX_W) { h = Math.round((h * MAX_W) / w); w = MAX_W; }

          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);

          canvas.toBlob(
            (blob) => {
              if (!blob) { resolve(file); return; }
              resolve(
                new File(
                  [blob],
                  file.name.replace(/\.[^/.]+$/, "") + ".jpg",
                  { type: "image/jpeg", lastModified: Date.now() }
                )
              );
            },
            "image/jpeg",
            0.72
          );
        };
        img.onerror = () => resolve(file);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  }, []);

  const handleImagePick = async (e) => {
    const files = Array.from(e.target.files || []);
    const remaining = MAX_IMAGES - images.length;
    const toProcess = files.slice(0, remaining);
    if (!toProcess.length) return;

    setCompressing(true);
    const compressed = await Promise.all(toProcess.map(compressImage));
    setCompressing(false);

    setImages((prev) => [
      ...prev,
      ...compressed.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ]);
    e.target.value = "";
  };

  const removeImage = (idx) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => images.forEach(({ preview }) => URL.revokeObjectURL(preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shake = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.animation = "none";
    el.offsetHeight; // reflow
    el.style.animation = "co-shake 0.45s ease";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploadPct(0);

    if (!partyName.trim()) {
      setError("Party name is required.");
      shake();
      return;
    }

    const fd = new FormData();
    fd.append("partyName", partyName.trim());
    fd.append("description", description.trim());
    images.forEach(({ file }) => fd.append("images", file));

    try {
      await createOrder(fd, setUploadPct);
      setSuccess(true);
      setTimeout(() => {
        setPartyName("");
        setDescription("");
        setImages([]);
        setSuccess(false);
        setUploadPct(0);
        onSuccess?.();
      }, 1600);
    } catch (err) {
      setError(err.message);
      setUploadPct(0);
      shake();
    }
  };

  const isSubmitting = orderLoading;

  return (
    <div ref={cardRef} className="co-card">
      {/* ── Success overlay ── */}
      {success && (
        <div className="co-success">
          <div className="co-success-icon">✅</div>
          <div className="co-success-text">Order Created!</div>
          <div className="co-success-sub">Your order has been submitted successfully.</div>
        </div>
      )}

      <div className="co-eyebrow">New Order</div>
      <div className="co-title">Punch an Order</div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="co-error" role="alert">
            <span className="co-error-dot" />
            {error}
            {error.toLowerCase().includes("network") && (
              <button
                type="button"
                className="co-reload-btn"
                onClick={() => window.location.reload()}
              >
                Reload
              </button>
            )}
          </div>
        )}

        {/* Party Name */}
        <div className="co-field">
          <label className="co-label" htmlFor="co-party">Party Name *</label>
          <input
            className="co-input"
            id="co-party"
            type="text"
            placeholder="e.g. Sharma Enterprises"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Description */}
        <div className="co-field">
          <label className="co-label" htmlFor="co-desc">Description</label>
          <textarea
            className="co-textarea"
            id="co-desc"
            placeholder="Order details, notes, requirements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        {/* Image Upload */}
        <div className="co-field">
          <label className="co-label">
            Images&nbsp;
            <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
              ({images.length}/{MAX_IMAGES})
            </span>
          </label>
          <div className="co-img-zone">
            {images.length < MAX_IMAGES && (
              <button
                type="button"
                className="co-img-add-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting || compressing}
              >
                <span style={{ fontSize: 18 }}>📷</span>
                {compressing ? "Processing…" : "Add Photos"}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              style={{ display: "none" }}
              onChange={handleImagePick}
            />
            {images.length > 0 && (
              <div className="co-img-grid">
                {images.map(({ preview }, idx) => (
                  <div key={idx} className="co-img-thumb">
                    <img src={preview} alt={`preview-${idx}`} loading="lazy" />
                    <button
                      type="button"
                      className="co-img-remove"
                      onClick={() => removeImage(idx)}
                      title="Remove"
                      disabled={isSubmitting}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            {images.length === 0 && (
              <div className="co-img-count">Upload up to {MAX_IMAGES} images (JPG, PNG, WEBP)</div>
            )}
          </div>
        </div>

        {/* Upload progress bar */}
        {isSubmitting && uploadPct > 0 && (
          <div className="co-progress-wrap">
            <div className="co-progress-bar" style={{ width: `${uploadPct}%` }} />
            <span className="co-progress-label">{uploadPct}%</span>
          </div>
        )}

        <button className="co-btn" type="submit" disabled={isSubmitting || compressing}>
          {isSubmitting ? (
            <>
              <span className="co-spinner" />
              {uploadPct > 0 ? `Uploading… ${uploadPct}%` : "Submitting…"}
            </>
          ) : (
            <>Submit Order →</>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;