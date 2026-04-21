const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Login-DMKnKCgG.js","assets/rolldown-runtime-Dw2cE7zH.js","assets/react-vendor-Cm1STAwb.js","assets/gsap-vendor-TDMdzdWV.js","assets/useAuth-BNMMI8Jg.js","assets/auth.slice-B4qiGzFG.js","assets/vendor-D4tGl24r.js","assets/Register-Bw2eASQD.js","assets/ForgotPassword-wstTDc21.js","assets/ResetPassword-C-hC7LO8.js","assets/Protected-DLN5wRhJ.js","assets/AdminDashboard-BdPTGPaw.js","assets/firebase-vendor-DXp43hS-.js","assets/admin.sclice-R_ycha-s.js","assets/SalesDashboard-GAdJTLc_.js","assets/sales.slice-DHShqFC7.js"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{a as t,c as n,f as r,h as i,i as a,n as o,p as s,s as c,t as l}from"./react-vendor-Cm1STAwb.js";import{t as u}from"./vendor-D4tGl24r.js";import{a as d,s as f,t as p}from"./auth.slice-B4qiGzFG.js";import{t as m}from"./admin.sclice-R_ycha-s.js";import{r as h}from"./sales.slice-DHShqFC7.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var g=e(i(),1),_=s(),v=a(),y=(0,g.lazy)(()=>r(()=>import(`./Login-DMKnKCgG.js`),__vite__mapDeps([0,1,2,3,4,5,6]))),b=(0,g.lazy)(()=>r(()=>import(`./Register-Bw2eASQD.js`),__vite__mapDeps([7,1,2,3,4,5,6]))),x=(0,g.lazy)(()=>r(()=>import(`./ForgotPassword-wstTDc21.js`),__vite__mapDeps([8,1,2,3,4,5,6]))),S=(0,g.lazy)(()=>r(()=>import(`./ResetPassword-C-hC7LO8.js`),__vite__mapDeps([9,1,2,3,4,5,6]))),C=(0,g.lazy)(()=>r(()=>import(`./Protected-DLN5wRhJ.js`),__vite__mapDeps([10,2,1]))),w=(0,g.lazy)(()=>r(()=>import(`./AdminDashboard-BdPTGPaw.js`),__vite__mapDeps([11,1,2,12,6,3,13,4,5,14,15]))),T=(0,g.lazy)(()=>r(()=>import(`./SalesDashboard-GAdJTLc_.js`),__vite__mapDeps([14,1,2,6,3,4,5,15]))),E=n([{path:`/`,children:[{index:!0,element:(0,v.jsx)(c,{to:`/sales/overview`,replace:!0})}]},{path:`/sales`,children:[{index:!0,element:(0,v.jsx)(c,{to:`/sales/overview`,replace:!0})},{path:`:tab`,element:(0,v.jsx)(C,{role:`sales`,children:(0,v.jsx)(T,{})})}]},{path:`/login`,element:(0,v.jsx)(y,{})},{path:`/register`,element:(0,v.jsx)(b,{})},{path:`/forgot-password`,element:(0,v.jsx)(x,{})},{path:`/reset-password`,element:(0,v.jsx)(S,{})},{path:`/admin`,children:[{index:!0,element:(0,v.jsx)(c,{to:`/admin/system`,replace:!0})},{path:`:tab`,element:(0,v.jsx)(C,{role:`admin`,children:(0,v.jsx)(w,{})})}]}]),D=()=>(0,v.jsxs)(`div`,{className:`flex flex-col items-center justify-center w-screen h-screen bg-[#f8f9fa] font-['DM_Sans']`,children:[(0,v.jsx)(`style`,{children:`
        @keyframes gl-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gl-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
        .gl-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(0,0,0,0.1);
          border-top: 4px solid var(--color-primary, #1a73e8);
          border-radius: 50%;
          animation: gl-spin 1s linear infinite;
          margin-bottom: 20px;
        }
        .gl-text {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--color-on-surface, #1f2937);
          letter-spacing: -0.5px;
          margin-bottom: 8px;
          animation: gl-pulse 2s ease-in-out infinite;
        }
        .gl-sub {
          font-size: 14px;
          color: var(--color-on-surface-variant, #6b7280);
        }
      `}),(0,v.jsx)(`div`,{className:`gl-spinner`}),(0,v.jsx)(`h2`,{className:`gl-text`,children:`B.K Engineering`}),(0,v.jsx)(`p`,{className:`gl-sub`,children:`Loading application securely...`})]}),O=()=>{let e=o(),[n,r]=(0,g.useState)(!0),i=async()=>{try{let t=await f();t&&t.user&&e(d(t.user))}catch{e(d(null))}finally{r(!1)}};return(0,g.useEffect)(()=>{i()},[]),n?(0,v.jsx)(D,{}):(0,v.jsx)(`div`,{children:(0,v.jsx)(g.Suspense,{fallback:(0,v.jsx)(D,{}),children:(0,v.jsx)(t,{router:E})})})},k=u({reducer:{auth:p,admin:m,sales:h}});(0,_.createRoot)(document.getElementById(`root`)).render((0,v.jsx)(g.StrictMode,{children:(0,v.jsx)(l,{store:k,children:(0,v.jsx)(O,{})})}));