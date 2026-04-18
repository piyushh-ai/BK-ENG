import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { gsap } from "gsap";

const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const leftRef = useRef(null);
  const cardRef = useRef(null);
  const badgeRef = useRef(null);
  const accentRef = useRef(null);
  const headingRef = useRef(null);
  const fieldsRef = useRef(null);
  const btnRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.set([badgeRef.current, headingRef.current, btnRef.current], {
      opacity: 0,
      y: 20,
    });
    gsap.set(accentRef.current, { scaleX: 0, transformOrigin: "left" });
    gsap.set(fieldsRef.current?.querySelectorAll(".rg-field"), {
      opacity: 0,
      y: 16,
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (leftRef.current) {
      gsap.set(leftRef.current.querySelectorAll(".stat-card"), {
        opacity: 0,
        y: 20,
      });
      tl.to(
        leftRef.current.querySelectorAll(".stat-card"),
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.1,
        },
        0.2,
      );
    }

    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.3)
      .to(
        accentRef.current,
        { scaleX: 1, duration: 0.45, ease: "expo.out" },
        "-=0.2",
      )
      .to(headingRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to(
        fieldsRef.current?.querySelectorAll(".rg-field"),
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.08,
        },
        "-=0.25",
      )
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.35 }, "-=0.15");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      gsap.to(cardRef.current, {
        x: [-6, 6, -5, 5, -3, 3, 0],
        duration: 0.4,
        ease: "none",
      });
      return;
    }
    gsap.to(btnRef.current, {
      scale: 0.97,
      duration: 0.08,
      yoyo: true,
      repeat: 1,
    });
    setIsLoading(true);
    try {
      await register({ name, email, password });
    } catch (err) {
      setError(err.message);
      gsap.to(cardRef.current, {
        x: [-6, 6, -5, 5, -3, 3, 0],
        duration: 0.4,
        ease: "none",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { label: "Protocol", value: "AES-256" },
    { label: "Uptime", value: "99.9%" },
    { label: "Access", value: "Multi-Layer" },
    { label: "Compliance", value: "ISO 27001" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rg-root {
          min-height: 100svh;
          background: var(--color-background);
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }
        .rg-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }
        .rg-nav {
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
        .rg-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rg-brand-icon {
          width: 32px;
          height: 32px;
          background: var(--color-primary);
          border-radius: 8px;
          display: grid;
          place-items: center;
        }
        .rg-brand-icon svg {
          width: 14px;
          height: 14px;
          fill: var(--color-on-primary-container);
        }
        .rg-brand-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: var(--color-on-surface);
          letter-spacing: -0.4px;
        }
        .rg-nav-link {
          font-size: 12px;
          font-weight: 500;
          color: var(--color-on-surface-variant);
          text-decoration: none;
          padding: 8px 18px;
          border: 1.5px solid var(--color-outline-variant);
          border-radius: 8px;
          transition: all 0.2s;
        }
        .rg-nav-link:hover {
          color: var(--color-on-surface);
          border-color: var(--color-on-surface);
          background: var(--color-surface-container-low);
        }
        .rg-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px 64px;
          position: relative;
          z-index: 1;
        }
        .rg-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          width: 100%;
          max-width: 960px;
        }
        @media (min-width: 900px) {
          .rg-grid { grid-template-columns: 1fr 1fr; align-items: start; gap: 48px; }
          .rg-left { display: flex !important; }
        }
        .rg-left {
          display: none;
          flex-direction: column;
          gap: 24px;
          padding-top: 16px;
        }
        .rg-left-eyebrow {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .rg-left-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -1.5px;
          line-height: 1.05;
        }
        .rg-left-title span { color: var(--color-primary); }
        .rg-left-desc {
          font-size: 15px;
          color: var(--color-on-surface-variant);
          line-height: 1.65;
          max-width: 340px;
        }
        .rg-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 8px;
        }
        .stat-card {
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 12px;
          padding: 16px 18px;
        }
        .stat-label {
          font-size: 10px;
          font-weight: 600;
          color: var(--color-on-surface-variant);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .stat-value {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--color-on-surface);
          letter-spacing: -0.3px;
        }
        .stat-card:hover .stat-value { color: var(--color-primary); transition: color 0.2s; }


        .rg-card {
          background: var(--color-surface-container-lowest);
          border-radius: 20px;
          border: 1px solid var(--color-outline-variant);
          box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);
          padding: 44px 40px 36px;
        }
        .rg-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px 5px 8px;
          background: var(--color-surface-container);
          border: 1px solid var(--color-outline-variant);
          border-radius: 20px;
          margin-bottom: 28px;
        }
        .rg-badge-dot { width: 7px; height: 7px; background: var(--color-primary); border-radius: 50%; }
        .rg-badge-text {
          font-size: 10.5px;
          font-weight: 600;
          color: var(--color-on-surface-variant);
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        .rg-accent {
          width: 32px;
          height: 3px;
          background: var(--color-primary);
          border-radius: 2px;
          margin-bottom: 12px;
        }
        .rg-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -1px;
          line-height: 1.1;
          margin-bottom: 6px;
        }
        .rg-sub {
          font-size: 14px;
          color: var(--color-on-surface-variant);
          line-height: 1.5;
          margin-bottom: 32px;
        }
        .rg-field {
          margin-bottom: 16px;
        }
        .rg-label {
          display: block;
          font-size: 10.5px;
          font-weight: 600;
          color: var(--color-outline);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .rg-input {
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
        .rg-input::placeholder { color: var(--color-outline); }
        .rg-input:focus {
          background: var(--color-surface-container-lowest);
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-fixed-dim);
        }
        .rg-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .rg-error {
          font-size: 12px;
          color: var(--color-on-error-container);
          background: var(--color-error-container);
          border: 1px solid var(--color-error);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rg-error-dot { width: 6px; height: 6px; background: var(--color-error); border-radius: 50%; flex-shrink: 0; }
        .rg-submit {
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
        .rg-submit:hover:not(:disabled) {
          color: var(--color-on-primary-container);
          background: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,37,66,0.22);
        }
        .rg-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .rg-arrow-box {
          width: 20px;
          height: 20px;
          background: rgba(255,255,255,0.15);
          border-radius: 5px;
          display: grid;
          place-items: center;
          font-size: 13px;
        }
        .rg-divider {
          margin: 24px 0 18px;
          height: 1px;
          background: var(--color-outline-variant);
        }
        .rg-footer-text {
          font-size: 13px;
          color: var(--color-on-surface-variant);
          text-align: center;
        }
        .rg-footer-link {
          color: var(--color-primary);
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
        }
        .rg-footer-link:hover { text-decoration: underline; }
        .rg-footer-bar {
          padding: 20px 32px;
          border-top: 1px solid var(--color-outline-variant);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          position: relative;
          z-index: 1;
        }
        .rg-footer-copy {
          font-size: 11px;
          color: var(--color-on-surface-variant);
          letter-spacing: 0.04em;
        }
        .rg-footer-links {
          display: flex;
          gap: 20px;
        }
        .rg-footer-link-small {
          font-size: 11px;
          color: var(--color-outline);
          text-decoration: none;
          transition: color 0.15s;
        }
        .rg-footer-link-small:hover { color: var(--color-on-surface-variant); }
        @media (max-width: 480px) {
          .rg-nav { padding: 14px 18px; }
          .rg-card { padding: 32px 22px 28px; border-radius: 16px; }
          .rg-title { font-size: 24px; }
          .rg-row { grid-template-columns: 1fr; }
          .rg-footer-bar { padding: 16px 18px; }
        }
      `}</style>

      <div className="rg-root">
        {/* Nav */}
        <nav className="rg-nav">
          <div className="rg-brand">
            <div className="rg-brand-icon">
              <svg viewBox="0 0 14 14">
                <rect x="1" y="1" width="5" height="5" rx="1" />
                <rect x="8" y="1" width="5" height="5" rx="1" />
                <rect x="1" y="8" width="5" height="5" rx="1" />
                <rect x="8" y="8" width="5" height="5" rx="1" />
              </svg>
            </div>
            <span className="rg-brand-name">B.K Engineering</span>
          </div>
          <Link to="/login" className="rg-nav-link">
            Sign In →
          </Link>
        </nav>

        <main className="rg-main">
          <div className="rg-grid">
            {/* Left panel */}
            <div ref={leftRef} className="rg-left">
              <p className="rg-left-eyebrow">Project Infrastructure Alpha</p>
              <h1 className="rg-left-title">
                Engineering
                <br />
                <span>Precision</span>
                <br />
                for the Next Era.
              </h1>
              <p className="rg-left-desc">
                Join B.K Engineering's central node. Secure access to structural
                blueprints, technical specifications, and collaborative
                logistics.
              </p>
              <div ref={statsRef} className="rg-stats">
                {stats.map((s, i) => (
                  <div key={i} className="stat-card">
                    <p className="stat-label">{s.label}</p>
                    <p className="stat-value">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card */}
            <div>
              <div ref={cardRef} className="rg-card">
                <div ref={badgeRef} style={{ opacity: 0 }}>
                  <div className="rg-badge">
                    <div className="rg-badge-dot" />
                    <span className="rg-badge-text">Initialize Account</span>
                  </div>
                </div>

                <div
                  ref={accentRef}
                  className="rg-accent"
                  style={{ transform: "scaleX(0)" }}
                />

                <div ref={headingRef} style={{ opacity: 0 }}>
                  <h2 className="rg-title">Create Account</h2>
                  <p className="rg-sub">
                    Create your professional credentials to proceed.
                  </p>
                </div>

                <form ref={fieldsRef} onSubmit={handleSubmit}>
                  {error && (
                    <div className="rg-error">
                      <div className="rg-error-dot" />
                      {error}
                    </div>
                  )}

                  <div className="rg-field">
                    <label className="rg-label" htmlFor="rg-name">
                      Full Name
                    </label>
                    <input
                      className="rg-input"
                      id="rg-name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="rg-field">
                    <label className="rg-label" htmlFor="rg-email">
                      Professional Email
                    </label>
                    <input
                      className="rg-input"
                      id="rg-email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="rg-row">
                    <div className="rg-field">
                      <label className="rg-label" htmlFor="rg-pass">
                        Password
                      </label>
                      <input
                        className="rg-input"
                        id="rg-pass"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="rg-field">
                      <label className="rg-label" htmlFor="rg-confirm">
                        Confirm
                      </label>
                      <input
                        className="rg-input"
                        id="rg-confirm"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div ref={btnRef} style={{ opacity: 0 }}>
                    <button
                      className="rg-submit"
                      type="submit"
                      disabled={isLoading}
                    >
                      <span>
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </span>
                      {!isLoading && <div className="rg-arrow-box">→</div>}
                    </button>
                  </div>
                </form>

                <div className="rg-divider" />
                <p className="rg-footer-text">
                  Already an engineer?
                  <Link to="/login" className="rg-footer-link">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="rg-footer-bar">
          <span className="rg-footer-copy">
            © 2026 B.K Engineering. Precision in Infrastructure.
          </span>
          <div className="rg-footer-links">
            <a href="#" className="rg-footer-link-small">
              Support
            </a>
            <a href="#" className="rg-footer-link-small">
              Legal
            </a>
            <a href="#" className="rg-footer-link-small">
              Safety Protocols
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;
