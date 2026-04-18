import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navRef = useRef(null);
  const authUser = useSelector((state) => state.auth.user);
  
  console.log(authUser);
  

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 border-b backdrop-blur-xl"
      style={{
        background: "color-mix(in srgb, var(--color-background) 85%, transparent)",
        borderColor: "var(--color-outline-variant)"
      }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-xl grid place-items-center"
          style={{ background: "var(--color-primary)", boxShadow: "0 8px 16px rgba(0, 37, 66, 0.2)" }}
        >
          <svg viewBox="0 0 14 14" className="w-4 h-4 fill-current" style={{ color: "var(--color-on-primary)" }}>
            <rect x="1" y="1" width="5" height="5" rx="1" />
            <rect x="8" y="1" width="5" height="5" rx="1" />
            <rect x="1" y="8" width="5" height="5" rx="1" />
            <rect x="8" y="8" width="5" height="5" rx="1" />
          </svg>
        </div>
        <span 
          className="font-extrabold text-lg tracking-tight" 
          style={{ 
            color: "var(--color-on-surface)",
            fontFamily: "'Bricolage Grotesque', sans-serif"
          }}
        >
          B.K Engineering
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 bg-black/5 px-6 py-2 rounded-full border border-black/5" style={{ background: "var(--color-surface-container-low)", borderColor: "var(--color-outline-variant)" }}>
        {["Dashboard", "Inventory", "Analytics", "Settings"].map((link, i) => (
          <Link
            key={i}
            to="#"
            className="text-sm font-semibold transition-all duration-300"
            style={{ color: "var(--color-on-surface-variant)" }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--color-primary)";
              e.target.style.textShadow = "0 0 12px rgba(0,37,66,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "var(--color-on-surface-variant)";
              e.target.style.textShadow = "none";
            }}
          >
            {link}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-sm font-bold" style={{ color: "var(--color-on-surface)" }}>{authUser?.name}</span>
          <span className="text-xs font-medium" style={{ color: "var(--color-primary)" }}>{authUser?.email}</span>
        </div>
        <div 
          className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 shadow-sm" 
          style={{ borderColor: "var(--color-primary)" }}
        >
          <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${authUser?.name}`} alt="Admin avatar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
