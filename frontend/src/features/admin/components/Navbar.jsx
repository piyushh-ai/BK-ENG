import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hook/useAuth";
import { useTheme } from "../../../app/ThemeProvider";
import { gsap } from "gsap";

const Navbar = ({ activeTab, onTabChange }) => {
  const user = useSelector((state) => state.auth.user);
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef({});
  const dropdownRef = useRef(null);
  const avatarBtnRef = useRef(null);
  const sheetRef = useRef(null); // mobile bottom sheet ref

  const [profileOpen, setProfileOpen] = useState(false);

  // Settings tab removed — accessible via avatar click
  const tabs = [
    {
      id: "system",
      label: "System",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      id: "all_orders",
      label: "All Orders",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "company",
      label: "Co. Stock",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
          <path d="M12 10h.01" /><path d="M12 14h.01" />
          <path d="M16 10h.01" /><path d="M16 14h.01" />
          <path d="M8 10h.01" /><path d="M8 14h.01" />
        </svg>
      ),
    },
    {
      id: "bosch",
      label: "Bosch",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M8 12h8" /><path d="M12 8v8" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "power4.out",
      onComplete: () => gsap.set(navRef.current, { clearProps: "transform,y" }),
    });
  }, []);

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (!el || !indicatorRef.current) return;
    const { offsetLeft, offsetWidth } = el;
    gsap.to(indicatorRef.current, { x: offsetLeft, width: offsetWidth, duration: 0.38, ease: "power3.inOut" });
  }, [activeTab]);

  // Close on outside interaction — touchend so sheet buttons can fire first
  useEffect(() => {
    if (!profileOpen) return;
    const handle = (e) => {
      const target = e.target;
      const insideDropdown = dropdownRef.current && dropdownRef.current.contains(target);
      const insideSheet    = sheetRef.current    && sheetRef.current.contains(target);
      const insideAvatar   = avatarBtnRef.current && avatarBtnRef.current.contains(target);
      if (!insideDropdown && !insideSheet && !insideAvatar) {
        setProfileOpen(false);
      }
    };
    // Use touchend (not touchstart) so sheet buttons register click first
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchend", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchend", handle);
    };
  }, [profileOpen]);

  const handleLogout = async () => {
    setProfileOpen(false);
    if (typeof window !== "undefined" && window.ReactNativeWebView)
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "LOGOUT" }));
    try { window.localStorage.removeItem("bk_auth_token"); } catch {}
    await logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  const isAdmin = user?.role === "admin";

/* ProfilePanelContent — defined OUTSIDE so it's never recreated on each render */
const ProfilePanelContent = ({ initials, user, isAdmin, theme, toggleTheme, handleLogout }) => (
  <>
    <div className="anav-pd-user">
      <div className="anav-pd-avatar">{initials}</div>
      <div className="anav-pd-info">
        <div className="anav-pd-name">{user?.name || "Administrator"}</div>
        <div className="anav-pd-email">{user?.email || ""}</div>
        <div className="anav-pd-role">{isAdmin ? "🛡️ Admin" : "💼 Salesman"}</div>
      </div>
    </div>
    <div className="anav-pd-divider" />
    <div className="anav-pd-row">
      <div className="anav-pd-row-left">
        <span className="anav-pd-row-icon">{theme === "dark" ? "🌙" : "☀️"}</span>
        <span className="anav-pd-row-label">Dark Mode</span>
      </div>
      <button className={`anav-pd-toggle${theme === "dark" ? " on" : ""}`} onClick={toggleTheme} aria-label="Toggle theme">
        <span className="anav-pd-toggle-knob" />
      </button>
    </div>
    <div className="anav-pd-divider" />
    <button className="anav-pd-logout" onClick={handleLogout}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      Sign Out
    </button>
  </>
);

  return (
    <>
      <style>{`
        .snav {
          position: sticky; top: 0; left: 0; right: 0; z-index: 99999;
          background: color-mix(in srgb, var(--color-background) 80%, transparent);
          backdrop-filter: blur(28px) saturate(1.2);
          -webkit-backdrop-filter: blur(28px) saturate(1.2);
          border-bottom: 1px solid var(--color-outline-variant);
        }
        .snav-inner {
          max-width: 1400px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px; padding: 0 24px;
        }
        .snav-brand { display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none; }
        .snav-logo {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 80%, #000));
          display: grid; place-items: center;
          box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary) 30%, transparent);
        }
        .snav-logo svg { width: 18px; height: 18px; fill: var(--color-on-primary); }
        .snav-brand-name { font-family: 'Bricolage Grotesque', sans-serif; font-size: 19px; font-weight: 800; color: var(--color-on-surface); letter-spacing: -0.03em; }
        .snav-brand-name span { color: var(--color-primary); }

        .snav-tabs { display: flex; align-items: center; gap: 4px; position: relative; height: 100%; }
        .snav-tab {
          display: flex; align-items: center; gap: 8px;
          padding: 0 16px; height: 100%; border: none; background: transparent;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600;
          color: var(--color-on-surface-variant); cursor: pointer;
          transition: color 0.2s; position: relative; z-index: 1; outline: none;
        }
        .snav-tab:hover { color: var(--color-on-surface); }
        .snav-tab.active { color: var(--color-primary); }
        .snav-tab-icon { display: grid; place-items: center; transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1); }
        .snav-tab.active .snav-tab-icon { transform: scale(1.1); }
        .snav-tab-indicator { position: absolute; bottom: 0; left: 0; height: 3px; background: var(--color-primary); border-radius: 3px 3px 0 0; z-index: 2; pointer-events: none; }

        .snav-right { display: flex; align-items: center; gap: 16px; }
        .snav-user-info { display: flex; flex-direction: column; align-items: flex-end; }
        .snav-user-name { font-size: 13.5px; font-weight: 700; color: var(--color-on-surface); }
        .snav-user-email { font-size: 11px; font-weight: 500; color: var(--color-outline); }

        /* Avatar button */
        .snav-avatar-btn {
          position: relative; cursor: pointer; background: none; border: none; padding: 0;
          border-radius: 50%; transition: transform 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .snav-avatar-btn:hover { transform: scale(1.07); }
        .snav-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, #1e40af));
          border: 2px solid var(--color-outline-variant);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: var(--color-on-primary);
          font-family: 'Bricolage Grotesque', sans-serif;
          pointer-events: none; user-select: none;
        }
        .snav-avatar-pulse {
          position: absolute; bottom: 0; right: 0; width: 10px; height: 10px;
          border-radius: 50%; background: #22c55e;
          border: 2px solid var(--color-surface-container-lowest);
          pointer-events: none;
        }

        /* Desktop dropdown */
        .snav-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          width: 280px; background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant); border-radius: 18px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.16); z-index: 9999; overflow: hidden;
          animation: anavDropIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes anavDropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Mobile bottom sheet */
        .anav-sheet-overlay {
          display: none; position: fixed; inset: 0; z-index: 100000;
          background: rgba(0,0,0,0.45); backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: anavOverlayIn 0.2s ease both;
          pointer-events: none;
        }
        @keyframes anavOverlayIn { from { opacity:0 } to { opacity:1 } }
        .anav-sheet {
          display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 100001;
          background: var(--color-surface-container-lowest);
          border-radius: 24px 24px 0 0;
          padding: 0 0 calc(env(safe-area-inset-bottom, 12px) + 8px);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.18);
          animation: anavSheetUp 0.32s cubic-bezier(0.32,0.72,0,1) both;
        }
        @keyframes anavSheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .anav-sheet-handle { width: 36px; height: 4px; border-radius: 2px; background: var(--color-outline-variant); margin: 12px auto 4px; }

        /* Shared profile panel */
        .anav-pd-user { display: flex; align-items: center; gap: 14px; padding: 20px 20px 16px; }
        .anav-pd-avatar {
          width: 52px; height: 52px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, #1e40af));
          color: var(--color-on-primary); font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: 18px; display: grid; place-items: center;
        }
        .anav-pd-info { flex: 1; min-width: 0; }
        .anav-pd-name { font-family: 'Bricolage Grotesque', sans-serif; font-size: 16px; font-weight: 800; letter-spacing: -0.3px; color: var(--color-on-surface); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .anav-pd-email { font-size: 12px; color: var(--color-on-surface-variant); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .anav-pd-role { display: inline-flex; align-items: center; gap: 4px; margin-top: 6px; background: color-mix(in srgb, var(--color-primary) 12%, transparent); color: var(--color-primary); font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 9px; border-radius: 20px; font-family: 'DM Sans', sans-serif; }
        .anav-pd-divider { height: 1px; background: var(--color-outline-variant); margin: 0 16px; }
        .anav-pd-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; gap: 12px; }
        .anav-pd-row-left { display: flex; align-items: center; gap: 10px; }
        .anav-pd-row-icon { font-size: 18px; line-height: 1; }
        .anav-pd-row-label { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: var(--color-on-surface); }
        .anav-pd-toggle { position: relative; width: 48px; height: 26px; border-radius: 13px; border: none; cursor: pointer; padding: 0; background: var(--color-surface-container-high); transition: background 0.3s ease; flex-shrink: 0; }
        .anav-pd-toggle.on { background: var(--color-primary); }
        .anav-pd-toggle-knob { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.25); transition: left 0.3s cubic-bezier(0.34,1.56,0.64,1); display: block; }
        .anav-pd-toggle.on .anav-pd-toggle-knob { left: 25px; }
        .anav-pd-logout {
          display: flex; align-items: center; gap: 8px; justify-content: center;
          width: calc(100% - 32px); margin: 12px 16px 16px;
          padding: 12px 16px; border-radius: 12px; cursor: pointer;
          background: color-mix(in srgb, #dc2626 8%, transparent);
          color: #dc2626; border: 1.5px solid color-mix(in srgb, #dc2626 25%, transparent);
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700;
          transition: background 0.2s, transform 0.15s;
        }
        .anav-pd-logout:hover, .anav-pd-logout:active { background: color-mix(in srgb, #dc2626 15%, transparent); transform: scale(0.98); }
        [data-theme="dark"] .anav-pd-logout { color: #f87171; border-color: color-mix(in srgb, #dc2626 30%, transparent); }

        .snav-bottom { display: none; }

        @media (max-width: 768px) {
          .snav-inner { padding: 0 16px; height: 56px; }
          .snav-tabs { display: none; }
          .snav-user-info { display: none; }
          .snav-tab-indicator { display: none; }
          .snav-avatar { width: 34px; height: 34px; font-size: 12px; }

          .snav-bottom {
            display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
            background: var(--color-surface-container-lowest);
            backdrop-filter: blur(20px) saturate(1.5);
            -webkit-backdrop-filter: blur(20px) saturate(1.5);
            border-top: 1px solid var(--color-outline-variant);
            box-shadow: 0 -4px 24px rgba(0,0,0,0.10);
            padding: 0 4px; padding-bottom: env(safe-area-inset-bottom, 0px);
            justify-content: space-around; align-items: stretch;
          }
          .snav-bot-tab {
            flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
            padding: 10px 4px; border: none; background: transparent; cursor: pointer;
            -webkit-tap-highlight-color: transparent; position: relative; min-height: 56px;
          }
          .snav-bot-tab:active { background: color-mix(in srgb, var(--color-primary) 10%, transparent); }
          .snav-bot-tab.active::before { content: ''; position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 48px; height: 32px; border-radius: 16px; background: color-mix(in srgb, var(--color-primary) 14%, transparent); }
          .snav-bot-icon { display: grid; place-items: center; color: var(--color-on-surface-variant); position: relative; z-index: 1; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.25s; }
          .snav-bot-tab.active .snav-bot-icon { transform: translateY(-2px) scale(1.1); color: var(--color-primary); }
          .snav-bot-label { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; color: var(--color-on-surface-variant); position: relative; z-index: 1; transition: color 0.2s; }
          .snav-bot-tab.active .snav-bot-label { color: var(--color-primary); }

          /* Sheet visible on mobile */
          .anav-sheet-overlay.open { display: block; pointer-events: auto; }
          .anav-sheet.open { display: block; }
          /* Dropdown hidden on mobile */
          .snav-dropdown { display: none !important; }
        }

        @media (min-width: 769px) {
          .anav-sheet-overlay { display: none !important; }
          .anav-sheet { display: none !important; }
        }

        @media (max-width: 400px) {
          .snav-brand-name { display: none; }
          .snav-bot-label { font-size: 9px; }
        }
      `}</style>

      <nav className="snav" ref={navRef}>
        <div className="snav-inner">
          <div className="snav-brand" onClick={() => navigate("/")}>
            <div className="snav-logo">
              <svg viewBox="0 0 16 16"><path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" /></svg>
            </div>
            <span className="snav-brand-name">Admin<span>Portal</span></span>
          </div>

          <div className="snav-tabs">
            {tabs.map((t) => (
              <button key={t.id} ref={(el) => (tabRefs.current[t.id] = el)}
                className={`snav-tab${activeTab === t.id ? " active" : ""}`}
                onClick={() => onTabChange(t.id)}>
                <span className="snav-tab-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
            <div className="snav-tab-indicator" ref={indicatorRef} />
          </div>

          <div className="snav-right">
            <div className="snav-user-info">
              <div className="snav-user-name">{user?.name || "Administrator"}</div>
              <div className="snav-user-email">{user?.email || ""}</div>
            </div>
            <div style={{ position: "relative" }}>
              <button ref={avatarBtnRef} className="snav-avatar-btn"
                onClick={() => setProfileOpen((o) => !o)}
                aria-label="Open profile" id="anav-avatar-btn">
                <div className="snav-avatar">{initials}</div>
                <span className="snav-avatar-pulse" />
              </button>
              {profileOpen && (
                <div className="snav-dropdown" ref={dropdownRef}>
                  <ProfilePanelContent
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
            <button key={t.id} className={`snav-bot-tab${activeTab === t.id ? " active" : ""}`}
              onClick={() => onTabChange(t.id)}>
              <span className="snav-bot-icon">{t.icon}</span>
              <span className="snav-bot-label">{t.label}</span>
            </button>
          ))}
        </div>,
        document.body
      )}

      {/* Mobile bottom sheet */}
      {createPortal(
        <>
          <div className={`anav-sheet-overlay${profileOpen ? " open" : ""}`} onClick={() => setProfileOpen(false)} />
          <div ref={sheetRef} className={`anav-sheet${profileOpen ? " open" : ""}`}>
            <div className="anav-sheet-handle" />
            <ProfilePanelContent
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

export default Navbar;
