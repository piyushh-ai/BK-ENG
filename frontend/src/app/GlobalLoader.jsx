import React from 'react';

const GlobalLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#f8f9fa] font-['DM_Sans']">
      <style>{`
        @keyframes gl-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gl-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
        .gl-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(0,0,0,0.1);
          border-top: 4px solid var(--color-primary, #1a73e8);
          border-radius: 50%;
          animation: gl-spin 1s linear infinite;
          margin-bottom: 20px;
        }
        .gl-text {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--color-on-surface, #1f2937);
          letter-spacing: -0.5px;
          margin-bottom: 8px;
          animation: gl-pulse 2s ease-in-out infinite;
        }
        .gl-sub {
          font-size: 14px;
          color: var(--color-on-surface-variant, #6b7280);
        }
      `}</style>
      <div className="gl-spinner" />
      <h2 className="gl-text">B.K Engineering</h2>
      <p className="gl-sub">Loading application securely...</p>
    </div>
  );
};

export default GlobalLoader;
