import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{h as t,i as n,l as r,o as i,t as a}from"./react-vendor-DBK4LzoR.js";import{t as o}from"./gsap-vendor-C_Dj5ryB.js";import{t as s}from"./useAuth-DFmjkKFg.js";var c=e(t(),1),l=a(),u=()=>{let{login:e}=s(),[t,a]=(0,c.useState)(``),[u,d]=(0,c.useState)(``),[f,p]=(0,c.useState)(!1),[m,h]=(0,c.useState)(!1),[g,_]=(0,c.useState)(``),v=r();n(e=>e.auth.user);let y=(0,c.useRef)(null),b=(0,c.useRef)(null),x=(0,c.useRef)(null),S=(0,c.useRef)(null),C=(0,c.useRef)(null),w=(0,c.useRef)(null),T=(0,c.useRef)(null),E=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let e=[b.current,S.current,C.current,w.current,T.current,E.current];o.set(e,{opacity:0,y:20}),o.set(x.current,{scaleX:0,transformOrigin:`left`}),o.timeline({defaults:{ease:`power3.out`}}).to(y.current,{opacity:1,duration:0}).to(b.current,{opacity:1,y:0,duration:.45}).to(x.current,{scaleX:1,duration:.45,ease:`expo.out`},`-=0.2`).to(S.current,{opacity:1,y:0,duration:.4},`-=0.2`).to(C.current,{opacity:1,y:0,duration:.38},`-=0.22`).to(w.current,{opacity:1,y:0,duration:.38},`-=0.28`).to(T.current,{opacity:1,y:0,duration:.38},`-=0.22`).to(E.current,{opacity:1,y:0,duration:.32},`-=0.18`)},[]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`style`,{children:`
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
        .field-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .field-input-wrapper .field-input {
          padding-right: 40px;
        }
        .field-icon-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: var(--color-outline);
          cursor: pointer;
          display: grid;
          place-items: center;
          padding: 4px;
        }
        .field-icon-btn:hover {
          color: var(--color-on-surface);
        }
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
        .lg-error {
          font-size: 12px;
          color: var(--color-on-error-container, #ba1a1a);
          background: var(--color-error-container, #ffdad6);
          border: 1px solid var(--color-error, #ba1a1a);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lg-error-dot { width: 6px; height: 6px; background: var(--color-error, #ba1a1a); border-radius: 50%; flex-shrink: 0; }
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
      `}),(0,l.jsxs)(`div`,{className:`lg-root`,children:[(0,l.jsxs)(`nav`,{className:`lg-nav`,children:[(0,l.jsxs)(`div`,{className:`lg-brand`,children:[(0,l.jsx)(`div`,{className:`lg-brand-icon`,children:(0,l.jsxs)(`svg`,{viewBox:`0 0 14 14`,children:[(0,l.jsx)(`rect`,{x:`1`,y:`1`,width:`5`,height:`5`,rx:`1`}),(0,l.jsx)(`rect`,{x:`8`,y:`1`,width:`5`,height:`5`,rx:`1`}),(0,l.jsx)(`rect`,{x:`1`,y:`8`,width:`5`,height:`5`,rx:`1`}),(0,l.jsx)(`rect`,{x:`8`,y:`8`,width:`5`,height:`5`,rx:`1`})]})}),(0,l.jsx)(`span`,{className:`lg-brand-name`,children:`B.K Engineering`})]}),(0,l.jsx)(i,{to:`/register`,className:`lg-nav-btn`,children:`Register →`})]}),(0,l.jsx)(`main`,{className:`lg-main`,children:(0,l.jsxs)(`div`,{className:`lg-wrap`,children:[(0,l.jsxs)(`div`,{ref:y,className:`lg-card`,onMouseMove:e=>{let t=y.current.getBoundingClientRect(),n=((e.clientX-t.left)/t.width-.5)*6,r=((e.clientY-t.top)/t.height-.5)*4;o.to(y.current,{rotateY:n,rotateX:-r,duration:.55,ease:`power2.out`,transformPerspective:900})},onMouseLeave:()=>{o.to(y.current,{rotateY:0,rotateX:0,duration:.8,ease:`elastic.out(1,0.5)`})},children:[(0,l.jsx)(`div`,{ref:b,children:(0,l.jsxs)(`div`,{className:`lg-badge`,children:[(0,l.jsx)(`div`,{className:`lg-badge-dot`}),(0,l.jsx)(`span`,{className:`lg-badge-text`,children:`Access Portal`})]})}),(0,l.jsx)(`div`,{ref:x,className:`lg-accent`}),(0,l.jsxs)(`div`,{ref:S,children:[(0,l.jsx)(`h1`,{className:`lg-title`,children:`Sign In`}),(0,l.jsx)(`p`,{className:`lg-sub`,children:`Welcome back. Enter your credentials to continue.`})]}),(0,l.jsxs)(`form`,{onSubmit:async n=>{n.preventDefault(),_(``),o.to(T.current,{scale:.97,duration:.08,yoyo:!0,repeat:1}),h(!0);try{(await e({email:t,password:u}))?.user?.role===`admin`?v(`/admin`):v(`/sales/overview`)}catch(e){_(e.message),o.to(y.current,{x:[-6,6,-5,5,-3,3,0],duration:.4,ease:`none`})}finally{h(!1)}},children:[g&&(0,l.jsxs)(`div`,{className:`lg-error`,children:[(0,l.jsx)(`div`,{className:`lg-error-dot`}),g]}),(0,l.jsxs)(`div`,{ref:C,className:`field-group`,children:[(0,l.jsx)(`label`,{className:`field-label`,htmlFor:`lg-email`,children:`Email Address`}),(0,l.jsx)(`input`,{className:`field-input`,id:`lg-email`,type:`email`,placeholder:`you@company.com`,value:t,onChange:e=>a(e.target.value),required:!0})]}),(0,l.jsxs)(`div`,{ref:w,className:`field-group`,children:[(0,l.jsxs)(`div`,{className:`field-top`,children:[(0,l.jsx)(`label`,{className:`field-label`,htmlFor:`lg-pass`,children:`Password`}),(0,l.jsx)(i,{to:`/forgot-password`,className:`field-forgot`,children:`Forgot?`})]}),(0,l.jsxs)(`div`,{className:`field-input-wrapper`,children:[(0,l.jsx)(`input`,{className:`field-input`,id:`lg-pass`,type:f?`text`:`password`,placeholder:`••••••••`,value:u,onChange:e=>d(e.target.value),required:!0}),(0,l.jsx)(`button`,{type:`button`,className:`field-icon-btn`,onClick:()=>p(!f),children:f?(0,l.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,l.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24`}),(0,l.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`})]}):(0,l.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,l.jsx)(`path`,{d:`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z`}),(0,l.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})]})]}),(0,l.jsx)(`div`,{ref:T,children:(0,l.jsxs)(`button`,{className:`lg-submit`,type:`submit`,disabled:m,children:[(0,l.jsx)(`span`,{children:m?`Signing in...`:`Sign In`}),!m&&(0,l.jsx)(`div`,{className:`lg-arrow-box`,children:`→`})]})})]}),(0,l.jsxs)(`div`,{ref:E,children:[(0,l.jsx)(`div`,{className:`lg-divider`,children:(0,l.jsx)(`div`,{className:`lg-divider-line`})}),(0,l.jsxs)(`p`,{className:`lg-footer-text`,children:[`New to the firm?`,(0,l.jsx)(i,{to:`/register`,className:`lg-footer-link`,children:`Register`})]})]})]}),(0,l.jsxs)(`div`,{className:`lg-meta`,children:[(0,l.jsxs)(`span`,{className:`lg-meta-text`,children:[`REF: 2026-AUTH-SECURE`,(0,l.jsx)(`br`,{}),`GATEWAY V1`]}),(0,l.jsxs)(`span`,{className:`lg-meta-text`,style:{textAlign:`right`},children:[`AES-256-GCM`,(0,l.jsx)(`br`,{}),`STATUS: ACTIVE`]})]})]})})]})]})};export{u as default};