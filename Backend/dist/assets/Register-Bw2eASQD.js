import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{h as t,i as n,o as r}from"./react-vendor-Cm1STAwb.js";import{t as i}from"./useAuth-BNMMI8Jg.js";import{t as a}from"./gsap-vendor-TDMdzdWV.js";var o=e(t(),1),s=n(),c=()=>{let{register:e}=i(),[t,n]=(0,o.useState)(``),[c,l]=(0,o.useState)(``),[u,d]=(0,o.useState)(``),[f,p]=(0,o.useState)(``),[m,h]=(0,o.useState)(!1),[g,_]=(0,o.useState)(!1),[v,y]=(0,o.useState)(``),b=(0,o.useRef)(null),x=(0,o.useRef)(null),S=(0,o.useRef)(null),C=(0,o.useRef)(null),w=(0,o.useRef)(null),T=(0,o.useRef)(null),E=(0,o.useRef)(null),D=(0,o.useRef)(null);return(0,o.useEffect)(()=>{a.set([S.current,w.current,E.current],{opacity:0,y:20}),a.set(C.current,{scaleX:0,transformOrigin:`left`}),a.set(T.current?.querySelectorAll(`.rg-field`),{opacity:0,y:16});let e=a.timeline({defaults:{ease:`power3.out`}});b.current&&(a.set(b.current.querySelectorAll(`.stat-card`),{opacity:0,y:20}),e.to(b.current.querySelectorAll(`.stat-card`),{opacity:1,y:0,duration:.45,stagger:.1},.2)),e.to(S.current,{opacity:1,y:0,duration:.4},.3).to(C.current,{scaleX:1,duration:.45,ease:`expo.out`},`-=0.2`).to(w.current,{opacity:1,y:0,duration:.4},`-=0.2`).to(T.current?.querySelectorAll(`.rg-field`),{opacity:1,y:0,duration:.35,stagger:.08},`-=0.25`).to(E.current,{opacity:1,y:0,duration:.35},`-=0.15`)},[]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`style`,{children:`
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
        .rg-checkbox-wrap {
          margin-top: -6px;
          margin-bottom: 18px;
          display: flex;
        }
        .rg-checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-on-surface-variant);
          user-select: none;
        }
        .rg-checkbox-label:hover {
          color: var(--color-on-surface);
        }
        .rg-checkbox {
          width: 15px;
          height: 15px;
          cursor: pointer;
          accent-color: var(--color-primary);
        }
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
      `}),(0,s.jsxs)(`div`,{className:`rg-root`,children:[(0,s.jsxs)(`nav`,{className:`rg-nav`,children:[(0,s.jsxs)(`div`,{className:`rg-brand`,children:[(0,s.jsx)(`div`,{className:`rg-brand-icon`,children:(0,s.jsxs)(`svg`,{viewBox:`0 0 14 14`,children:[(0,s.jsx)(`rect`,{x:`1`,y:`1`,width:`5`,height:`5`,rx:`1`}),(0,s.jsx)(`rect`,{x:`8`,y:`1`,width:`5`,height:`5`,rx:`1`}),(0,s.jsx)(`rect`,{x:`1`,y:`8`,width:`5`,height:`5`,rx:`1`}),(0,s.jsx)(`rect`,{x:`8`,y:`8`,width:`5`,height:`5`,rx:`1`})]})}),(0,s.jsx)(`span`,{className:`rg-brand-name`,children:`B.K Engineering`})]}),(0,s.jsx)(r,{to:`/login`,className:`rg-nav-link`,children:`Sign In →`})]}),(0,s.jsx)(`main`,{className:`rg-main`,children:(0,s.jsxs)(`div`,{className:`rg-grid`,children:[(0,s.jsxs)(`div`,{ref:b,className:`rg-left`,children:[(0,s.jsx)(`p`,{className:`rg-left-eyebrow`,children:`Project Infrastructure Alpha`}),(0,s.jsxs)(`h1`,{className:`rg-left-title`,children:[`Engineering`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`span`,{children:`Precision`}),(0,s.jsx)(`br`,{}),`for the Next Era.`]}),(0,s.jsx)(`p`,{className:`rg-left-desc`,children:`Join B.K Engineering's central node. Secure access to structural blueprints, technical specifications, and collaborative logistics.`}),(0,s.jsx)(`div`,{ref:D,className:`rg-stats`,children:[{label:`Protocol`,value:`AES-256`},{label:`Uptime`,value:`99.9%`},{label:`Access`,value:`Multi-Layer`},{label:`Compliance`,value:`ISO 27001`}].map((e,t)=>(0,s.jsxs)(`div`,{className:`stat-card`,children:[(0,s.jsx)(`p`,{className:`stat-label`,children:e.label}),(0,s.jsx)(`p`,{className:`stat-value`,children:e.value})]},t))})]}),(0,s.jsx)(`div`,{children:(0,s.jsxs)(`div`,{ref:x,className:`rg-card`,children:[(0,s.jsx)(`div`,{ref:S,children:(0,s.jsxs)(`div`,{className:`rg-badge`,children:[(0,s.jsx)(`div`,{className:`rg-badge-dot`}),(0,s.jsx)(`span`,{className:`rg-badge-text`,children:`Initialize Account`})]})}),(0,s.jsx)(`div`,{ref:C,className:`rg-accent`,style:{transform:`scaleX(0)`}}),(0,s.jsxs)(`div`,{ref:w,children:[(0,s.jsx)(`h2`,{className:`rg-title`,children:`Create Account`}),(0,s.jsx)(`p`,{className:`rg-sub`,children:`Create your professional credentials to proceed.`})]}),(0,s.jsxs)(`form`,{ref:T,onSubmit:async n=>{if(n.preventDefault(),y(``),u!==f){y(`Passwords do not match`),a.to(x.current,{x:[-6,6,-5,5,-3,3,0],duration:.4,ease:`none`});return}a.to(E.current,{scale:.97,duration:.08,yoyo:!0,repeat:1}),_(!0);try{await e({name:t,email:c,password:u})}catch(e){y(e.message),a.to(x.current,{x:[-6,6,-5,5,-3,3,0],duration:.4,ease:`none`})}finally{_(!1)}},children:[v&&(0,s.jsxs)(`div`,{className:`rg-error`,children:[(0,s.jsx)(`div`,{className:`rg-error-dot`}),v]}),(0,s.jsxs)(`div`,{className:`rg-field`,children:[(0,s.jsx)(`label`,{className:`rg-label`,htmlFor:`rg-name`,children:`Full Name`}),(0,s.jsx)(`input`,{className:`rg-input`,id:`rg-name`,type:`text`,placeholder:`John Doe`,value:t,onChange:e=>n(e.target.value),required:!0})]}),(0,s.jsxs)(`div`,{className:`rg-field`,children:[(0,s.jsx)(`label`,{className:`rg-label`,htmlFor:`rg-email`,children:`Professional Email`}),(0,s.jsx)(`input`,{className:`rg-input`,id:`rg-email`,type:`email`,placeholder:`you@company.com`,value:c,onChange:e=>l(e.target.value),required:!0})]}),(0,s.jsxs)(`div`,{className:`rg-row`,children:[(0,s.jsxs)(`div`,{className:`rg-field`,children:[(0,s.jsx)(`label`,{className:`rg-label`,htmlFor:`rg-pass`,children:`Password`}),(0,s.jsx)(`input`,{className:`rg-input`,id:`rg-pass`,type:m?`text`:`password`,placeholder:`••••••••`,value:u,onChange:e=>d(e.target.value),required:!0})]}),(0,s.jsxs)(`div`,{className:`rg-field`,children:[(0,s.jsx)(`label`,{className:`rg-label`,htmlFor:`rg-confirm`,children:`Confirm`}),(0,s.jsx)(`input`,{className:`rg-input`,id:`rg-confirm`,type:m?`text`:`password`,placeholder:`••••••••`,value:f,onChange:e=>p(e.target.value),required:!0})]})]}),(0,s.jsx)(`div`,{className:`rg-checkbox-wrap`,children:(0,s.jsxs)(`label`,{className:`rg-checkbox-label`,children:[(0,s.jsx)(`input`,{type:`checkbox`,className:`rg-checkbox`,checked:m,onChange:()=>h(!m)}),(0,s.jsx)(`span`,{children:`Show Password`})]})}),(0,s.jsx)(`div`,{ref:E,children:(0,s.jsxs)(`button`,{className:`rg-submit`,type:`submit`,disabled:g,children:[(0,s.jsx)(`span`,{children:g?`Creating Account...`:`Create Account`}),!g&&(0,s.jsx)(`div`,{className:`rg-arrow-box`,children:`→`})]})})]}),(0,s.jsx)(`div`,{className:`rg-divider`}),(0,s.jsxs)(`p`,{className:`rg-footer-text`,children:[`Already an engineer?`,(0,s.jsx)(r,{to:`/login`,className:`rg-footer-link`,children:`Sign In`})]})]})})]})}),(0,s.jsxs)(`footer`,{className:`rg-footer-bar`,children:[(0,s.jsx)(`span`,{className:`rg-footer-copy`,children:`© 2026 B.K Engineering. Precision in Infrastructure.`}),(0,s.jsxs)(`div`,{className:`rg-footer-links`,children:[(0,s.jsx)(`a`,{href:`#`,className:`rg-footer-link-small`,children:`Support`}),(0,s.jsx)(`a`,{href:`#`,className:`rg-footer-link-small`,children:`Legal`}),(0,s.jsx)(`a`,{href:`#`,className:`rg-footer-link-small`,children:`Safety Protocols`})]})]})]})]})};export{c as default};