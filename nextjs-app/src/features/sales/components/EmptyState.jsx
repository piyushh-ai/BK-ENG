import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const EmptyState = React.memo(({ search }) => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
  }, []);
  return (
    <div
      ref={ref}
      style={{
        gridColumn: "1 / -1", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "80px 20px", color: "var(--color-on-surface-variant)",
        fontFamily: "'DM Sans', sans-serif", textAlign: "center",
      }}
    >
      <div style={{ width: "80px", height: "80px", borderRadius: "24px", marginBottom: "20px", background: "var(--color-surface-container)", display: "grid", placeItems: "center", fontSize: "36px", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
        🔍
      </div>
      <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--color-on-surface)", marginBottom: "8px", letterSpacing: "-0.3px" }}>
        {search ? "No results found" : "No items available"}
      </div>
      <div style={{ fontSize: "14px", maxWidth: "320px", lineHeight: 1.6 }}>
        {search
          ? `We couldn't find anything matching "${search}". Try different keywords.`
          : "There are no items to display in this category."}
      </div>
    </div>
  );
});

export default EmptyState;
