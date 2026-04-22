import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useSales } from "../hooks/useSales";
import { useSelector } from "react-redux";

const MAX_IMAGES = 7;

const CreateOrder = ({ onSuccess }) => {
  const { createOrder } = useSales();
  const orderLoading = useSelector((s) => s.sales.orderLoading);

  const [partyName, setPartyName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // { file, preview }[]
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const cardRef   = useRef(null);
  const formRef   = useRef(null);
  const titleRef  = useRef(null);
  const field1Ref = useRef(null);
  const field2Ref = useRef(null);
  const imgRef    = useRef(null);
  const btnRef    = useRef(null);
  const fileInputRef = useRef(null);
  const successRef   = useRef(null);

  // ── Entrance animation ────────────────────────────────────────
  useEffect(() => {
    const els = [titleRef.current, field1Ref.current, field2Ref.current, imgRef.current, btnRef.current];
    gsap.set(els, { opacity: 0, y: 18 });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(cardRef.current, { opacity: 1, duration: 0 })
      .to(els, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 });
  }, []);

  useEffect(() => {
    if (success && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" }
      );
    }
  }, [success]);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1000;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }
              const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(newFile);
            },
            "image/jpeg",
            0.7
          );
        };
        img.onerror = () => resolve(file);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const handleImagePick = async (e) => {
    const files = Array.from(e.target.files || []);
    const remaining = MAX_IMAGES - images.length;
    const toProcess = files.slice(0, remaining);
    if (toProcess.length === 0) return;

    setCompressing(true);
    const compressedFiles = await Promise.all(toProcess.map(compressImage));
    setCompressing(false);

    const toAdd = compressedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...toAdd]);
    e.target.value = "";
  };

  const removeImage = (idx) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const shake = () => {
    gsap.to(cardRef.current, {
      x: [-8, 8, -6, 6, -3, 3, 0],
      duration: 0.45,
      ease: "none",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!partyName.trim()) {
      setError("Party name is required");
      shake();
      return;
    }

    // Animate button press
    gsap.to(btnRef.current, { scale: 0.97, duration: 0.08, yoyo: true, repeat: 1 });

    const fd = new FormData();
    fd.append("partyName", partyName.trim());
    fd.append("description", description.trim());
    images.forEach(({ file }) => fd.append("images", file));

    try {
      await createOrder(fd);
      // Success flash
      setSuccess(true);
      setTimeout(() => {
        setPartyName("");
        setDescription("");
        setImages([]);
        setSuccess(false);
        onSuccess?.();
      }, 1800);
    } catch (err) {
      setError(err.message);
      shake();
    }
  };

  return (
    <>
      <style>{`
        .co-card {
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 20px;
          padding: 36px 32px 28px;
          max-width: 560px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          will-change: transform;
        }
        @media (max-width: 520px) { .co-card { padding: 28px 18px 22px; border-radius: 16px; } }

        .co-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .co-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 2px;
          background: var(--color-primary);
          border-radius: 2px;
        }

        .co-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -0.6px;
          margin-bottom: 28px;
        }

        .co-field { margin-bottom: 18px; }
        .co-label {
          display: block;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--color-outline);
          margin-bottom: 7px;
        }
        .co-input, .co-textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 14px;
          background: var(--color-surface-container-low);
          border: 1.5px solid transparent;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--color-on-surface);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .co-textarea { resize: vertical; min-height: 80px; }
        .co-input::placeholder, .co-textarea::placeholder { color: var(--color-outline); }
        .co-input:focus, .co-textarea:focus {
          border-color: var(--color-primary);
          background: var(--color-surface-container-lowest);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
        }

        /* Image upload zone */
        .co-img-zone {
          border: 1.5px dashed var(--color-outline-variant);
          border-radius: 12px;
          padding: 16px;
          background: var(--color-surface-container-low);
          transition: border-color 0.2s, background 0.2s;
        }
        .co-img-zone:hover { border-color: var(--color-primary); background: var(--color-surface-container); }
        .co-img-add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-primary);
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          margin-bottom: ${`images.length > 0 ? '12px' : '0'`};
          font-family: 'DM Sans', sans-serif;
        }
        .co-img-add-btn:hover { opacity: 0.8; }
        .co-img-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
          gap: 10px;
          margin-top: 12px;
        }
        .co-img-thumb {
          position: relative;
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--color-outline-variant);
        }
        .co-img-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .co-img-remove {
          position: absolute;
          top: 4px; right: 4px;
          width: 20px; height: 20px;
          background: rgba(0,0,0,0.65);
          color: #fff;
          border: none;
          border-radius: 50%;
          font-size: 10px;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: background 0.15s;
        }
        .co-img-remove:hover { background: #ba1a1a; }
        .co-img-count {
          font-size: 11px;
          color: var(--color-on-surface-variant);
          margin-top: 8px;
        }

        .co-error {
          font-size: 12.5px;
          color: var(--color-on-error-container, #ba1a1a);
          background: var(--color-error-container, #ffdad6);
          border: 1px solid var(--color-error, #ba1a1a);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .co-btn {
          width: 100%;
          margin-top: 8px;
          padding: 14px;
          background: var(--color-primary);
          color: var(--color-on-primary);
          border: none;
          border-radius: 10px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          will-change: transform;
        }
        .co-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,37,66,0.22);
        }
        .co-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        /* Success overlay */
        .co-success {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: var(--color-surface-container-lowest);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          z-index: 10;
        }
        .co-success-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          display: grid;
          place-items: center;
          font-size: 30px;
        }
        .co-success-text {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--color-on-surface);
          letter-spacing: -0.3px;
        }
        .co-success-sub {
          font-size: 13px;
          color: var(--color-on-surface-variant);
        }
      `}</style>

      <div ref={cardRef} className="co-card" style={{ opacity: 0 }}>
        {/* Success overlay */}
        {success && (
          <div ref={successRef} className="co-success" style={{ opacity: 0 }}>
            <div className="co-success-icon">✅</div>
            <div className="co-success-text">Order Created!</div>
            <div className="co-success-sub">Your order has been submitted successfully.</div>
          </div>
        )}

        <div ref={titleRef}>
          <div className="co-eyebrow">New Order</div>
          <div className="co-title">Punch an Order</div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          {error && (
            <div className="co-error">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ba1a1a", flexShrink: 0 }} />
              {error}
            </div>
          )}

          {/* Party Name */}
          <div ref={field1Ref} className="co-field">
            <label className="co-label" htmlFor="co-party">Party Name *</label>
            <input
              className="co-input"
              id="co-party"
              type="text"
              placeholder="e.g. Sharma Enterprises"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div ref={field2Ref} className="co-field">
            <label className="co-label" htmlFor="co-desc">Description</label>
            <textarea
              className="co-textarea"
              id="co-desc"
              placeholder="Order details, notes, requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div ref={imgRef} className="co-field">
            <label className="co-label">
              Images &nbsp;
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
                >
                  <span style={{ fontSize: 18 }}>📷</span>
                  Add Photos
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
                      <img src={preview} alt={`preview-${idx}`} />
                      <button
                        type="button"
                        className="co-img-remove"
                        onClick={() => removeImage(idx)}
                        title="Remove"
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

          <div ref={btnRef} style={{ opacity: 0 }}>
            <button className="co-btn" type="submit" disabled={orderLoading || compressing}>
              {orderLoading || compressing ? (
                <>
                  <span style={{ fontSize: 16, animation: "spin 1s linear infinite" }}>⏳</span>
                  {compressing ? "Processing…" : "Submitting…"}
                </>
              ) : (
                <>Submit Order →</>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateOrder;