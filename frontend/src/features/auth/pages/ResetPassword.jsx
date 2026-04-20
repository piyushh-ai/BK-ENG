import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { gsap } from "gsap";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const cardRef = useRef(null);
  const badgeRef = useRef(null);
  const accentRef = useRef(null);
  const headingRef = useRef(null);
  const fieldsRef = useRef(null);
  const btnRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const els = [
      badgeRef.current,
      headingRef.current,
      btnRef.current,
      footerRef.current,
    ];
    gsap.set(els, { opacity: 0, y: 20 });
    gsap.set(accentRef.current, { scaleX: 0, transformOrigin: "left" });
    gsap.set(fieldsRef.current?.querySelectorAll(".field-group"), { opacity: 0, y: 16 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(cardRef.current, { opacity: 1, duration: 0 })
      .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.45 })
      .to(
        accentRef.current,
        { scaleX: 1, duration: 0.45, ease: "expo.out" },
        "-=0.2",
      )
      .to(headingRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to(fieldsRef.current?.querySelectorAll(".field-group"), { opacity: 1, y: 0, duration: 0.38, stagger: 0.08 }, "-=0.22")
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.38 }, "-=0.22")
      .to(footerRef.current, { opacity: 1, y: 0, duration: 0.32 }, "-=0.18");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      gsap.to(cardRef.current, { x: [-6, 6, -5, 5, -3, 3, 0], duration: 0.4 });
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
      await resetPassword({ otp, newPassword });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
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
          background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 52px 52px;
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
          box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);
          padding: 44px 40px 36px;
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
        .lg-badge-dot { width: 7px; height: 7px; background: var(--color-primary); border-radius: 50%; }
        .lg-badge-text { font-size: 10.5px; font-weight: 600; color: var(--color-on-surface-variant); letter-spacing: 0.07em; text-transform: uppercase; }
        .lg-accent { width: 32px; height: 3px; background: var(--color-primary); border-radius: 2px; margin-bottom: 12px; }
        .lg-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: 30px; font-weight: 800; color: var(--color-on-surface); letter-spacing: -1px; line-height: 1.1; margin-bottom: 8px; }
        .lg-sub { font-size: 14px; color: var(--color-on-surface-variant); line-height: 1.5; margin-bottom: 32px; }
        
        .field-group { margin-bottom: 16px; }
        .field-label { display: block; font-size: 10.5px; font-weight: 600; color: var(--color-outline); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 7px; }
        .field-input { width: 100%; padding: 12px 14px; background: var(--color-surface-container-low); border: 1.5px solid transparent; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--color-on-surface); outline: none; transition: all 0.2s; }
        .field-input::placeholder { color: var(--color-outline); }
        .field-input:focus { background: var(--color-surface-container-lowest); border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-fixed-dim); }
        
        .lg-checkbox-wrap { margin-top: -6px; margin-bottom: 18px; display: flex; }
        .lg-checkbox-label { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; font-weight: 500; color: var(--color-on-surface-variant); user-select: none; }
        .lg-checkbox-label:hover { color: var(--color-on-surface); }
        .lg-checkbox { width: 15px; height: 15px; cursor: pointer; accent-color: var(--color-primary); }

        .lg-submit { width: 100%; margin-top: 10px; padding: 15px 20px; background: var(--color-primary); color: var(--color-on-primary); border: none; border-radius: 10px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: -0.2px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s, transform 0.2s, box-shadow 0.2s; }
        .lg-submit:hover:not(:disabled) { background: var(--color-primary-container); color: var(--color-on-primary-container); transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,37,66,0.22); }
        .lg-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .lg-error { font-size: 12px; color: var(--color-on-error-container); background: var(--color-error-container); border: 1px solid var(--color-error); border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .lg-error-dot { width: 6px; height: 6px; background: var(--color-error); border-radius: 50%; flex-shrink: 0; }
        
        .lg-success { font-size: 13px; color: #14532d; background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; padding: 16px; margin-bottom: 16px; text-align: center; font-weight: 500;}

        .lg-arrow-box { width: 20px; height: 20px; background: rgba(255,255,255,0.15); border-radius: 5px; display: grid; place-items: center; font-size: 13px; }
        .lg-divider { margin: 28px 0 20px; display: flex; align-items: center; gap: 12px; }
        .lg-divider-line { flex: 1; height: 1px; background: var(--color-outline-variant); }
        .lg-footer-text { font-size: 13px; color: var(--color-on-surface-variant); text-align: center; }
        .lg-footer-link { color: var(--color-primary); font-weight: 600; text-decoration: none; margin-left: 4px; }
        .lg-footer-link:hover { text-decoration: underline; }
        .lg-meta { margin-top: 18px; display: flex; justify-content: space-between; }
        .lg-meta-text { font-size: 10px; color: var(--color-outline); line-height: 1.7; font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="lg-root">
        <nav className="lg-nav">
          <Link to="/" className="lg-brand">
            <div className="lg-brand-icon">
              <svg viewBox="0 0 14 14">
                <rect x="1" y="1" width="5" height="5" rx="1" />
                <rect x="8" y="1" width="5" height="5" rx="1" />
                <rect x="1" y="8" width="5" height="5" rx="1" />
                <rect x="8" y="8" width="5" height="5" rx="1" />
              </svg>
            </div>
            <span className="lg-brand-name">B.K Engineering</span>
          </Link>
        </nav>

        <main className="lg-main">
          <div className="lg-wrap">
            <div ref={cardRef} className="lg-card">
              <div ref={badgeRef}>
                <div className="lg-badge">
                  <div className="lg-badge-dot" />
                  <span className="lg-badge-text">Update Credentials</span>
                </div>
              </div>

              <div ref={accentRef} className="lg-accent" />

              <div ref={headingRef}>
                <h1 className="lg-title">New Password</h1>
                <p className="lg-sub">
                  Secure your account by choosing a strong, unique password.
                </p>
              </div>

              {success ? (
                <div className="lg-success">
                  Your password has been successfully updated. Redirecting to login...
                </div>
              ) : (
                <form ref={fieldsRef} onSubmit={handleSubmit}>
                  {error && (
                    <div className="lg-error">
                      <div className="lg-error-dot" />
                      {error}
                    </div>
                  )}
                  
                  <div className="field-group">
                    <label className="field-label" htmlFor="lg-token">
                      6-Digit OTP
                    </label>
                    <input
                      className="field-input"
                      id="lg-token"
                      type="text"
                      placeholder="Enter the OTP received in email"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label" htmlFor="lg-pass">
                      New Password
                    </label>
                    <input
                      className="field-input"
                      id="lg-pass"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label" htmlFor="lg-confirm">
                      Confirm Password
                    </label>
                    <input
                      className="field-input"
                      id="lg-confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field-group lg-checkbox-wrap">
                    <label className="lg-checkbox-label">
                      <input 
                        type="checkbox" 
                        className="lg-checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <span>Show Password</span>
                    </label>
                  </div>

                  <div ref={btnRef}>
                    <button
                      className="lg-submit"
                      type="submit"
                      disabled={isLoading}
                    >
                      <span>{isLoading ? "Updating..." : "Update Password"}</span>
                      {!isLoading && <div className="lg-arrow-box">→</div>}
                    </button>
                  </div>
                </form>
              )}

              <div ref={footerRef}>
                <div className="lg-divider">
                  <div className="lg-divider-line" />
                </div>
                <p className="lg-footer-text">
                  Remembered your password?
                  <Link to="/login" className="lg-footer-link">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>

            <div className="lg-meta">
              <span className="lg-meta-text">
                REF: 2026-AUTH-SECURE
              </span>
              <span className="lg-meta-text" style={{ textAlign: "right" }}>
                AES-256-GCM
              </span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ResetPassword;
