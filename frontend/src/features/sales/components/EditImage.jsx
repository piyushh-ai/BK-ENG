import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./EditImage.css";

const ASPECTS = [
  { label: "Free", value: NaN, icon: "⊞" },
  { label: "1:1", value: 1, icon: "◻" },
  { label: "4:5", value: 4 / 5, icon: "▯" },
  { label: "16:9", value: 16 / 9, icon: "▬" },
  { label: "9:16", value: 9 / 16, icon: "▮" },
];

const EditImage = ({ src, originalName = "edited.jpg", onSave, onCancel }) => {
  const cropperRef = useRef(null);
  const [aspect, setAspect] = useState(NaN);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("crop"); // 'crop' | 'adjust'
  const [rotation, setRotation] = useState(0);
  const [flipped, setFlipped] = useState({ h: false, v: false });
  const [cropperReady, setCropperReady] = useState(false);

  const getCropper = () => cropperRef.current?.cropper;

  const handleSave = useCallback(() => {
    const cropper = getCropper();
    if (!cropper) return;
    setIsSaving(true);

    cropper
      .getCroppedCanvas({
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
        maxWidth: 4096,
        maxHeight: 4096,
      })
      .toBlob(
        (blob) => {
          if (!blob) { setIsSaving(false); return; }
          const name = (originalName || "edited.jpg").replace(/\.[^/.]+$/, "") + ".jpg";
          const file = new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
          const preview = URL.createObjectURL(blob);
          onSave(file, preview);
          setIsSaving(false);
        },
        "image/jpeg",
        0.92
      );
  }, [originalName, onSave]);

  const handleRotate = (deg) => {
    const cropper = getCropper();
    if (!cropper) return;
    const newRot = rotation + deg;
    setRotation(newRot);
    cropper.rotateTo(newRot);
  };

  const handleFlip = (axis) => {
    const cropper = getCropper();
    if (!cropper) return;
    if (axis === "h") {
      const newVal = !flipped.h;
      setFlipped((f) => ({ ...f, h: newVal }));
      cropper.scaleX(newVal ? -1 : 1);
    } else {
      const newVal = !flipped.v;
      setFlipped((f) => ({ ...f, v: newVal }));
      cropper.scaleY(newVal ? -1 : 1);
    }
  };

  const handleZoom = (ratio) => getCropper()?.zoom(ratio);

  const handleReset = () => {
    getCropper()?.reset();
    setRotation(0);
    setFlipped({ h: false, v: false });
    setAspect(NaN);
  };

  const handleAspectChange = (value) => {
    setAspect(value);
    getCropper()?.setAspectRatio(value);
  };

  const isAspectActive = (value) =>
    Number.isNaN(value) && Number.isNaN(aspect)
      ? true
      : aspect === value;

  return (
    <div className="ei-overlay">
      <div className="ei-modal">
        {/* ── Header ── */}
        <div className="ei-header">
          <button className="ei-header-btn" onClick={onCancel} aria-label="Cancel">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
          </button>

          <div className="ei-tab-switcher">
            <button
              className={`ei-tab ${activeTab === "crop" ? "active" : ""}`}
              onClick={() => setActiveTab("crop")}
            >
              Crop
            </button>
            <button
              className={`ei-tab ${activeTab === "adjust" ? "active" : ""}`}
              onClick={() => setActiveTab("adjust")}
            >
              Adjust
            </button>
            <div className="ei-tab-indicator" style={{ transform: activeTab === "crop" ? "translateX(0)" : "translateX(100%)" }} />
          </div>

          <button
            className="ei-header-save-btn"
            onClick={handleSave}
            disabled={isSaving || !cropperReady}
            aria-label="Save"
          >
            {isSaving ? (
              <span className="ei-spinner" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Canvas ── */}
        <div className="ei-canvas-area">
          {!cropperReady && (
            <div className="ei-loading">
              <div className="ei-loading-ring" />
              <span>Loading image…</span>
            </div>
          )}
          <Cropper
            ref={cropperRef}
            src={src}
            style={{ height: "100%", width: "100%", opacity: cropperReady ? 1 : 0, transition: "opacity 0.3s" }}
            aspectRatio={aspect}
            guides={true}
            viewMode={1}
            dragMode="move"
            background={false}
            responsive={true}
            autoCropArea={0.85}
            checkOrientation={false}
            ready={() => setCropperReady(true)}
            cropBoxMovable={true}
            cropBoxResizable={true}
            toggleDragModeOnDblclick={true}
          />

          {/* Pinch zoom hint */}
          {cropperReady && (
            <div className="ei-hint">Pinch to zoom · Drag to move</div>
          )}
        </div>

        {/* ── Bottom Controls ── */}
        <div className="ei-bottom-sheet">
          {activeTab === "crop" ? (
            <>
              {/* Aspect ratios */}
              <div className="ei-section-label">Aspect Ratio</div>
              <div className="ei-aspect-row">
                {ASPECTS.map(({ label, value, icon }) => (
                  <button
                    key={label}
                    className={`ei-aspect-chip ${isAspectActive(value) ? "active" : ""}`}
                    onClick={() => handleAspectChange(value)}
                  >
                    <span className="ei-aspect-icon">{icon}</span>
                    <span className="ei-aspect-label">{label}</span>
                  </button>
                ))}
              </div>

              {/* Rotate & Flip */}
              <div className="ei-section-label" style={{ marginTop: 12 }}>Transform</div>
              <div className="ei-transform-row">
                <button className="ei-tool-btn" onClick={() => handleRotate(-90)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span>Rotate L</span>
                </button>
                <button className="ei-tool-btn" onClick={() => handleRotate(90)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                  </svg>
                  <span>Rotate R</span>
                </button>
                <button className={`ei-tool-btn ${flipped.h ? "active" : ""}`} onClick={() => handleFlip("h")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 3v18M3 9l4-4 4 4M3 15l4 4 4-4M17 9l4-4M17 15l4 4" />
                  </svg>
                  <span>Flip H</span>
                </button>
                <button className={`ei-tool-btn ${flipped.v ? "active" : ""}`} onClick={() => handleFlip("v")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 12h18M9 3l-4 4 4 4M15 3l4 4-4 4M9 17l-4 4M15 17l4 4" />
                  </svg>
                  <span>Flip V</span>
                </button>
                <button className="ei-tool-btn" onClick={handleReset}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64L21 8M3 3v6h6" />
                    <path d="M21 21v-6h-6" />
                    <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64L3 16" />
                  </svg>
                  <span>Reset</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="ei-section-label">Zoom</div>
              <div className="ei-zoom-row">
                <button className="ei-zoom-btn" onClick={() => handleZoom(-0.15)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </button>
                <div className="ei-zoom-track">
                  <div className="ei-zoom-bar" />
                </div>
                <button className="ei-zoom-btn" onClick={() => handleZoom(0.15)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </button>
              </div>

              <div className="ei-section-label" style={{ marginTop: 16 }}>Drag Mode</div>
              <div className="ei-dragmode-row">
                <button className="ei-mode-btn" onClick={() => getCropper()?.setDragMode("move")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
                  </svg>
                  Move
                </button>
                <button className="ei-mode-btn" onClick={() => getCropper()?.setDragMode("crop")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 2v14a2 2 0 0 0 2 2h14" />
                    <path d="M18 22V8a2 2 0 0 0-2-2H2" />
                  </svg>
                  Crop
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditImage;