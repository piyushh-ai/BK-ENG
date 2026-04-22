/**
 * SystemSettings — Stock upload + Team members management
 * Extracted from AdminDashboard.jsx for better maintainability.
 */
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAdmin } from "../hooks/useAdmin";
import { gsap } from "gsap";

const SystemSettings = () => {
  const allSalesUsers = useSelector((s) => s.admin.allSalesUsers);
  const loading       = useSelector((s) => s.admin.loading);
  const uploadStatus  = useSelector((s) => s.admin.uploadStatus);
  const { handleAllSalesUser, handleUpload, handleUpdateRole } = useAdmin();

  const [boschFile,   setBoschFile]   = useState(null);
  const [companyFile, setCompanyFile] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => { handleAllSalesUser(); }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll(".ad-anim");
    gsap.fromTo(els, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.1, onComplete: () => gsap.set(els, { clearProps: "transform" }) });
  }, []);

  const onUpdateStock = async () => {
    if (!boschFile && !companyFile) { alert("Please select at least one file to upload."); return; }
    const formData = new FormData();
    if (boschFile)   formData.append("bosch",   boschFile);
    if (companyFile) formData.append("company", companyFile);
    await handleUpload(formData);
    setBoschFile(null); setCompanyFile(null);
  };

  const toggleRole = async (user) => {
    const newRole = user.role === "admin" ? "sales" : "admin";
    await handleUpdateRole({ _id: user._id, role: newRole });
    handleAllSalesUser();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
        .ad-root{max-width:860px;margin:0 auto;padding:32px 24px 100px;}
        .ad-hero{background:linear-gradient(135deg,var(--color-primary) 0%,color-mix(in srgb,var(--color-primary) 65%,#1e3a5f) 100%);border-radius:24px;padding:32px 28px;color:var(--color-on-primary);margin-bottom:28px;position:relative;overflow:hidden;}
        .ad-hero::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%);pointer-events:none;}
        .ad-hero-eyebrow{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;opacity:0.75;margin-bottom:8px;}
        .ad-hero-title{font-family:'Bricolage Grotesque',sans-serif;font-size:32px;font-weight:800;letter-spacing:-1px;line-height:1.1;margin-bottom:8px;}
        .ad-hero-sub{font-family:'DM Sans',sans-serif;font-size:14px;opacity:0.8;line-height:1.5;}
        .ad-section{background:var(--color-surface-container-lowest);border:1px solid var(--color-outline-variant);border-radius:20px;padding:24px;margin-bottom:20px;}
        .ad-section-title{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;color:var(--color-on-surface);margin-bottom:4px;}
        .ad-section-sub{font-size:12.5px;color:var(--color-on-surface-variant);margin-bottom:20px;font-family:'DM Sans',sans-serif;}
        .ad-upload-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px;}
        .ad-upload-card{border:2px dashed var(--color-outline-variant);border-radius:16px;padding:20px 16px;display:flex;flex-direction:column;align-items:center;gap:10px;position:relative;cursor:pointer;transition:border-color 0.2s,background 0.2s;background:var(--color-surface-container-low);text-align:center;}
        .ad-upload-card.selected{border-color:var(--color-primary);background:color-mix(in srgb,var(--color-primary) 8%,var(--color-surface-container-lowest));}
        .ad-upload-card input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;z-index:10;}
        .ad-upload-icon{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;font-size:20px;background:var(--color-surface-container);transition:background 0.2s;}
        .ad-upload-card.selected .ad-upload-icon{background:var(--color-primary);}
        .ad-upload-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-outline);font-family:'DM Sans',sans-serif;}
        .ad-upload-filename{font-size:12px;font-weight:600;color:var(--color-primary);font-family:'DM Sans',sans-serif;word-break:break-all;line-height:1.3;}
        .ad-upload-hint{font-size:11.5px;color:var(--color-on-surface-variant);font-family:'DM Sans',sans-serif;}
        .ad-upload-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
        .ad-btn-primary{flex:1;min-width:140px;padding:13px 20px;border-radius:12px;border:none;background:var(--color-primary);color:var(--color-on-primary);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:opacity 0.2s,transform 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;}
        .ad-btn-primary:disabled{opacity:0.5;cursor:not-allowed;}
        .ad-btn-primary:not(:disabled):hover{transform:translateY(-2px);}
        .ad-status-badge{font-size:13px;font-weight:600;padding:8px 14px;border-radius:10px;background:#dcfce7;color:#166534;font-family:'DM Sans',sans-serif;}
        .ad-team-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px;gap:12px;}
        .ad-team-count{font-size:12px;font-weight:700;padding:6px 12px;border-radius:20px;background:var(--color-surface-container);color:var(--color-on-surface);font-family:'DM Sans',sans-serif;white-space:nowrap;flex-shrink:0;}
        .ad-users-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;}
        .ad-user-card{background:var(--color-surface-container-lowest);border:1px solid var(--color-outline-variant);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;}
        .ad-user-accent{height:4px;flex-shrink:0;}
        .ad-user-body{padding:16px;flex:1;}
        .ad-user-avatar{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-family:'Bricolage Grotesque',sans-serif;font-size:16px;font-weight:800;margin-bottom:12px;}
        .ad-user-name{font-family:'Bricolage Grotesque',sans-serif;font-size:16px;font-weight:700;color:var(--color-on-surface);margin-bottom:3px;}
        .ad-user-email{font-size:12px;color:var(--color-on-surface-variant);font-family:'DM Sans',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:12px;}
        .ad-user-role-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;font-family:'DM Sans',sans-serif;}
        .ad-user-footer{padding:12px 16px;border-top:1px solid var(--color-outline-variant);display:flex;align-items:center;justify-content:space-between;gap:8px;}
        .ad-user-footer-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-on-surface-variant);font-family:'DM Sans',sans-serif;}
        .ad-toggle-btn{font-size:12px;font-weight:700;padding:7px 14px;border-radius:8px;border:none;background:var(--color-surface-container);color:var(--color-on-surface);font-family:'DM Sans',sans-serif;cursor:pointer;transition:background 0.15s;white-space:nowrap;}
        .ad-toggle-btn:hover{background:var(--color-surface-container-high);}
        @media(max-width:768px){
          .ad-root{padding:0 0 90px;}
          .ad-hero{border-radius:0;padding:24px 16px 20px;margin-bottom:0;}
          .ad-hero-title{font-size:26px;} .ad-hero-sub{font-size:13px;}
          .ad-section{border-radius:0;border-left:none;border-right:none;padding:20px 16px;margin-bottom:8px;}
          .ad-section:first-of-type{border-top:none;margin-top:8px;}
          .ad-upload-grid{grid-template-columns:1fr;gap:10px;}
          .ad-upload-card{flex-direction:row;text-align:left;padding:14px 16px;gap:14px;}
          .ad-upload-card .ad-upload-icon{flex-shrink:0;width:40px;height:40px;}
          .ad-upload-card-text{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;}
          .ad-upload-label{margin-bottom:0;}
          .ad-btn-primary{width:100%;}
          .ad-users-grid{display:flex;overflow-x:auto;gap:10px;padding:4px 0 12px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
          .ad-users-grid::-webkit-scrollbar{display:none;}
          .ad-user-card{min-width:220px;flex-shrink:0;scroll-snap-align:start;}
          .ad-team-header{margin-bottom:12px;}
        }
      `}</style>

      <div className="ad-root" ref={contentRef}>
        <div className="ad-hero ad-anim">
          <div className="ad-hero-eyebrow">Admin Portal</div>
          <h1 className="ad-hero-title">System Dashboard</h1>
          <p className="ad-hero-sub">Manage inventory files and system personnel.</p>
        </div>

        {/* Upload */}
        <div className="ad-section ad-anim">
          <div className="ad-section-title">Update Stock Data</div>
          <div className="ad-section-sub">Upload Excel files to sync latest inventory</div>
          <div className="ad-upload-grid">
            <div className={`ad-upload-card${boschFile ? " selected" : ""}`}>
              <input type="file" accept=".xlsx,.xls" onChange={(e) => setBoschFile(e.target.files[0])} />
              <div className="ad-upload-icon">
                {boschFile ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : "📄"}
              </div>
              <div className="ad-upload-card-text">
                <span className="ad-upload-label">Bosch Stock</span>
                {boschFile ? <span className="ad-upload-filename">{boschFile.name}</span> : <span className="ad-upload-hint">Tap to select .xlsx</span>}
              </div>
            </div>
            <div className={`ad-upload-card${companyFile ? " selected" : ""}`}>
              <input type="file" accept=".xlsx,.xls" onChange={(e) => setCompanyFile(e.target.files[0])} />
              <div className="ad-upload-icon">
                {companyFile ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : "🏢"}
              </div>
              <div className="ad-upload-card-text">
                <span className="ad-upload-label">Company Stock</span>
                {companyFile ? <span className="ad-upload-filename">{companyFile.name}</span> : <span className="ad-upload-hint">Tap to select .xlsx</span>}
              </div>
            </div>
          </div>
          <div className="ad-upload-actions">
            <button className="ad-btn-primary" onClick={onUpdateStock} disabled={loading || (!boschFile && !companyFile)}>
              {loading ? "Processing…" : "⬆ Update Stock"}
            </button>
            {uploadStatus && <span className="ad-status-badge">✓ {uploadStatus}</span>}
          </div>
        </div>

        {/* Team */}
        <div className="ad-section ad-anim">
          <div className="ad-team-header">
            <div>
              <div className="ad-section-title">Team Members</div>
              <div className="ad-section-sub" style={{ marginBottom: 0 }}>Manage access and roles</div>
            </div>
            <span className="ad-team-count">{allSalesUsers?.length || 0} users</span>
          </div>
          <div className="ad-users-grid">
            {allSalesUsers?.map((u) => {
              const isAdmin = u.role === "admin";
              const accent   = isAdmin ? "var(--color-tertiary-fixed-dim, #7c4dff)" : "var(--color-primary)";
              const pillBg   = isAdmin ? "var(--color-tertiary-container)"   : "var(--color-primary-container)";
              const pillColor = isAdmin ? "var(--color-on-tertiary-container)" : "var(--color-on-primary-container)";
              const initials = u.name ? u.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "??";
              return (
                <div className="ad-user-card" key={u._id}>
                  <div className="ad-user-accent" style={{ background: accent }} />
                  <div className="ad-user-body">
                    <div className="ad-user-avatar" style={{ background: `color-mix(in srgb,${accent} 15%,transparent)`, color: accent }}>{initials}</div>
                    <div className="ad-user-name">{u.name}</div>
                    <div className="ad-user-email" title={u.email}>{u.email}</div>
                    <span className="ad-user-role-pill" style={{ background: pillBg, color: pillColor }}>{u.role}</span>
                  </div>
                  <div className="ad-user-footer">
                    <span className="ad-user-footer-label">Access Level</span>
                    <button className="ad-toggle-btn" onClick={() => toggleRole(u)}>→ {isAdmin ? "Sales" : "Admin"}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemSettings;
