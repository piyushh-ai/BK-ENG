const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Login-BHN1sBMJ.js","assets/rolldown-runtime-Dw2cE7zH.js","assets/react-vendor-DBK4LzoR.js","assets/gsap-vendor-CjhHw5Up.js","assets/useAuth-CeNOOhiZ.js","assets/vendor-D4tGl24r.js","assets/Register-CggC3XVu.js","assets/ForgotPassword-og5SHJMI.js","assets/ResetPassword-w47-CeU5.js"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{a as t,c as n,d as r,f as i,h as a,i as o,l as s,m as c,n as l,p as u,r as d,s as f,t as p,u as m}from"./react-vendor-DBK4LzoR.js";import{n as h,r as g,t as _}from"./vendor-D4tGl24r.js";import{t as v}from"./gsap-vendor-CjhHw5Up.js";import{i as y,n as b,r as x,t as S}from"./firebase-vendor-BEGb05UX.js";import{i as C,n as w,r as T,t as E}from"./useAuth-CeNOOhiZ.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var D=e(a(),1),O=u(),k=e(c(),1),A=g.create({baseURL:`/api/upload`,withCredentials:!0}),j=async e=>{try{return(await A.post(`/upload-excel`,e)).data}catch(e){throw e}},ee=async()=>{try{return(await g.get(`/api/auth/all-users`,{withCredentials:!0})).data}catch(e){throw e}},M=async e=>{try{return(await g.put(`/api/auth/update-role`,e,{withCredentials:!0})).data}catch(e){throw e}},N=g.create({baseURL:`/api/admin`,withCredentials:!0}),P=async(e=1,t=100)=>{try{return(await N.get(`/all?page=${e}&limit=${t}`)).data}catch(e){throw e}},F=async(e,t)=>{try{return(await N.put(`/orders/${e}/status`,t)).data}catch(e){throw e}},I=async e=>{try{return(await N.get(`/search?q=${e}`)).data}catch(e){throw e}},L=async e=>{try{return(await N.delete(`/orders/${e}`)).data}catch(e){throw e}},R=async e=>{try{return(await g.post(`/api/auth/fcm-token`,{fcmToken:e},{withCredentials:!0})).data}catch(e){throw e}},te=h({name:`admin`,initialState:{allSalesUsers:null,allOrders:[],loading:!1,error:null,uploadStatus:null},reducers:{setSalesUser:(e,t)=>{e.allSalesUsers=t.payload},setAllOrders:(e,t)=>{e.allOrders=t.payload},setLoading:(e,t)=>{e.loading=t.payload},setError:(e,t)=>{e.error=t.payload},setUploadStatus:(e,t)=>{e.uploadStatus=t.payload}}}),{setSalesUser:ne,setAllOrders:re,setLoading:z,setError:B,setUploadStatus:ie}=te.actions,ae=te.reducer,V=()=>{let e=d(),t=async t=>{try{e(z(!0));let n=await j(t);return e(z(!1)),e(B(null)),e(ie(n.message)),n}catch(t){e(z(!1)),e(B(t)),e(ie(t.message))}},n=async()=>{try{e(z(!0));let t=await ee();return e(ne(t.users)),e(z(!1)),e(B(null)),t}catch(t){e(z(!1)),e(B(t)),e(ne(null))}},r=async t=>{try{e(z(!0));let n=await M(t);return e(z(!1)),e(B(null)),n}catch(t){e(z(!1)),e(B(t))}},i=async(t=1,n=100)=>{try{e(z(!0));let r=await P(t,n);return e(re(r.orders||[])),e(z(!1)),r}catch(t){e(z(!1)),e(B(t))}};return{handleUpload:t,handleAllSalesUser:n,handleUpdateRole:r,handleGetAllOrders:i,handleSearchOrders:async t=>{try{if(!t)return await i();e(z(!0));let n=await I(t);return e(re(n.orders||[])),e(z(!1)),n}catch(t){e(z(!1)),e(B(t))}},handleUpdateOrderStatus:async(t,n)=>{try{e(z(!0));let r=await F(t,n);return e(z(!1)),r}catch(t){throw e(z(!1)),e(B(t)),t}},handleDeleteOrder:async t=>{try{e(z(!0));let n=await L(t);return e(z(!1)),n}catch(t){throw e(z(!1)),e(B(t)),t}}}},H=p(),oe={pending:{bg:`#fef9c3`,text:`#92400e`,dot:`#f59e0b`},completed:{bg:`#dcfce7`,text:`#166534`,dot:`#22c55e`},cancelled:{bg:`#fee2e2`,text:`#991b1b`,dot:`#ef4444`},partial:{bg:`#dbeafe`,text:`#1e40af`,dot:`#3b82f6`}},se=e=>oe[e]||{bg:`#f3f4f6`,text:`#374151`,dot:`#9ca3af`},ce=[`pending`,`completed`,`partial`,`cancelled`],le=()=>typeof window<`u`&&!!window.ReactNativeWebView,ue=async e=>{if(le()){window.ReactNativeWebView.postMessage(JSON.stringify({type:`DOWNLOAD_IMAGE`,url:e}));return}try{let t=await(await fetch(e,{mode:`cors`})).blob(),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`order-image-${Date.now()}.jpg`,document.body.appendChild(r),r.click(),document.body.removeChild(r),setTimeout(()=>URL.revokeObjectURL(n),3e3)}catch{window.open(e,`_blank`)}},de={width:44,height:44,borderRadius:`50%`,background:`rgba(255,255,255,0.15)`,backdropFilter:`blur(6px)`,border:`none`,color:`#fff`,fontSize:22,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`},fe=({isOpen:e,onClose:t,images:n,startIndex:r})=>{let[i,a]=(0,D.useState)(r||0),[o,s]=(0,D.useState)(!1),[c,l]=(0,D.useState)(null),u=(0,D.useRef)(null),d=(0,D.useRef)(null);(0,D.useEffect)(()=>(e?(a(r||0),s(!1),document.body.style.overflow=`hidden`,u.current&&v.fromTo(u.current,{opacity:0},{opacity:1,duration:.18})):document.body.style.overflow=``,()=>{document.body.style.overflow=``}),[e,r]),(0,D.useEffect)(()=>{s(!1)},[i]);let f=(0,D.useCallback)(()=>{a(e=>(e-1+n.length)%n.length)},[n.length]),p=(0,D.useCallback)(()=>{a(e=>(e+1)%n.length)},[n.length]),m=e=>l(e.touches[0].clientX),h=e=>{if(c===null)return;let t=c-e.changedTouches[0].clientX;Math.abs(t)>50&&(t>0?p():f()),l(null)};if((0,D.useEffect)(()=>{if(!e)return;let n=e=>{e.key===`ArrowLeft`&&f(),e.key===`ArrowRight`&&p(),e.key===`Escape`&&t()};return window.addEventListener(`keydown`,n),()=>window.removeEventListener(`keydown`,n)},[e,f,p,t]),!e||!n?.length)return null;let g=n[i]?.url;return(0,k.createPortal)((0,H.jsxs)(`div`,{ref:u,style:{position:`fixed`,inset:0,zIndex:99999999,background:`#000`,display:`flex`,flexDirection:`column`,touchAction:`pan-y`},onTouchStart:m,onTouchEnd:h,children:[(0,H.jsxs)(`div`,{style:{position:`absolute`,top:0,left:0,right:0,zIndex:10,padding:`48px 16px 16px`,background:`linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)`,display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,H.jsx)(`button`,{onClick:t,style:{width:40,height:40,borderRadius:`50%`,background:`rgba(255,255,255,0.15)`,backdropFilter:`blur(8px)`,border:`none`,color:`#fff`,fontSize:22,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:`‹`}),n.length>1&&(0,H.jsxs)(`span`,{style:{color:`#fff`,fontSize:14,fontWeight:700,background:`rgba(0,0,0,0.4)`,padding:`4px 14px`,borderRadius:20,backdropFilter:`blur(6px)`},children:[i+1,` / `,n.length]}),(0,H.jsx)(`button`,{onClick:()=>ue(g),style:{width:40,height:40,borderRadius:`50%`,background:`rgba(255,255,255,0.15)`,backdropFilter:`blur(8px)`,border:`none`,color:`#fff`,fontSize:18,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:`↓`})]}),(0,H.jsxs)(`div`,{style:{flex:1,display:`flex`,alignItems:`center`,justifyContent:`center`,padding:`80px 0 100px`},onClick:t,children:[!o&&(0,H.jsx)(`div`,{style:{color:`rgba(255,255,255,0.4)`,fontSize:13,fontWeight:600},children:`Loading…`}),(0,H.jsx)(`img`,{ref:d,src:g,alt:`Image ${i+1}`,onLoad:()=>s(!0),onClick:e=>e.stopPropagation(),style:{maxWidth:`100%`,maxHeight:`100%`,objectFit:`contain`,display:o?`block`:`none`,userSelect:`none`}})]}),n.length>1&&(0,H.jsxs)(`div`,{style:{position:`absolute`,bottom:0,left:0,right:0,padding:`16px 20px 36px`,background:`linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:12},onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{onClick:f,style:de,children:`‹`}),(0,H.jsx)(`div`,{style:{display:`flex`,gap:6},children:n.map((e,t)=>(0,H.jsx)(`div`,{onClick:()=>a(t),style:{width:t===i?20:6,height:6,borderRadius:3,background:t===i?`#fff`:`rgba(255,255,255,0.35)`,transition:`all 0.2s`,cursor:`pointer`}},t))}),(0,H.jsx)(`button`,{onClick:p,style:de,children:`›`})]})]}),document.body)},U=({label:e,children:t,noBorder:n})=>(0,H.jsxs)(`div`,{style:{padding:`14px 16px`,borderBottom:n?`none`:`1px solid #f3f4f6`},children:[(0,H.jsx)(`div`,{style:{fontSize:10,fontWeight:800,color:`#9ca3af`,textTransform:`uppercase`,letterSpacing:`0.1em`,marginBottom:8},children:e}),t]}),pe=()=>{let[e,t]=(0,D.useState)(typeof window<`u`?window.innerWidth>=900:!1);return(0,D.useEffect)(()=>{let e=()=>t(window.innerWidth>=900);return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),e},me=()=>{let{orderId:e}=m(),t=s(),n=o(e=>e.admin.allOrders),{handleUpdateOrderStatus:r,handleDeleteOrder:i,handleSearchOrders:a}=V(),c=pe(),l=n?.find(t=>t._id===e),[u,d]=(0,D.useState)(``),[f,p]=(0,D.useState)(``),[h,g]=(0,D.useState)(!1),[_,y]=(0,D.useState)(!1),[b,x]=(0,D.useState)(!1),[S,C]=(0,D.useState)(0),w=(0,D.useRef)(null);(0,D.useEffect)(()=>{l&&(d(l.status),p(l.remark||``))},[l?._id]),(0,D.useEffect)(()=>{(!n||n.length===0)&&a(``)},[]),(0,D.useEffect)(()=>{w.current&&v.fromTo(w.current,{opacity:0,y:18},{opacity:1,y:0,duration:.3,ease:`power2.out`})},[]),(0,D.useEffect)(()=>{n&&n.length>0&&!l&&t(`/admin/all_orders`,{replace:!0})},[n,l]);let T=async()=>{g(!0),await r(l._id,{status:u,remark:f}),await a(``),g(!1),y(!0),setTimeout(()=>y(!1),2e3)},E=async()=>{window.confirm(`Permanently delete this order?`)&&(await i(l._id),await a(``),t(-1))};if(!l)return(0,H.jsx)(`div`,{style:{textAlign:`center`,padding:`80px 20px`,color:`#9ca3af`,fontWeight:600,fontSize:14},children:`Loading…`});let O=new Date(l.createdAt),k=se(u||l.status),A=()=>(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(U,{label:`Party info`,children:(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,H.jsx)(`div`,{style:{width:44,height:44,borderRadius:`50%`,border:`2px solid var(--color-primary)`,overflow:`hidden`,flexShrink:0,background:`#fff`},children:(0,H.jsx)(`img`,{src:`https://api.dicebear.com/9.x/initials/svg?seed=${l.user?.name}`,style:{width:`100%`,height:`100%`},alt:``})}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`div`,{style:{fontSize:16,fontWeight:800,color:`#111827`,fontFamily:`'Bricolage Grotesque', sans-serif`},children:l.partyName}),(0,H.jsxs)(`div`,{style:{fontSize:12,color:`#9ca3af`,fontWeight:600,marginTop:2},children:[`by `,l.user?.name||`Unknown Salesman`]})]})]})}),l.description&&(0,H.jsx)(U,{label:`Description`,children:(0,H.jsx)(`p`,{style:{fontSize:14,color:`#374151`,lineHeight:1.65,margin:0,whiteSpace:`pre-wrap`},children:l.description})}),l.images?.length>0&&(0,H.jsx)(U,{label:`Images · ${l.images.length}`,children:(0,H.jsx)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:l.images.slice(0,c?8:6).map((e,t)=>(0,H.jsxs)(`div`,{onClick:()=>{C(t),x(!0)},style:{width:c?84:72,height:c?84:72,borderRadius:10,border:`1.5px solid #e5e7eb`,overflow:`hidden`,cursor:`pointer`,flexShrink:0,position:`relative`,transition:`transform 0.15s, box-shadow 0.15s`},onMouseEnter:e=>{e.currentTarget.style.transform=`scale(1.04)`,e.currentTarget.style.boxShadow=`0 4px 12px rgba(0,0,0,0.15)`},onMouseLeave:e=>{e.currentTarget.style.transform=`scale(1)`,e.currentTarget.style.boxShadow=`none`},children:[(0,H.jsx)(`img`,{src:e.url,alt:``,style:{width:`100%`,height:`100%`,objectFit:`cover`,display:`block`}}),t===(c?7:5)&&l.images.length>(c?8:6)&&(0,H.jsxs)(`div`,{style:{position:`absolute`,inset:0,background:`rgba(0,0,0,0.55)`,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#fff`,fontSize:13,fontWeight:800},children:[`+`,l.images.length-(c?8:6)]})]},t))})}),l.remark&&(0,H.jsx)(U,{label:`Remark from admin`,children:(0,H.jsxs)(`div`,{style:{fontSize:13,color:`#374151`,fontStyle:`italic`,background:`#f9fafb`,borderRadius:10,padding:`10px 14px`,border:`1px solid #e5e7eb`,lineHeight:1.6},children:[`💬 `,l.remark]})}),(0,H.jsx)(U,{label:`Submitted`,noBorder:!0,children:(0,H.jsxs)(`div`,{style:{fontSize:13,color:`#374151`,fontWeight:600},children:[O.toLocaleDateString(`en-IN`,{weekday:`long`,day:`2-digit`,month:`long`,year:`numeric`}),` · `,O.toLocaleTimeString(`en-IN`,{hour:`2-digit`,minute:`2-digit`})]})})]}),j=()=>(0,H.jsxs)(`div`,{style:{background:`#f9fafb`,borderRadius:16,border:`1.5px solid #e5e7eb`,overflow:`hidden`},children:[(0,H.jsxs)(`div`,{style:{padding:`14px 16px 12px`},children:[(0,H.jsx)(`div`,{style:{fontSize:10,fontWeight:800,color:`#9ca3af`,textTransform:`uppercase`,letterSpacing:`0.1em`,marginBottom:10},children:`Update status`}),(0,H.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:8},children:ce.map(e=>{let t=se(e),n=u===e;return(0,H.jsxs)(`button`,{onClick:()=>d(e),style:{padding:`11px 0`,fontSize:13,fontWeight:700,borderRadius:12,cursor:`pointer`,textTransform:`capitalize`,letterSpacing:`0.02em`,background:n?t.bg:`#fff`,color:n?t.text:`#6b7280`,border:n?`2px solid ${t.dot}`:`1.5px solid #e5e7eb`,transition:`all 0.15s`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:6},children:[n&&(0,H.jsx)(`div`,{style:{width:7,height:7,borderRadius:`50%`,background:t.dot,flexShrink:0}}),e]},e)})})]}),(0,H.jsxs)(`div`,{style:{padding:`0 16px 14px`},children:[(0,H.jsx)(`div`,{style:{fontSize:10,fontWeight:800,color:`#9ca3af`,textTransform:`uppercase`,letterSpacing:`0.1em`,marginBottom:7},children:`Remark for salesman`}),(0,H.jsx)(`textarea`,{value:f,onChange:e=>p(e.target.value),placeholder:`Leave a note for the salesman…`,rows:c?4:3,style:{width:`100%`,background:`#fff`,border:`1.5px solid #e5e7eb`,color:`#111827`,fontSize:14,borderRadius:12,padding:`11px 14px`,outline:`none`,resize:`vertical`,fontFamily:`inherit`,boxSizing:`border-box`,lineHeight:1.5},onFocus:e=>e.target.style.borderColor=`var(--color-primary)`,onBlur:e=>e.target.style.borderColor=`#e5e7eb`})]}),(0,H.jsxs)(`div`,{style:{padding:`0 16px 16px`,display:`flex`,gap:8},children:[(0,H.jsx)(`button`,{onClick:T,disabled:h,style:{flex:1,padding:`13px`,fontSize:14,fontWeight:700,background:_?`#22c55e`:`var(--color-primary)`,color:`#fff`,border:`none`,borderRadius:12,cursor:h?`not-allowed`:`pointer`,opacity:h?.7:1,transition:`background 0.3s`,letterSpacing:`0.02em`},children:h?`Saving…`:_?`✓ Saved!`:`Save changes`}),(0,H.jsx)(`button`,{onClick:E,style:{width:48,height:48,borderRadius:12,flexShrink:0,background:`#fef2f2`,color:`#ef4444`,border:`1px solid #fecaca`,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:18},children:`🗑️`})]})]});return c?(0,H.jsxs)(`div`,{ref:w,style:{width:`100%`,minHeight:`100vh`,background:`#f8fafc`},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16,padding:`16px 32px`,borderBottom:`1px solid #e5e7eb`,background:`rgba(255,255,255,0.95)`,backdropFilter:`blur(12px)`,position:`sticky`,top:0,zIndex:10},children:[(0,H.jsx)(`button`,{onClick:()=>t(-1),style:{display:`flex`,alignItems:`center`,gap:6,padding:`8px 14px`,borderRadius:10,background:`#f3f4f6`,border:`none`,cursor:`pointer`,fontSize:13,fontWeight:700,color:`#374151`,transition:`background 0.15s`},onMouseEnter:e=>e.currentTarget.style.background=`#e5e7eb`,onMouseLeave:e=>e.currentTarget.style.background=`#f3f4f6`,children:`‹ Back`}),(0,H.jsxs)(`div`,{style:{flex:1},children:[(0,H.jsx)(`div`,{style:{fontSize:20,fontWeight:800,color:`#111827`,fontFamily:`'Bricolage Grotesque', sans-serif`},children:`Order Detail`}),(0,H.jsxs)(`div`,{style:{fontSize:12,color:`#9ca3af`,fontWeight:600},children:[O.toLocaleDateString(`en-IN`,{weekday:`long`,day:`2-digit`,month:`long`,year:`numeric`}),` · `,O.toLocaleTimeString(`en-IN`,{hour:`2-digit`,minute:`2-digit`})]})]}),(0,H.jsxs)(`span`,{style:{padding:`6px 16px`,borderRadius:20,background:k.bg,color:k.text,fontSize:11,fontWeight:800,textTransform:`uppercase`,letterSpacing:`0.06em`,transition:`all 0.2s`,display:`flex`,alignItems:`center`,gap:6},children:[(0,H.jsx)(`span`,{style:{width:7,height:7,borderRadius:`50%`,background:k.dot,display:`inline-block`}}),u||l.status]})]}),(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 380px`,gap:24,padding:`28px 32px 48px`,maxWidth:1200,margin:`0 auto`},children:[(0,H.jsxs)(`div`,{style:{background:`#fff`,borderRadius:18,border:`1.5px solid #e5e7eb`,overflow:`hidden`,boxShadow:`0 2px 12px rgba(0,0,0,0.05)`},children:[(0,H.jsx)(`div`,{style:{padding:`16px 20px`,borderBottom:`1px solid #f3f4f6`,background:`linear-gradient(135deg, #f8fafc 0%, #fff 100%)`},children:(0,H.jsx)(`div`,{style:{fontSize:11,fontWeight:800,color:`#9ca3af`,textTransform:`uppercase`,letterSpacing:`0.1em`},children:`Order Information`})}),(0,H.jsx)(A,{})]}),(0,H.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,H.jsxs)(`div`,{style:{background:`#fff`,borderRadius:18,border:`1.5px solid #e5e7eb`,padding:`20px`,boxShadow:`0 2px 12px rgba(0,0,0,0.05)`},children:[(0,H.jsx)(`div`,{style:{fontSize:10,fontWeight:800,color:`#9ca3af`,textTransform:`uppercase`,letterSpacing:`0.1em`,marginBottom:14},children:`Submitted by`}),(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,H.jsx)(`div`,{style:{width:52,height:52,borderRadius:`50%`,border:`2.5px solid var(--color-primary)`,overflow:`hidden`,flexShrink:0,background:`#fff`,boxShadow:`0 2px 8px rgba(99,102,241,0.2)`},children:(0,H.jsx)(`img`,{src:`https://api.dicebear.com/9.x/initials/svg?seed=${l.user?.name}`,style:{width:`100%`,height:`100%`},alt:``})}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`div`,{style:{fontSize:16,fontWeight:800,color:`#111827`,fontFamily:`'Bricolage Grotesque', sans-serif`},children:l.user?.name||`Unknown Salesman`}),(0,H.jsxs)(`div`,{style:{fontSize:12,color:`#9ca3af`,fontWeight:600,marginTop:2},children:[`Party: `,(0,H.jsx)(`span`,{style:{color:`#374151`},children:l.partyName})]})]})]}),(0,H.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:8,marginTop:16},children:[{label:`Images`,value:l.images?.length||0,icon:`📷`},{label:`Status`,value:u||l.status,icon:`●`}].map(({label:e,value:t,icon:n})=>(0,H.jsxs)(`div`,{style:{background:`#f8fafc`,borderRadius:12,padding:`10px 12px`,border:`1px solid #f3f4f6`},children:[(0,H.jsxs)(`div`,{style:{fontSize:11,color:`#9ca3af`,fontWeight:700,marginBottom:4},children:[n,` `,e]}),(0,H.jsx)(`div`,{style:{fontSize:14,fontWeight:800,color:`#111827`,textTransform:`capitalize`},children:t})]},e))})]}),(0,H.jsx)(j,{})]})]}),(0,H.jsx)(fe,{isOpen:b,onClose:()=>x(!1),images:l.images||[],startIndex:S})]}):(0,H.jsxs)(`div`,{ref:w,style:{width:`100%`,maxWidth:560,margin:`0 auto`,paddingBottom:48},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,padding:`14px 16px 12px`,borderBottom:`1px solid #f3f4f6`,position:`sticky`,top:0,background:`rgba(255,255,255,0.92)`,backdropFilter:`blur(12px)`,zIndex:10},children:[(0,H.jsx)(`button`,{onClick:()=>t(-1),style:{width:36,height:36,borderRadius:`50%`,background:`#f3f4f6`,border:`none`,cursor:`pointer`,fontSize:20,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0,color:`#374151`},children:`‹`}),(0,H.jsxs)(`div`,{style:{flex:1,minWidth:0},children:[(0,H.jsx)(`div`,{style:{fontSize:16,fontWeight:800,color:`#111827`,fontFamily:`'Bricolage Grotesque', sans-serif`},children:`Order detail`}),(0,H.jsxs)(`div`,{style:{fontSize:11,color:`#9ca3af`,fontWeight:600,marginTop:1},children:[O.toLocaleDateString(`en-IN`,{day:`2-digit`,month:`short`,year:`numeric`}),` · `,O.toLocaleTimeString(`en-IN`,{hour:`2-digit`,minute:`2-digit`})]})]}),(0,H.jsx)(`span`,{style:{padding:`4px 12px`,borderRadius:20,background:k.bg,color:k.text,fontSize:10,fontWeight:800,textTransform:`uppercase`,letterSpacing:`0.06em`,flexShrink:0,transition:`all 0.2s`},children:u||l.status})]}),(0,H.jsx)(A,{}),(0,H.jsx)(`div`,{style:{margin:`16px 16px 0`},children:(0,H.jsx)(j,{})}),(0,H.jsx)(fe,{isOpen:b,onClose:()=>x(!1),images:l.images||[],startIndex:S})]})},he=y({apiKey:`AIzaSyDeNcaws-0lR-A10i3ffnhJbtRvj3LngJQ`,projectId:`bk-eng`,messagingSenderId:`602178407465`,appId:`1:602178407465:web:c579114e52787322912038`}),W=null,ge=()=>{if(typeof window>`u`||!navigator.serviceWorker)return null;if(!W)try{W=S(he)}catch(e){return console.warn(`[Firebase] getMessaging() failed:`,e.message),null}return W},_e=`BCR-DHYVMsPBNVxc4OwgAFTU-nSwqBg9uMI3gcHc-4YHxs7p7E0eP9bGRRaDt5oR85nvm7O8qKkVntdRg1eZRcI`,ve=()=>{(0,D.useEffect)(()=>{(async()=>{try{if(typeof window>`u`||!(`Notification`in window)||!(`serviceWorker`in navigator)){console.log(`[Push] This browser does not support notifications.`);return}if(await Notification.requestPermission()!==`granted`){console.log(`[Push] Notification permission denied or dismissed.`);return}console.log(`[Push] Notification permission granted.`);let e=ge();if(!e){console.warn(`[Push] Firebase Messaging not supported in this environment.`);return}try{let t=await b(e,{vapidKey:_e});t?(console.log(`[Push] FCM Web Token earned, syncing to DB...`),await R(t),console.log(`[Push] Token synced successfully.`)):console.warn(`[Push] No FCM registration token available — check VAPID key or Service Worker.`)}catch(e){console.error(`[Push] getToken error:`,e)}}catch(e){console.error(`[Push] Error initializing push notifications:`,e)}})();let e=ge();if(!e)return;let t=x(e,e=>{console.log(`[Push] Foreground message received:`,e);let{title:t,body:n}=e.notification??{},r=e.data?.url;if(t&&Notification.permission===`granted`){let e=new Notification(t,{body:n??``,icon:`/icons.svg`});e.onclick=()=>{window.focus(),window.location.href=r}}});return()=>{t&&t()}},[])},ye=({activeTab:e,onTabChange:t})=>{let n=o(e=>e.auth.user),{logout:r}=E(),i=s(),[a,c]=(0,D.useState)(!1),l=(0,D.useRef)(null),u=(0,D.useRef)(null),d=(0,D.useRef)(null),f=(0,D.useRef)({}),p=[{id:`system`,label:`System`,icon:(0,H.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,H.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`}),(0,H.jsx)(`path`,{d:`M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z`})]})},{id:`all_orders`,label:`All Orders`,icon:(0,H.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,H.jsx)(`path`,{d:`M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2`}),(0,H.jsx)(`circle`,{cx:`9`,cy:`7`,r:`4`}),(0,H.jsx)(`path`,{d:`M23 21v-2a4 4 0 0 0-3-3.87`}),(0,H.jsx)(`path`,{d:`M16 3.13a4 4 0 0 1 0 7.75`})]})},{id:`company`,label:`Co. Stock`,icon:(0,H.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,H.jsx)(`rect`,{width:`16`,height:`20`,x:`4`,y:`2`,rx:`2`,ry:`2`}),(0,H.jsx)(`path`,{d:`M9 22v-4h6v4`}),(0,H.jsx)(`path`,{d:`M8 6h.01`}),(0,H.jsx)(`path`,{d:`M16 6h.01`}),(0,H.jsx)(`path`,{d:`M12 6h.01`}),(0,H.jsx)(`path`,{d:`M12 10h.01`}),(0,H.jsx)(`path`,{d:`M12 14h.01`}),(0,H.jsx)(`path`,{d:`M16 10h.01`}),(0,H.jsx)(`path`,{d:`M16 14h.01`}),(0,H.jsx)(`path`,{d:`M8 10h.01`}),(0,H.jsx)(`path`,{d:`M8 14h.01`})]})},{id:`bosch`,label:`Bosch`,icon:(0,H.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,H.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`}),(0,H.jsx)(`path`,{d:`M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z`})]})},{id:`orders`,label:`Punch`,icon:(0,H.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,H.jsx)(`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`}),(0,H.jsx)(`path`,{d:`M8 12h8`}),(0,H.jsx)(`path`,{d:`M12 8v8`})]})}];(0,D.useEffect)(()=>{u.current&&v.fromTo(u.current,{y:-80,opacity:0},{y:0,opacity:1,duration:.7,ease:`power4.out`,onComplete:()=>v.set(u.current,{clearProps:`transform,y`})})},[]),(0,D.useEffect)(()=>{let t=f.current[e];if(!t||!d.current)return;let{offsetLeft:n,offsetWidth:r}=t;v.to(d.current,{x:n,width:r,duration:.38,ease:`power3.inOut`})},[e]),(0,D.useEffect)(()=>{let e=e=>{l.current&&!l.current.contains(e.target)&&c(!1)};return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[]);let m=async()=>{await r(),i(`/login`)},h=n?.name?n.name.split(` `).map(e=>e[0]).join(``).toUpperCase().slice(0,2):`AD`;return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`style`,{children:`
        .snav {
          position: sticky; top: 0; left: 0; right: 0; z-index: 99999;
          background: color-mix(in srgb, var(--color-background) 80%, transparent);
          backdrop-filter: blur(28px) saturate(1.2);
          -webkit-backdrop-filter: blur(28px) saturate(1.2);
          border-bottom: 1px solid var(--color-outline-variant);
        }
        .snav-inner {
          max-width: 1400px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px; padding: 0 24px;
        }

        .snav-brand {
          display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none;
        }
        .snav-logo {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 80%, #000));
          display: grid; place-items: center;
          box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary) 30%, transparent);
        }
        .snav-logo svg {
          width: 18px; height: 18px; fill: var(--color-on-primary);
        }
        .snav-brand-name {
          font-family: 'Bricolage Grotesque', sans-serif; font-size: 19px; font-weight: 800;
          color: var(--color-on-surface); letter-spacing: -0.03em;
        }
        .snav-brand-name span { color: var(--color-primary); }

        .snav-tabs {
          display: flex; align-items: center; gap: 4px;
          position: relative; height: 100%;
        }
        .snav-tab {
          display: flex; align-items: center; gap: 8px;
          padding: 0 16px; height: 100%; border: none; background: transparent;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600;
          color: var(--color-on-surface-variant); cursor: pointer;
          transition: color 0.2s; position: relative; z-index: 1; outline: none;
        }
        .snav-tab:hover { color: var(--color-on-surface); }
        .snav-tab.active { color: var(--color-primary); }
        .snav-tab-icon {
          display: grid; place-items: center;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        .snav-tab.active .snav-tab-icon { transform: scale(1.1); }

        .snav-tab-indicator {
          position: absolute; bottom: 0; left: 0; height: 3px;
          background: var(--color-primary); border-radius: 3px 3px 0 0;
          z-index: 2; pointer-events: none;
        }

        .snav-right { display: flex; align-items: center; gap: 16px; }
        .snav-user-info { display: flex; flex-direction: column; align-items: flex-end; }
        .snav-user-name { font-size: 13.5px; font-weight: 700; color: var(--color-on-surface); }
        .snav-user-email { font-size: 11px; font-weight: 500; color: var(--color-outline); }

        .snav-avatar-wrap { position: relative; }
        .snav-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--color-surface-container-high); border: 2px solid var(--color-outline-variant);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: var(--color-on-surface);
          cursor: pointer; position: relative;
        }
        .snav-avatar-pulse {
          position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; border-radius: 50%;
          background: #22c55e; border: 2px solid var(--color-surface-container-lowest);
        }

        .snav-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          width: 220px; background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant); border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1); padding: 6px; z-index: 100;
          animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideDown { 0% { opacity: 0; transform: translateY(-8px) scale(0.96); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .snav-drop-header { padding: 12px; border-bottom: 1px solid var(--color-outline-variant); margin-bottom: 4px; }
        .snav-drop-name { font-weight: 700; font-size: 14px; color: var(--color-on-surface); }
        .snav-drop-email { font-size: 12px; color: var(--color-outline); margin-top: 2px; }
        .snav-drop-item {
          width: 100%; border: none; background: transparent; padding: 10px 12px; border-radius: 8px; font-size: 13.5px;
          text-align: left; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.15s; font-weight: 500;
        }
        .snav-drop-item:hover { background: var(--color-surface-container); }
        .snav-drop-item.danger { color: #ba1a1a; }
        .snav-drop-item.danger:hover { background: #ffdad6; }
        .snav-drop-divider { height: 1px; background: var(--color-outline-variant); margin: 6px 0; }

        .snav-bottom { display: none; }

        @media (max-width: 768px) {
          .snav-inner { padding: 0 16px; height: 56px; }
          .snav-tabs { display: none; }
          .snav-user-info { display: none; }
          .snav-tab-indicator { display: none; }

          .snav-bottom {
            display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
            background: var(--color-surface-container-lowest, #fff);
            backdrop-filter: blur(20px) saturate(1.5);
            -webkit-backdrop-filter: blur(20px) saturate(1.5);
            border-top: 1px solid var(--color-outline-variant, #e0e0e0);
            box-shadow: 0 -4px 24px rgba(0,0,0,0.10);
            padding: 0 4px; padding-bottom: env(safe-area-inset-bottom, 0px);
            justify-content: space-around; align-items: stretch;
          }

          .snav-bot-tab {
            flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
            padding: 10px 4px 10px; border: none; background: transparent; cursor: pointer; border-radius: 0;
            -webkit-tap-highlight-color: transparent; position: relative; min-height: 56px;
          }
          .snav-bot-tab:active { background: color-mix(in srgb, var(--color-primary) 10%, transparent); }

          .snav-bot-tab.active::before {
            content: ''; position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
            width: 48px; height: 32px; border-radius: 16px;
            background: color-mix(in srgb, var(--color-primary) 14%, transparent);
          }

          .snav-bot-icon { display: grid; place-items: center; color: var(--color-on-surface-variant); position: relative; z-index: 1; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.25s ease; }
          .snav-bot-tab.active .snav-bot-icon { transform: translateY(-2px) scale(1.1); color: var(--color-primary); }

          .snav-bot-label { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.01em; color: var(--color-on-surface-variant); transition: color 0.2s ease; position: relative; z-index: 1; }
          .snav-bot-tab.active .snav-bot-label { color: var(--color-primary); }
        }

        @media (max-width: 400px) {
          .snav-brand-name { display: none; }
          .snav-bot-label { font-size: 9px; }
        }
      `}),(0,H.jsx)(`nav`,{className:`snav`,ref:u,children:(0,H.jsxs)(`div`,{className:`snav-inner`,children:[(0,H.jsxs)(`div`,{className:`snav-brand`,onClick:()=>i(`/`),children:[(0,H.jsx)(`div`,{className:`snav-logo`,children:(0,H.jsx)(`svg`,{viewBox:`0 0 16 16`,children:(0,H.jsx)(`path`,{d:`M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z`})})}),(0,H.jsxs)(`span`,{className:`snav-brand-name`,children:[`Admin`,(0,H.jsx)(`span`,{children:`Portal`})]})]}),(0,H.jsxs)(`div`,{className:`snav-tabs`,children:[p.map(n=>(0,H.jsxs)(`button`,{ref:e=>f.current[n.id]=e,className:`snav-tab${e===n.id?` active`:``}`,onClick:()=>t(n.id),children:[(0,H.jsx)(`span`,{className:`snav-tab-icon`,children:n.icon}),n.label]},n.id)),(0,H.jsx)(`div`,{className:`snav-tab-indicator`,ref:d})]}),(0,H.jsxs)(`div`,{className:`snav-right`,children:[(0,H.jsxs)(`div`,{className:`snav-user-info`,children:[(0,H.jsx)(`div`,{className:`snav-user-name`,children:n?.name||`Administrator`}),(0,H.jsx)(`div`,{className:`snav-user-email`,children:n?.email||``})]}),(0,H.jsxs)(`div`,{className:`snav-avatar-wrap`,ref:l,children:[(0,H.jsxs)(`div`,{className:`snav-avatar`,onClick:()=>c(e=>!e),title:`Account`,children:[h,(0,H.jsx)(`span`,{className:`snav-avatar-pulse`})]}),a&&(0,H.jsxs)(`div`,{className:`snav-dropdown`,children:[(0,H.jsxs)(`div`,{className:`snav-drop-header`,children:[(0,H.jsx)(`div`,{className:`snav-drop-name`,children:n?.name||`Administrator`}),(0,H.jsx)(`div`,{className:`snav-drop-email`,children:n?.email||``})]}),(0,H.jsx)(`button`,{className:`snav-drop-item danger`,onClick:m,children:`Sign out`})]})]})]})]})}),(0,k.createPortal)((0,H.jsx)(`div`,{className:`snav-bottom`,children:p.map(n=>(0,H.jsxs)(`button`,{className:`snav-bot-tab${e===n.id?` active`:``}`,onClick:()=>t(n.id),children:[(0,H.jsx)(`span`,{className:`snav-bot-icon`,children:n.icon}),(0,H.jsx)(`span`,{className:`snav-bot-label`,children:n.label})]},n.id))}),document.body)]})},be=()=>{let e=o(e=>e.admin.allSalesUsers),t=o(e=>e.admin.loading),n=o(e=>e.admin.uploadStatus),{handleAllSalesUser:r,handleUpload:i,handleUpdateRole:a}=V(),[s,c]=(0,D.useState)(null),[l,u]=(0,D.useState)(null),d=(0,D.useRef)(null);(0,D.useEffect)(()=>{r()},[]),(0,D.useEffect)(()=>{if(!d.current)return;let e=d.current.querySelectorAll(`.ad-anim`);v.fromTo(e,{opacity:0,y:28},{opacity:1,y:0,duration:.55,ease:`power3.out`,stagger:.1,onComplete:()=>v.set(e,{clearProps:`transform`})})},[]);let f=async()=>{if(!s&&!l){alert(`Please select at least one file to upload.`);return}let e=new FormData;s&&e.append(`bosch`,s),l&&e.append(`company`,l),await i(e),c(null),u(null)},p=async e=>{let t=e.role===`admin`?`sales`:`admin`;await a({_id:e._id,role:t}),r()};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`style`,{children:`
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
      `}),(0,H.jsxs)(`div`,{className:`ad-root`,ref:d,children:[(0,H.jsxs)(`div`,{className:`ad-hero ad-anim`,children:[(0,H.jsx)(`div`,{className:`ad-hero-eyebrow`,children:`Admin Portal`}),(0,H.jsx)(`h1`,{className:`ad-hero-title`,children:`System Dashboard`}),(0,H.jsx)(`p`,{className:`ad-hero-sub`,children:`Manage inventory files and system personnel.`})]}),(0,H.jsxs)(`div`,{className:`ad-section ad-anim`,children:[(0,H.jsx)(`div`,{className:`ad-section-title`,children:`Update Stock Data`}),(0,H.jsx)(`div`,{className:`ad-section-sub`,children:`Upload Excel files to sync latest inventory`}),(0,H.jsxs)(`div`,{className:`ad-upload-grid`,children:[(0,H.jsxs)(`div`,{className:`ad-upload-card${s?` selected`:``}`,children:[(0,H.jsx)(`input`,{type:`file`,accept:`.xlsx,.xls`,onChange:e=>c(e.target.files[0])}),(0,H.jsx)(`div`,{className:`ad-upload-icon`,children:s?(0,H.jsx)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`var(--color-on-primary)`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,H.jsx)(`polyline`,{points:`20 6 9 17 4 12`})}):`📄`}),(0,H.jsxs)(`div`,{className:`ad-upload-card-text`,children:[(0,H.jsx)(`span`,{className:`ad-upload-label`,children:`Bosch Stock`}),s?(0,H.jsx)(`span`,{className:`ad-upload-filename`,children:s.name}):(0,H.jsx)(`span`,{className:`ad-upload-hint`,children:`Tap to select .xlsx`})]})]}),(0,H.jsxs)(`div`,{className:`ad-upload-card${l?` selected`:``}`,children:[(0,H.jsx)(`input`,{type:`file`,accept:`.xlsx,.xls`,onChange:e=>u(e.target.files[0])}),(0,H.jsx)(`div`,{className:`ad-upload-icon`,children:l?(0,H.jsx)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`var(--color-on-primary)`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,H.jsx)(`polyline`,{points:`20 6 9 17 4 12`})}):`🏢`}),(0,H.jsxs)(`div`,{className:`ad-upload-card-text`,children:[(0,H.jsx)(`span`,{className:`ad-upload-label`,children:`Company Stock`}),l?(0,H.jsx)(`span`,{className:`ad-upload-filename`,children:l.name}):(0,H.jsx)(`span`,{className:`ad-upload-hint`,children:`Tap to select .xlsx`})]})]})]}),(0,H.jsxs)(`div`,{className:`ad-upload-actions`,children:[(0,H.jsx)(`button`,{className:`ad-btn-primary`,onClick:f,disabled:t||!s&&!l,children:t?`Processing…`:`⬆ Update Stock`}),n&&(0,H.jsxs)(`span`,{className:`ad-status-badge`,children:[`✓ `,n]})]})]}),(0,H.jsxs)(`div`,{className:`ad-section ad-anim`,children:[(0,H.jsxs)(`div`,{className:`ad-team-header`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`div`,{className:`ad-section-title`,children:`Team Members`}),(0,H.jsx)(`div`,{className:`ad-section-sub`,style:{marginBottom:0},children:`Manage access and roles`})]}),(0,H.jsxs)(`span`,{className:`ad-team-count`,children:[e?.length||0,` users`]})]}),(0,H.jsx)(`div`,{className:`ad-users-grid`,children:e?.map(e=>{let t=e.role===`admin`,n=t?`var(--color-tertiary-fixed-dim, #7c4dff)`:`var(--color-primary)`,r=t?`var(--color-tertiary-container)`:`var(--color-primary-container)`,i=t?`var(--color-on-tertiary-container)`:`var(--color-on-primary-container)`,a=e.name?e.name.split(` `).map(e=>e[0]).join(``).toUpperCase().slice(0,2):`??`;return(0,H.jsxs)(`div`,{className:`ad-user-card`,children:[(0,H.jsx)(`div`,{className:`ad-user-accent`,style:{background:n}}),(0,H.jsxs)(`div`,{className:`ad-user-body`,children:[(0,H.jsx)(`div`,{className:`ad-user-avatar`,style:{background:`color-mix(in srgb,${n} 15%,transparent)`,color:n},children:a}),(0,H.jsx)(`div`,{className:`ad-user-name`,children:e.name}),(0,H.jsx)(`div`,{className:`ad-user-email`,title:e.email,children:e.email}),(0,H.jsx)(`span`,{className:`ad-user-role-pill`,style:{background:r,color:i},children:e.role})]}),(0,H.jsxs)(`div`,{className:`ad-user-footer`,children:[(0,H.jsx)(`span`,{className:`ad-user-footer-label`,children:`Access Level`}),(0,H.jsxs)(`button`,{className:`ad-toggle-btn`,onClick:()=>p(e),children:[`→ `,t?`Sales`:`Admin`]})]})]},e._id)})})]})]})]})},G={pending:{bg:`#fffbeb`,text:`#b45309`,dot:`#f59e0b`,border:`#fde68a`},completed:{bg:`#f0fdf4`,text:`#15803d`,dot:`#22c55e`,border:`#bbf7d0`},cancelled:{bg:`#fff1f2`,text:`#be123c`,dot:`#f43f5e`,border:`#fecdd3`},partial:{bg:`#eff6ff`,text:`#1d4ed8`,dot:`#3b82f6`,border:`#bfdbfe`}},K=e=>G[e]||{bg:`#f9fafb`,text:`#374151`,dot:`#9ca3af`,border:`#e5e7eb`},xe=()=>{let[e,t]=(0,D.useState)(typeof window<`u`?window.innerWidth>=900:!1);return(0,D.useEffect)(()=>{let e=()=>t(window.innerWidth>=900);return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),e},Se=({order:e,isLatest:t})=>{let n=s(),r=K(e.status),i=new Date(e.createdAt);return(0,H.jsxs)(`div`,{id:`order-${e._id}`,onClick:()=>n(`/admin/order/${e._id}`),style:{borderRadius:14,border:`1px solid ${t?`#c7d2fe`:`#f1f5f9`}`,background:`#ffffff`,overflow:`hidden`,position:`relative`,cursor:`pointer`,transition:`transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease`,boxShadow:`0 1px 3px rgba(0,0,0,0.04)`},onMouseEnter:e=>{e.currentTarget.style.transform=`translateY(-2px)`,e.currentTarget.style.boxShadow=`0 6px 20px rgba(99,102,241,0.1)`,e.currentTarget.style.borderColor=`#c7d2fe`},onMouseLeave:e=>{e.currentTarget.style.transform=`translateY(0)`,e.currentTarget.style.boxShadow=`0 1px 3px rgba(0,0,0,0.04)`,e.currentTarget.style.borderColor=t?`#c7d2fe`:`#f1f5f9`},children:[(0,H.jsx)(`div`,{style:{position:`absolute`,left:0,top:0,bottom:0,width:3,background:r.dot,borderRadius:`14px 0 0 14px`}}),t&&(0,H.jsx)(`div`,{style:{position:`absolute`,top:10,right:12,background:`linear-gradient(135deg, #6366f1, #8b5cf6)`,color:`#fff`,fontSize:9,fontWeight:800,letterSpacing:`0.12em`,textTransform:`uppercase`,padding:`2px 8px`,borderRadius:6},children:`NEW`}),(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,padding:`14px 14px 14px 18px`,gap:10},children:[(0,H.jsx)(`div`,{style:{width:36,height:36,borderRadius:10,flexShrink:0,background:`#f1f5f9`,overflow:`hidden`,border:`1px solid #e2e8f0`},children:(0,H.jsx)(`img`,{src:`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(e.partyName||`User`)}`,style:{width:`100%`,height:`100%`},alt:``})}),(0,H.jsxs)(`div`,{style:{flex:1,minWidth:0},children:[(0,H.jsx)(`div`,{style:{fontSize:14,fontWeight:700,color:`#0f172a`,fontFamily:`'Bricolage Grotesque', sans-serif`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,marginBottom:3},children:e.partyName}),(0,H.jsxs)(`div`,{style:{fontSize:11,color:`#94a3b8`,fontWeight:500,display:`flex`,alignItems:`center`,gap:4},children:[(0,H.jsxs)(`svg`,{width:`10`,height:`10`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,H.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,H.jsx)(`polyline`,{points:`12 6 12 12 16 14`})]}),i.toLocaleDateString(`en-IN`,{day:`2-digit`,month:`short`}),` · `,i.toLocaleTimeString(`en-IN`,{hour:`2-digit`,minute:`2-digit`}),e.images?.length>0&&(0,H.jsxs)(`span`,{style:{marginLeft:2,display:`flex`,alignItems:`center`,gap:2,color:`#cbd5e1`},children:[(0,H.jsxs)(`svg`,{width:`10`,height:`10`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,H.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`}),(0,H.jsx)(`circle`,{cx:`8.5`,cy:`8.5`,r:`1.5`}),(0,H.jsx)(`polyline`,{points:`21 15 16 10 5 21`})]}),e.images.length]})]})]}),(0,H.jsx)(`div`,{style:{padding:`4px 10px`,fontSize:10,fontWeight:700,letterSpacing:`0.05em`,textTransform:`uppercase`,borderRadius:20,background:r.bg,color:r.text,border:`1px solid ${r.border}`,flexShrink:0},children:e.status}),(0,H.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`#cbd5e1`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{flexShrink:0},children:(0,H.jsx)(`polyline`,{points:`9 18 15 12 9 6`})})]})]})},Ce=({allOrders:e})=>{let t=(0,D.useMemo)(()=>e?e.reduce((e,t)=>(e[t.status]=(e[t.status]||0)+1,e),{}):{},[e]);return(0,H.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(5, 1fr)`,gap:10,marginBottom:20},children:[{label:`Total`,value:e?.length||0,color:`#4f46e5`,bg:`#eef2ff`,border:`#c7d2fe`},{label:`Pending`,value:t.pending||0,...G.pending,color:G.pending.text},{label:`Completed`,value:t.completed||0,...G.completed,color:G.completed.text},{label:`Partial`,value:t.partial||0,...G.partial,color:G.partial.text},{label:`Cancelled`,value:t.cancelled||0,...G.cancelled,color:G.cancelled.text}].map(({label:e,value:t,color:n,bg:r,border:i})=>(0,H.jsxs)(`div`,{style:{background:r||`#fff`,borderRadius:12,border:`1px solid ${i||`#e2e8f0`}`,padding:`12px 14px`},children:[(0,H.jsx)(`div`,{style:{fontSize:10,color:n,fontWeight:700,textTransform:`uppercase`,letterSpacing:`0.08em`,marginBottom:6,opacity:.75},children:e}),(0,H.jsx)(`div`,{style:{fontSize:24,fontWeight:900,color:n,fontFamily:`'Bricolage Grotesque', sans-serif`,lineHeight:1},children:t})]},e))})},we=({value:e,onChange:t,options:n})=>{let[r,i]=(0,D.useState)(!1),a=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=e=>{a.current&&!a.current.contains(e.target)&&i(!1)};return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[]);let o=n.find(t=>t.value===e)||n[0];return(0,H.jsxs)(`div`,{ref:a,style:{position:`relative`,display:`inline-block`},children:[(0,H.jsxs)(`div`,{onClick:()=>i(!r),style:{display:`flex`,alignItems:`center`,gap:8,background:`#fff`,border:`1.5px solid ${r?`#818cf8`:`#e2e8f0`}`,borderRadius:10,padding:`7px 12px`,cursor:`pointer`,transition:`border-color 0.15s`,boxShadow:r?`0 0 0 3px rgba(99,102,241,0.1)`:`none`},children:[(0,H.jsx)(`span`,{style:{fontSize:12,fontWeight:700,color:`#1e293b`,whiteSpace:`nowrap`},children:o.label}),(0,H.jsx)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 24 24`,fill:`none`,stroke:r?`#6366f1`:`#94a3b8`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{transform:r?`rotate(180deg)`:`none`,transition:`transform 0.15s`},children:(0,H.jsx)(`polyline`,{points:`6 9 12 15 18 9`})})]}),r&&(0,H.jsx)(`div`,{style:{position:`absolute`,top:`calc(100% + 6px)`,left:0,zIndex:50,background:`#fff`,border:`1px solid #e2e8f0`,borderRadius:12,padding:4,minWidth:`100%`,boxShadow:`0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)`,display:`flex`,flexDirection:`column`,gap:1,animation:`dropdownIn 0.12s ease forwards`},children:n.map(n=>(0,H.jsxs)(`div`,{onClick:()=>{t(n.value),i(!1)},style:{padding:`8px 12px`,borderRadius:8,cursor:`pointer`,fontSize:12,fontWeight:n.value===e?700:500,color:n.value===e?`#4f46e5`:`#475569`,background:n.value===e?`#eef2ff`:`transparent`,transition:`background 0.1s`,whiteSpace:`nowrap`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:10},onMouseEnter:t=>{n.value!==e&&(t.currentTarget.style.background=`#f8fafc`)},onMouseLeave:t=>{n.value!==e&&(t.currentTarget.style.background=`transparent`)},children:[n.label,n.value===e&&(0,H.jsx)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`3`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,H.jsx)(`polyline`,{points:`20 6 9 17 4 12`})})]},n.value))})]})},Te=()=>{let e=o(e=>e.admin.allOrders),t=o(e=>e.admin.loading),{handleSearchOrders:n,handleGetAllOrders:i}=V(),a=xe(),[s,c]=(0,D.useState)(``),[l,u]=(0,D.useState)(`all`),[d,f]=(0,D.useState)(`grouped_salesman`),[p,m]=(0,D.useState)(`date_desc`),[h,g]=(0,D.useState)(()=>{let e=localStorage.getItem(`hideDeleteBannerDate`);return!(e&&e===new Date().toDateString())}),_=()=>{localStorage.setItem(`hideDeleteBannerDate`,new Date().toDateString()),g(!1)},[y]=r(),b=y.get(`orderId`),x=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=setTimeout(()=>{s?n(s):i(1,500)},450);return()=>clearTimeout(e)},[s]),(0,D.useEffect)(()=>{let t=`aol-styles`;if(!document.getElementById(t)){let e=document.createElement(`style`);e.id=t,e.innerHTML=`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `,document.head.appendChild(e)}e?.length>0&&x.current&&(v.fromTo(x.current.children,{opacity:0,y:12},{opacity:1,y:0,stagger:.035,duration:.3,ease:`power2.out`}),b&&setTimeout(()=>{let e=document.getElementById(`order-${b}`);e&&(e.scrollIntoView({behavior:`smooth`,block:`center`}),v.fromTo(e,{boxShadow:`0 0 0 3px #6366f1`},{boxShadow:`0 0 0 0px #6366f1`,duration:2,ease:`power2.out`,delay:.3}))},600))},[e,b,d,p]);let S=(0,D.useMemo)(()=>{if(!e)return{type:`flat`,data:[]};let t=l===`all`?e:e.filter(e=>e.status===l);return t=[...t].sort((e,t)=>p===`date_desc`?new Date(t.createdAt)-new Date(e.createdAt):p===`date_asc`?new Date(e.createdAt)-new Date(t.createdAt):p===`party_asc`?e.partyName.localeCompare(t.partyName):0),d===`grouped_salesman`?{type:`grouped`,data:t.reduce((e,t)=>{let n=t.user?.name||`Unknown Salesman`;return e[n]||(e[n]=[]),e[n].push(t),e},{})}:d===`grouped_status`?{type:`grouped`,data:t.reduce((e,t)=>{let n=t.status||`unknown`;return e[n]||(e[n]=[]),e[n].push(t),e},{})}:{type:`flat`,data:t}},[e,l,p,d]),C=()=>(0,H.jsxs)(`div`,{style:{position:`relative`},children:[(0,H.jsx)(`svg`,{style:{position:`absolute`,left:14,top:`50%`,transform:`translateY(-50%)`,width:16,height:16,color:`#94a3b8`,pointerEvents:`none`},fill:`none`,viewBox:`0 0 24 24`,stroke:`currentColor`,children:(0,H.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`2.5`,d:`M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z`})}),(0,H.jsx)(`input`,{type:`text`,placeholder:`Search party name…`,value:s,onChange:e=>c(e.target.value),style:{width:`100%`,paddingLeft:42,paddingRight:14,paddingTop:12,paddingBottom:12,borderRadius:12,border:`1.5px solid #e2e8f0`,background:`#fff`,color:`#0f172a`,fontSize:14,fontWeight:500,outline:`none`,boxSizing:`border-box`,transition:`border-color 0.15s, box-shadow 0.15s`},onFocus:e=>{e.target.style.borderColor=`#818cf8`,e.target.style.boxShadow=`0 0 0 3px rgba(99,102,241,0.1)`},onBlur:e=>{e.target.style.borderColor=`#e2e8f0`,e.target.style.boxShadow=`none`}})]}),w=()=>(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,flexWrap:`wrap`,gap:8,marginBottom:16,padding:`8px 12px`,background:`#f8fafc`,borderRadius:12,border:`1px solid #f1f5f9`},children:[(0,H.jsx)(`span`,{style:{fontSize:10,fontWeight:800,color:`#94a3b8`,letterSpacing:`0.1em`,flexShrink:0,paddingRight:2},children:`VIEW`}),(0,H.jsx)(we,{value:d,onChange:f,options:[{value:`grouped_salesman`,label:`By Salesman`},{value:`grouped_status`,label:`By Status`},{value:`flat`,label:`Flat List`}]}),(0,H.jsx)(`div`,{style:{width:1,height:20,background:`#e2e8f0`,flexShrink:0,margin:`0 4px`}}),(0,H.jsx)(`span`,{style:{fontSize:10,fontWeight:800,color:`#94a3b8`,letterSpacing:`0.1em`,flexShrink:0,paddingRight:2},children:`SORT`}),(0,H.jsx)(we,{value:p,onChange:m,options:[{value:`date_desc`,label:`Newest First`},{value:`date_asc`,label:`Oldest First`},{value:`party_asc`,label:`Party A–Z`}]})]}),T=()=>(S.type===`flat`?S.data.length===0:Object.keys(S.data).length===0)?(0,H.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,padding:`64px 20px`,gap:10},children:[(0,H.jsx)(`div`,{style:{width:48,height:48,borderRadius:14,background:`#f1f5f9`,display:`grid`,placeItems:`center`},children:(0,H.jsxs)(`svg`,{width:`22`,height:`22`,viewBox:`0 0 24 24`,fill:`none`,stroke:`#94a3b8`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,H.jsx)(`circle`,{cx:`11`,cy:`11`,r:`8`}),(0,H.jsx)(`line`,{x1:`21`,y1:`21`,x2:`16.65`,y2:`16.65`})]})}),(0,H.jsx)(`div`,{style:{fontSize:14,color:`#64748b`,fontWeight:600},children:s?`No orders found`:`No orders yet`}),(0,H.jsx)(`div`,{style:{fontSize:12,color:`#94a3b8`},children:s?`Try searching something else`:`Orders will appear here`})]}):(0,H.jsx)(`div`,{ref:x,style:{display:`flex`,flexDirection:`column`,gap:16},children:S.type===`flat`?(0,H.jsx)(`div`,{style:{display:a?`grid`:`flex`,gridTemplateColumns:a?`1fr 1fr`:void 0,flexDirection:a?void 0:`column`,gap:10},children:S.data.map((e,t)=>(0,H.jsx)(Se,{order:e,isLatest:t===0&&!s&&p===`date_desc`},e._id))}):Object.entries(S.data).map(([e,t])=>{let n=K(e);return(0,H.jsxs)(`div`,{style:{background:`#ffffff`,borderRadius:16,overflow:`hidden`,border:`1px solid #f1f5f9`,boxShadow:`0 1px 4px rgba(0,0,0,0.03)`},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,padding:`14px 16px`,background:`#fafbfc`,borderBottom:`1px solid #f1f5f9`},children:[d===`grouped_salesman`&&(0,H.jsx)(`div`,{style:{width:36,height:36,borderRadius:10,flexShrink:0,overflow:`hidden`,border:`1.5px solid #e0e7ff`},children:(0,H.jsx)(`img`,{src:`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(e||`User`)}`,style:{width:`100%`,height:`100%`},alt:``})}),d===`grouped_status`&&(0,H.jsx)(`div`,{style:{width:36,height:36,borderRadius:10,background:n.bg,display:`grid`,placeItems:`center`,flexShrink:0,border:`1px solid ${n.border}`},children:(0,H.jsx)(`div`,{style:{width:12,height:12,borderRadius:`50%`,background:n.dot}})}),(0,H.jsxs)(`div`,{style:{flex:1,minWidth:0},children:[(0,H.jsx)(`div`,{style:{fontSize:14,fontWeight:800,color:`#0f172a`,fontFamily:`'Bricolage Grotesque', sans-serif`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,textTransform:d===`grouped_status`?`capitalize`:`none`},children:e}),(0,H.jsxs)(`div`,{style:{fontSize:11,color:`#94a3b8`,fontWeight:600,marginTop:1},children:[t.length,` `,t.length===1?`order`:`orders`]})]}),d===`grouped_salesman`&&(()=>{let e=t.reduce((e,t)=>(e[t.status]=(e[t.status]||0)+1,e),{});return(0,H.jsx)(`div`,{style:{display:`flex`,gap:6},children:Object.entries(e).map(([e,t])=>{let n=K(e);return(0,H.jsxs)(`div`,{style:{padding:`2px 8px`,borderRadius:20,background:n.bg,color:n.text,fontSize:10,fontWeight:700,border:`1px solid ${n.border}`,textTransform:`capitalize`},children:[e,` · `,t]},e)})})})()]}),(0,H.jsx)(`div`,{style:{padding:12,display:a?`grid`:`flex`,gridTemplateColumns:a?`1fr 1fr`:void 0,flexDirection:a?void 0:`column`,gap:10},children:t.map((e,t)=>(0,H.jsx)(Se,{order:e,isLatest:t===0&&!s&&p===`date_desc`},e._id))})]},e)})});if(a){let n=[`all`,`pending`,`completed`,`partial`,`cancelled`],r=new Date(new Date().getFullYear(),new Date().getMonth()+1,0);return(0,H.jsxs)(`div`,{style:{width:`100%`,padding:`0 0 48px`},children:[h&&(0,H.jsxs)(`div`,{style:{background:`linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)`,border:`1px solid #fecdd3`,borderRadius:12,padding:`12px 16px`,marginBottom:16,display:`flex`,alignItems:`center`,gap:12,boxShadow:`0 2px 8px rgba(225,29,72,0.04)`,position:`relative`},children:[(0,H.jsx)(`button`,{onClick:_,style:{position:`absolute`,top:12,right:12,background:`transparent`,border:`none`,color:`#f43f5e`,cursor:`pointer`,padding:4},children:(0,H.jsxs)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,H.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,H.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})}),(0,H.jsx)(`div`,{style:{width:32,height:32,borderRadius:8,background:`#f43f5e`,color:`#fff`,display:`grid`,placeItems:`center`,flexShrink:0},children:(0,H.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,H.jsx)(`path`,{d:`M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z`}),(0,H.jsx)(`line`,{x1:`12`,y1:`9`,x2:`12`,y2:`13`}),(0,H.jsx)(`line`,{x1:`12`,y1:`17`,x2:`12.01`,y2:`17`})]})}),(0,H.jsxs)(`div`,{style:{flex:1,paddingRight:30},children:[(0,H.jsx)(`div`,{style:{fontSize:13,fontWeight:800,color:`#be123c`,marginBottom:2},children:`System Auto-Cleanup Notice`}),(0,H.jsxs)(`div`,{style:{fontSize:12,color:`#9f1239`,fontWeight:500},children:[`All orders and attached images will be permanently deleted on `,(0,H.jsxs)(`strong`,{children:[r.toLocaleDateString(`en-IN`,{day:`numeric`,month:`long`,year:`numeric`}),` at 11:55 PM`]}),`.`]})]})]}),!t&&e?.length>0&&(0,H.jsx)(Ce,{allOrders:e}),(0,H.jsxs)(`div`,{style:{display:`flex`,gap:10,marginBottom:14,alignItems:`center`},children:[(0,H.jsx)(`div`,{style:{flex:1},children:(0,H.jsx)(C,{})}),(0,H.jsx)(`div`,{style:{display:`flex`,gap:6,flexShrink:0},children:n.map(e=>{let t=e===`all`?{bg:`#eef2ff`,text:`#4338ca`,dot:`#6366f1`,border:`#c7d2fe`}:K(e),n=l===e;return(0,H.jsx)(`button`,{onClick:()=>u(e),style:{padding:`8px 14px`,borderRadius:10,fontSize:11,fontWeight:700,textTransform:`capitalize`,border:`1.5px solid ${n?t.border:`#e2e8f0`}`,background:n?t.bg:`#fff`,color:n?t.text:`#64748b`,cursor:`pointer`,transition:`all 0.12s`,whiteSpace:`nowrap`},onMouseEnter:e=>{n||(e.currentTarget.style.borderColor=`#c7d2fe`,e.currentTarget.style.color=`#4f46e5`)},onMouseLeave:e=>{n||(e.currentTarget.style.borderColor=`#e2e8f0`,e.currentTarget.style.color=`#64748b`)},children:e},e)})})]}),(0,H.jsx)(w,{}),t&&(!e||e.length===0)?(0,H.jsx)(`div`,{style:{textAlign:`center`,padding:`60px 20px`},children:(0,H.jsxs)(`div`,{style:{display:`inline-flex`,gap:6,alignItems:`center`,color:`#94a3b8`,fontSize:13,fontWeight:600},children:[(0,H.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{animation:`spin 1s linear infinite`},children:[(0,H.jsx)(`path`,{d:`M21 12a9 9 0 11-18 0 9 9 0 0118 0z`,strokeOpacity:`0.3`}),(0,H.jsx)(`path`,{d:`M21 12a9 9 0 00-9-9`})]}),`Loading orders…`]})}):(0,H.jsx)(T,{})]})}let E=new Date(new Date().getFullYear(),new Date().getMonth()+1,0);return(0,H.jsxs)(`div`,{style:{width:`100%`,padding:`0 0 40px`},children:[h&&(0,H.jsxs)(`div`,{style:{background:`linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)`,border:`1px solid #fecdd3`,borderRadius:14,padding:`14px`,marginBottom:16,display:`flex`,alignItems:`flex-start`,gap:12,position:`relative`},children:[(0,H.jsx)(`button`,{onClick:_,style:{position:`absolute`,top:10,right:10,background:`transparent`,border:`none`,color:`#f43f5e`,cursor:`pointer`,padding:4},children:(0,H.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,H.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,H.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})}),(0,H.jsx)(`div`,{style:{width:32,height:32,borderRadius:8,background:`#f43f5e`,color:`#fff`,display:`grid`,placeItems:`center`,flexShrink:0,marginTop:2},children:(0,H.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,H.jsx)(`path`,{d:`M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z`}),(0,H.jsx)(`line`,{x1:`12`,y1:`9`,x2:`12`,y2:`13`}),(0,H.jsx)(`line`,{x1:`12`,y1:`17`,x2:`12.01`,y2:`17`})]})}),(0,H.jsxs)(`div`,{style:{paddingRight:20},children:[(0,H.jsx)(`div`,{style:{fontSize:13,fontWeight:800,color:`#be123c`,marginBottom:4},children:`Auto-Delete Scheduled`}),(0,H.jsxs)(`div`,{style:{fontSize:12,color:`#9f1239`,fontWeight:500,lineHeight:1.4},children:[`All orders will be deleted on `,(0,H.jsx)(`strong`,{children:E.toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`,year:`numeric`})}),`.`]})]})]}),(0,H.jsx)(`div`,{style:{marginBottom:12},children:(0,H.jsx)(C,{})}),(0,H.jsx)(w,{}),t&&(!e||e.length===0)?(0,H.jsx)(`div`,{style:{textAlign:`center`,padding:`60px 20px`,color:`#94a3b8`,fontWeight:600,fontSize:13},children:`Loading orders…`}):(0,H.jsx)(T,{})]})},q=g.create({baseURL:`/api`,withCredentials:!0}),Ee=async()=>(await q.get(`/getStock/company-sheets`)).data,De=async(e,{page:t=1,limit:n=12,search:r=``}={})=>(await q.get(`/getStock/company-stock/${e}`,{params:{page:t,limit:n,search:r}})).data,Oe=async({page:e=1,limit:t=12,search:n=``}={})=>(await q.get(`/getStock/boschStock`,{params:{page:e,limit:t,search:n}})).data,ke=async({page:e=1,limit:t=12,search:n=``}={})=>(await q.get(`/getStock/master-search`,{params:{page:e,limit:t,search:n}})).data,Ae=async e=>(await q.post(`/salesOrder/create`,e,{headers:{"Content-Type":`multipart/form-data`}})).data,je=async({page:e=1,limit:t=10}={})=>(await q.get(`/salesOrder/my`,{params:{page:e,limit:t}})).data,Me=async e=>(await q.get(`/salesOrder/${e}`)).data,Ne=async e=>(await q.get(`/salesOrder/search`,{params:{q:e}})).data,Pe=async e=>(await q.delete(`/salesOrder/${e}`)).data,Fe=h({name:`sales`,initialState:{companySheets:[],companyStock:[],boschStock:[],myOrders:[],ordersPagination:null,activeOrder:null,searchResults:[],loading:!1,orderLoading:!1,error:null},reducers:{setCompanySheets:(e,t)=>{e.companySheets=t.payload},setCompanyStock:(e,t)=>{e.companyStock=t.payload},setBoschStock:(e,t)=>{e.boschStock=t.payload},setMyOrders:(e,t)=>{e.myOrders=t.payload},appendMyOrders:(e,t)=>{e.myOrders=[...e.myOrders,...t.payload]},setOrdersPagination:(e,t)=>{e.ordersPagination=t.payload},setActiveOrder:(e,t)=>{e.activeOrder=t.payload},setSearchResults:(e,t)=>{e.searchResults=t.payload},prependOrder:(e,t)=>{e.myOrders=[t.payload,...e.myOrders]},removeOrder:(e,t)=>{e.myOrders=e.myOrders.filter(e=>e._id!==t.payload)},setLoading:(e,t)=>{e.loading=t.payload},setOrderLoading:(e,t)=>{e.orderLoading=t.payload},setError:(e,t)=>{e.error=t.payload}}}),{setCompanySheets:Ie,setCompanyStock:Le,setBoschStock:Re,setMyOrders:ze,appendMyOrders:Be,setOrdersPagination:Ve,setActiveOrder:He,setSearchResults:Ue,prependOrder:We,removeOrder:Ge,setLoading:J,setOrderLoading:Y,setError:X}=Fe.actions,Ke=Fe.reducer,qe=()=>{let e=d();return{fetchCompanySheets:async()=>{try{e(J(!0)),e(Ie((await Ee()).companySheets||[]))}catch(t){e(X(t?.response?.data?.message||t.message))}finally{e(J(!1))}},fetchCompanyStock:async(t,n)=>{try{e(J(!0)),e(Le((await De(t,n)).companyStock||[]))}catch(t){e(X(t?.response?.data?.message||t.message))}finally{e(J(!1))}},fetchBoschStock:async t=>{try{e(J(!0)),e(Re((await Oe(t)).boschStock||[]))}catch(t){e(X(t?.response?.data?.message||t.message))}finally{e(J(!1))}},createOrder:async t=>{e(Y(!0));try{let n=await Ae(t);return e(We(n.order)),n}catch(t){let n=t?.response?.data?.message||t.message;throw e(X(n)),Error(n)}finally{e(Y(!1))}},fetchMyOrders:async({page:t=1,limit:n=10}={})=>{e(Y(!0));try{let r=await je({page:t,limit:n});e(ze(r.orders||[])),e(Ve(r.pagination||null))}catch(t){e(X(t?.response?.data?.message||t.message))}finally{e(Y(!1))}},fetchOrderById:async t=>{e(Y(!0));try{let n=await Me(t);return e(He(n.order)),n.order}catch(t){let n=t?.response?.data?.message||t.message;throw e(X(n)),Error(n)}finally{e(Y(!1))}},searchOrders:async t=>{e(Y(!0));try{e(Ue((await Ne(t)).orders||[]))}catch(t){e(X(t?.response?.data?.message||t.message))}finally{e(Y(!1))}},deleteOrder:async t=>{e(Y(!0));try{return await Pe(t),e(Ge(t)),!0}catch(t){let n=t?.response?.data?.message||t.message;throw e(X(n)),Error(n)}finally{e(Y(!1))}}}},Z=7,Je=({onSuccess:e})=>{let{createOrder:t}=qe(),n=o(e=>e.sales.orderLoading),[r,i]=(0,D.useState)(``),[a,s]=(0,D.useState)(``),[c,l]=(0,D.useState)([]),[u,d]=(0,D.useState)(``),[f,p]=(0,D.useState)(!1),m=(0,D.useRef)(null),h=(0,D.useRef)(null),g=(0,D.useRef)(null),_=(0,D.useRef)(null),y=(0,D.useRef)(null),b=(0,D.useRef)(null),x=(0,D.useRef)(null),S=(0,D.useRef)(null),C=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=[g.current,_.current,y.current,b.current,x.current];v.set(e,{opacity:0,y:18}),v.timeline({defaults:{ease:`power3.out`}}).to(m.current,{opacity:1,duration:0}).to(e,{opacity:1,y:0,duration:.4,stagger:.07})},[]);let w=e=>{let t=Array.from(e.target.files||[]),n=Z-c.length,r=t.slice(0,n).map(e=>({file:e,preview:URL.createObjectURL(e)}));l(e=>[...e,...r]),e.target.value=``},T=e=>{l(t=>(URL.revokeObjectURL(t[e].preview),t.filter((t,n)=>n!==e)))},E=()=>{v.to(m.current,{x:[-8,8,-6,6,-3,3,0],duration:.45,ease:`none`})};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`style`,{children:`
        .co-card {
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 20px;
          padding: 36px 32px 28px;
          max-width: 560px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          will-change: transform;
        }
        @media (max-width: 520px) { .co-card { padding: 28px 18px 22px; border-radius: 16px; } }

        .co-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .co-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 2px;
          background: var(--color-primary);
          border-radius: 2px;
        }

        .co-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -0.6px;
          margin-bottom: 28px;
        }

        .co-field { margin-bottom: 18px; }
        .co-label {
          display: block;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--color-outline);
          margin-bottom: 7px;
        }
        .co-input, .co-textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 14px;
          background: var(--color-surface-container-low);
          border: 1.5px solid transparent;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--color-on-surface);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .co-textarea { resize: vertical; min-height: 80px; }
        .co-input::placeholder, .co-textarea::placeholder { color: var(--color-outline); }
        .co-input:focus, .co-textarea:focus {
          border-color: var(--color-primary);
          background: var(--color-surface-container-lowest);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
        }

        /* Image upload zone */
        .co-img-zone {
          border: 1.5px dashed var(--color-outline-variant);
          border-radius: 12px;
          padding: 16px;
          background: var(--color-surface-container-low);
          transition: border-color 0.2s, background 0.2s;
        }
        .co-img-zone:hover { border-color: var(--color-primary); background: var(--color-surface-container); }
        .co-img-add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-primary);
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          margin-bottom: images.length > 0 ? '12px' : '0';
          font-family: 'DM Sans', sans-serif;
        }
        .co-img-add-btn:hover { opacity: 0.8; }
        .co-img-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
          gap: 10px;
          margin-top: 12px;
        }
        .co-img-thumb {
          position: relative;
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--color-outline-variant);
        }
        .co-img-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .co-img-remove {
          position: absolute;
          top: 4px; right: 4px;
          width: 20px; height: 20px;
          background: rgba(0,0,0,0.65);
          color: #fff;
          border: none;
          border-radius: 50%;
          font-size: 10px;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: background 0.15s;
        }
        .co-img-remove:hover { background: #ba1a1a; }
        .co-img-count {
          font-size: 11px;
          color: var(--color-on-surface-variant);
          margin-top: 8px;
        }

        .co-error {
          font-size: 12.5px;
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

        .co-btn {
          width: 100%;
          margin-top: 8px;
          padding: 14px;
          background: var(--color-primary);
          color: var(--color-on-primary);
          border: none;
          border-radius: 10px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          will-change: transform;
        }
        .co-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,37,66,0.22);
        }
        .co-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        /* Success overlay */
        .co-success {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: var(--color-surface-container-lowest);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          z-index: 10;
        }
        .co-success-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          display: grid;
          place-items: center;
          font-size: 30px;
        }
        .co-success-text {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--color-on-surface);
          letter-spacing: -0.3px;
        }
        .co-success-sub {
          font-size: 13px;
          color: var(--color-on-surface-variant);
        }
      `}),(0,H.jsxs)(`div`,{ref:m,className:`co-card`,style:{opacity:0},children:[f&&(0,H.jsxs)(`div`,{ref:C,className:`co-success`,style:{opacity:0},children:[(0,H.jsx)(`div`,{className:`co-success-icon`,children:`✅`}),(0,H.jsx)(`div`,{className:`co-success-text`,children:`Order Created!`}),(0,H.jsx)(`div`,{className:`co-success-sub`,children:`Your order has been submitted successfully.`})]}),(0,H.jsxs)(`div`,{ref:g,children:[(0,H.jsx)(`div`,{className:`co-eyebrow`,children:`New Order`}),(0,H.jsx)(`div`,{className:`co-title`,children:`Punch an Order`})]}),(0,H.jsxs)(`form`,{ref:h,onSubmit:async n=>{if(n.preventDefault(),d(``),!r.trim()){d(`Party name is required`),E();return}v.to(x.current,{scale:.97,duration:.08,yoyo:!0,repeat:1});let o=new FormData;o.append(`partyName`,r.trim()),o.append(`description`,a.trim()),c.forEach(({file:e})=>o.append(`images`,e));try{await t(o),p(!0),v.fromTo(C.current,{scale:.85,opacity:0},{scale:1,opacity:1,duration:.45,ease:`back.out(1.7)`}),setTimeout(()=>{i(``),s(``),l([]),p(!1),e?.()},1800)}catch(e){d(e.message),E()}},children:[u&&(0,H.jsxs)(`div`,{className:`co-error`,children:[(0,H.jsx)(`span`,{style:{width:6,height:6,borderRadius:`50%`,background:`#ba1a1a`,flexShrink:0}}),u]}),(0,H.jsxs)(`div`,{ref:_,className:`co-field`,children:[(0,H.jsx)(`label`,{className:`co-label`,htmlFor:`co-party`,children:`Party Name *`}),(0,H.jsx)(`input`,{className:`co-input`,id:`co-party`,type:`text`,placeholder:`e.g. Sharma Enterprises`,value:r,onChange:e=>i(e.target.value),required:!0})]}),(0,H.jsxs)(`div`,{ref:y,className:`co-field`,children:[(0,H.jsx)(`label`,{className:`co-label`,htmlFor:`co-desc`,children:`Description`}),(0,H.jsx)(`textarea`,{className:`co-textarea`,id:`co-desc`,placeholder:`Order details, notes, requirements...`,value:a,onChange:e=>s(e.target.value),rows:3})]}),(0,H.jsxs)(`div`,{ref:b,className:`co-field`,children:[(0,H.jsxs)(`label`,{className:`co-label`,children:[`Images \xA0`,(0,H.jsxs)(`span`,{style:{fontWeight:400,textTransform:`none`,letterSpacing:0},children:[`(`,c.length,`/`,Z,`)`]})]}),(0,H.jsxs)(`div`,{className:`co-img-zone`,children:[c.length<Z&&(0,H.jsxs)(`button`,{type:`button`,className:`co-img-add-btn`,onClick:()=>S.current?.click(),children:[(0,H.jsx)(`span`,{style:{fontSize:18},children:`📷`}),`Add Photos`]}),(0,H.jsx)(`input`,{ref:S,type:`file`,accept:`image/jpeg,image/png,image/webp`,multiple:!0,style:{display:`none`},onChange:w}),c.length>0&&(0,H.jsx)(`div`,{className:`co-img-grid`,children:c.map(({preview:e},t)=>(0,H.jsxs)(`div`,{className:`co-img-thumb`,children:[(0,H.jsx)(`img`,{src:e,alt:`preview-${t}`}),(0,H.jsx)(`button`,{type:`button`,className:`co-img-remove`,onClick:()=>T(t),title:`Remove`,children:`✕`})]},t))}),c.length===0&&(0,H.jsxs)(`div`,{className:`co-img-count`,children:[`Upload up to `,Z,` images (JPG, PNG, WEBP)`]})]})]}),(0,H.jsx)(`div`,{ref:x,style:{opacity:0},children:(0,H.jsx)(`button`,{className:`co-btn`,type:`submit`,disabled:n,children:n?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`span`,{style:{fontSize:16,animation:`spin 1s linear infinite`},children:`⏳`}),`Submitting…`]}):(0,H.jsx)(H.Fragment,{children:`Submit Order →`})})})]})]})]})},Ye=({activeTab:e,onTabChange:t})=>{let n=o(e=>e.auth.user),{logout:r}=E(),i=s(),[a,c]=(0,D.useState)(!1),l=(0,D.useRef)(null),u=(0,D.useRef)(null),d=(0,D.useRef)(null),f=(0,D.useRef)({}),p=[{id:`overview`,label:`Dashboard`,icon:(0,H.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,H.jsx)(`path`,{d:`m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`}),(0,H.jsx)(`polyline`,{points:`9 22 9 12 15 12 15 22`})]})},{id:`company`,label:`Co. Stock`,icon:(0,H.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,H.jsx)(`path`,{d:`M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z`}),(0,H.jsx)(`polyline`,{points:`3.27 6.96 12 12.01 20.73 6.96`}),(0,H.jsx)(`line`,{x1:`12`,y1:`22.08`,x2:`12`,y2:`12`})]})},{id:`bosch`,label:`Bosch`,icon:(0,H.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,H.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,H.jsx)(`path`,{d:`M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20`}),(0,H.jsx)(`path`,{d:`M2 12h20`})]})},{id:`orders`,label:`Punch`,icon:(0,H.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,H.jsx)(`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`}),(0,H.jsx)(`path`,{d:`M8 12h8`}),(0,H.jsx)(`path`,{d:`M12 8v8`})]})},{id:`history`,label:`History`,icon:(0,H.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,H.jsx)(`path`,{d:`M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z`}),(0,H.jsx)(`path`,{d:`M14 2v6h6`}),(0,H.jsx)(`path`,{d:`M16 13H8`}),(0,H.jsx)(`path`,{d:`M16 17H8`}),(0,H.jsx)(`path`,{d:`M10 9H8`})]})}];(0,D.useEffect)(()=>{u.current&&v.fromTo(u.current,{y:-80,opacity:0},{y:0,opacity:1,duration:.7,ease:`power4.out`,onComplete:()=>v.set(u.current,{clearProps:`transform,y`})})},[]),(0,D.useEffect)(()=>{let t=f.current[e];if(!t||!d.current)return;let{offsetLeft:n,offsetWidth:r}=t;v.to(d.current,{x:n,width:r,duration:.38,ease:`power3.inOut`})},[e]),(0,D.useEffect)(()=>{let e=e=>{l.current&&!l.current.contains(e.target)&&c(!1)};return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[]);let m=async()=>{await r(),i(`/login`)},h=n?.name?n.name.split(` `).map(e=>e[0]).join(``).toUpperCase().slice(0,2):`SL`;return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');

        /* ════════════════════════════════════
           DESKTOP TOPBAR
        ════════════════════════════════════ */
        .snav {
          position: sticky;
          top: 0;
          z-index: 200;
          background: color-mix(in srgb, var(--color-surface-container-lowest) 94%, transparent);
          backdrop-filter: blur(24px) saturate(1.6);
          -webkit-backdrop-filter: blur(24px) saturate(1.6);
          border-bottom: 1px solid color-mix(in srgb, var(--color-outline-variant) 60%, transparent);
        }
          
        .snav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          height: 64px;
          gap: 0;
        }

        /* Brand */
        .snav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-right: 28px;
          flex-shrink: 0;
        }
        .snav-logo {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: var(--color-primary);
          display: grid; place-items: center;
          box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary) 40%, transparent);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          flex-shrink: 0;
        }
        .snav-logo:hover {
          transform: scale(1.08) rotate(-6deg);
          box-shadow: 0 8px 20px color-mix(in srgb, var(--color-primary) 50%, transparent);
        }
        .snav-logo svg { width: 16px; height: 16px; fill: var(--color-on-primary); }
        .snav-brand-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: 15px;
          color: var(--color-on-surface);
          letter-spacing: -0.5px;
          white-space: nowrap;
        }
        .snav-brand-name span { color: var(--color-primary); }

        /* Tab rail */
        .snav-tabs {
          display: flex; align-items: center;
          gap: 2px; flex: 1; position: relative;
        }
        .snav-tab-indicator {
          position: absolute; bottom: -22px;
          height: 2px;
          background: var(--color-primary);
          border-radius: 2px 2px 0 0;
          pointer-events: none;
        }
        .snav-tab {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 16px; border-radius: 8px; border: none;
          background: transparent; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 500;
          color: var(--color-on-surface-variant);
          transition: color 0.2s ease, background 0.2s ease;
          white-space: nowrap; position: relative;
        }
        .snav-tab:hover {
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 8%, transparent);
        }
        .snav-tab.active {
          color: var(--color-primary); font-weight: 700;
          background: color-mix(in srgb, var(--color-primary) 10%, transparent);
        }
        .snav-tab-icon { 
          display: grid; place-items: center; 
          transition: transform 0.3s ease; 
        }
        .snav-tab.active .snav-tab-icon { transform: scale(1.15); }

        /* Right section */
        .snav-right {
          display: flex; align-items: center;
          gap: 14px; flex-shrink: 0; margin-left: auto;
        }
        .snav-user-info { text-align: right; line-height: 1.35; }
        .snav-user-name { font-size: 13px; font-weight: 600; color: var(--color-on-surface); }
        .snav-user-email { font-size: 11px; color: var(--color-on-surface-variant); }

        /* Avatar */
        .snav-avatar-wrap { position: relative; }
        .snav-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary, var(--color-primary-container)));
          color: var(--color-on-primary);
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: 13px;
          display: grid; place-items: center;
          cursor: pointer;
          box-shadow: 0 0 0 2px var(--color-outline-variant);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          user-select: none; position: relative;
        }
        .snav-avatar:hover {
          box-shadow: 0 0 0 3px var(--color-primary);
          transform: scale(1.05);
        }
        .snav-avatar-pulse {
          position: absolute; bottom: 0; right: 0;
          width: 10px; height: 10px;
          background: #2ecc71; border-radius: 50%;
          border: 2px solid var(--color-surface-container-lowest);
        }

        /* Dropdown */
        .snav-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          background: var(--color-surface-container-lowest);
          backdrop-filter: blur(20px);
          border: 1px solid var(--color-outline-variant);
          border-radius: 16px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08);
          min-width: 200px; padding: 8px;
          animation: snavDropIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both;
          z-index: 500;
        }
        @keyframes snavDropIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); transform-origin: top right; }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .snav-drop-header {
          padding: 10px 14px 12px;
          border-bottom: 1px solid var(--color-outline-variant);
          margin-bottom: 6px;
        }
        .snav-drop-name { font-weight: 700; font-size: 13.5px; color: var(--color-on-surface); }
        .snav-drop-email { font-size: 11.5px; color: var(--color-on-surface-variant); margin-top: 2px; }
        .snav-drop-item {
          width: 100%; padding: 10px 14px; border: none;
          background: transparent; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; color: var(--color-on-surface);
          text-align: left; cursor: pointer;
          display: flex; align-items: center; gap: 10px;
          transition: background 0.15s; font-weight: 500;
        }
        .snav-drop-item:hover { background: var(--color-surface-container); }
        .snav-drop-item.danger { color: #ba1a1a; }
        .snav-drop-item.danger:hover { background: #ffdad6; }
        .snav-drop-item-icon { font-size: 15px; }
        .snav-drop-divider { height: 1px; background: var(--color-outline-variant); margin: 6px 0; }

        /* ════════════════════════════════════
           MOBILE BOTTOM NAV
           – always position:fixed bottom:0
           – hidden by default via display:none
        ════════════════════════════════════ */
        .snav-bottom {
          display: none;
        }

        @media (max-width: 768px) {
          /* Shrink topbar on mobile — still visible for brand/avatar */
          .snav-inner { padding: 0 16px; height: 56px; }
          .snav-tabs { display: none; }
          .snav-user-info { display: none; }
          .snav-tab-indicator { display: none; }

          /* Show bottom nav */
          .snav-bottom {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            background: var(--color-surface-container-lowest, #fff);
            backdrop-filter: blur(20px) saturate(1.5);
            -webkit-backdrop-filter: blur(20px) saturate(1.5);
            border-top: 1px solid var(--color-outline-variant, #e0e0e0);
            box-shadow: 0 -4px 24px rgba(0,0,0,0.10);
            padding: 0 4px;
            padding-bottom: env(safe-area-inset-bottom, 0px);
            justify-content: space-around;
            align-items: stretch;
            /* No GSAP transform — always stays at bottom */
          }

          .snav-bot-tab {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 10px 4px 10px;
            border: none;
            background: transparent;
            cursor: pointer;
            border-radius: 0;
            -webkit-tap-highlight-color: transparent;
            position: relative;
            min-height: 56px;
          }
          .snav-bot-tab:active {
            background: color-mix(in srgb, var(--color-primary) 10%, transparent);
          }

          /* Active pill background */
          .snav-bot-tab.active::before {
            content: '';
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 48px;
            height: 32px;
            border-radius: 16px;
            background: color-mix(in srgb, var(--color-primary) 14%, transparent);
          }

          .snav-bot-icon {
            display: grid; place-items: center;
            color: var(--color-on-surface-variant);
            position: relative;
            z-index: 1;
            transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.25s ease;
          }
          .snav-bot-tab.active .snav-bot-icon {
            transform: translateY(-2px) scale(1.1);
            color: var(--color-primary);
          }

          .snav-bot-dot {
            display: none; /* replaced by pill ::before */
          }

          .snav-bot-label {
            font-family: 'DM Sans', sans-serif;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.01em;
            color: var(--color-on-surface-variant);
            transition: color 0.2s ease;
            position: relative;
            z-index: 1;
          }
          .snav-bot-tab.active .snav-bot-label {
            color: var(--color-primary);
          }
        }

        @media (max-width: 400px) {
          .snav-brand-name { display: none; }
          .snav-bot-label { font-size: 9px; }
        }
      `}),(0,H.jsx)(`nav`,{className:`snav`,ref:u,children:(0,H.jsxs)(`div`,{className:`snav-inner`,children:[(0,H.jsxs)(`a`,{className:`snav-brand`,href:`/`,children:[(0,H.jsx)(`div`,{className:`snav-logo`,children:(0,H.jsx)(`svg`,{viewBox:`0 0 16 16`,children:(0,H.jsx)(`path`,{d:`M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z`})})}),(0,H.jsxs)(`span`,{className:`snav-brand-name`,children:[`B.K `,(0,H.jsx)(`span`,{children:`Eng`})]})]}),(0,H.jsxs)(`div`,{className:`snav-tabs`,children:[p.map(n=>(0,H.jsxs)(`button`,{ref:e=>f.current[n.id]=e,className:`snav-tab${e===n.id?` active`:``}`,onClick:()=>t(n.id),id:`snav-tab-${n.id}`,children:[(0,H.jsx)(`span`,{className:`snav-tab-icon`,children:n.icon}),n.label]},n.id)),(0,H.jsx)(`div`,{className:`snav-tab-indicator`,ref:d})]}),(0,H.jsxs)(`div`,{className:`snav-right`,children:[(0,H.jsxs)(`div`,{className:`snav-user-info`,children:[(0,H.jsx)(`div`,{className:`snav-user-name`,children:n?.name||`Sales User`}),(0,H.jsx)(`div`,{className:`snav-user-email`,children:n?.email||``})]}),(0,H.jsxs)(`div`,{className:`snav-avatar-wrap`,ref:l,children:[(0,H.jsxs)(`div`,{className:`snav-avatar`,onClick:()=>c(e=>!e),title:`Account`,children:[h,(0,H.jsx)(`span`,{className:`snav-avatar-pulse`})]}),a&&(0,H.jsxs)(`div`,{className:`snav-dropdown`,children:[(0,H.jsxs)(`div`,{className:`snav-drop-header`,children:[(0,H.jsx)(`div`,{className:`snav-drop-name`,children:n?.name||`Sales User`}),(0,H.jsx)(`div`,{className:`snav-drop-email`,children:n?.email||``})]}),(0,H.jsxs)(`button`,{className:`snav-drop-item`,children:[(0,H.jsx)(`span`,{className:`snav-drop-item-icon`,children:`👤`}),` Profile`]}),(0,H.jsxs)(`button`,{className:`snav-drop-item`,children:[(0,H.jsx)(`span`,{className:`snav-drop-item-icon`,children:`⚙️`}),` Settings`]}),(0,H.jsx)(`div`,{className:`snav-drop-divider`}),(0,H.jsxs)(`button`,{className:`snav-drop-item danger`,onClick:m,children:[(0,H.jsx)(`span`,{className:`snav-drop-item-icon`,children:`🚪`}),` Sign out`]})]})]})]})]})}),(0,k.createPortal)((0,H.jsx)(`div`,{className:`snav-bottom`,children:p.map(n=>(0,H.jsxs)(`button`,{className:`snav-bot-tab${e===n.id?` active`:``}`,onClick:()=>t(n.id),id:`snav-bot-${n.id}`,children:[(0,H.jsx)(`span`,{className:`snav-bot-icon`,children:n.icon}),(0,H.jsx)(`span`,{className:`snav-bot-dot`}),(0,H.jsx)(`span`,{className:`snav-bot-label`,children:n.label})]},n.id))}),document.body)]})},Xe={out:{label:`Out of Stock`,color:`#DC2626`,bg:`rgba(220,38,38,0.07)`,border:`rgba(220,38,38,0.18)`,dot:`#DC2626`,strip:`#DC2626`},low:{label:`Low Stock`,color:`#D97706`,bg:`rgba(217,119,6,0.08)`,border:`rgba(217,119,6,0.20)`,dot:`#D97706`,strip:`#D97706`},good:{label:`In Stock`,color:`#059669`,bg:`rgba(5,150,105,0.07)`,border:`rgba(5,150,105,0.18)`,dot:`#059669`,strip:`#059669`}},Ze=e=>{let t=parseInt(e);return isNaN(t)||t===0?`out`:t<=5?`low`:`good`},Qe=e=>{if(!e)return null;try{let t=new Date(e),n=new Date-t,r=Math.floor(n/864e5);return r===0?`Updated today`:r===1?`Updated yesterday`:r<7?`Updated ${r}d ago`:`Updated ${t.toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`,year:r>365?`2-digit`:void 0})}`}catch{return null}},$e=D.memo(({item:e})=>{let t=(0,D.useRef)(null),n=Xe[Ze(e.quantity)],r=e.mrp!==void 0&&e.mrp!==null&&e.mrp!==``,i=Qe(e.updatedAt||e.lastUpdated||e.updated_at);return(0,D.useEffect)(()=>{v.fromTo(t.current,{y:20,opacity:0},{y:0,opacity:1,duration:.42,ease:`power3.out`,onComplete:()=>v.set(t.current,{clearProps:`transform`})})},[]),(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;700&display=swap');

        /* ─── Card Shell ─── */
        .pc2-card {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E5E7EB;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          position: relative;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          cursor: default;
          will-change: transform;
        }
        .pc2-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
          border-color: #D1D5DB;
          transform: translateY(-2px);
        }

        /* ─── Status Strip ─── */
        .pc2-strip { height: 3px; flex-shrink: 0; }

        /* ─── Top Row: Part No + Status ─── */
        .pc2-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          padding: 14px 16px 0;
        }
        .pc2-partno-group { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .pc2-partno-label {
          font-size: 9.5px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #9CA3AF;
        }
        .pc2-partno {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px; font-weight: 700;
          color: #111827;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 160px;
          letter-spacing: 0.03em;
        }

        /* Status badge */
        .pc2-status {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 9px; border-radius: 20px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.03em; white-space: nowrap;
          border: 1px solid; flex-shrink: 0;
        }
        .pc2-status-dot {
          width: 5px; height: 5px; border-radius: 50%;
          flex-shrink: 0;
          animation: pc2Pulse 2.4s ease infinite;
        }
        @keyframes pc2Pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

        /* ─── Item Name ─── */
        .pc2-name-wrap { padding: 10px 16px 0; }
        .pc2-name {
          font-size: 15px; font-weight: 700;
          color: #111827; line-height: 1.3;
          letter-spacing: -0.2px;
        }

        /* ─── Sheet tag ─── */
        .pc2-sheet-wrap { padding: 6px 16px 0; }
        .pc2-sheet {
          display: inline-flex; align-items: center; gap: 5px;
          background: #F3F4F6; border: 1px solid #E5E7EB;
          border-radius: 6px; padding: 3px 9px;
          font-size: 11px; font-weight: 500; color: #6B7280;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%; align-self: flex-start;
        }
        .pc2-sheet svg { flex-shrink: 0; opacity: 0.6; }

        /* ─── Divider ─── */
        .pc2-divider { height: 1px; background: #F3F4F6; margin: 12px 16px 0; }

        /* ─── Metrics ─── */
        .pc2-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 12px 16px;
        }
        .pc2-metric {
          border-radius: 12px;
          padding: 11px 13px;
          display: flex; flex-direction: column; gap: 3px;
          border: 1px solid;
        }
        .pc2-metric-label {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          opacity: 0.6;
        }
        .pc2-metric-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 28px; font-weight: 700;
          line-height: 1; letter-spacing: -1px;
        }
        .pc2-metric-unit {
          font-size: 10px; font-weight: 500; opacity: 0.55;
        }

        /* MRP block */
        .pc2-mrp-block {
          border-radius: 12px; padding: 11px 13px;
          display: flex; flex-direction: column; gap: 3px;
          background: #F5F3FF; border: 1px solid rgba(109,40,217,0.15);
        }
        .pc2-mrp-label {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #7C3AED; opacity: 0.7;
        }
        .pc2-mrp-val {
          display: flex; align-items: baseline; gap: 1px;
          color: #111827;
        }
        .pc2-mrp-sym { font-size: 14px; font-weight: 700; color: #7C3AED; }
        .pc2-mrp-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 24px; font-weight: 700;
          line-height: 1; letter-spacing: -1px; color: #111827;
        }
        .pc2-mrp-unit { font-size: 10px; color: #7C3AED; opacity: 0.6; font-weight: 500; }

        /* ─── Description ─── */
        .pc2-desc {
          margin: 0 16px;
          background: #F9FAFB; border: 1px solid #E5E7EB;
          border-radius: 10px; padding: 9px 12px;
        }
        .pc2-desc-label {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #9CA3AF; margin-bottom: 3px;
        }
        .pc2-desc-text { font-size: 12px; color: #6B7280; line-height: 1.5; }

        /* ─── Footer: Last Updated ─── */
        .pc2-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px 14px;
          margin-top: auto;
          gap: 8px;
        }
        .pc2-updated {
          display: flex; align-items: center; gap: 5px;
          font-size: 10.5px; font-weight: 500; color: #9CA3AF;
        }
        .pc2-updated svg { opacity: 0.6; flex-shrink: 0; }
        .pc2-sno {
          font-size: 10px; color: #D1D5DB; font-weight: 500;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ─── Mobile ─── */
        @media (max-width: 768px) {
          .pc2-name { font-size: 14px; }
          .pc2-metric-value { font-size: 24px; }
          .pc2-mrp-num { font-size: 20px; }
          .pc2-partno { font-size: 12px; }
          .pc2-metrics { padding: 10px 14px; gap: 8px; }
          .pc2-top { padding: 12px 14px 0; }
          .pc2-name-wrap { padding: 8px 14px 0; }
          .pc2-sheet-wrap { padding: 5px 14px 0; }
          .pc2-divider { margin: 10px 14px 0; }
          .pc2-desc { margin: 0 14px; }
          .pc2-footer { padding: 8px 14px 12px; }
        }
      `}),(0,H.jsxs)(`div`,{className:`pc2-card`,ref:t,children:[(0,H.jsx)(`div`,{className:`pc2-strip`,style:{background:n.strip}}),(0,H.jsxs)(`div`,{className:`pc2-top`,children:[(0,H.jsxs)(`div`,{className:`pc2-partno-group`,children:[(0,H.jsx)(`span`,{className:`pc2-partno-label`,children:`Part No.`}),(0,H.jsx)(`span`,{className:`pc2-partno`,title:e.partno,children:e.partno||`N/A`})]}),(0,H.jsxs)(`span`,{className:`pc2-status`,style:{background:n.bg,color:n.color,borderColor:n.border},children:[(0,H.jsx)(`span`,{className:`pc2-status-dot`,style:{background:n.dot}}),n.label]})]}),(0,H.jsx)(`div`,{className:`pc2-name-wrap`,children:(0,H.jsx)(`div`,{className:`pc2-name`,children:e.itemName||`Unnamed Item`})}),e.sheetName&&(0,H.jsx)(`div`,{className:`pc2-sheet-wrap`,children:(0,H.jsxs)(`span`,{className:`pc2-sheet`,children:[(0,H.jsxs)(`svg`,{width:`10`,height:`10`,viewBox:`0 0 10 10`,fill:`none`,children:[(0,H.jsx)(`rect`,{x:`0.75`,y:`0.75`,width:`8.5`,height:`8.5`,rx:`1.5`,stroke:`currentColor`,strokeWidth:`1.2`}),(0,H.jsx)(`path`,{d:`M2.5 4h5M2.5 6h3`,stroke:`currentColor`,strokeWidth:`1.2`,strokeLinecap:`round`})]}),e.sheetName]})}),(0,H.jsx)(`div`,{className:`pc2-divider`}),(0,H.jsxs)(`div`,{className:`pc2-metrics`,children:[(0,H.jsxs)(`div`,{className:`pc2-metric`,style:{background:n.bg,borderColor:n.border,color:n.color},children:[(0,H.jsx)(`span`,{className:`pc2-metric-label`,children:`Quantity`}),(0,H.jsx)(`span`,{className:`pc2-metric-value`,children:e.quantity??`—`}),(0,H.jsx)(`span`,{className:`pc2-metric-unit`,children:`units avail.`})]}),r?(0,H.jsxs)(`div`,{className:`pc2-mrp-block`,children:[(0,H.jsx)(`span`,{className:`pc2-mrp-label`,children:`MRP`}),(0,H.jsxs)(`div`,{className:`pc2-mrp-val`,children:[(0,H.jsx)(`span`,{className:`pc2-mrp-sym`,children:`₹`}),(0,H.jsx)(`span`,{className:`pc2-mrp-num`,children:e.mrp})]}),(0,H.jsx)(`span`,{className:`pc2-mrp-unit`,children:`incl. tax`})]}):(0,H.jsxs)(`div`,{className:`pc2-mrp-block`,style:{opacity:.45},children:[(0,H.jsx)(`span`,{className:`pc2-mrp-label`,children:`MRP`}),(0,H.jsx)(`div`,{className:`pc2-mrp-val`,children:(0,H.jsx)(`span`,{className:`pc2-mrp-num`,style:{fontSize:`16px`,letterSpacing:0,color:`#9CA3AF`},children:`N/A`})}),(0,H.jsx)(`span`,{className:`pc2-mrp-unit`,children:`not listed`})]})]}),e.description&&(0,H.jsxs)(`div`,{className:`pc2-desc`,style:{marginBottom:`12px`},children:[(0,H.jsx)(`div`,{className:`pc2-desc-label`,children:`Description`}),(0,H.jsx)(`div`,{className:`pc2-desc-text`,children:e.description})]}),(0,H.jsxs)(`div`,{className:`pc2-footer`,children:[(0,H.jsxs)(`div`,{className:`pc2-updated`,children:[(0,H.jsxs)(`svg`,{width:`11`,height:`11`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,H.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,H.jsx)(`path`,{d:`M12 6v6l4 2`})]}),i||`No update info`]}),e.sno&&(0,H.jsxs)(`span`,{className:`pc2-sno`,children:[`#`,e.sno]})]})]})]})});function et(e,t=420){let[n,r]=(0,D.useState)(e);return(0,D.useEffect)(()=>{let n=setTimeout(()=>r(e),t);return()=>clearTimeout(n)},[e,t]),n}var tt={pending:{label:`Pending`,color:`#b45309`,bg:`#fef3c7`},completed:{label:`Completed`,color:`#15803d`,bg:`#dcfce7`},cancelled:{label:`Cancelled`,color:`#b91c1c`,bg:`#fee2e2`},partial:{label:`Partial`,color:`#6d28d9`,bg:`#ede9fe`}},nt=({status:e})=>{let t=tt[e]||{label:e,color:`#555`,bg:`#eee`};return(0,H.jsx)(`span`,{style:{fontSize:`10.5px`,fontWeight:700,letterSpacing:`0.06em`,textTransform:`uppercase`,padding:`3px 10px`,borderRadius:`20px`,background:t.bg,color:t.color},children:t.label})},rt=e=>{if(!e)return``;let t=new Date(e);return`${t.toLocaleDateString(`en-IN`,{day:`2-digit`,month:`short`,year:`numeric`})} • ${t.toLocaleTimeString(`en-IN`,{hour:`2-digit`,minute:`2-digit`,hour12:!0})}`},it=async e=>{try{let t=await(await fetch(e,{mode:`cors`})).blob(),n=window.URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`order-image-${Date.now()}.png`,document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(n)}catch(t){console.error(`Error downloading image:`,t),window.open(e,`_blank`)}},at=({isOpen:e,onClose:t,imageUrl:n})=>{let r=(0,D.useRef)(null),i=(0,D.useRef)(null);return(0,D.useEffect)(()=>{e&&(v.fromTo(r.current,{opacity:0},{opacity:1,duration:.2}),v.fromTo(i.current,{scale:.85,opacity:0},{scale:1,opacity:1,duration:.4,ease:`back.out(1.5)`}))},[e,n]),!e||!n?null:(0,H.jsxs)(`div`,{ref:r,className:`oh-modal-overlay oh-img-overlay`,onClick:t,children:[(0,H.jsx)(`button`,{className:`oh-img-close`,onClick:t,children:`✕`}),(0,H.jsxs)(`div`,{className:`oh-img-container`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`img`,{ref:i,src:n,alt:`Full screen preview`,className:`oh-img-full`}),(0,H.jsx)(`button`,{className:`oh-img-download`,onClick:()=>it(n),children:`📥 Download Image`})]})]})},ot=({isOpen:e,onClose:t,onConfirm:n,orderName:r,loading:i})=>{let a=(0,D.useRef)(null),o=(0,D.useRef)(null);return(0,D.useEffect)(()=>{e&&(v.fromTo(a.current,{opacity:0},{opacity:1,duration:.2}),v.fromTo(o.current,{scale:.9,opacity:0,y:10},{scale:1,opacity:1,y:0,duration:.3,ease:`back.out(1.5)`}))},[e]),e?(0,H.jsx)(`div`,{ref:a,className:`oh-modal-overlay oh-overlay-small`,children:(0,H.jsxs)(`div`,{ref:o,className:`oh-modal oh-modal-small`,children:[(0,H.jsx)(`div`,{className:`oh-modal-icon-danger`,children:`⚠️`}),(0,H.jsx)(`h3`,{className:`oh-modal-title`,children:`Delete Order?`}),(0,H.jsxs)(`p`,{className:`oh-modal-text`,children:[`Are you sure you want to delete the order for `,(0,H.jsx)(`strong`,{children:r}),`? This action cannot be undone.`]}),(0,H.jsxs)(`div`,{className:`oh-modal-actions`,children:[(0,H.jsx)(`button`,{className:`oh-btn-cancel`,onClick:t,disabled:i,children:`Cancel`}),(0,H.jsx)(`button`,{className:`oh-btn-danger`,onClick:n,disabled:i,children:i?`Deleting...`:`Yes, Delete`})]})]})}):null},st=({isOpen:e,onClose:t,order:n,onImageClick:r})=>{let i=(0,D.useRef)(null),a=(0,D.useRef)(null);return(0,D.useEffect)(()=>{e&&(v.fromTo(i.current,{opacity:0},{opacity:1,duration:.2}),v.fromTo(a.current,{opacity:0,y:20},{opacity:1,y:0,duration:.3,ease:`power3.out`}))},[e]),!e||!n?null:(0,H.jsx)(`div`,{ref:i,className:`oh-modal-overlay oh-overlay-large`,onClick:t,children:(0,H.jsxs)(`div`,{ref:a,className:`oh-modal oh-modal-large`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{className:`oh-modal-close`,onClick:t,children:`✕`}),(0,H.jsxs)(`div`,{className:`oh-d-header`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h2`,{className:`oh-d-party`,children:n.partyName}),(0,H.jsxs)(`div`,{className:`oh-d-meta`,children:[(0,H.jsx)(`span`,{children:rt(n.createdAt)}),` • `,(0,H.jsxs)(`span`,{children:[`Order #`,n._id.slice(-6).toUpperCase()]})]})]}),(0,H.jsx)(nt,{status:n.status})]}),(0,H.jsxs)(`div`,{className:`oh-d-body`,children:[n.status!==`pending`&&n.remark&&(0,H.jsxs)(`div`,{className:`oh-d-section`,children:[(0,H.jsxs)(`h4`,{className:`oh-d-label`,style:{color:`#b45309`,display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,H.jsx)(`span`,{children:`⚠️`}),` Admin Remark`]}),(0,H.jsx)(`div`,{className:`oh-d-remark`,children:n.remark})]}),(0,H.jsxs)(`div`,{className:`oh-d-section`,children:[(0,H.jsx)(`h4`,{className:`oh-d-label`,children:`Description`}),(0,H.jsx)(`div`,{className:`oh-d-desc`,children:n.description||(0,H.jsx)(`span`,{style:{opacity:.5},children:`No description provided.`})})]}),n.images?.length>0&&(0,H.jsxs)(`div`,{className:`oh-d-section`,children:[(0,H.jsxs)(`h4`,{className:`oh-d-label`,children:[`Images (`,n.images.length,`)`]}),(0,H.jsx)(`div`,{className:`oh-d-image-grid`,children:n.images.map((e,t)=>(0,H.jsx)(`div`,{className:`oh-d-img-link`,onClick:t=>{t.stopPropagation(),r(e.url)},children:(0,H.jsx)(`img`,{src:e.url,alt:`attachment-${t}`,className:`oh-d-img`})},t))})]})]})]})})},ct=({order:e,isLatest:t,onDeleteRequest:n,onClickDetail:r,onImageClick:i})=>{let a=(0,D.useRef)(null);(0,D.useEffect)(()=>{v.fromTo(a.current,{y:20,opacity:0},{y:0,opacity:1,duration:.4,ease:`power3.out`})},[]);let o=e.status===`pending`;return(0,H.jsxs)(`div`,{ref:a,className:`oh-card${t?` oh-card-latest`:``}`,onClick:()=>r(e),children:[t&&(0,H.jsx)(`div`,{className:`oh-latest-badge`,children:`✦ Latest`}),(0,H.jsxs)(`div`,{className:`oh-card-header`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`div`,{className:`oh-party`,children:e.partyName}),(0,H.jsx)(`div`,{className:`oh-date`,children:rt(e.createdAt)})]}),(0,H.jsx)(nt,{status:e.status})]}),e.description&&(0,H.jsx)(`div`,{className:`oh-desc`,children:e.description}),e.images?.length>0&&(0,H.jsxs)(`div`,{className:`oh-thumbs`,children:[e.images.slice(0,4).map((e,t)=>(0,H.jsx)(`div`,{className:`oh-thumb-wrapper`,onClick:t=>{t.stopPropagation(),i(e.url)},children:(0,H.jsx)(`img`,{src:e.url,alt:`order-img-${t}`,className:`oh-thumb`})},t)),e.images.length>4&&(0,H.jsxs)(`div`,{className:`oh-thumb-more`,onClick:t=>{t.stopPropagation(),r(e)},children:[`+`,e.images.length-4]})]}),(0,H.jsxs)(`div`,{className:`oh-card-footer`,children:[(0,H.jsxs)(`span`,{className:`oh-order-id`,children:[`#`,e._id.slice(-6).toUpperCase()]}),(0,H.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,H.jsx)(`button`,{className:`oh-view-btn`,onClick:t=>{t.stopPropagation(),r(e)},children:`👁 View`}),o&&(0,H.jsx)(`button`,{className:`oh-del-btn`,onClick:t=>{t.stopPropagation(),n(e)},title:`Delete order`,children:`🗑 Delete`})]})]})]})},lt=()=>{let{fetchMyOrders:e,searchOrders:t,deleteOrder:n}=qe(),{myOrders:r,ordersPagination:i,orderLoading:a,searchResults:s}=o(e=>e.sales),[c,l]=(0,D.useState)(``),[u,d]=(0,D.useState)(!1),[f,p]=(0,D.useState)(1),[m,h]=(0,D.useState)(null),[g,_]=(0,D.useState)(null),[y,b]=(0,D.useState)(!1),[x,S]=(0,D.useState)(null),C=et(c,400),w=(0,D.useRef)(null),T=(0,D.useRef)(null),E=(0,D.useRef)(null),O=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=v.context(()=>{v.fromTo([T.current,E.current],{y:20,opacity:0},{y:0,opacity:1,duration:.5,ease:`power3.out`,stagger:.1})},w);return()=>e.revert()},[]),(0,D.useEffect)(()=>{e({page:f,limit:10})},[f]),(0,D.useEffect)(()=>{C.trim()?(d(!0),t(C.trim())):d(!1)},[C]);let k=async()=>{if(g){b(!0);try{await n(g._id),_(null)}catch(e){alert(e.message)}finally{b(!1)}}},A=u?s:r;return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .oh-wrap {
          max-width: 680px;
          margin: 0 auto;
          font-family: 'DM Sans', sans-serif;
        }

        /* Header */
        .oh-header { margin-bottom: 24px; }
        .oh-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .oh-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 2px;
          background: var(--color-primary);
          border-radius: 2px;
        }
        .oh-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--color-on-surface);
          letter-spacing: -0.6px;
        }
        .oh-sub {
          font-size: 13.5px;
          color: var(--color-on-surface-variant);
          margin-top: 4px;
        }

        /* Search bar */
        .oh-search-wrap {
          position: relative;
          margin-bottom: 24px;
        }
        .oh-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          pointer-events: none;
        }
        .oh-search {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 40px 12px 42px;
          background: var(--color-surface-container-lowest);
          border: 1.5px solid var(--color-outline-variant);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--color-on-surface);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .oh-search::placeholder { color: var(--color-outline); }
        .oh-search:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
        }
        .oh-search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--color-surface-container);
          border: none;
          border-radius: 6px;
          width: 22px; height: 22px;
          cursor: pointer;
          font-size: 11px;
          color: var(--color-on-surface-variant);
          display: grid; place-items: center;
        }
        .oh-search-clear:hover { background: var(--color-surface-container-high); }

        /* Order card */
        .oh-card {
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 14px;
          position: relative;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          overflow: hidden;
          cursor: pointer;
        }
        .oh-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.06);
          border-color: var(--color-outline);
          transform: translateY(-2px);
        }
        .oh-card-latest {
          border-color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 3%, var(--color-surface-container-lowest));
        }
        .oh-latest-badge {
          position: absolute;
          top: 14px; right: 14px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          padding: 3px 10px;
          border-radius: 20px;
        }

        .oh-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
          padding-right: 70px; /* space for latest badge */
        }
        .oh-party {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: var(--color-on-surface);
          letter-spacing: -0.2px;
        }
        .oh-date {
          font-size: 12.5px;
          color: var(--color-on-surface-variant);
          margin-top: 3px;
        }
        .oh-desc {
          font-size: 13.5px;
          color: var(--color-on-surface-variant);
          margin-bottom: 14px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Image thumbnails */
        .oh-thumbs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .oh-thumb-wrapper {
          display: block;
          border-radius: 8px;
          overflow: hidden;
          background: var(--color-surface-container);
        }
        .oh-thumb {
          width: 54px; height: 54px;
          object-fit: cover;
          display: block;
          transition: transform 0.2s, opacity 0.2s;
        }
        .oh-thumb-wrapper:hover .oh-thumb { transform: scale(1.1); opacity: 0.9; }
        .oh-thumb-more {
          width: 54px; height: 54px;
          border-radius: 8px;
          background: var(--color-surface-container);
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-on-surface-variant);
        }
        .oh-thumb-more:hover { color: var(--color-primary); }

        .oh-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px dashed var(--color-outline-variant);
        }
        .oh-order-id {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-outline);
          font-family: 'DM Sans', sans-serif;
        }
        
        .oh-view-btn {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 10%, transparent);
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .oh-view-btn:hover { background: color-mix(in srgb, var(--color-primary) 20%, transparent); }

        .oh-del-btn {
          font-size: 12px;
          font-weight: 600;
          color: #b91c1c;
          background: #fee2e2;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .oh-del-btn:hover:not(:disabled) { background: #fca5a5; }
        .oh-del-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Empty */
        .oh-empty {
          text-align: center;
          padding: 64px 20px;
          color: var(--color-on-surface-variant);
        }
        .oh-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .oh-empty-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--color-on-surface);
          margin-bottom: 6px;
          letter-spacing: -0.3px;
        }
        .oh-empty-sub { font-size: 13.5px; }

        /* Loader */
        .oh-loader {
          text-align: center;
          padding: 40px;
          color: var(--color-on-surface-variant);
          font-size: 13.5px;
        }

        /* Pagination */
        .oh-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .oh-pg-info {
          font-size: 12.5px;
          color: var(--color-on-surface-variant);
        }
        .oh-pg-btns { display: flex; gap: 8px; }
        .oh-pg-btn {
          padding: 7px 16px;
          border-radius: 8px;
          border: 1.5px solid var(--color-outline-variant);
          background: var(--color-surface-container-lowest);
          font-size: 13px;
          color: var(--color-on-surface-variant);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.15s;
        }
        .oh-pg-btn:hover:not(:disabled) {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .oh-pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* search mode label */
        .oh-search-label {
          font-size: 12px;
          color: var(--color-on-surface-variant);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .oh-search-label span {
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          color: var(--color-primary);
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 12px;
        }

          /* Image Modal adjustments */
          .oh-img-overlay {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(8px);
            z-index: 1000000; /* Highest priority */
          }
          .oh-img-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            max-width: 90vw;
            max-height: 90vh;
          }
          .oh-img-full {
            max-width: 100%;
            max-height: calc(90vh - 80px);
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          }
          .oh-img-close {
            position: absolute;
            top: 24px; right: 24px;
            width: 44px; height: 44px;
            background: rgba(255,255,255,0.1);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            transition: background 0.2s;
            display: grid;
            place-items: center;
          }
          .oh-img-close:hover { background: rgba(255,255,255,0.25); }
          .oh-img-download {
            padding: 12px 24px;
            background: var(--color-primary);
            color: var(--color-on-primary);
            border: none;
            border-radius: 30px;
            font-family: 'DM Sans', sans-serif;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0,0,0,0.3);
            transition: transform 0.2s, background 0.2s;
          }
          .oh-img-download:hover { transform: translateY(-2px); filter: brightness(1.1); }
          
        /* --- Custom Modals --- */
        .oh-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          z-index: 999999; /* Increased to completely cover bottom mobile navbars */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'DM Sans', sans-serif;
        }
        .oh-modal {
          background: var(--color-surface-container-lowest);
          border-radius: 20px;
          border: 1px solid var(--color-outline-variant);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        /* Small Modal for Confirm */
        .oh-modal-small {
          width: 100%;
          max-width: 400px;
          padding: 30px;
          text-align: center;
        }
        .oh-modal-icon-danger {
          font-size: 40px;
          margin-bottom: 16px;
        }
        .oh-modal-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 10px 0;
          color: var(--color-on-surface);
        }
        .oh-modal-text {
          font-size: 14.5px;
          color: var(--color-on-surface-variant);
          margin-bottom: 24px;
          line-height: 1.5;
        }
        .oh-modal-actions {
          display: flex;
          gap: 12px;
        }
        .oh-btn-cancel {
          flex: 1;
          padding: 12px;
          background: var(--color-surface-container);
          border: none;
          border-radius: 10px;
          font-weight: 600;
          color: var(--color-on-surface);
          cursor: pointer;
          transition: background 0.15s;
        }
        .oh-btn-cancel:hover { background: var(--color-surface-container-high); }
        .oh-btn-danger {
          flex: 1;
          padding: 12px;
          background: #dc2626;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          transition: background 0.15s;
        }
        .oh-btn-danger:hover { background: #b91c1c; }
        .oh-btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Large Modal for Details */
        .oh-modal-large {
          width: 100%;
          max-width: 600px;
          padding: 0;
        }
        .oh-modal-close {
          position: absolute;
          top: 16px; right: 16px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--color-surface-container);
          border: none;
          font-size: 14px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          z-index: 10;
        }
        .oh-modal-close:hover { background: var(--color-surface-container-high); transform: scale(1.05); }

        .oh-d-header {
          padding: 30px 30px 20px;
          border-bottom: 1px solid var(--color-outline-variant);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }
        .oh-d-party {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 6px 0;
          color: var(--color-on-surface);
          letter-spacing: -0.5px;
        }
        .oh-d-meta {
          font-size: 13px;
          color: var(--color-on-surface-variant);
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .oh-d-body {
          padding: 24px 30px 40px;
        }
        .oh-d-section {
          margin-bottom: 24px;
        }
        .oh-d-section:last-child { margin-bottom: 0; }
        .oh-d-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-outline);
          margin: 0 0 10px 0;
        }
        .oh-d-desc {
          font-size: 15px;
          line-height: 1.6;
          color: var(--color-on-surface);
          background: var(--color-surface-container-lowest);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--color-outline-variant);
          white-space: pre-wrap;
        }
        
        .oh-d-remark {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          color: #b45309;
          background: #fffbeb;
          padding: 14px 16px;
          border-radius: 10px;
          border-left: 4px solid #f59e0b;
          white-space: pre-wrap;
        }
        
        .oh-d-image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
        }
        .oh-d-img-link {
          display: block;
          border-radius: 12px;
          overflow: hidden;
          background: var(--color-surface-container);
          aspect-ratio: 1;
          border: 1px solid var(--color-outline-variant);
          position: relative;
        }
        .oh-d-img-link:hover .oh-d-img { transform: scale(1.05); }
        .oh-d-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        
        @media (max-width: 768px) {
          /* Remove wrap padding — sections handle their own spacing */
          .oh-wrap { padding: 0; }

          /* ── Hero header — gradient card like other pages ── */
          .oh-header {
            background: linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 70%, #1e40af) 100%);
            color: var(--color-on-primary);
            padding: 28px 16px 24px;
            margin-bottom: 0;
            position: relative;
            overflow: hidden;
          }
          .oh-header::before {
            content: '';
            position: absolute; top: -40px; right: -40px;
            width: 160px; height: 160px; border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
            pointer-events: none;
          }
          .oh-eyebrow { color: rgba(255,255,255,0.75); }
          .oh-eyebrow::before { background: rgba(255,255,255,0.75); }
          .oh-title { font-size: 28px; color: #fff; margin-bottom: 4px; }
          .oh-sub { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 0; }

          /* Search */
          .oh-search-wrap { margin: 14px 14px 0; }

          /* Cards */
          .oh-card { margin: 10px 14px 0; border-radius: 14px; padding: 16px; }
          .oh-card:hover { transform: none; }
          .oh-party { font-size: 15px; }
          .oh-date { font-size: 11.5px; }
          .oh-thumb { width: 46px; height: 46px; }
          .oh-thumb-more { width: 46px; height: 46px; font-size: 11px; }
          .oh-view-btn, .oh-del-btn { padding: 7px 12px; font-size: 12px; }

          /* Search label + pagination */
          .oh-search-label { margin: 10px 14px 0; }
          .oh-pagination { padding: 0 14px; margin-top: 16px; }
          .oh-empty { padding: 48px 20px; }
          .oh-loader { padding: 40px 20px; }

          /* Modals */
          .oh-overlay-large { padding: 20px 0 0 0; align-items: flex-end; }
          .oh-overlay-small { padding: 20px; align-items: center; }
          .oh-modal-large {
            border-radius: 24px 24px 0 0;
            margin-top: auto; max-height: 85vh;
            border-bottom: none; width: 100%;
            padding-bottom: env(safe-area-inset-bottom, 20px);
          }
          .oh-d-header { padding: 24px 48px 16px 20px; flex-direction: column; gap: 12px; }
          .oh-d-body { padding: 16px 20px 40px; }
          .oh-modal-close { top: 16px; right: 16px; background: var(--color-surface-container-high); }
          .oh-d-party { font-size: 20px; margin-bottom: 2px; }
          .oh-d-desc { font-size: 14px; padding: 14px; }
          .oh-d-image-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 10px; }
          .oh-modal-small { padding: 28px 20px 24px; width: 100%; margin: 0 auto; }
          .oh-modal-icon-danger { font-size: 34px; margin-bottom: 12px; }
          .oh-modal-title { font-size: 20px; }
          .oh-modal-text { font-size: 13.5px; margin-bottom: 24px; }
          .oh-modal-actions { flex-direction: column; gap: 10px; }
          .oh-btn-cancel, .oh-btn-danger { width: 100%; padding: 14px; font-size: 14.5px; }
          .oh-img-close { top: 12px; right: 12px; width: 36px; height: 36px; font-size: 16px; }
          .oh-img-full { max-height: calc(90vh - 70px); }
          .oh-img-download { width: 100%; text-align: center; }
        }
      `}),(0,H.jsxs)(`div`,{ref:w,className:`oh-wrap`,children:[(0,H.jsxs)(`div`,{ref:T,className:`oh-header`,children:[(0,H.jsx)(`div`,{className:`oh-eyebrow`,children:`Order History`}),(0,H.jsx)(`div`,{className:`oh-title`,children:`My Orders`}),(0,H.jsx)(`div`,{className:`oh-sub`,children:`Track and manage all your submitted orders.`})]}),(0,H.jsxs)(`div`,{ref:E,className:`oh-search-wrap`,children:[(0,H.jsx)(`span`,{className:`oh-search-icon`,children:`🔍`}),(0,H.jsx)(`input`,{className:`oh-search`,type:`text`,placeholder:`Search by party name...`,value:c,onChange:e=>l(e.target.value)}),c&&(0,H.jsx)(`button`,{className:`oh-search-clear`,onClick:()=>l(``),title:`Clear`,children:`✕`})]}),a&&A.length===0?(0,H.jsx)(`div`,{className:`oh-loader`,children:`Loading orders…`}):A.length===0?(0,H.jsxs)(`div`,{className:`oh-empty`,children:[(0,H.jsx)(`div`,{className:`oh-empty-icon`,children:u?`🔎`:`📋`}),(0,H.jsx)(`div`,{className:`oh-empty-title`,children:u?`No results found`:`No orders yet`}),(0,H.jsx)(`div`,{className:`oh-empty-sub`,children:u?`No orders match "${c}". Try a different name.`:`Your submitted orders will appear here.`})]}):(0,H.jsxs)(H.Fragment,{children:[u&&(0,H.jsxs)(`div`,{className:`oh-search-label`,children:[`Showing results for `,(0,H.jsx)(`span`,{children:c}),` — `,A.length,` found`]}),(0,H.jsx)(`div`,{ref:O,children:A.map((e,t)=>(0,H.jsx)(ct,{order:e,isLatest:!u&&t===0,onDeleteRequest:_,onClickDetail:h,onImageClick:S},e._id))}),!u&&i&&i.totalPages>1&&(0,H.jsxs)(`div`,{className:`oh-pagination`,children:[(0,H.jsxs)(`span`,{className:`oh-pg-info`,children:[`Page `,i.currentPage,` of `,i.totalPages,`\xA0· `,i.total,` orders total`]}),(0,H.jsxs)(`div`,{className:`oh-pg-btns`,children:[(0,H.jsx)(`button`,{className:`oh-pg-btn`,disabled:!i.hasPrevPage,onClick:()=>p(e=>e-1),children:`← Prev`}),(0,H.jsx)(`button`,{className:`oh-pg-btn`,disabled:!i.hasNextPage,onClick:()=>p(e=>e+1),children:`Next →`})]})]})]})]}),(0,H.jsx)(ot,{isOpen:!!g,onClose:()=>_(null),onConfirm:k,orderName:g?.partyName,loading:y}),(0,H.jsx)(st,{isOpen:!!m,onClose:()=>h(null),order:m,onImageClick:S}),(0,H.jsx)(at,{isOpen:!!x,onClose:()=>S(null),imageUrl:x})]})},ut=D.memo(()=>(0,H.jsxs)(`div`,{style:{background:`var(--color-surface-container-lowest)`,border:`1px solid var(--color-outline-variant)`,borderRadius:`16px`,padding:`0`,overflow:`hidden`,animation:`sdSkeletonPulse 1.4s ease-in-out infinite`},children:[(0,H.jsx)(`div`,{style:{height:`56px`,background:`var(--color-surface-container)`,borderBottom:`1px solid var(--color-outline-variant)`}}),(0,H.jsxs)(`div`,{style:{padding:`16px 20px`},children:[(0,H.jsx)(`div`,{style:{height:`18px`,background:`var(--color-surface-container)`,borderRadius:`6px`,marginBottom:`10px`,width:`70%`}}),(0,H.jsx)(`div`,{style:{height:`13px`,background:`var(--color-surface-container)`,borderRadius:`6px`,marginBottom:`16px`,width:`45%`}}),(0,H.jsxs)(`div`,{style:{display:`flex`,gap:`10px`},children:[(0,H.jsx)(`div`,{style:{height:`48px`,flex:1,background:`var(--color-surface-container)`,borderRadius:`8px`}}),(0,H.jsx)(`div`,{style:{height:`48px`,flex:1,background:`var(--color-surface-container)`,borderRadius:`8px`}})]})]}),(0,H.jsx)(`div`,{style:{padding:`0 20px 16px`},children:(0,H.jsx)(`div`,{style:{height:`40px`,background:`var(--color-surface-container)`,borderRadius:`10px`}})})]})),dt=D.memo(({search:e})=>{let t=(0,D.useRef)(null);return(0,D.useEffect)(()=>{v.fromTo(t.current,{y:20,opacity:0},{y:0,opacity:1,duration:.5,ease:`power3.out`})},[]),(0,H.jsxs)(`div`,{ref:t,style:{gridColumn:`1 / -1`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,padding:`80px 20px`,color:`var(--color-on-surface-variant)`,fontFamily:`'DM Sans', sans-serif`,textAlign:`center`},children:[(0,H.jsx)(`div`,{style:{width:`80px`,height:`80px`,borderRadius:`24px`,marginBottom:`20px`,background:`var(--color-surface-container)`,display:`grid`,placeItems:`center`,fontSize:`36px`,boxShadow:`0 8px 24px rgba(0,0,0,0.06)`},children:`🔍`}),(0,H.jsx)(`div`,{style:{fontFamily:`'Bricolage Grotesque',sans-serif`,fontSize:`20px`,fontWeight:700,color:`var(--color-on-surface)`,marginBottom:`8px`,letterSpacing:`-0.3px`},children:e?`No results found`:`No items available`}),(0,H.jsx)(`div`,{style:{fontSize:`14px`,maxWidth:`320px`,lineHeight:1.6},children:e?`We couldn't find anything matching "${e}". Try different keywords.`:`There are no items to display in this category.`})]})}),ft=D.memo(({pagination:e,onPageChange:t})=>{if(!e||e.totalPages<=1)return null;let{currentPage:n,totalPages:r,totalDocuments:i,pageSize:a}=e,o=(n-1)*a+1,s=Math.min(n*a,i),c=[];for(let e=1;e<=r;e++)e===1||e===r||Math.abs(e-n)<=1?c.push(e):c[c.length-1]!==`…`&&c.push(`…`);let l={padding:`7px 14px`,borderRadius:`8px`,border:`1.5px solid var(--color-outline-variant)`,background:`var(--color-surface-container-lowest)`,cursor:`pointer`,fontSize:`13px`,color:`var(--color-on-surface-variant)`,fontFamily:`'DM Sans', sans-serif`};return(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,marginTop:`24px`,padding:`0 4px`,fontFamily:`'DM Sans', sans-serif`,flexWrap:`wrap`,gap:`12px`},children:[(0,H.jsxs)(`span`,{style:{fontSize:`12.5px`,color:`var(--color-on-surface-variant)`},children:[o,`–`,s,` of `,(0,H.jsx)(`strong`,{children:i})]}),(0,H.jsxs)(`div`,{style:{display:`flex`,gap:`6px`,alignItems:`center`},children:[(0,H.jsx)(`button`,{onClick:()=>t(n-1),disabled:!e.hasPrevPage,id:`pagination-prev`,style:{...l,opacity:e.hasPrevPage?1:.4},children:`← Prev`}),c.map((e,r)=>e===`…`?(0,H.jsx)(`span`,{style:{padding:`7px 4px`,color:`var(--color-outline)`,fontSize:`13px`},children:`…`},`e${r}`):(0,H.jsx)(`button`,{onClick:()=>t(e),id:`pagination-page-${e}`,style:{width:`36px`,height:`36px`,borderRadius:`8px`,border:e===n?`none`:`1.5px solid var(--color-outline-variant)`,background:e===n?`var(--color-primary)`:`var(--color-surface-container-lowest)`,color:e===n?`var(--color-on-primary)`:`var(--color-on-surface-variant)`,cursor:`pointer`,fontSize:`13px`,fontWeight:e===n?700:400,fontFamily:`'DM Sans', sans-serif`},children:e},e)),(0,H.jsx)(`button`,{onClick:()=>t(n+1),disabled:!e.hasNextPage,id:`pagination-next`,style:{...l,opacity:e.hasNextPage?1:.4},children:`Next →`})]})]})}),pt=[{src:`/campany_images/ascot1.png`,name:`Ascot`},{src:`/campany_images/Bosch_logo.png`,name:`Bosch`},{src:`/campany_images/delphi_tvs.png`,name:`Delphi TVS`},{src:`/campany_images/gy.png`,name:`GY`},{src:`/campany_images/lucas.png`,name:`Lucas`},{src:`/campany_images/nbc.png`,name:`NBC`},{src:`/campany_images/rmp.png`,name:`RMP`}],mt=D.memo(({sheets:e,sheetsLoading:t,masterQuery:n,setMasterQuery:r,masterResults:i,masterLoading:a,handleTabChange:o,handleSheetSelect:s,setSearchInput:c})=>{let l=(0,D.useRef)(null),u=(0,D.useRef)(null),d=(0,D.useRef)(null),f=(0,D.useRef)(null),p=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=f.current;if(!e)return;let t=requestAnimationFrame(()=>{let t=e.scrollWidth/2;p.current=v.to(e,{x:-t,duration:22,ease:`none`,repeat:-1,onRepeat:()=>v.set(e,{x:0})})});return e.addEventListener(`mouseenter`,()=>p.current?.pause()),e.addEventListener(`mouseleave`,()=>p.current?.resume()),()=>{cancelAnimationFrame(t),p.current?.kill()}},[]),(0,D.useEffect)(()=>{let e=v.context(()=>{let e=v.timeline({defaults:{ease:`power3.out`}});e.fromTo(l.current,{y:40,opacity:0},{y:0,opacity:1,duration:.75}).fromTo(l.current.children,{y:18,opacity:0},{y:0,opacity:1,duration:.5,stagger:.09},`-=0.45`).fromTo(d.current,{y:12,opacity:0},{y:0,opacity:1,duration:.45},`-=0.3`);let t=u.current?.querySelectorAll(`.sd-stat-card`);t?.length&&e.fromTo(t,{y:28,opacity:0,scale:.96},{y:0,opacity:1,scale:1,duration:.5,stagger:.1,ease:`back.out(1.4)`,onComplete:()=>v.set(t,{clearProps:`transform`})},`-=0.2`)});return()=>e.revert()},[]);let m=[{id:`company`,icon:`🏢`,label:`Company Sheets`,value:t?`…`:e.length||0,bg:`var(--color-secondary-container)`,color:`var(--color-on-secondary-container)`},{id:`bosch`,icon:`⚙️`,label:`Bosch Parts`,value:`Live`,bg:`color-mix(in srgb, #ba1a1a 18%, transparent)`,color:`#ba1a1a`},{id:`history`,icon:`📦`,label:`Order History`,value:`View`,bg:`var(--color-tertiary-fixed, #d0f0e8)`,color:`var(--color-on-tertiary-fixed, #0a3d2e)`}];return(0,H.jsxs)(`div`,{children:[(0,H.jsxs)(`div`,{className:`sd-hero-card`,ref:l,children:[(0,H.jsx)(`div`,{className:`sd-hero-eyebrow`,children:`B.K Engineering · Sales Portal`}),(0,H.jsx)(`h1`,{className:`sd-hero-title`,children:`Sales Gateway`}),(0,H.jsx)(`p`,{className:`sd-hero-sub`,children:`Search instantly across Bosch and Company inventory all in one place.`}),(0,H.jsxs)(`div`,{className:`sd-global-search-wrap`,ref:d,style:{position:`relative`,maxWidth:`580px`,width:`100%`,marginTop:`4px`},children:[(0,H.jsx)(`input`,{type:`text`,className:`sd-search`,placeholder:`Search part numbers, item names...`,value:n,onChange:e=>r(e.target.value),style:{padding:`15px 20px 15px 50px`,fontSize:`15px`,borderRadius:`14px`,boxShadow:`0 8px 32px rgba(0,0,0,0.14)`,background:`rgba(255,255,255,0.13)`,border:`1.5px solid rgba(255,255,255,0.25)`,color:`#fff`,backdropFilter:`blur(12px)`,width:`100%`,boxSizing:`border-box`,outline:`none`,fontFamily:`'DM Sans', sans-serif`},onFocus:e=>{e.target.style.background=`rgba(255,255,255,0.2)`,e.target.style.borderColor=`rgba(255,255,255,0.5)`},onBlur:e=>{e.target.style.background=`rgba(255,255,255,0.13)`,e.target.style.borderColor=`rgba(255,255,255,0.25)`}}),(0,H.jsx)(`span`,{style:{position:`absolute`,zIndex:100,left:`17px`,top:`50%`,transform:`translateY(-50%)`,fontSize:`17px`,pointerEvents:`none`},children:`🔍`}),n&&(0,H.jsx)(`button`,{onClick:()=>r(``),style:{position:`absolute`,right:`14px`,top:`50%`,transform:`translateY(-50%)`,background:`rgba(255,255,255,0.2)`,border:`none`,borderRadius:`6px`,width:`26px`,height:`26px`,cursor:`pointer`,color:`#fff`,fontSize:`11px`,display:`grid`,placeItems:`center`},children:`✕`}),n&&(0,H.jsx)(`div`,{className:`sd-global-results`,children:a?(0,H.jsx)(`div`,{className:`sd-global-empty`,children:`Searching…`}):i.length===0?(0,H.jsx)(`div`,{className:`sd-global-empty`,children:`No results found`}):i.map(e=>(0,H.jsxs)(`div`,{className:`sd-result-item`,onClick:()=>{o(e.source===`bosch`?`bosch`:`company`),e.source===`company`&&s(e.sheetName),c(e.partno||e.itemName),r(``)},children:[(0,H.jsxs)(`div`,{style:{overflow:`hidden`,paddingRight:`12px`},children:[(0,H.jsx)(`div`,{className:`sd-result-title`,children:e.itemName||`Unnamed`}),(0,H.jsxs)(`div`,{className:`sd-result-sub`,children:[`PN: `,e.partno||`N/A`]})]}),(0,H.jsx)(`div`,{className:`sd-result-badge ${e.source===`bosch`?`bosch`:`company`}`,children:e.source===`bosch`?`Bosch`:e.sheetName||`Company`})]},e._id))})]})]}),(0,H.jsxs)(`div`,{className:`sd-marquee-outer`,children:[(0,H.jsx)(`div`,{className:`sd-marquee-label`,children:`Our Brands`}),(0,H.jsx)(`div`,{className:`sd-marquee-track`,children:(0,H.jsx)(`div`,{className:`sd-marquee-inner`,ref:f,children:[...pt,...pt].map((e,t)=>(0,H.jsx)(`div`,{className:`sd-logo-pill`,children:(0,H.jsx)(`img`,{src:e.src,alt:e.name,className:`sd-logo-img`})},t))})})]}),(0,H.jsx)(`div`,{className:`sd-overview-grid`,ref:u,children:m.map(({id:e,icon:t,label:n,value:r,bg:i,color:a})=>(0,H.jsxs)(`div`,{className:`sd-stat-card`,onClick:()=>o(e),children:[(0,H.jsx)(`div`,{className:`sd-stat-icon`,style:{background:i,color:a},children:t}),(0,H.jsxs)(`div`,{className:`sd-stat-content`,children:[(0,H.jsx)(`div`,{className:`sd-stat-label`,children:n}),(0,H.jsx)(`div`,{className:`sd-stat-value`,children:r})]}),(0,H.jsx)(`span`,{className:`sd-stat-arrow`,children:`→`})]},e))})]})}),ht=D.memo(({sheets:e,sheetsLoading:t,selectedSheet:n,onSheetSelect:r})=>{let[i,a]=(0,D.useState)(!1),[o,s]=(0,D.useState)(``),c=typeof n==`string`?n:n?.sheetName,l=e=>{r(e),a(!1)};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`div`,{className:`sd-sheet-bar`,children:t?[1,2,3].map(e=>(0,H.jsx)(`div`,{style:{width:`80px`,height:`32px`,flexShrink:0,background:`var(--color-surface-container)`,borderRadius:`20px`,animation:`sdSkeletonPulse 1.4s ease-in-out infinite`}},e)):e.map(e=>{let t=typeof e==`string`?e:e.sheetName;return(0,H.jsx)(`button`,{className:`sd-sheet-chip${t===c?` active`:``}`,onClick:()=>l(e),id:`sheet-chip-${t}`,children:t},t)})}),(0,H.jsx)(`div`,{className:`sd-sheet-picker-wrap`,children:(0,H.jsxs)(`button`,{className:`sd-sheet-picker-btn`,onClick:()=>{a(!0),s(``)},id:`sd-sheet-picker-trigger`,children:[(0,H.jsx)(`span`,{style:{fontSize:`16px`,flexShrink:0},children:`🏢`}),(0,H.jsx)(`span`,{className:`sd-sheet-picker-selected`,children:t?`Loading sheets…`:c||`Select sheet`}),(0,H.jsxs)(`span`,{className:`sd-sheet-picker-meta`,children:[e.length,` sheets`]}),(0,H.jsx)(`span`,{className:`sd-sheet-picker-arrow`,children:`▾`})]})}),i&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`div`,{className:`sd-drawer-overlay open`,onClick:()=>a(!1)}),(0,H.jsxs)(`div`,{className:`sd-sheet-drawer`,children:[(0,H.jsx)(`div`,{className:`sd-drawer-handle`}),(0,H.jsxs)(`div`,{className:`sd-drawer-header`,children:[(0,H.jsx)(`div`,{className:`sd-drawer-title`,children:`Select Company Sheet`}),(0,H.jsxs)(`div`,{className:`sd-drawer-search-wrap`,children:[(0,H.jsx)(`span`,{className:`sd-drawer-search-icon`,children:`🔍`}),(0,H.jsx)(`input`,{className:`sd-drawer-search`,type:`text`,placeholder:`Search sheets…`,value:o,onChange:e=>s(e.target.value),autoFocus:!0})]})]}),(0,H.jsx)(`div`,{className:`sd-drawer-list`,children:(()=>{let t=e.filter(e=>(typeof e==`string`?e:e.sheetName).toLowerCase().includes(o.toLowerCase()));return t.length===0?(0,H.jsx)(`div`,{className:`sd-drawer-empty`,children:`No sheets found`}):t.map(e=>{let t=typeof e==`string`?e:e.sheetName,n=t===c;return(0,H.jsxs)(`button`,{className:`sd-drawer-item${n?` active`:``}`,onClick:()=>l(e),children:[t,n&&(0,H.jsx)(`span`,{className:`sd-drawer-item-check`,children:`✓`})]},t)})})()})]})]})]})});function gt(e,t=380){let[n,r]=(0,D.useState)(e);return(0,D.useEffect)(()=>{let n=setTimeout(()=>r(e),t);return()=>clearTimeout(n)},[e,t]),n}var _t=({hideNavbar:e=!1,adminTab:t=null})=>{let{tab:n}=m(),i=s(),[a,o]=r(),c=t||n||`overview`,l=(0,D.useRef)(null),[u,d]=(0,D.useState)([]),[f,p]=(0,D.useState)(!1),[h,g]=(0,D.useState)([]),[_,v]=(0,D.useState)(null),[y,b]=(0,D.useState)(!1),[x,S]=(0,D.useState)(1),[C,w]=(0,D.useState)(``),T=gt(C),[E,O]=(0,D.useState)(``),k=gt(E,350),[A,j]=(0,D.useState)([]),[ee,M]=(0,D.useState)(!1),[N,P]=(0,D.useState)(`grid`),F=a.get(`sheet`),I=F?u.find(e=>(e.sheetName||e)===F)||F:u.length>0?u[0]:null;(0,D.useEffect)(()=>{if(!k.trim()){j([]);return}(async()=>{M(!0);try{j((await ke({search:k,limit:12})).results||[])}catch(e){console.error(e)}finally{M(!1)}})()},[k]),(0,D.useEffect)(()=>{(async()=>{p(!0);try{d((await Ee()).companySheets||[])}catch(e){console.error(e)}finally{p(!1)}})()},[]),(0,D.useEffect)(()=>{S(1)},[T,I,c]),(0,D.useEffect)(()=>{if(c!==`company`&&c!==`bosch`){b(!1);return}(async()=>{b(!0),g([]);try{let e;c===`company`&&I?e=await De(typeof I==`string`?I:I.sheetName,{page:x,limit:12,search:T}):c===`bosch`&&(e=await Oe({page:x,limit:12,search:T})),e&&(g(e.boschStock||e.companyStock||[]),v(e.pagination||null))}catch(e){console.error(e)}finally{b(!1)}})()},[c,I,x,T]);let L=(0,D.useCallback)(e=>{i(t?`/admin/${e}`:`/sales/${e}`),w(``),S(1)},[t,i]),R=(0,D.useCallback)(e=>{o({sheet:typeof e==`string`?e:e.sheetName}),w(``),S(1)},[o]);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes sdSkeletonPulse{0%,100%{opacity:1}50%{opacity:0.55}}
        @keyframes sdDropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes sdOverlayIn{from{opacity:0}to{opacity:1}}
        @keyframes sdDrawerUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        .sd-root{min-height:100svh;background:var(--color-background);font-family:'DM Sans',sans-serif;}
        .sd-content{max-width:1400px;margin:0 auto;padding:28px 28px 60px;}
        .sd-page-header{margin-bottom:24px;}
        .sd-page-title{font-family:'Bricolage Grotesque',sans-serif;font-size:26px;font-weight:800;color:var(--color-on-surface);letter-spacing:-0.7px;margin-bottom:4px;}
        .sd-page-sub{font-size:13.5px;color:var(--color-on-surface-variant);}
        .sd-controls{display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap;}
        .sd-search-wrap{flex:1;min-width:220px;max-width:480px;position:relative;}
        .sd-search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--color-outline);font-size:14px;pointer-events:none;}
        .sd-search{width:100%;padding:11px 14px 11px 40px;background:var(--color-surface-container-lowest);border:1.5px solid var(--color-outline-variant);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13.5px;color:var(--color-on-surface);outline:none;transition:all 0.18s;box-sizing:border-box;}
        .sd-search::placeholder{color:var(--color-outline);}
        .sd-search:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px var(--color-primary-fixed-dim);}
        .sd-search-clear{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:var(--color-surface-container);border:none;border-radius:6px;width:22px;height:22px;cursor:pointer;font-size:11px;color:var(--color-on-surface-variant);display:grid;place-items:center;}
        .sd-result-count{font-size:12.5px;color:var(--color-on-surface-variant);white-space:nowrap;}
        .sd-view-toggle{display:none;align-items:center;gap:4px;background:var(--color-surface-container);border:1.5px solid var(--color-outline-variant);border-radius:10px;padding:4px;flex-shrink:0;}
        .sd-view-btn{width:32px;height:32px;border:none;border-radius:7px;background:transparent;cursor:pointer;display:grid;place-items:center;color:var(--color-on-surface-variant);transition:all 0.15s;font-size:15px;}
        .sd-view-btn.active{background:var(--color-primary);color:var(--color-on-primary);}
        .sd-sheet-picker-btn{display:none;width:100%;padding:12px 16px;background:var(--color-surface-container-lowest);border:1.5px solid var(--color-outline-variant);border-radius:12px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:var(--color-on-surface);cursor:pointer;align-items:center;justify-content:space-between;gap:8px;text-align:left;transition:border-color 0.18s;}
        .sd-sheet-picker-btn:active{background:var(--color-surface-container);}
        .sd-sheet-picker-selected{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
        .sd-sheet-picker-meta{font-size:11px;color:var(--color-outline);font-weight:500;flex-shrink:0;}
        .sd-sheet-picker-arrow{font-size:13px;color:var(--color-outline);flex-shrink:0;}
        .sd-drawer-overlay{display:none;position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,0.45);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);animation:sdOverlayIn 0.22s ease both;}
        .sd-drawer-overlay.open{display:block;}
        .sd-sheet-drawer{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:var(--color-surface-container-lowest);border-radius:24px 24px 0 0;padding:0 0 env(safe-area-inset-bottom,16px);box-shadow:0 -8px 40px rgba(0,0,0,0.18);max-height:82svh;display:flex;flex-direction:column;animation:sdDrawerUp 0.32s cubic-bezier(0.32,0.72,0,1) both;}
        .sd-drawer-handle{width:36px;height:4px;border-radius:2px;background:var(--color-outline-variant);margin:12px auto 0;flex-shrink:0;}
        .sd-drawer-header{padding:16px 20px 12px;border-bottom:1px solid var(--color-outline-variant);flex-shrink:0;}
        .sd-drawer-title{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;color:var(--color-on-surface);margin-bottom:12px;}
        .sd-drawer-search{width:100%;padding:10px 16px 10px 40px;background:var(--color-surface-container);border:1.5px solid var(--color-outline-variant);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--color-on-surface);outline:none;box-sizing:border-box;transition:border-color 0.18s;}
        .sd-drawer-search:focus{border-color:var(--color-primary);}
        .sd-drawer-search::placeholder{color:var(--color-outline);}
        .sd-drawer-search-wrap{position:relative;}
        .sd-drawer-search-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);font-size:14px;pointer-events:none;color:var(--color-outline);}
        .sd-drawer-list{overflow-y:auto;flex:1;padding:8px 12px 16px;-webkit-overflow-scrolling:touch;}
        .sd-drawer-item{width:100%;border:none;background:transparent;padding:13px 14px;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;color:var(--color-on-surface);cursor:pointer;text-align:left;display:flex;align-items:center;justify-content:space-between;gap:12px;transition:background 0.15s;}
        .sd-drawer-item:hover,.sd-drawer-item:active{background:var(--color-surface-container);}
        .sd-drawer-item.active{background:color-mix(in srgb,var(--color-primary) 12%,transparent);color:var(--color-primary);font-weight:700;}
        .sd-drawer-item-check{font-size:16px;flex-shrink:0;}
        .sd-drawer-empty{text-align:center;padding:32px 20px;color:var(--color-on-surface-variant);font-size:14px;font-family:'DM Sans',sans-serif;}
        .sd-sheet-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;}
        .sd-sheet-chip{padding:7px 16px;border-radius:20px;border:1.5px solid var(--color-outline-variant);background:var(--color-surface-container-lowest);font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:500;color:var(--color-on-surface-variant);cursor:pointer;transition:all 0.16s;white-space:nowrap;}
        .sd-sheet-chip:hover{border-color:var(--color-primary);color:var(--color-primary);}
        .sd-sheet-chip.active{background:var(--color-primary);border-color:var(--color-primary);color:var(--color-on-primary);font-weight:600;}
        .sd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;}
        .sd-grid.list-view{grid-template-columns:1fr;gap:8px;}
        .sd-grid.list-view>*{border-radius:12px!important;}
        .sd-pagination-wrap{margin-top:24px;}
        .sd-overview-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin-top:24px;}
        .sd-hero-card{background:linear-gradient(135deg,var(--color-primary) 0%,color-mix(in srgb,var(--color-primary) 70%,#1e40af) 100%);border-radius:28px;padding:40px 36px;color:var(--color-on-primary);display:flex;flex-direction:column;justify-content:center;position:relative;z-index:10;grid-column:1/-1;}
        .sd-hero-card::before{content:'';position:absolute;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%);pointer-events:none;}
        .sd-hero-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;opacity:0.75;margin-bottom:12px;font-family:'DM Sans',sans-serif;}
        .sd-hero-title{font-family:'Bricolage Grotesque',sans-serif;font-size:36px;font-weight:800;margin-bottom:14px;letter-spacing:-1.2px;line-height:1.1;}
        .sd-hero-sub{font-size:15px;opacity:0.8;max-width:420px;line-height:1.6;margin-bottom:28px;font-family:'DM Sans',sans-serif;}
        .sd-stat-card{background:var(--color-surface-container-lowest);border:1px solid var(--color-outline-variant);border-radius:22px;padding:24px 22px;display:flex;align-items:center;gap:18px;cursor:pointer;position:relative;overflow:hidden;transition:border-color 0.25s,box-shadow 0.25s,transform 0.25s;}
        .sd-stat-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,0.10);}
        .sd-stat-icon{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;font-size:22px;flex-shrink:0;transition:transform 0.3s;}
        .sd-stat-card:hover .sd-stat-icon{transform:scale(1.12) rotate(-6deg);}
        .sd-stat-content{flex:1;min-width:0;}
        .sd-stat-label{font-size:11px;color:var(--color-on-surface-variant);font-weight:700;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:6px;font-family:'DM Sans',sans-serif;}
        .sd-stat-value{font-family:'Bricolage Grotesque',sans-serif;font-size:30px;font-weight:800;color:var(--color-on-surface);letter-spacing:-0.5px;line-height:1;}
        .sd-stat-arrow{font-size:16px;color:var(--color-outline);transition:transform 0.25s,color 0.25s;flex-shrink:0;}
        .sd-stat-card:hover .sd-stat-arrow{transform:translateX(4px);color:var(--color-primary);}
        .sd-global-search-wrap{position:relative;z-index:500;}
        .sd-global-results{position:absolute;top:calc(100% + 8px);left:0;right:0;background:var(--color-surface-container-lowest);backdrop-filter:blur(20px);border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,0.22);border:1px solid var(--color-outline-variant);max-height:420px;overflow-y:auto;z-index:99999;padding:8px;animation:sdDropIn 0.2s ease both;}
        .sd-result-item{padding:12px 16px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;transition:background 0.15s;font-family:'DM Sans',sans-serif;color:var(--color-on-surface);}
        .sd-result-item:hover{background:var(--color-surface-container);}
        .sd-result-title{font-size:15px;font-weight:600;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
        .sd-result-sub{font-size:12px;color:var(--color-on-surface-variant);margin-top:4px;}
        .sd-result-badge{font-size:10px;font-weight:700;padding:5px 10px;border-radius:20px;text-transform:uppercase;white-space:nowrap;flex-shrink:0;border:1px solid currentColor;}
        .sd-result-badge.bosch{background:#ffdad6;color:#ba1a1a;}
        .sd-result-badge.company{background:#c8f5d4;color:#1a6b2e;}
        .sd-global-empty{padding:24px;text-align:center;color:var(--color-on-surface-variant);font-size:14px;}
        .sd-marquee-outer{padding:28px 0 0;grid-column:1/-1;}
        .sd-marquee-label{font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-on-surface-variant);opacity:0.6;margin-bottom:14px;padding:0 36px;font-family:'DM Sans',sans-serif;}
        .sd-marquee-track{overflow:hidden;-webkit-mask-image:linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%);mask-image:linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%);}
        .sd-marquee-inner{display:flex;align-items:center;gap:16px;width:max-content;padding:4px 0 12px;}
        .sd-logo-pill{background:var(--color-surface-container-lowest);border:1px solid var(--color-outline-variant);border-radius:16px;padding:12px 20px;display:flex;align-items:center;justify-content:center;height:64px;min-width:110px;flex-shrink:0;transition:box-shadow 0.2s,border-color 0.2s;}
        .sd-logo-pill:hover{border-color:var(--color-primary);box-shadow:0 4px 16px rgba(0,0,0,0.10);}
        .sd-logo-img{height:36px;max-width:90px;object-fit:contain;filter:grayscale(0.2);opacity:0.85;transition:filter 0.2s,opacity 0.2s;}
        .sd-logo-pill:hover .sd-logo-img{filter:grayscale(0);opacity:1;}
        @media(max-width:768px){
          .sd-root{padding-bottom:calc(68px + env(safe-area-inset-bottom,0px));}
          .sd-content{padding:0 0 16px;}
          .sd-page-header{padding:14px 14px 0;margin-bottom:0;}
          .sd-page-title{font-size:20px;}
          .sd-page-sub{font-size:12.5px;}
          .sd-sheet-bar{display:none!important;}
          .sd-sheet-picker-btn{display:flex;}
          .sd-sheet-picker-wrap{position:sticky;top:56px;z-index:40;background:var(--color-background);padding:10px 14px;border-bottom:1px solid var(--color-outline-variant);}
          .sd-controls{position:sticky;top:calc(56px + 57px);z-index:39;background:var(--color-background);padding:10px 14px;border-bottom:1px solid var(--color-outline-variant);flex-wrap:nowrap;gap:8px;margin-bottom:10px;}
          .sd-controls.no-sheet-bar{top:56px;}
          .sd-search-wrap{min-width:0;max-width:100%;flex:1;}
          .sd-search{padding:9px 36px;font-size:13px;border-radius:10px;}
          .sd-result-count{font-size:11px;white-space:nowrap;flex-shrink:0;}
          .sd-view-toggle{display:flex;}
          .sd-grid{padding:0 14px;grid-template-columns:1fr 1fr;gap:10px;}
          .sd-grid.list-view{grid-template-columns:1fr;gap:8px;}
          .sd-pagination-wrap{padding:0 14px;margin-top:20px;}
          #pagination-prev,#pagination-next{padding:6px 10px!important;font-size:12px!important;}
          .sd-hero-card{padding:24px 20px;border-radius:20px;margin:14px 14px 0;}
          .sd-hero-title{font-size:24px;letter-spacing:-0.8px;}
          .sd-hero-sub{font-size:13.5px;margin-bottom:18px;max-width:100%;}
          .sd-hero-eyebrow{font-size:10px;margin-bottom:8px;}
          .sd-overview-grid{grid-template-columns:1fr;gap:10px;margin-top:14px;padding:0 14px 14px;}
          .sd-stat-card{padding:16px 14px;border-radius:16px;}
          .sd-stat-value{font-size:26px;}
          .sd-stat-icon{width:44px;height:44px;font-size:18px;}
          .sd-marquee-outer{padding:20px 0 0;}
          .sd-marquee-label{padding:0 14px;margin-bottom:10px;}
          .sd-logo-pill{height:52px;min-width:88px;padding:10px 14px;border-radius:12px;}
          .sd-logo-img{height:28px;max-width:70px;}
        }
        @media(max-width:400px){.sd-grid{grid-template-columns:1fr;}}
      `}),(0,H.jsxs)(`div`,{className:`sd-root`,style:e?{minHeight:`auto`}:{},children:[!e&&(0,H.jsx)(Ye,{activeTab:c,onTabChange:L}),(0,H.jsxs)(`div`,{className:`sd-content`,children:[c!==`overview`&&(0,H.jsxs)(`div`,{className:`sd-page-header`,children:[(0,H.jsxs)(`h1`,{className:`sd-page-title`,children:[c===`company`&&`Company Stock`,c===`bosch`&&`Bosch Stock`,c===`orders`&&`New Order`,c===`history`&&`Order History`]}),(0,H.jsxs)(`p`,{className:`sd-page-sub`,children:[c===`company`&&`Browse company inventory sheets`,c===`bosch`&&`Search Bosch parts`,c===`orders`&&`Punch a new sales order`,c===`history`&&`View all past orders`]})]}),c===`overview`&&(0,H.jsx)(mt,{sheets:u,sheetsLoading:f,masterQuery:E,setMasterQuery:O,masterResults:A,masterLoading:ee,handleTabChange:L,handleSheetSelect:R,setSearchInput:w}),(c===`company`||c===`bosch`)&&(0,H.jsxs)(H.Fragment,{children:[c===`company`&&(0,H.jsx)(ht,{sheets:u,sheetsLoading:f,selectedSheet:I,onSheetSelect:R}),(0,H.jsxs)(`div`,{className:`sd-controls${c===`bosch`?` no-sheet-bar`:``}`,children:[(0,H.jsxs)(`div`,{className:`sd-search-wrap`,children:[(0,H.jsx)(`span`,{className:`sd-search-icon`,children:`🔍`}),(0,H.jsx)(`input`,{ref:l,id:`sd-search-input`,className:`sd-search`,type:`text`,placeholder:`Search part no, name…`,value:C,onChange:e=>w(e.target.value)}),C&&(0,H.jsx)(`button`,{className:`sd-search-clear`,id:`sd-search-clear`,onClick:()=>{w(``),l.current?.focus()},children:`✕`})]}),_&&(0,H.jsxs)(`span`,{className:`sd-result-count`,children:[_.totalDocuments,T?` for "${T}"`:` items`]}),(0,H.jsxs)(`div`,{className:`sd-view-toggle`,children:[(0,H.jsx)(`button`,{className:`sd-view-btn${N===`grid`?` active`:``}`,onClick:()=>P(`grid`),title:`Grid view`,children:(0,H.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`currentColor`,children:[(0,H.jsx)(`rect`,{x:`1`,y:`1`,width:`6`,height:`6`,rx:`1.5`}),(0,H.jsx)(`rect`,{x:`9`,y:`1`,width:`6`,height:`6`,rx:`1.5`}),(0,H.jsx)(`rect`,{x:`1`,y:`9`,width:`6`,height:`6`,rx:`1.5`}),(0,H.jsx)(`rect`,{x:`9`,y:`9`,width:`6`,height:`6`,rx:`1.5`})]})}),(0,H.jsx)(`button`,{className:`sd-view-btn${N===`list`?` active`:``}`,onClick:()=>P(`list`),title:`List view`,children:(0,H.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`currentColor`,children:[(0,H.jsx)(`rect`,{x:`1`,y:`2`,width:`14`,height:`3`,rx:`1.5`}),(0,H.jsx)(`rect`,{x:`1`,y:`6.5`,width:`14`,height:`3`,rx:`1.5`}),(0,H.jsx)(`rect`,{x:`1`,y:`11`,width:`14`,height:`3`,rx:`1.5`})]})})]})]}),(0,H.jsx)(`div`,{className:`sd-grid${N===`list`?` list-view`:``}`,children:y?Array.from({length:12}).map((e,t)=>(0,H.jsx)(ut,{},t)):h.length===0?(0,H.jsx)(dt,{search:T}):h.map(e=>(0,H.jsx)($e,{item:e},e._id))}),!y&&(0,H.jsx)(`div`,{className:`sd-pagination-wrap`,children:(0,H.jsx)(ft,{pagination:_,onPageChange:S})})]}),c===`orders`&&(0,H.jsx)(Je,{onSuccess:()=>L(`history`)}),c===`history`&&(0,H.jsx)(lt,{})]})]})]})},vt=()=>{let{tab:e}=m(),t=s(),n=e||`system`;return ve(),(0,H.jsxs)(`div`,{className:`min-h-screen font-sans flex flex-col relative`,style:{background:`var(--color-background)`},children:[(0,H.jsx)(`div`,{className:`fixed inset-0 pointer-events-none opacity-20 z-0`,style:{backgroundImage:`linear-gradient(var(--color-outline-variant) 1px, transparent 1px), linear-gradient(90deg, var(--color-outline-variant) 1px, transparent 1px)`,backgroundSize:`52px 52px`}}),(0,H.jsx)(ye,{activeTab:n,onTabChange:e=>t(`/admin/${e}`)}),(0,H.jsxs)(`div`,{className:`z-10 w-full relative`,children:[n===`system`&&(0,H.jsx)(be,{}),n===`all_orders`&&(0,H.jsx)(`div`,{className:`max-w-7xl mx-auto px-4 md:px-6 py-8 pb-24`,children:(0,H.jsx)(Te,{})}),(n===`company`||n===`bosch`)&&(0,H.jsx)(_t,{hideNavbar:!0,adminTab:n}),n===`orders`&&(0,H.jsx)(`div`,{className:`max-w-7xl mx-auto px-4 md:px-6 py-8 pb-24`,children:(0,H.jsx)(Je,{onSuccess:()=>t(`/admin/all_orders`)})})]})]})},Q=({children:e,role:t})=>{let n=o(e=>e.auth.user);return o(e=>e.auth.loading)?(0,H.jsx)(`div`,{className:`text-center mt-10`,children:`Loading...`}):n?t&&n.role!==t?n.role===`admin`?(0,H.jsx)(f,{to:`/admin`,replace:!0}):(0,H.jsx)(f,{to:`/sales/overview`,replace:!0}):e:(0,H.jsx)(f,{to:`/login`,replace:!0})},$=()=>(0,H.jsxs)(`div`,{className:`flex flex-col items-center justify-center w-screen h-screen bg-[#f8f9fa] font-['DM_Sans']`,children:[(0,H.jsx)(`style`,{children:`
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
      `}),(0,H.jsx)(`div`,{className:`gl-spinner`}),(0,H.jsx)(`h2`,{className:`gl-text`,children:`B.K Engineering`}),(0,H.jsx)(`p`,{className:`gl-sub`,children:`Loading application securely...`})]}),yt=(0,D.lazy)(()=>i(()=>import(`./Login-BHN1sBMJ.js`),__vite__mapDeps([0,1,2,3,4,5]))),bt=(0,D.lazy)(()=>i(()=>import(`./Register-CggC3XVu.js`),__vite__mapDeps([6,1,2,3,4,5]))),xt=(0,D.lazy)(()=>i(()=>import(`./ForgotPassword-og5SHJMI.js`),__vite__mapDeps([7,1,2,3,4,5]))),St=(0,D.lazy)(()=>i(()=>import(`./ResetPassword-w47-CeU5.js`),__vite__mapDeps([8,1,2,3,4,5]))),Ct=n([{path:`/`,children:[{index:!0,element:(0,H.jsx)(f,{to:`/sales/overview`,replace:!0})}]},{path:`/sales`,children:[{index:!0,element:(0,H.jsx)(f,{to:`/sales/overview`,replace:!0})},{path:`:tab`,element:(0,H.jsx)(Q,{role:`sales`,children:(0,H.jsx)(_t,{})})}]},{path:`/login`,element:(0,H.jsx)(D.Suspense,{fallback:(0,H.jsx)($,{}),children:(0,H.jsx)(yt,{})})},{path:`/register`,element:(0,H.jsx)(D.Suspense,{fallback:(0,H.jsx)($,{}),children:(0,H.jsx)(bt,{})})},{path:`/forgot-password`,element:(0,H.jsx)(D.Suspense,{fallback:(0,H.jsx)($,{}),children:(0,H.jsx)(xt,{})})},{path:`/reset-password`,element:(0,H.jsx)(D.Suspense,{fallback:(0,H.jsx)($,{}),children:(0,H.jsx)(St,{})})},{path:`/admin`,children:[{index:!0,element:(0,H.jsx)(f,{to:`/admin/system`,replace:!0})},{path:`:tab`,element:(0,H.jsx)(Q,{role:`admin`,children:(0,H.jsx)(vt,{})})},{path:`/admin/order/:orderId`,element:(0,H.jsx)(Q,{role:`admin`,children:(0,H.jsx)(me,{})})}]}]),wt=()=>{let e=d(),[n,r]=(0,D.useState)(!0),i=o(e=>e.auth.user),a=async()=>{try{let t=await C();t&&t.user&&e(T(t.user))}catch{e(T(null))}finally{r(!1)}};return(0,D.useEffect)(()=>{a()},[]),(0,D.useEffect)(()=>{i?i.role===`admin`?document.title=`BK Eng · Admin`:document.title=`BK Eng · Sales`:document.title=`BK Eng`},[i]),n?(0,H.jsx)($,{}):(0,H.jsx)(`div`,{children:(0,H.jsx)(t,{router:Ct})})},Tt=_({reducer:{auth:w,admin:ae,sales:Ke}});(0,O.createRoot)(document.getElementById(`root`)).render((0,H.jsx)(D.StrictMode,{children:(0,H.jsx)(l,{store:Tt,children:(0,H.jsx)(wt,{})})}));