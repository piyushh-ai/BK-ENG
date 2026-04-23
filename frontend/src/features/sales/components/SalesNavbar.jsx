import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../app/ThemeProvider";
import { useAuth } from "../../../features/auth/hook/useAuth";
import { gsap } from "gsap";


/* ── Profile Panel — defined OUTSIDE to prevent recreation on every render ── */
const SalesProfilePanelContent = ({ initials, user, isAdmin, theme, toggleTheme, handleLogout }) => (
  <>
    <div className="snav-pd-user">
      <div className="snav-pd-avatar">{initials}</div>
      <div className="snav-pd-info">
        <div className="snav-pd-name">{user?.name || "User"}</div>
        <div className="snav-pd-email">{user?.email || ""}</div>
        <div className="snav-pd-role">{isAdmin ? "🛡️ Admin" : "💼 Salesman"}</div>
      </div>
    </div>
    <div className="snav-pd-divider" />
    <div className="snav-pd-row">
      <div className="snav-pd-row-left">
        <span className="snav-pd-row-icon">{theme === "dark" ? "🌙" : "☀️"}</span>
        <span className="snav-pd-row-label">Dark Mode</span>
      </div>
      <button className={`snav-pd-toggle${theme === "dark" ? " on" : ""}`} onClick={toggleTheme} aria-label="Toggle theme">
        <span className="snav-pd-toggle-knob" />
      </button>
    </div>
    <div className="snav-pd-divider" />
    <button className="snav-pd-logout" onClick={handleLogout}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      Sign Out
    </button>
  </>
);

const SalesNavbar = ({ activeTab, onTabChange }) => {
  const user = useSelector((state) => state.auth.user);
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef({});
  const dropdownRef = useRef(null);
  const avatarBtnRef = useRef(null);
  const sheetRef = useRef(null); // mobile sheet ref

  const [profileOpen, setProfileOpen] = useState(false);

  // Only nav tabs — Settings removed
  const tabs = [
    {
      id: "overview",
      label: "Dashboard",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      id: "company",
      label: "Co. Stock",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
    },
    {
      id: "bosch",
      label: "Bosch",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
          <path d="M2 12h20"/>
        </svg>
      ),
    },
    {
      id: "orders",
      label: "Punch",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M8 12h8"/>
          <path d="M12 8v8"/>
        </svg>
      ),
    },
    {
      id: "history",
      label: "History",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/>
          <path d="M16 13H8"/>
          <path d="M16 17H8"/>
          <path d="M10 9H8"/>
        </svg>
      ),
    },
  ];

  // Desktop nav entrance
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power4.out",
        onComplete: () => gsap.set(navRef.current, { clearProps: "transform,y" }),
      }
    );
  }, []);

  // Desktop tab indicator
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (!el || !indicatorRef.current) return;
    const { offsetLeft, offsetWidth } = el;
    gsap.to(indicatorRef.current, { x: offsetLeft, width: offsetWidth, duration: 0.38, ease: "power3.inOut" });
  }, [activeTab]);

  // Close on outside interaction — touchend so sheet buttons fire first
  useEffect(() => {
    if (!profileOpen) return;
    const handleClick = (e) => {
      const target = e.target;
      const insideDropdown = dropdownRef.current && dropdownRef.current.contains(target);
      const insideSheet    = sheetRef.current    && sheetRef.current.contains(target);
      const insideAvatar   = avatarBtnRef.current && avatarBtnRef.current.contains(target);
      if (!insideDropdown && !insideSheet && !insideAvatar) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchend", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchend", handleClick);
    };
  }, [profileOpen]);

  const handleLogout = async () => {
    setProfileOpen(false);
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "LOGOUT" }));
    }
    try { window.localStorage.removeItem("bk_auth_token"); } catch {}
    await logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "SL";

  const isAdmin = user?.role === "admin";


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');

        /* ══ DESKTOP TOPBAR ══ */
        .snav {
          position: sticky; top: 0; z-index: 200;
          background: color-mix(in srgb, var(--color-surface-container-lowest) 92%, transparent);
          backdrop-filter: blur(24px) saturate(1.6);
          -webkit-backdrop-filter: blur(24px) saturate(1.6);
          border-bottom: 1px solid var(--color-outline-variant);
        }
        .snav-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 28px;
          display: flex; align-items: center;
          height: 64px; gap: 0;
        }
        .snav-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; margin-right: 28px; flex-shrink: 0;
        }
        .snav-logo {
          width: 36px; height: 36px; border-radius: 10px;
          background: var(--color-primary);
          display: grid; place-items: center;
          box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary) 40%, transparent);
          transition: transform 0.3s ease, box-shadow 0.3s ease; flex-shrink: 0;
        }
        .snav-logo:hover { transform: scale(1.08) rotate(-6deg); }
        .snav-logo svg { width: 16px; height: 16px; fill: var(--color-on-primary); }
        .snav-brand-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: 15px;
          color: var(--color-on-surface); letter-spacing: -0.5px; white-space: nowrap;
        }
        .snav-brand-name span { color: var(--color-primary); }
        .snav-tabs { display: flex; align-items: center; gap: 2px; flex: 1; position: relative; }
        .snav-tab-indicator {
          position: absolute; bottom: -22px; height: 2px;
          background: var(--color-primary); border-radius: 2px 2px 0 0; pointer-events: none;
        }
        .snav-tab {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 16px; border-radius: 8px; border: none;
          background: transparent; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500;
          color: var(--color-on-surface-variant);
          transition: color 0.2s, background 0.2s; white-space: nowrap; position: relative;
        }
        .snav-tab:hover { color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 8%, transparent); }
        .snav-tab.active { color: var(--color-primary); font-weight: 700; background: color-mix(in srgb, var(--color-primary) 10%, transparent); }
        .snav-tab-icon { display: grid; place-items: center; transition: transform 0.3s ease; }
        .snav-tab.active .snav-tab-icon { transform: scale(1.15); }
        .snav-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; margin-left: auto; }
        .snav-user-info { text-align: right; line-height: 1.35; }
        .snav-user-name { font-size: 13px; font-weight: 600; color: var(--color-on-surface); }
        .snav-user-email { font-size: 11px; color: var(--color-on-surface-variant); }

        /* ── Avatar button ── */
        .snav-avatar-btn {
          position: relative; cursor: pointer;
          background: none; border: none; padding: 0;
          border-radius: 50%;
          transition: transform 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .snav-avatar-btn:hover { transform: scale(1.07); }
        .snav-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, #1e40af));
          color: var(--color-on-primary);
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: 13px;
          display: grid; place-items: center;
          box-shadow: 0 0 0 2px var(--color-outline-variant);
          user-select: none; pointer-events: none;
        }
        .snav-avatar-pulse {
          position: absolute; bottom: 0; right: 0;
          width: 10px; height: 10px; background: #2ecc71;
          border-radius: 50%; border: 2px solid var(--color-surface-container-lowest);
          pointer-events: none;
        }

        /* ══ DESKTOP PROFILE DROPDOWN ══ */
        .snav-dropdown {
          position: absolute;
          top: calc(100% + 10px); right: 0;
          width: 280px;
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 18px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.16);
          z-index: 9999;
          overflow: hidden;
          animation: snavDropIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes snavDropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ══ MOBILE BOTTOM SHEET ══ */
        .snav-sheet-overlay {
          display: none;
          position: fixed; inset: 0; z-index: 100000;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: snavOverlayIn 0.2s ease both;
          pointer-events: none;
        }
        @keyframes snavOverlayIn { from { opacity:0 } to { opacity:1 } }
        .snav-sheet {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0;
          z-index: 100001;
          background: var(--color-surface-container-lowest);
          border-radius: 24px 24px 0 0;
          padding: 0 0 calc(env(safe-area-inset-bottom, 12px) + 8px);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.18);
          animation: snavSheetUp 0.32s cubic-bezier(0.32,0.72,0,1) both;
        }
        @keyframes snavSheetUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .snav-sheet-handle {
          width: 36px; height: 4px; border-radius: 2px;
          background: var(--color-outline-variant);
          margin: 12px auto 4px;
        }

        /* ══ SHARED PROFILE PANEL STYLES ══ */
        .snav-pd-user {
          display: flex; align-items: center; gap: 14px;
          padding: 20px 20px 16px;
        }
        .snav-pd-avatar {
          width: 52px; height: 52px; border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, #1e40af));
          color: var(--color-on-primary);
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: 18px;
          display: grid; place-items: center; flex-shrink: 0;
        }
        .snav-pd-info { flex: 1; min-width: 0; }
        .snav-pd-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 16px; font-weight: 800; letter-spacing: -0.3px;
          color: var(--color-on-surface);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .snav-pd-email {
          font-size: 12px; color: var(--color-on-surface-variant);
          margin-top: 2px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .snav-pd-role {
          display: inline-flex; align-items: center; gap: 4px;
          margin-top: 6px;
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          color: var(--color-primary);
          font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; padding: 2px 9px; border-radius: 20px;
          font-family: 'DM Sans', sans-serif;
        }
        .snav-pd-divider {
          height: 1px; background: var(--color-outline-variant);
          margin: 0 16px;
        }
        .snav-pd-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px; gap: 12px;
        }
        .snav-pd-row-left {
          display: flex; align-items: center; gap: 10px;
        }
        .snav-pd-row-icon { font-size: 18px; line-height: 1; }
        .snav-pd-row-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          color: var(--color-on-surface);
        }
        /* Theme toggle pill */
        .snav-pd-toggle {
          position: relative; width: 48px; height: 26px;
          border-radius: 13px; border: none; cursor: pointer; padding: 0;
          background: var(--color-surface-container-high);
          transition: background 0.3s ease; flex-shrink: 0;
        }
        .snav-pd-toggle.on { background: var(--color-primary); }
        .snav-pd-toggle-knob {
          position: absolute;
          top: 3px; left: 3px;
          width: 20px; height: 20px; border-radius: 50%;
          background: #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          transition: left 0.3s cubic-bezier(0.34,1.56,0.64,1);
          display: block;
        }
        .snav-pd-toggle.on .snav-pd-toggle-knob { left: 25px; }

        .snav-pd-logout {
          display: flex; align-items: center; gap: 8px;
          width: calc(100% - 32px);
          margin: 12px 16px 16px;
          padding: 12px 16px;
          background: color-mix(in srgb, #dc2626 8%, transparent);
          color: #dc2626;
          border: 1.5px solid color-mix(in srgb, #dc2626 25%, transparent);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          justify-content: center;
        }
        .snav-pd-logout:hover, .snav-pd-logout:active {
          background: color-mix(in srgb, #dc2626 15%, transparent);
          transform: scale(0.98);
        }
        [data-theme="dark"] .snav-pd-logout {
          color: #f87171;
          border-color: color-mix(in srgb, #dc2626 30%, transparent);
        }

        /* ══ MOBILE BOTTOM NAV ══ */
        .snav-bottom { display: none; }

        @media (max-width: 768px) {
          .snav-inner { padding: 0 16px; height: 54px; }
          .snav-tabs { display: none; }
          .snav-user-info { display: none; }
          .snav-tab-indicator { display: none; }
          /* Show avatar on mobile too */
          .snav-avatar { width: 34px; height: 34px; font-size: 12px; }

          .snav-bottom {
            display: flex;
            position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
            background: var(--color-surface-container-lowest);
            backdrop-filter: blur(20px) saturate(1.8);
            -webkit-backdrop-filter: blur(20px) saturate(1.8);
            border-top: 1px solid var(--color-outline-variant);
            box-shadow: 0 -2px 20px rgba(0,0,0,0.08);
            padding: 0;
            padding-bottom: env(safe-area-inset-bottom, 0px);
            justify-content: space-around;
            align-items: stretch;
          }

          .snav-bot-tab {
            flex: 1;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            gap: 3px;
            padding: 8px 2px 10px;
            border: none; background: transparent; cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            position: relative; min-height: 62px;
            transition: background 0.15s;
          }
          .snav-bot-tab:active {
            background: color-mix(in srgb, var(--color-primary) 8%, transparent);
          }

          /* Active pill */
          .snav-bot-tab.active::before {
            content: '';
            position: absolute; top: 6px; left: 50%; transform: translateX(-50%);
            width: 52px; height: 34px; border-radius: 17px;
            background: color-mix(in srgb, var(--color-primary) 16%, transparent);
          }

          .snav-bot-icon {
            display: grid; place-items: center;
            color: var(--color-on-surface-variant);
            position: relative; z-index: 1;
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.2s;
          }
          .snav-bot-tab.active .snav-bot-icon {
            transform: translateY(-1px) scale(1.12);
            color: var(--color-primary);
          }

          .snav-bot-label {
            font-family: 'DM Sans', sans-serif;
            font-size: 10.5px; font-weight: 600; letter-spacing: 0.005em;
            color: var(--color-on-surface-variant);
            position: relative; z-index: 1;
            transition: color 0.2s;
          }
          .snav-bot-tab.active .snav-bot-label {
            color: var(--color-primary);
            font-weight: 700;
          }

          /* Show sheet on mobile */
          .snav-sheet-overlay.open { display: block; }
          .snav-sheet.open { display: block; }

          /* Hide dropdown on mobile */
          .snav-dropdown { display: none !important; }
        }

        @media (min-width: 769px) {
          /* Hide sheet on desktop */
          .snav-sheet-overlay { display: none !important; }
          .snav-sheet { display: none !important; }
        }

        @media (max-width: 380px) {
          .snav-brand-name { display: none; }
          .snav-bot-label { font-size: 9.5px; }
        }
      `}</style>

      {/* Desktop topbar */}
      <nav className="snav" ref={navRef}>
        <div className="snav-inner">
          <a className="snav-brand" href="/">
            <div className="snav-logo">
              <svg viewBox="0 0 16 16">
                <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" />
              </svg>
            </div>
            <span className="snav-brand-name">B.K <span>Eng</span></span>
          </a>

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

          <div className="snav-right">
            <div className="snav-user-info">
              <div className="snav-user-name">{user?.name || "Sales User"}</div>
              <div className="snav-user-email">{user?.email || ""}</div>
            </div>

            {/* Clickable avatar — desktop dropdown + mobile sheet trigger */}
            <div style={{ position: "relative" }}>
              <button
                ref={avatarBtnRef}
                className="snav-avatar-btn"
                onClick={() => setProfileOpen((o) => !o)}
                aria-label="Open profile"
                id="snav-avatar-btn"
              >
                <div className="snav-avatar">{initials}</div>
                <span className="snav-avatar-pulse" />
              </button>

              {/* Desktop dropdown */}
              {profileOpen && (
                <div className="snav-dropdown" ref={dropdownRef}>
                  <SalesProfilePanelContent
                    initials={initials} user={user} isAdmin={isAdmin}
                    theme={theme} toggleTheme={toggleTheme} handleLogout={handleLogout}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
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
              <span className="snav-bot-label">{t.label}</span>
            </button>
          ))}
        </div>,
        document.body
      )}

      {/* Mobile bottom sheet — portal so it's always above bottom nav */}
      {createPortal(
        <>
          {/* Overlay */}
          <div
            className={`snav-sheet-overlay${profileOpen ? " open" : ""}`}
            onClick={() => setProfileOpen(false)}
            style={{ pointerEvents: profileOpen ? "auto" : "none" }}
          />
          <div ref={sheetRef} className={`snav-sheet${profileOpen ? " open" : ""}`}>
            <div className="snav-sheet-handle" />
            <SalesProfilePanelContent
              initials={initials} user={user} isAdmin={isAdmin}
              theme={theme} toggleTheme={toggleTheme} handleLogout={handleLogout}
            />
          </div>
        </>,
        document.body
      )}
    </>
  );
};

export default SalesNavbar;
