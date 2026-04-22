import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const SkeletonCard = React.memo(() => (
  <div
    style={{
      background: "var(--color-surface-container-lowest)",
      border: "1px solid var(--color-outline-variant)",
      borderRadius: "16px",
      padding: "0",
      overflow: "hidden",
      animation: "sdSkeletonPulse 1.4s ease-in-out infinite",
    }}
  >
    <div style={{ height: "56px", background: "var(--color-surface-container)", borderBottom: "1px solid var(--color-outline-variant)" }} />
    <div style={{ padding: "16px 20px" }}>
      <div style={{ height: "18px", background: "var(--color-surface-container)", borderRadius: "6px", marginBottom: "10px", width: "70%" }} />
      <div style={{ height: "13px", background: "var(--color-surface-container)", borderRadius: "6px", marginBottom: "16px", width: "45%" }} />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ height: "48px", flex: 1, background: "var(--color-surface-container)", borderRadius: "8px" }} />
        <div style={{ height: "48px", flex: 1, background: "var(--color-surface-container)", borderRadius: "8px" }} />
      </div>
    </div>
    <div style={{ padding: "0 20px 16px" }}>
      <div style={{ height: "40px", background: "var(--color-surface-container)", borderRadius: "10px" }} />
    </div>
  </div>
));

export default SkeletonCard;
