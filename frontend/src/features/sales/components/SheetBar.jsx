/**
 * SheetBar — Desktop chip strip + Mobile bottom-sheet drawer for company sheet selection.
 * Extracted from SalesDashboard.jsx for better maintainability.
 */
import React, { useState } from "react";

const SheetBar = React.memo(({ sheets, sheetsLoading, selectedSheet, onSheetSelect }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetSearch, setSheetSearch] = useState("");

  const selName = typeof selectedSheet === "string" ? selectedSheet : selectedSheet?.sheetName;

  const handleSelect = (sheet) => {
    onSheetSelect(sheet);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Desktop: chip bar */}
      <div className="sd-sheet-bar">
        {sheetsLoading
          ? [1, 2, 3].map((k) => (
              <div key={k} style={{ width: "80px", height: "32px", flexShrink: 0, background: "var(--color-surface-container)", borderRadius: "20px", animation: "sdSkeletonPulse 1.4s ease-in-out infinite" }} />
            ))
          : sheets.map((sheet) => {
              const name = typeof sheet === "string" ? sheet : sheet.sheetName;
              return (
                <button
                  key={name}
                  className={`sd-sheet-chip${name === selName ? " active" : ""}`}
                  onClick={() => handleSelect(sheet)}
                  id={`sheet-chip-${name}`}
                >
                  {name}
                </button>
              );
            })}
      </div>

      {/* Mobile: trigger button */}
      <div className="sd-sheet-picker-wrap">
        <button
          className="sd-sheet-picker-btn"
          onClick={() => { setDrawerOpen(true); setSheetSearch(""); }}
          id="sd-sheet-picker-trigger"
        >
          <span style={{ fontSize: "16px", flexShrink: 0 }}>🏢</span>
          <span className="sd-sheet-picker-selected">
            {sheetsLoading ? "Loading sheets…" : selName || "Select sheet"}
          </span>
          <span className="sd-sheet-picker-meta">{sheets.length} sheets</span>
          <span className="sd-sheet-picker-arrow">▾</span>
        </button>
      </div>

      {/* Mobile: bottom-sheet drawer */}
      {drawerOpen && (
        <>
          <div className="sd-drawer-overlay open" onClick={() => setDrawerOpen(false)} />
          <div className="sd-sheet-drawer">
            <div className="sd-drawer-handle" />
            <div className="sd-drawer-header">
              <div className="sd-drawer-title">Select Company Sheet</div>
              <div className="sd-drawer-search-wrap">
                <span className="sd-drawer-search-icon">🔍</span>
                <input
                  className="sd-drawer-search"
                  type="text"
                  placeholder="Search sheets…"
                  value={sheetSearch}
                  onChange={(e) => setSheetSearch(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="sd-drawer-list">
              {(() => {
                const filtered = sheets.filter((s) => {
                  const n = typeof s === "string" ? s : s.sheetName;
                  return n.toLowerCase().includes(sheetSearch.toLowerCase());
                });
                if (filtered.length === 0) return <div className="sd-drawer-empty">No sheets found</div>;
                return filtered.map((sheet) => {
                  const name = typeof sheet === "string" ? sheet : sheet.sheetName;
                  const isActive = name === selName;
                  return (
                    <button
                      key={name}
                      className={`sd-drawer-item${isActive ? " active" : ""}`}
                      onClick={() => handleSelect(sheet)}
                    >
                      {name}
                      {isActive && <span className="sd-drawer-item-check">✓</span>}
                    </button>
                  );
                });
              })()}
            </div>
          </div>
        </>
      )}
    </>
  );
});

export default SheetBar;
