import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hook/useAuth";
import { gsap } from "gsap";

const SalesNavbar = ({ activeTab, onTabChange }) => {
  const user = useSelector((state) => state.auth.user);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef(null);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef({});

  const tabs = [
    { 
      id: "overview", 
      label: "Dashboard", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: '20px', height: '20px'}}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> 
    },
    { 
      id: "company", 
      label: "Co. Stock", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: '20px', height: '20px'}}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> 
    },
    { 
      id: "bosch", 
      label: "Bosch", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: '20px', height: '20px'}}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> 
    },
    { 
      id: "orders", 
      label: "Punch", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: '20px', height: '20px'}}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg> 
    },
    { 
      id: "history", 
      label: "History", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: '20px', height: '20px'}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg> 
    },
  ];

  // ── Desktop Nav entrance ─────────────────────────────────────────────
  // AFTER — mobile pe residual transform clear hoga
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power4.out",
        onComplete: () =>
          gsap.set(navRef.current, { clearProps: "transform,y" }),
      },
    );
  }, []);

  // ── Desktop tab indicator ────────────────────────────────────────────
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (!el || !indicatorRef.current) return;
    const { offsetLeft, offsetWidth } = el;
    gsap.to(indicatorRef.current, {
      x: offsetLeft,
      width: offsetWidth,
      duration: 0.38,
      ease: "power3.inOut",
    });
  }, [activeTab]);

  // ── Outside click ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "SL";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');

        /* ════════════════════════════════════
           DESKTOP TOPBAR
        ════════════════════════════════════ */
        .snav {
          position: sticky;
          top: 0;
          z-index: 200;
          background: color-mix(in srgb, var(--color-surface-container-lowest) 94%, transparent);
          backdrop-filter: blur(24px) saturate(1.6);
          -webkit-backdrop-filter: blur(24px) saturate(1.6);
          border-bottom: 1px solid color-mix(in srgb, var(--color-outline-variant) 60%, transparent);
        }
          
        .snav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          height: 64px;
          gap: 0;
        }

        /* Brand */
        .snav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-right: 28px;
          flex-shrink: 0;
        }
        .snav-logo {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: var(--color-primary);
          display: grid; place-items: center;
          box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary) 40%, transparent);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          flex-shrink: 0;
        }
        .snav-logo:hover {
          transform: scale(1.08) rotate(-6deg);
          box-shadow: 0 8px 20px color-mix(in srgb, var(--color-primary) 50%, transparent);
        }
        .snav-logo svg { width: 16px; height: 16px; fill: var(--color-on-primary); }
        .snav-brand-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: 15px;
          color: var(--color-on-surface);
          letter-spacing: -0.5px;
          white-space: nowrap;
        }
        .snav-brand-name span { color: var(--color-primary); }

        /* Tab rail */
        .snav-tabs {
          display: flex; align-items: center;
          gap: 2px; flex: 1; position: relative;
        }
        .snav-tab-indicator {
          position: absolute; bottom: -22px;
          height: 2px;
          background: var(--color-primary);
          border-radius: 2px 2px 0 0;
          pointer-events: none;
        }
        .snav-tab {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 16px; border-radius: 8px; border: none;
          background: transparent; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 500;
          color: var(--color-on-surface-variant);
          transition: color 0.2s ease, background 0.2s ease;
          white-space: nowrap; position: relative;
        }
        .snav-tab:hover {
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 8%, transparent);
        }
        .snav-tab.active {
          color: var(--color-primary); font-weight: 700;
          background: color-mix(in srgb, var(--color-primary) 10%, transparent);
        }
        .snav-tab-icon { 
          display: grid; place-items: center; 
          transition: transform 0.3s ease; 
        }
        .snav-tab.active .snav-tab-icon { transform: scale(1.15); }

        /* Right section */
        .snav-right {
          display: flex; align-items: center;
          gap: 14px; flex-shrink: 0; margin-left: auto;
        }
        .snav-user-info { text-align: right; line-height: 1.35; }
        .snav-user-name { font-size: 13px; font-weight: 600; color: var(--color-on-surface); }
        .snav-user-email { font-size: 11px; color: var(--color-on-surface-variant); }

        /* Avatar */
        .snav-avatar-wrap { position: relative; }
        .snav-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary, var(--color-primary-container)));
          color: var(--color-on-primary);
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: 13px;
          display: grid; place-items: center;
          cursor: pointer;
          box-shadow: 0 0 0 2px var(--color-outline-variant);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          user-select: none; position: relative;
        }
        .snav-avatar:hover {
          box-shadow: 0 0 0 3px var(--color-primary);
          transform: scale(1.05);
        }
        .snav-avatar-pulse {
          position: absolute; bottom: 0; right: 0;
          width: 10px; height: 10px;
          background: #2ecc71; border-radius: 50%;
          border: 2px solid var(--color-surface-container-lowest);
        }

        /* Dropdown */
        .snav-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          background: var(--color-surface-container-lowest);
          backdrop-filter: blur(20px);
          border: 1px solid var(--color-outline-variant);
          border-radius: 16px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08);
          min-width: 200px; padding: 8px;
          animation: snavDropIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both;
          z-index: 500;
        }
        @keyframes snavDropIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); transform-origin: top right; }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .snav-drop-header {
          padding: 10px 14px 12px;
          border-bottom: 1px solid var(--color-outline-variant);
          margin-bottom: 6px;
        }
        .snav-drop-name { font-weight: 700; font-size: 13.5px; color: var(--color-on-surface); }
        .snav-drop-email { font-size: 11.5px; color: var(--color-on-surface-variant); margin-top: 2px; }
        .snav-drop-item {
          width: 100%; padding: 10px 14px; border: none;
          background: transparent; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; color: var(--color-on-surface);
          text-align: left; cursor: pointer;
          display: flex; align-items: center; gap: 10px;
          transition: background 0.15s; font-weight: 500;
        }
        .snav-drop-item:hover { background: var(--color-surface-container); }
        .snav-drop-item.danger { color: #ba1a1a; }
        .snav-drop-item.danger:hover { background: #ffdad6; }
        .snav-drop-item-icon { font-size: 15px; }
        .snav-drop-divider { height: 1px; background: var(--color-outline-variant); margin: 6px 0; }

        /* ════════════════════════════════════
           MOBILE BOTTOM NAV
           – always position:fixed bottom:0
           – hidden by default via display:none
        ════════════════════════════════════ */
        .snav-bottom {
          display: none;
        }

        @media (max-width: 768px) {
          /* Shrink topbar on mobile — still visible for brand/avatar */
          .snav-inner { padding: 0 16px; height: 56px; }
          .snav-tabs { display: none; }
          .snav-user-info { display: none; }
          .snav-tab-indicator { display: none; }

          /* Show bottom nav */
          .snav-bottom {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            background: var(--color-surface-container-lowest, #fff);
            backdrop-filter: blur(20px) saturate(1.5);
            -webkit-backdrop-filter: blur(20px) saturate(1.5);
            border-top: 1px solid var(--color-outline-variant, #e0e0e0);
            box-shadow: 0 -4px 24px rgba(0,0,0,0.10);
            padding: 0 4px;
            padding-bottom: env(safe-area-inset-bottom, 0px);
            justify-content: space-around;
            align-items: stretch;
            /* No GSAP transform — always stays at bottom */
          }

          .snav-bot-tab {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 10px 4px 10px;
            border: none;
            background: transparent;
            cursor: pointer;
            border-radius: 0;
            -webkit-tap-highlight-color: transparent;
            position: relative;
            min-height: 56px;
          }
          .snav-bot-tab:active {
            background: color-mix(in srgb, var(--color-primary) 10%, transparent);
          }

          /* Active pill background */
          .snav-bot-tab.active::before {
            content: '';
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 48px;
            height: 32px;
            border-radius: 16px;
            background: color-mix(in srgb, var(--color-primary) 14%, transparent);
          }

          .snav-bot-icon {
            display: grid; place-items: center;
            color: var(--color-on-surface-variant);
            position: relative;
            z-index: 1;
            transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.25s ease;
          }
          .snav-bot-tab.active .snav-bot-icon {
            transform: translateY(-2px) scale(1.1);
            color: var(--color-primary);
          }

          .snav-bot-dot {
            display: none; /* replaced by pill ::before */
          }

          .snav-bot-label {
            font-family: 'DM Sans', sans-serif;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.01em;
            color: var(--color-on-surface-variant);
            transition: color 0.2s ease;
            position: relative;
            z-index: 1;
          }
          .snav-bot-tab.active .snav-bot-label {
            color: var(--color-primary);
          }
        }

        @media (max-width: 400px) {
          .snav-brand-name { display: none; }
          .snav-bot-label { font-size: 9px; }
        }
      `}</style>

      {/* ── Desktop topbar ── */}
      <nav className="snav" ref={navRef}>
        <div className="snav-inner">
          {/* Brand */}
          <a className="snav-brand" href="/">
            <div className="snav-logo">
              <svg viewBox="0 0 16 16">
                <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" />
              </svg>
            </div>
            <span className="snav-brand-name">
              B.K <span>Eng</span>
            </span>
          </a>

          {/* Desktop tabs */}
          <div className="snav-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                ref={(el) => (tabRefs.current[t.id] = el)}
                className={`snav-tab${activeTab === t.id ? " active" : ""}`}
                onClick={() => onTabChange(t.id)}
                id={`snav-tab-${t.id}`}
              >
                <span className="snav-tab-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
            <div className="snav-tab-indicator" ref={indicatorRef} />
          </div>

          {/* Right: user info + avatar */}
          <div className="snav-right">
            <div className="snav-user-info">
              <div className="snav-user-name">{user?.name || "Sales User"}</div>
              <div className="snav-user-email">{user?.email || ""}</div>
            </div>

            <div className="snav-avatar-wrap" ref={dropRef}>
              <div
                className="snav-avatar"
                onClick={() => setDropdownOpen((p) => !p)}
                title="Account"
              >
                {initials}
                <span className="snav-avatar-pulse" />
              </div>

              {dropdownOpen && (
                <div className="snav-dropdown">
                  <div className="snav-drop-header">
                    <div className="snav-drop-name">
                      {user?.name || "Sales User"}
                    </div>
                    <div className="snav-drop-email">{user?.email || ""}</div>
                  </div>
                  <button className="snav-drop-item">
                    <span className="snav-drop-item-icon">👤</span> Profile
                  </button>
                  <button className="snav-drop-item">
                    <span className="snav-drop-item-icon">⚙️</span> Settings
                  </button>
                  <div className="snav-drop-divider" />
                  <button
                    className="snav-drop-item danger"
                    onClick={handleLogout}
                  >
                    <span className="snav-drop-item-icon">🚪</span> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile bottom nav — rendered in portal so position:fixed is relative to viewport always ── */}
      {createPortal(
        <div className="snav-bottom">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`snav-bot-tab${activeTab === t.id ? " active" : ""}`}
              onClick={() => onTabChange(t.id)}
              id={`snav-bot-${t.id}`}
            >
              <span className="snav-bot-icon">{t.icon}</span>
              <span className="snav-bot-dot" />
              <span className="snav-bot-label">{t.label}</span>
            </button>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
};

export default SalesNavbar;
