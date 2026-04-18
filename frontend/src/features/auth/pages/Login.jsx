import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { gsap } from "gsap";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cardRef = useRef(null);
  const badgeRef = useRef(null);
  const accentRef = useRef(null);
  const headingRef = useRef(null);
  const field1Ref = useRef(null);
  const field2Ref = useRef(null);
  const btnRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const els = [badgeRef.current, headingRef.current, field1Ref.current, field2Ref.current, btnRef.current, footerRef.current];
    gsap.set(els, { opacity: 0, y: 20 });
    gsap.set(accentRef.current, { scaleX: 0, transformOrigin: "left" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(cardRef.current, { opacity: 1, duration: 0 })
      .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.45 })
      .to(accentRef.current, { scaleX: 1, duration: 0.45, ease: "expo.out" }, "-=0.2")
      .to(headingRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to(field1Ref.current, { opacity: 1, y: 0, duration: 0.38 }, "-=0.22")
      .to(field2Ref.current, { opacity: 1, y: 0, duration: 0.38 }, "-=0.28")
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.38 }, "-=0.22")
      .to(footerRef.current, { opacity: 1, y: 0, duration: 0.32 }, "-=0.18");
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
    gsap.to(cardRef.current, { rotateY: x, rotateX: -y, duration: 0.55, ease: "power2.out", transformPerspective: 900 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    gsap.to(btnRef.current, { scale: 0.97, duration: 0.08, yoyo: true, repeat: 1 });
    setIsLoading(true);
    try { await login({ email, password }); }
    finally { setIsLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lg-root {
          min-height: 100svh;
          background: var(--color-background);
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .lg-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: linear-gradient(var(--color-outline-variant) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-outline-variant) 1px, transparent 1px);
          background-size: 52px 52px;
          opacity: 0.18;
          pointer-events: none;
        }
        .lg-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          background: color-mix(in srgb, var(--color-background) 88%, transparent);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--color-outline-variant);
        }
        .lg-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .lg-brand-icon {
          width: 32px;
          height: 32px;
          background: var(--color-primary);
          border-radius: 8px;
          display: grid;
          place-items: center;
        }
        .lg-brand-icon svg {
          width: 14px;
          height: 14px;
          fill: var(--color-on-primary-container);
        }
        .lg-brand-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: var(--color-on-surface);
          letter-spacing: -0.4px;
        }
        .lg-nav-btn {
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          color: var(--color-on-surface-variant);
          text-decoration: none;
          padding: 8px 18px;
          border: 1.5px solid var(--color-outline-variant);
          border-radius: 8px;
          transition: all 0.2s;
          letter-spacing: 0.01em;
        }
        .lg-nav-btn:hover {
          color: var(--color-primary);
          border-color: var(--color-primary);
          background: var(--color-surface-container-low);
        }
        .lg-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px 64px;
          position: relative;
          z-index: 1;
        }
        .lg-wrap {
          width: 100%;
          max-width: 420px;
        }
        .lg-card {
          background: var(--color-surface-container-lowest);
          border-radius: 20px;
          border: 1px solid var(--color-outline-variant);
          box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 16px 40px rgba(0,37,66,0.1);
          padding: 44px 40px 36px;
          will-change: transform;
        }
        .lg-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px 5px 8px;
          background: var(--color-surface-container);
          border: 1px solid var(--color-outline-variant);
          border-radius: 20px;
          margin-bottom: 28px;
        }
        .lg-badge-dot {
          width: 7px;
          height: 7px;
          background: var(--color-primary);
          border-radius: 50%;
        }
        .lg-badge-text {
          font-size: 10.5px;
          font-weight: 600;
          color: var(--color-on-surface-variant);
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        .lg-accent {
          width: 32px;
          height: 3px;
          background: var(--color-primary);
          border-radius: 2px;
          margin-bottom: 12px;
        }
        .lg-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 34px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -1.2px;
          line-height: 1.05;
          margin-bottom: 8px;
        }
        .lg-sub {
          font-size: 14px;
          color: var(--color-on-surface-variant);
          line-height: 1.5;
          margin-bottom: 36px;
        }
        .field-group {
          margin-bottom: 18px;
        }
        .field-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 7px;
        }
        .field-label {
          font-size: 10.5px;
          font-weight: 600;
          color: var(--color-outline);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .field-forgot {
          font-size: 10.5px;
          font-weight: 600;
          color: var(--color-primary);
          text-decoration: none;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .field-forgot:hover { text-decoration: underline; }
        .field-input {
          width: 100%;
          padding: 12px 14px;
          background: var(--color-surface-container-low);
          border: 1.5px solid transparent;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--color-on-surface);
          outline: none;
          transition: all 0.2s;
        }
        .field-input::placeholder { color: var(--color-outline); }
        .field-input:focus {
          background: var(--color-surface-container-lowest);
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-fixed-dim);
        }
        .lg-submit {
          width: 100%;
          margin-top: 10px;
          padding: 15px 20px;
          background: var(--color-primary);
          color: var(--color-on-primary);
          border: none;
          border-radius: 10px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          will-change: transform;
        }
        .lg-submit:hover:not(:disabled) {
          background: var(--color-primary-container);
          color: var(--color-on-primary-container);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,37,66,0.22);
        }
        .lg-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .lg-arrow-box {
          width: 20px;
          height: 20px;
          background: rgba(255,255,255,0.15);
          border-radius: 5px;
          display: grid;
          place-items: center;
          font-size: 13px;
        }
        .lg-divider {
          margin: 28px 0 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .lg-divider-line {
          flex: 1;
          height: 1px;
          background: var(--color-outline-variant);
        }
        .lg-footer-text {
          font-size: 13px;
          color: var(--color-on-surface-variant);
          text-align: center;
        }
        .lg-footer-link {
          color: var(--color-primary);
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
        }
        .lg-footer-link:hover { text-decoration: underline; }
        .lg-meta {
          margin-top: 18px;
          display: flex;
          justify-content: space-between;
        }
        .lg-meta-text {
          font-size: 10px;
          color: var(--color-outline);
          line-height: 1.7;
          font-family: 'DM Sans', sans-serif;
        }
        @media (max-width: 480px) {
          .lg-nav { padding: 14px 18px; }
          .lg-card { padding: 32px 24px 28px; border-radius: 16px; }
          .lg-title { font-size: 28px; }
        }
      `}</style>

      <div className="lg-root">
        <nav className="lg-nav">
          <div className="lg-brand">
            <div className="lg-brand-icon">
              <svg viewBox="0 0 14 14"><rect x="1" y="1" width="5" height="5" rx="1"/><rect x="8" y="1" width="5" height="5" rx="1"/><rect x="1" y="8" width="5" height="5" rx="1"/><rect x="8" y="8" width="5" height="5" rx="1"/></svg>
            </div>
            <span className="lg-brand-name">B.K Engineering</span>
          </div>
          <Link to="/register" className="lg-nav-btn">Register →</Link>
        </nav>

        <main className="lg-main">
          <div className="lg-wrap">
            <div
              ref={cardRef}
              className="lg-card"
              style={{ opacity: 0 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div ref={badgeRef}>
                <div className="lg-badge">
                  <div className="lg-badge-dot" />
                  <span className="lg-badge-text">Access Portal</span>
                </div>
              </div>

              <div ref={accentRef} className="lg-accent" />

              <div ref={headingRef}>
                <h1 className="lg-title">Sign In</h1>
                <p className="lg-sub">Welcome back. Enter your credentials to continue.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div ref={field1Ref} className="field-group">
                  <label className="field-label" htmlFor="lg-email">Email Address</label>
                  <input
                    className="field-input"
                    id="lg-email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div ref={field2Ref} className="field-group">
                  <div className="field-top">
                    <label className="field-label" htmlFor="lg-pass">Password</label>
                    <a href="#" className="field-forgot">Forgot?</a>
                  </div>
                  <input
                    className="field-input"
                    id="lg-pass"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div ref={btnRef} style={{ opacity: 0 }}>
                  <button className="lg-submit" type="submit" disabled={isLoading}>
                    <span>{isLoading ? "Signing in..." : "Sign In"}</span>
                    {!isLoading && <div className="lg-arrow-box">→</div>}
                  </button>
                </div>
              </form>

              <div ref={footerRef} style={{ opacity: 0 }}>
                <div className="lg-divider">
                  <div className="lg-divider-line" />
                </div>
                <p className="lg-footer-text">
                  New to the firm?
                  <Link to="/register" className="lg-footer-link">Register</Link>
                </p>
              </div>
            </div>

            <div className="lg-meta">
              <span className="lg-meta-text">REF: 2026-AUTH-SECURE<br />GATEWAY V1</span>
              <span className="lg-meta-text" style={{ textAlign: "right" }}>AES-256-GCM<br />STATUS: ACTIVE</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;