import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{h as t,i as n,l as r,o as i}from"./react-vendor-Cm1STAwb.js";import{t as a}from"./useAuth-BNMMI8Jg.js";import{t as o}from"./gsap-vendor-TDMdzdWV.js";var s=e(t(),1),c=n(),l=()=>{let{forgetPassword:e}=a(),[t,n]=(0,s.useState)(``),[l,u]=(0,s.useState)(!1),[d,f]=(0,s.useState)(``),[p,m]=(0,s.useState)(``),[h,g]=(0,s.useState)(``);r();let _=(0,s.useRef)(null),v=(0,s.useRef)(null),y=(0,s.useRef)(null),b=(0,s.useRef)(null),x=(0,s.useRef)(null),S=(0,s.useRef)(null),C=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let e=[v.current,b.current,x.current,S.current,C.current];o.set(e,{opacity:0,y:20}),o.set(y.current,{scaleX:0,transformOrigin:`left`}),o.timeline({defaults:{ease:`power3.out`}}).to(_.current,{opacity:1,duration:0}).to(v.current,{opacity:1,y:0,duration:.45}).to(y.current,{scaleX:1,duration:.45,ease:`expo.out`},`-=0.2`).to(b.current,{opacity:1,y:0,duration:.4},`-=0.2`).to(x.current,{opacity:1,y:0,duration:.38},`-=0.22`).to(S.current,{opacity:1,y:0,duration:.38},`-=0.22`).to(C.current,{opacity:1,y:0,duration:.32},`-=0.18`)},[]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`style`,{children:`
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
          font-size: 30px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -1px;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .lg-sub {
          font-size: 14px;
          color: var(--color-on-surface-variant);
          line-height: 1.5;
          margin-bottom: 32px;
        }
        .field-group {
          margin-bottom: 18px;
        }
        .field-label {
          display: block;
          font-size: 10.5px;
          font-weight: 600;
          color: var(--color-outline);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
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
        .lg-error-dot { width: 6px; height: 6px; background: var(--color-error); border-radius: 50%; flex-shrink: 0; }
        
        .lg-success {
          font-size: 13px;
          color: #14532d;
          background: #dcfce7;
          border: 1px solid #22c55e;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          text-align: center;
          font-weight: 500;
          line-height: 1.5;
        }
        .lg-btn-continue {
          display: inline-block;
          margin-top: 14px;
          padding: 10px 24px;
          background: var(--color-primary);
          color: var(--color-on-primary);
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          font-size: 13px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lg-btn-continue:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,37,66,0.22);
        }

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
      `}),(0,c.jsxs)(`div`,{className:`lg-root`,children:[(0,c.jsxs)(`nav`,{className:`lg-nav`,children:[(0,c.jsxs)(i,{to:`/`,className:`lg-brand`,children:[(0,c.jsx)(`div`,{className:`lg-brand-icon`,children:(0,c.jsxs)(`svg`,{viewBox:`0 0 14 14`,children:[(0,c.jsx)(`rect`,{x:`1`,y:`1`,width:`5`,height:`5`,rx:`1`}),(0,c.jsx)(`rect`,{x:`8`,y:`1`,width:`5`,height:`5`,rx:`1`}),(0,c.jsx)(`rect`,{x:`1`,y:`8`,width:`5`,height:`5`,rx:`1`}),(0,c.jsx)(`rect`,{x:`8`,y:`8`,width:`5`,height:`5`,rx:`1`})]})}),(0,c.jsx)(`span`,{className:`lg-brand-name`,children:`B.K Engineering`})]}),(0,c.jsx)(i,{to:`/login`,className:`lg-nav-btn`,children:`Sign In →`})]}),(0,c.jsx)(`main`,{className:`lg-main`,children:(0,c.jsxs)(`div`,{className:`lg-wrap`,children:[(0,c.jsxs)(`div`,{ref:_,className:`lg-card`,children:[(0,c.jsx)(`div`,{ref:v,children:(0,c.jsxs)(`div`,{className:`lg-badge`,children:[(0,c.jsx)(`div`,{className:`lg-badge-dot`}),(0,c.jsx)(`span`,{className:`lg-badge-text`,children:`Account Recovery`})]})}),(0,c.jsx)(`div`,{ref:y,className:`lg-accent`}),(0,c.jsxs)(`div`,{ref:b,children:[(0,c.jsx)(`h1`,{className:`lg-title`,children:`Reset Password`}),(0,c.jsx)(`p`,{className:`lg-sub`,children:`Enter your registered email address to receive a secure password reset link.`})]}),(0,c.jsxs)(`form`,{onSubmit:async n=>{n.preventDefault(),f(``),m(``),g(``),o.to(S.current,{scale:.97,duration:.08,yoyo:!0,repeat:1}),u(!0);try{m((await e({email:t}))?.message||`An OTP has been sent to your email.`)}catch(e){f(e.message),o.to(_.current,{x:[-6,6,-5,5,-3,3,0],duration:.4,ease:`none`})}finally{u(!1)}},children:[d&&(0,c.jsxs)(`div`,{className:`lg-error`,children:[(0,c.jsx)(`div`,{className:`lg-error-dot`}),d]}),p?(0,c.jsxs)(`div`,{className:`lg-success`,children:[p,(0,c.jsx)(`br`,{}),(0,c.jsx)(i,{to:`/reset-password`,className:`lg-btn-continue`,children:`Continue to Reset`})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(`div`,{ref:x,className:`field-group`,children:[(0,c.jsx)(`label`,{className:`field-label`,htmlFor:`lg-email`,children:`Email Address`}),(0,c.jsx)(`input`,{className:`field-input`,id:`lg-email`,type:`email`,placeholder:`you@company.com`,value:t,onChange:e=>n(e.target.value),required:!0})]}),(0,c.jsx)(`div`,{ref:S,children:(0,c.jsxs)(`button`,{className:`lg-submit`,type:`submit`,disabled:l,children:[(0,c.jsx)(`span`,{children:l?`Sending OTP...`:`Send OTP`}),!l&&(0,c.jsx)(`div`,{className:`lg-arrow-box`,children:`→`})]})})]})]}),(0,c.jsxs)(`div`,{ref:C,children:[(0,c.jsx)(`div`,{className:`lg-divider`,children:(0,c.jsx)(`div`,{className:`lg-divider-line`})}),(0,c.jsxs)(`p`,{className:`lg-footer-text`,children:[`Remembered your password?`,(0,c.jsx)(i,{to:`/login`,className:`lg-footer-link`,children:`Sign In`})]})]})]}),(0,c.jsxs)(`div`,{className:`lg-meta`,children:[(0,c.jsxs)(`span`,{className:`lg-meta-text`,children:[`REF: 2026-AUTH-RECOVERY`,(0,c.jsx)(`br`,{}),`GATEWAY V1`]}),(0,c.jsxs)(`span`,{className:`lg-meta-text`,style:{textAlign:`right`},children:[`AES-256-GCM`,(0,c.jsx)(`br`,{}),`STATUS: ACTIVE`]})]})]})})]})]})};export{l as default};