import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{h as t,l as n,o as r,t as i}from"./react-vendor-DBK4LzoR.js";import{t as a}from"./gsap-vendor-C_Dj5ryB.js";import{t as o}from"./useAuth-DFmjkKFg.js";var s=e(t(),1),c=i(),l=()=>{let{resetPassword:e}=o(),[t,i]=(0,s.useState)(``),[l,u]=(0,s.useState)(``),[d,f]=(0,s.useState)(``),[p,m]=(0,s.useState)(!1),[h,g]=(0,s.useState)(!1),[_,v]=(0,s.useState)(``),[y,b]=(0,s.useState)(!1),x=n(),S=(0,s.useRef)(null),C=(0,s.useRef)(null),w=(0,s.useRef)(null),T=(0,s.useRef)(null),E=(0,s.useRef)(null),D=(0,s.useRef)(null),O=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let e=[C.current,T.current,D.current,O.current];a.set(e,{opacity:0,y:20}),a.set(w.current,{scaleX:0,transformOrigin:`left`}),a.set(E.current?.querySelectorAll(`.field-group`),{opacity:0,y:16}),a.timeline({defaults:{ease:`power3.out`}}).to(S.current,{opacity:1,duration:0}).to(C.current,{opacity:1,y:0,duration:.45}).to(w.current,{scaleX:1,duration:.45,ease:`expo.out`},`-=0.2`).to(T.current,{opacity:1,y:0,duration:.4},`-=0.2`).to(E.current?.querySelectorAll(`.field-group`),{opacity:1,y:0,duration:.38,stagger:.08},`-=0.22`).to(D.current,{opacity:1,y:0,duration:.38},`-=0.22`).to(O.current,{opacity:1,y:0,duration:.32},`-=0.18`)},[]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`style`,{children:`
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
      `}),(0,c.jsxs)(`div`,{className:`lg-root`,children:[(0,c.jsx)(`nav`,{className:`lg-nav`,children:(0,c.jsxs)(r,{to:`/`,className:`lg-brand`,children:[(0,c.jsx)(`div`,{className:`lg-brand-icon`,children:(0,c.jsxs)(`svg`,{viewBox:`0 0 14 14`,children:[(0,c.jsx)(`rect`,{x:`1`,y:`1`,width:`5`,height:`5`,rx:`1`}),(0,c.jsx)(`rect`,{x:`8`,y:`1`,width:`5`,height:`5`,rx:`1`}),(0,c.jsx)(`rect`,{x:`1`,y:`8`,width:`5`,height:`5`,rx:`1`}),(0,c.jsx)(`rect`,{x:`8`,y:`8`,width:`5`,height:`5`,rx:`1`})]})}),(0,c.jsx)(`span`,{className:`lg-brand-name`,children:`B.K Engineering`})]})}),(0,c.jsx)(`main`,{className:`lg-main`,children:(0,c.jsxs)(`div`,{className:`lg-wrap`,children:[(0,c.jsxs)(`div`,{ref:S,className:`lg-card`,children:[(0,c.jsx)(`div`,{ref:C,children:(0,c.jsxs)(`div`,{className:`lg-badge`,children:[(0,c.jsx)(`div`,{className:`lg-badge-dot`}),(0,c.jsx)(`span`,{className:`lg-badge-text`,children:`Update Credentials`})]})}),(0,c.jsx)(`div`,{ref:w,className:`lg-accent`}),(0,c.jsxs)(`div`,{ref:T,children:[(0,c.jsx)(`h1`,{className:`lg-title`,children:`New Password`}),(0,c.jsx)(`p`,{className:`lg-sub`,children:`Secure your account by choosing a strong, unique password.`})]}),y?(0,c.jsx)(`div`,{className:`lg-success`,children:`Your password has been successfully updated. Redirecting to login...`}):(0,c.jsxs)(`form`,{ref:E,onSubmit:async n=>{if(n.preventDefault(),v(``),l!==d){v(`Passwords do not match`),a.to(S.current,{x:[-6,6,-5,5,-3,3,0],duration:.4});return}a.to(D.current,{scale:.97,duration:.08,yoyo:!0,repeat:1}),g(!0);try{await e({otp:t,newPassword:l}),b(!0),setTimeout(()=>x(`/login`),3e3)}catch(e){v(e.message),a.to(S.current,{x:[-6,6,-5,5,-3,3,0],duration:.4,ease:`none`})}finally{g(!1)}},children:[_&&(0,c.jsxs)(`div`,{className:`lg-error`,children:[(0,c.jsx)(`div`,{className:`lg-error-dot`}),_]}),(0,c.jsxs)(`div`,{className:`field-group`,children:[(0,c.jsx)(`label`,{className:`field-label`,htmlFor:`lg-token`,children:`6-Digit OTP`}),(0,c.jsx)(`input`,{className:`field-input`,id:`lg-token`,type:`text`,placeholder:`Enter the OTP received in email`,value:t,onChange:e=>i(e.target.value),required:!0,maxLength:6})]}),(0,c.jsxs)(`div`,{className:`field-group`,children:[(0,c.jsx)(`label`,{className:`field-label`,htmlFor:`lg-pass`,children:`New Password`}),(0,c.jsx)(`input`,{className:`field-input`,id:`lg-pass`,type:p?`text`:`password`,placeholder:`••••••••`,value:l,onChange:e=>u(e.target.value),required:!0})]}),(0,c.jsxs)(`div`,{className:`field-group`,children:[(0,c.jsx)(`label`,{className:`field-label`,htmlFor:`lg-confirm`,children:`Confirm Password`}),(0,c.jsx)(`input`,{className:`field-input`,id:`lg-confirm`,type:p?`text`:`password`,placeholder:`••••••••`,value:d,onChange:e=>f(e.target.value),required:!0})]}),(0,c.jsx)(`div`,{className:`field-group lg-checkbox-wrap`,children:(0,c.jsxs)(`label`,{className:`lg-checkbox-label`,children:[(0,c.jsx)(`input`,{type:`checkbox`,className:`lg-checkbox`,checked:p,onChange:()=>m(!p)}),(0,c.jsx)(`span`,{children:`Show Password`})]})}),(0,c.jsx)(`div`,{ref:D,children:(0,c.jsxs)(`button`,{className:`lg-submit`,type:`submit`,disabled:h,children:[(0,c.jsx)(`span`,{children:h?`Updating...`:`Update Password`}),!h&&(0,c.jsx)(`div`,{className:`lg-arrow-box`,children:`→`})]})})]}),(0,c.jsxs)(`div`,{ref:O,children:[(0,c.jsx)(`div`,{className:`lg-divider`,children:(0,c.jsx)(`div`,{className:`lg-divider-line`})}),(0,c.jsxs)(`p`,{className:`lg-footer-text`,children:[`Remembered your password?`,(0,c.jsx)(r,{to:`/login`,className:`lg-footer-link`,children:`Sign In`})]})]})]}),(0,c.jsxs)(`div`,{className:`lg-meta`,children:[(0,c.jsx)(`span`,{className:`lg-meta-text`,children:`REF: 2026-AUTH-SECURE`}),(0,c.jsx)(`span`,{className:`lg-meta-text`,style:{textAlign:`right`},children:`AES-256-GCM`})]})]})})]})]})};export{l as default};