import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hook/useAuth";
import { useTheme } from "../../../app/ThemeProvider";
import { gsap } from "gsap";

/* ── Theme Toggle Switch ── */
const ThemeToggle = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    style={{
      position: "relative",
      width: 56,
      height: 30,
      borderRadius: 15,
      border: "none",
      background: theme === "dark" ? "var(--color-primary)" : "var(--color-surface-container-high)",
      cursor: "pointer",
      transition: "background 0.3s ease",
      flexShrink: 0,
      padding: 0,
    }}
  >
    <span style={{
      position: "absolute",
      top: 3,
      left: theme === "dark" ? 29 : 3,
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
    }}>
      {theme === "dark" ? "🌙" : "☀️"}
    </span>
  </button>
);

/* ── Settings Row ── */
const SettingsRow = ({ icon, label, description, children }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    gap: 16,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
      <div style={{
        width: 42,
        height: 42,
        borderRadius: 12,
        background: "var(--color-surface-container)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: 15,
          fontWeight: 600,
          color: "var(--color-on-surface)",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {label}
        </div>
        {description && (
          <div style={{
            fontSize: 12.5,
            color: "var(--color-on-surface-variant)",
            marginTop: 2,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {description}
          </div>
        )}
      </div>
    </div>
    {children}
  </div>
);

/* ── Section Header ── */
const SectionHeader = ({ title }) => (
  <div style={{
    padding: "20px 20px 8px",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--color-outline)",
    fontFamily: "'DM Sans', sans-serif",
  }}>
    {title}
  </div>
);

/* ── Settings Card ── */
const SettingsCard = ({ children }) => (
  <div style={{
    background: "var(--color-surface-container-lowest)",
    border: "1px solid var(--color-outline-variant)",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 12,
  }}>
    {children}
  </div>
);

const SettingsDivider = () => (
  <div style={{ height: 1, background: "var(--color-outline-variant)", margin: "0 20px" }} />
);

/* ══════════════════════════════════════════════
   Main SettingsPage
══════════════════════════════════════════════ */
const SettingsPage = () => {
  const user = useSelector((s) => s.auth.user);
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, []);

  const handleLogout = async () => {
    // Notify native shell
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "LOGOUT" }));
    }
    try { window.localStorage.removeItem("bk_auth_token"); } catch {}
    await logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  const isAdmin = user?.role === "admin";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
        .settings-root {
          max-width: 560px;
          margin: 0 auto;
          padding: 24px 16px 100px;
          font-family: 'DM Sans', sans-serif;
        }
        .settings-page-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -0.6px;
          margin-bottom: 4px;
        }
        .settings-page-sub {
          font-size: 13.5px;
          color: var(--color-on-surface-variant);
          margin-bottom: 28px;
        }
        .settings-avatar-card {
          background: linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, #1e40af));
          border-radius: 22px;
          padding: 24px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }
        .settings-avatar-card::before {
          content: '';
          position: absolute;
          right: -30px;
          top: -30px;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          pointer-events: none;
        }
        .settings-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 2.5px solid rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
        }
        .settings-user-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.3px;
        }
        .settings-user-email {
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          margin-top: 3px;
        }
        .settings-user-role {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 8px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .settings-logout-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 14px;
          background: #fef2f2;
          color: #dc2626;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s;
          border: 1.5px solid #fecaca;
          margin-top: 8px;
        }
        .settings-logout-btn:hover, .settings-logout-btn:active {
          background: #fee2e2;
          transform: scale(0.98);
        }
        [data-theme="dark"] .settings-logout-btn {
          background: rgba(220,38,38,0.12);
          color: #f87171;
          border-color: rgba(220,38,38,0.3);
        }
        [data-theme="dark"] .settings-logout-btn:hover {
          background: rgba(220,38,38,0.2);
        }
        .settings-version {
          text-align: center;
          font-size: 11px;
          color: var(--color-outline);
          margin-top: 20px;
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <div ref={pageRef} className="settings-root">
        {/* Page Title */}
        <h1 className="settings-page-title">Settings</h1>
        <p className="settings-page-sub">Manage your preferences and account</p>

        {/* User Profile Card */}
        <div className="settings-avatar-card">
          <div className="settings-avatar">{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="settings-user-name">{user?.name || "User"}</div>
            <div className="settings-user-email">{user?.email || ""}</div>
            <div className="settings-user-role">
              {isAdmin ? "🛡️ Admin" : "💼 Salesman"}
            </div>
          </div>
        </div>

        {/* Appearance */}
        <SectionHeader title="Appearance" />
        <SettingsCard>
          <SettingsRow
            icon={theme === "dark" ? "🌙" : "☀️"}
            label="Dark Mode"
            description={theme === "dark" ? "Dark theme is active" : "Light theme is active"}
          >
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </SettingsRow>
        </SettingsCard>

        {/* Account */}
        <SectionHeader title="Account" />
        <SettingsCard>
          <SettingsRow
            icon="👤"
            label="Name"
            description={user?.name || "—"}
          />
          <SettingsDivider />
          <SettingsRow
            icon="📧"
            label="Email"
            description={user?.email || "—"}
          />
          <SettingsDivider />
          <SettingsRow
            icon="🔑"
            label="Role"
            description={isAdmin ? "Administrator" : "Sales Representative"}
          />
        </SettingsCard>

        {/* About */}
        <SectionHeader title="About" />
        <SettingsCard>
          <SettingsRow
            icon="📦"
            label="App"
            description="BK Engineering — Stock & Orders"
          />
          <SettingsDivider />
          <SettingsRow
            icon="🔒"
            label="Security"
            description="Sessions are secured with JWT"
          />
        </SettingsCard>

        {/* Logout */}
        <button className="settings-logout-btn" onClick={handleLogout}>
          <span>Sign Out</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>

        <p className="settings-version">BK Eng · v2.0.4</p>
      </div>
    </>
  );
};

export default SettingsPage;
