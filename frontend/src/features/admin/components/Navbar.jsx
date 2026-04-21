import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hook/useAuth";
import { gsap } from "gsap";

const Navbar = ({ activeTab, onTabChange }) => {
  const user = useSelector((state) => state.auth.user);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef(null);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef({});

  // Admin Specific Tabs
  const tabs = [
    {
      id: "system",
      label: "System",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: "20px", height: "20px" }}
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      id: "all_orders",
      label: "All Orders",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: "20px", height: "20px" }}
        >
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: "20px", height: "20px" }}
        >
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
        </svg>
      ),
    },
    {
      id: "bosch",
      label: "Bosch",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: "20px", height: "20px" }}
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      id: "orders",
      label: "Punch",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: "20px", height: "20px" }}
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      ),
    },
  ];

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
    : "AD";

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

        .snav-brand {
          display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none;
        }
        .snav-logo {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 80%, #000));
          display: grid; place-items: center;
          box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary) 30%, transparent);
        }
        .snav-logo svg {
          width: 18px; height: 18px; fill: var(--color-on-primary);
        }
        .snav-brand-name {
          font-family: 'Bricolage Grotesque', sans-serif; font-size: 19px; font-weight: 800;
          color: var(--color-on-surface); letter-spacing: -0.03em;
        }
        .snav-brand-name span { color: var(--color-primary); }

        .snav-tabs {
          display: flex; align-items: center; gap: 4px;
          position: relative; height: 100%;
        }
        .snav-tab {
          display: flex; align-items: center; gap: 8px;
          padding: 0 16px; height: 100%; border: none; background: transparent;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600;
          color: var(--color-on-surface-variant); cursor: pointer;
          transition: color 0.2s; position: relative; z-index: 1; outline: none;
        }
        .snav-tab:hover { color: var(--color-on-surface); }
        .snav-tab.active { color: var(--color-primary); }
        .snav-tab-icon {
          display: grid; place-items: center;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        .snav-tab.active .snav-tab-icon { transform: scale(1.1); }

        .snav-tab-indicator {
          position: absolute; bottom: 0; left: 0; height: 3px;
          background: var(--color-primary); border-radius: 3px 3px 0 0;
          z-index: 2; pointer-events: none;
        }

        .snav-right { display: flex; align-items: center; gap: 16px; }
        .snav-user-info { display: flex; flex-direction: column; align-items: flex-end; }
        .snav-user-name { font-size: 13.5px; font-weight: 700; color: var(--color-on-surface); }
        .snav-user-email { font-size: 11px; font-weight: 500; color: var(--color-outline); }

        .snav-avatar-wrap { position: relative; }
        .snav-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--color-surface-container-high); border: 2px solid var(--color-outline-variant);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: var(--color-on-surface);
          cursor: pointer; position: relative;
        }
        .snav-avatar-pulse {
          position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; border-radius: 50%;
          background: #22c55e; border: 2px solid var(--color-surface-container-lowest);
        }

        .snav-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          width: 220px; background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant); border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1); padding: 6px; z-index: 100;
          animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideDown { 0% { opacity: 0; transform: translateY(-8px) scale(0.96); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .snav-drop-header { padding: 12px; border-bottom: 1px solid var(--color-outline-variant); margin-bottom: 4px; }
        .snav-drop-name { font-weight: 700; font-size: 14px; color: var(--color-on-surface); }
        .snav-drop-email { font-size: 12px; color: var(--color-outline); margin-top: 2px; }
        .snav-drop-item {
          width: 100%; border: none; background: transparent; padding: 10px 12px; border-radius: 8px; font-size: 13.5px;
          text-align: left; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.15s; font-weight: 500;
        }
        .snav-drop-item:hover { background: var(--color-surface-container); }
        .snav-drop-item.danger { color: #ba1a1a; }
        .snav-drop-item.danger:hover { background: #ffdad6; }
        .snav-drop-divider { height: 1px; background: var(--color-outline-variant); margin: 6px 0; }

        .snav-bottom { display: none; }

        @media (max-width: 768px) {
          .snav-inner { padding: 0 16px; height: 56px; }
          .snav-tabs { display: none; }
          .snav-user-info { display: none; }
          .snav-tab-indicator { display: none; }

          .snav-bottom {
            display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
            background: var(--color-surface-container-lowest, #fff);
            backdrop-filter: blur(20px) saturate(1.5);
            -webkit-backdrop-filter: blur(20px) saturate(1.5);
            border-top: 1px solid var(--color-outline-variant, #e0e0e0);
            box-shadow: 0 -4px 24px rgba(0,0,0,0.10);
            padding: 0 4px; padding-bottom: env(safe-area-inset-bottom, 0px);
            justify-content: space-around; align-items: stretch;
          }

          .snav-bot-tab {
            flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
            padding: 10px 4px 10px; border: none; background: transparent; cursor: pointer; border-radius: 0;
            -webkit-tap-highlight-color: transparent; position: relative; min-height: 56px;
          }
          .snav-bot-tab:active { background: color-mix(in srgb, var(--color-primary) 10%, transparent); }

          .snav-bot-tab.active::before {
            content: ''; position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
            width: 48px; height: 32px; border-radius: 16px;
            background: color-mix(in srgb, var(--color-primary) 14%, transparent);
          }

          .snav-bot-icon { display: grid; place-items: center; color: var(--color-on-surface-variant); position: relative; z-index: 1; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.25s ease; }
          .snav-bot-tab.active .snav-bot-icon { transform: translateY(-2px) scale(1.1); color: var(--color-primary); }

          .snav-bot-label { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.01em; color: var(--color-on-surface-variant); transition: color 0.2s ease; position: relative; z-index: 1; }
          .snav-bot-tab.active .snav-bot-label { color: var(--color-primary); }
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
              <svg viewBox="0 0 16 16">
                <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" />
              </svg>
            </div>
            <span className="snav-brand-name">
              Admin<span>Portal</span>
            </span>
          </div>

          <div className="snav-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                ref={(el) => (tabRefs.current[t.id] = el)}
                className={`snav-tab${activeTab === t.id ? " active" : ""}`}
                onClick={() => onTabChange(t.id)}
              >
                <span className="snav-tab-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
            <div className="snav-tab-indicator" ref={indicatorRef} />
          </div>

          <div className="snav-right">
            <div className="snav-user-info">
              <div className="snav-user-name">
                {user?.name || "Administrator"}
              </div>
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
                      {user?.name || "Administrator"}
                    </div>
                    <div className="snav-drop-email">{user?.email || ""}</div>
                  </div>
                  <button
                    className="snav-drop-item danger"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {createPortal(
        <div className="snav-bottom">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`snav-bot-tab${activeTab === t.id ? " active" : ""}`}
              onClick={() => onTabChange(t.id)}
            >
              <span className="snav-bot-icon">{t.icon}</span>
              <span className="snav-bot-label">{t.label}</span>
            </button>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
};

export default Navbar;
