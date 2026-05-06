import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./EditImage.css";

const ASPECTS = [
  { label: "Free",  value: NaN,     icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeDasharray="4 4" /></svg> },
  { label: "1:1",   value: 1,       icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /></svg> },
  { label: "4:5",   value: 4 / 5,  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="3" width="14" height="18" rx="2" ry="2" /></svg> },
  { label: "16:9",  value: 16 / 9, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" ry="2" /></svg> },
  { label: "9:16",  value: 9 / 16, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="2" ry="2" /></svg> },
];

const HEADER_H = 56;
const SHEET_H  = 180;

const EditImage = ({ src, originalName = "edited.jpg", onSave, onCancel }) => {
  const cropperRef = useRef(null);

  const [aspect,       setAspect]       = useState(NaN);
  const [isSaving,     setIsSaving]     = useState(false);
  const [activeTab,    setActiveTab]    = useState("crop");
  const [rotation,     setRotation]     = useState(0);
  const [flipped,      setFlipped]      = useState({ h: false, v: false });
  const [cropperReady, setCropperReady] = useState(false);
  const [canvasH,      setCanvasH]      = useState(0);
  const [dragMode,     setDragMode]     = useState("move");

  // ── Lock body scroll when editor is open ─────────────────────────────────
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ── Compute canvas height precisely ──────────────────────────────────────
  useEffect(() => {
    const calc = () => {
      // Use visualViewport when available (handles mobile keyboard/browser chrome)
      const vh = window.visualViewport?.height ?? window.innerHeight;
      setCanvasH(Math.max(vh - HEADER_H - SHEET_H, 100));
    };
    calc();
    window.addEventListener("resize", calc);
    window.visualViewport?.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.visualViewport?.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  const getCropper = () => cropperRef.current?.cropper;

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = useCallback(() => {
    const c = getCropper();
    if (!c) return;
    setIsSaving(true);
    c.getCroppedCanvas({
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
      maxWidth: 4096,
      maxHeight: 4096,
    }).toBlob(
      (blob) => {
        if (!blob) { setIsSaving(false); return; }
        const name    = (originalName || "edited.jpg").replace(/\.[^/.]+$/, "") + ".jpg";
        const file    = new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
        const preview = URL.createObjectURL(blob);
        onSave(file, preview);
        setIsSaving(false);
      },
      "image/jpeg", 0.92
    );
  }, [originalName, onSave]);

  const handleRotate = (deg) => {
    const c = getCropper(); if (!c) return;
    const next = rotation + deg;
    setRotation(next);
    c.rotateTo(next);
  };

  const handleFlip = (axis) => {
    const c = getCropper(); if (!c) return;
    if (axis === "h") {
      const v = !flipped.h;
      setFlipped(f => ({ ...f, h: v }));
      c.scaleX(v ? -1 : 1);
    } else {
      const v = !flipped.v;
      setFlipped(f => ({ ...f, v: v }));
      c.scaleY(v ? -1 : 1);
    }
  };

  const handleZoom  = (r) => getCropper()?.zoom(r);

  const handleReset = () => {
    getCropper()?.reset();
    setRotation(0);
    setFlipped({ h: false, v: false });
    setAspect(NaN);
    getCropper()?.setAspectRatio(NaN);
  };

  const handleAspect = (value) => {
    setAspect(value);
    getCropper()?.setAspectRatio(value);
  };

  const switchDrag = (mode) => {
    setDragMode(mode);
    getCropper()?.setDragMode(mode);
  };

  const isOn = (value) =>
    Number.isNaN(value) && Number.isNaN(aspect) ? true : aspect === value;

  // ══════════════════════════════════════════════════════════════════════════
  // Portal → renders directly into document.body, bypasses any parent
  // transform / overflow / stacking context that would trap position:fixed
  // ══════════════════════════════════════════════════════════════════════════
  return createPortal(
    <div className="ei-overlay">
      <div className="ei-modal">

        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <div className="ei-header">
          <button className="ei-icon-btn" onClick={onCancel} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
            </svg>
          </button>

          <div className="ei-tab-pill">
            <div className="ei-tab-track"
              style={{ transform: activeTab === "crop" ? "translateX(0%)" : "translateX(100%)" }}
            />
            <button className={`ei-tab-btn ${activeTab === "crop" ? "ei-tab-on" : ""}`}
              onClick={() => setActiveTab("crop")}>Crop</button>
            <button className={`ei-tab-btn ${activeTab === "adjust" ? "ei-tab-on" : ""}`}
              onClick={() => setActiveTab("adjust")}>Adjust</button>
          </div>

          <button className="ei-save-btn" onClick={handleSave}
            disabled={isSaving || !cropperReady} aria-label="Save">
            {isSaving
              ? <span className="ei-spin" />
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
            }
          </button>
        </div>

        {/* ── CANVAS ─────────────────────────────────────────────────── */}
        <div className="ei-canvas" style={{ height: canvasH > 0 ? canvasH : "auto", flex: canvasH > 0 ? "none" : 1 }}>
          {!cropperReady && (
            <div className="ei-loader">
              <div className="ei-loader-ring" />
              <span>Loading…</span>
            </div>
          )}
          {canvasH > 0 && (
            <Cropper
              ref={cropperRef}
              src={src}
              style={{
                display: "block",
                width: "100%",
                height: canvasH,
                opacity: cropperReady ? 1 : 0,
                transition: "opacity 0.3s",
              }}
              aspectRatio={aspect}
              guides
              viewMode={1}
              dragMode="move"
              background={false}
              responsive
              autoCropArea={0.85}
              checkOrientation={false}
              toggleDragModeOnDblclick={false}
              ready={() => setCropperReady(true)}
              cropBoxMovable
              cropBoxResizable
              minContainerWidth={10}
              minContainerHeight={canvasH}
            />
          )}
          {cropperReady && <div className="ei-hint">Pinch to zoom · Drag to move</div>}
        </div>

        {/* ── BOTTOM SHEET ───────────────────────────────────────────── */}
        <div className="ei-sheet">

          {activeTab === "crop" && (
            <>
              <p className="ei-label">Aspect Ratio</p>
              <div className="ei-chips">
                {ASPECTS.map(({ label, value, icon }) => (
                  <button key={label}
                    className={`ei-chip ${isOn(value) ? "ei-chip-on" : ""}`}
                    onClick={() => handleAspect(value)}>
                    <span className="ei-chip-icon">{icon}</span>
                    <span className="ei-chip-txt">{label}</span>
                  </button>
                ))}
              </div>

              <p className="ei-label" style={{ marginTop: 10 }}>Transform</p>
              <div className="ei-tools">
                <button className="ei-tool" onClick={() => handleRotate(-90)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
                  </svg>
                  Left
                </button>
                <button className="ei-tool" onClick={() => handleRotate(90)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>
                  </svg>
                  Right
                </button>
                <button className={`ei-tool ${flipped.h ? "ei-tool-on" : ""}`} onClick={() => handleFlip("h")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v18"/><path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/>
                  </svg>
                  Flip H
                </button>
                <button className={`ei-tool ${flipped.v ? "ei-tool-on" : ""}`} onClick={() => handleFlip("v")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h18"/><path d="M8 8l4-4 4 4"/><path d="M8 16l4 4 4-4"/>
                  </svg>
                  Flip V
                </button>
                <button className="ei-tool ei-tool-red" onClick={handleReset}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 3v6h6"/><path d="M21 21v-6h-6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
                  </svg>
                  Reset
                </button>
              </div>
            </>
          )}

          {activeTab === "adjust" && (
            <>
              <p className="ei-label">Zoom</p>
              <div className="ei-zoom-row">
                <button className="ei-zoom-btn" onClick={() => handleZoom(-0.15)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </button>
                <div className="ei-zoom-track"><div className="ei-zoom-fill" /></div>
                <button className="ei-zoom-btn" onClick={() => handleZoom(0.15)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </button>
              </div>

              <p className="ei-label" style={{ marginTop: 12 }}>Drag Mode</p>
              <div className="ei-mode-row">
                <button className={`ei-mode-btn ${dragMode === "move" ? "ei-mode-on" : ""}`}
                  onClick={() => switchDrag("move")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>
                  </svg>
                  Move Canvas
                </button>
                <button className={`ei-mode-btn ${dragMode === "crop" ? "ei-mode-on" : ""}`}
                  onClick={() => switchDrag("crop")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>
                  </svg>
                  Draw New Crop
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>,
    document.body   // ← renders outside any layout wrapper
  );
};

export default EditImage;