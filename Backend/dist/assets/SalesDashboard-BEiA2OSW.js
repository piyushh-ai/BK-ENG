import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{d as t,h as n,i as r,l as i,m as a,r as o,t as s,u as c}from"./react-vendor-DBK4LzoR.js";import{r as l}from"./vendor-D4tGl24r.js";import{t as u}from"./gsap-vendor-C_Dj5ryB.js";import{a as d,c as f,d as p,f as m,i as h,l as g,n as _,o as v,p as y,s as b,t as x,u as S}from"./sales.slice-BZSS8h-O.js";import{t as C}from"./useAuth-DFT8lWVv.js";var w=e(n(),1),T=e(a(),1),E=s(),D=l.create({baseURL:`/api`,withCredentials:!0}),O=async()=>(await D.get(`/getStock/company-sheets`)).data,k=async(e,{page:t=1,limit:n=12,search:r=``}={})=>(await D.get(`/getStock/company-stock/${e}`,{params:{page:t,limit:n,search:r}})).data,A=async({page:e=1,limit:t=12,search:n=``}={})=>(await D.get(`/getStock/boschStock`,{params:{page:e,limit:t,search:n}})).data,j=async({page:e=1,limit:t=12,search:n=``}={})=>(await D.get(`/getStock/master-search`,{params:{page:e,limit:t,search:n}})).data,M=async e=>(await D.post(`/salesOrder/create`,e,{headers:{"Content-Type":`multipart/form-data`}})).data,N=async({page:e=1,limit:t=10}={})=>(await D.get(`/salesOrder/my`,{params:{page:e,limit:t}})).data,P=async e=>(await D.get(`/salesOrder/${e}`)).data,F=async e=>(await D.get(`/salesOrder/search`,{params:{q:e}})).data,I=async e=>(await D.delete(`/salesOrder/${e}`)).data,L=()=>{let e=o();return{fetchCompanySheets:async()=>{try{e(g(!0)),e(v((await O()).companySheets||[]))}catch(t){e(f(t?.response?.data?.message||t.message))}finally{e(g(!1))}},fetchCompanyStock:async(t,n)=>{try{e(g(!0)),e(b((await k(t,n)).companyStock||[]))}catch(t){e(f(t?.response?.data?.message||t.message))}finally{e(g(!1))}},fetchBoschStock:async t=>{try{e(g(!0)),e(d((await A(t)).boschStock||[]))}catch(t){e(f(t?.response?.data?.message||t.message))}finally{e(g(!1))}},createOrder:async t=>{e(p(!0));try{let n=await M(t);return e(x(n.order)),n}catch(t){let n=t?.response?.data?.message||t.message;throw e(f(n)),Error(n)}finally{e(p(!1))}},fetchMyOrders:async({page:t=1,limit:n=10}={})=>{e(p(!0));try{let r=await N({page:t,limit:n});e(S(r.orders||[])),e(m(r.pagination||null))}catch(t){e(f(t?.response?.data?.message||t.message))}finally{e(p(!1))}},fetchOrderById:async t=>{e(p(!0));try{let n=await P(t);return e(h(n.order)),n.order}catch(t){let n=t?.response?.data?.message||t.message;throw e(f(n)),Error(n)}finally{e(p(!1))}},searchOrders:async t=>{e(p(!0));try{e(y((await F(t)).orders||[]))}catch(t){e(f(t?.response?.data?.message||t.message))}finally{e(p(!1))}},deleteOrder:async t=>{e(p(!0));try{return await I(t),e(_(t)),!0}catch(t){let n=t?.response?.data?.message||t.message;throw e(f(n)),Error(n)}finally{e(p(!1))}}}},R=7,z=({onSuccess:e})=>{let{createOrder:t}=L(),n=r(e=>e.sales.orderLoading),[i,a]=(0,w.useState)(``),[o,s]=(0,w.useState)(``),[c,l]=(0,w.useState)([]),[d,f]=(0,w.useState)(``),[p,m]=(0,w.useState)(!1),h=(0,w.useRef)(null),g=(0,w.useRef)(null),_=(0,w.useRef)(null),v=(0,w.useRef)(null),y=(0,w.useRef)(null),b=(0,w.useRef)(null),x=(0,w.useRef)(null),S=(0,w.useRef)(null),C=(0,w.useRef)(null);(0,w.useEffect)(()=>{let e=[_.current,v.current,y.current,b.current,x.current];u.set(e,{opacity:0,y:18}),u.timeline({defaults:{ease:`power3.out`}}).to(h.current,{opacity:1,duration:0}).to(e,{opacity:1,y:0,duration:.4,stagger:.07})},[]);let T=e=>{let t=Array.from(e.target.files||[]),n=R-c.length,r=t.slice(0,n).map(e=>({file:e,preview:URL.createObjectURL(e)}));l(e=>[...e,...r]),e.target.value=``},D=e=>{l(t=>(URL.revokeObjectURL(t[e].preview),t.filter((t,n)=>n!==e)))},O=()=>{u.to(h.current,{x:[-8,8,-6,6,-3,3,0],duration:.45,ease:`none`})};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`style`,{children:`
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
      `}),(0,E.jsxs)(`div`,{ref:h,className:`co-card`,style:{opacity:0},children:[p&&(0,E.jsxs)(`div`,{ref:C,className:`co-success`,style:{opacity:0},children:[(0,E.jsx)(`div`,{className:`co-success-icon`,children:`✅`}),(0,E.jsx)(`div`,{className:`co-success-text`,children:`Order Created!`}),(0,E.jsx)(`div`,{className:`co-success-sub`,children:`Your order has been submitted successfully.`})]}),(0,E.jsxs)(`div`,{ref:_,children:[(0,E.jsx)(`div`,{className:`co-eyebrow`,children:`New Order`}),(0,E.jsx)(`div`,{className:`co-title`,children:`Punch an Order`})]}),(0,E.jsxs)(`form`,{ref:g,onSubmit:async n=>{if(n.preventDefault(),f(``),!i.trim()){f(`Party name is required`),O();return}u.to(x.current,{scale:.97,duration:.08,yoyo:!0,repeat:1});let r=new FormData;r.append(`partyName`,i.trim()),r.append(`description`,o.trim()),c.forEach(({file:e})=>r.append(`images`,e));try{await t(r),m(!0),u.fromTo(C.current,{scale:.85,opacity:0},{scale:1,opacity:1,duration:.45,ease:`back.out(1.7)`}),setTimeout(()=>{a(``),s(``),l([]),m(!1),e?.()},1800)}catch(e){f(e.message),O()}},children:[d&&(0,E.jsxs)(`div`,{className:`co-error`,children:[(0,E.jsx)(`span`,{style:{width:6,height:6,borderRadius:`50%`,background:`#ba1a1a`,flexShrink:0}}),d]}),(0,E.jsxs)(`div`,{ref:v,className:`co-field`,children:[(0,E.jsx)(`label`,{className:`co-label`,htmlFor:`co-party`,children:`Party Name *`}),(0,E.jsx)(`input`,{className:`co-input`,id:`co-party`,type:`text`,placeholder:`e.g. Sharma Enterprises`,value:i,onChange:e=>a(e.target.value),required:!0})]}),(0,E.jsxs)(`div`,{ref:y,className:`co-field`,children:[(0,E.jsx)(`label`,{className:`co-label`,htmlFor:`co-desc`,children:`Description`}),(0,E.jsx)(`textarea`,{className:`co-textarea`,id:`co-desc`,placeholder:`Order details, notes, requirements...`,value:o,onChange:e=>s(e.target.value),rows:3})]}),(0,E.jsxs)(`div`,{ref:b,className:`co-field`,children:[(0,E.jsxs)(`label`,{className:`co-label`,children:[`Images \xA0`,(0,E.jsxs)(`span`,{style:{fontWeight:400,textTransform:`none`,letterSpacing:0},children:[`(`,c.length,`/`,R,`)`]})]}),(0,E.jsxs)(`div`,{className:`co-img-zone`,children:[c.length<R&&(0,E.jsxs)(`button`,{type:`button`,className:`co-img-add-btn`,onClick:()=>S.current?.click(),children:[(0,E.jsx)(`span`,{style:{fontSize:18},children:`📷`}),`Add Photos`]}),(0,E.jsx)(`input`,{ref:S,type:`file`,accept:`image/jpeg,image/png,image/webp`,multiple:!0,style:{display:`none`},onChange:T}),c.length>0&&(0,E.jsx)(`div`,{className:`co-img-grid`,children:c.map(({preview:e},t)=>(0,E.jsxs)(`div`,{className:`co-img-thumb`,children:[(0,E.jsx)(`img`,{src:e,alt:`preview-${t}`}),(0,E.jsx)(`button`,{type:`button`,className:`co-img-remove`,onClick:()=>D(t),title:`Remove`,children:`✕`})]},t))}),c.length===0&&(0,E.jsxs)(`div`,{className:`co-img-count`,children:[`Upload up to `,R,` images (JPG, PNG, WEBP)`]})]})]}),(0,E.jsx)(`div`,{ref:x,style:{opacity:0},children:(0,E.jsx)(`button`,{className:`co-btn`,type:`submit`,disabled:n,children:n?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`span`,{style:{fontSize:16,animation:`spin 1s linear infinite`},children:`⏳`}),`Submitting…`]}):(0,E.jsx)(E.Fragment,{children:`Submit Order →`})})})]})]})]})};function B(e,t=420){let[n,r]=(0,w.useState)(e);return(0,w.useEffect)(()=>{let n=setTimeout(()=>r(e),t);return()=>clearTimeout(n)},[e,t]),n}var V={pending:{label:`Pending`,color:`#b45309`,bg:`#fef3c7`},completed:{label:`Completed`,color:`#15803d`,bg:`#dcfce7`},cancelled:{label:`Cancelled`,color:`#b91c1c`,bg:`#fee2e2`},partial:{label:`Partial`,color:`#6d28d9`,bg:`#ede9fe`}},H=({status:e})=>{let t=V[e]||{label:e,color:`#555`,bg:`#eee`};return(0,E.jsx)(`span`,{style:{fontSize:`10.5px`,fontWeight:700,letterSpacing:`0.06em`,textTransform:`uppercase`,padding:`3px 10px`,borderRadius:`20px`,background:t.bg,color:t.color},children:t.label})},U=e=>{if(!e)return``;let t=new Date(e);return`${t.toLocaleDateString(`en-IN`,{day:`2-digit`,month:`short`,year:`numeric`})} • ${t.toLocaleTimeString(`en-IN`,{hour:`2-digit`,minute:`2-digit`,hour12:!0})}`},W=async e=>{try{let t=await(await fetch(e,{mode:`cors`})).blob(),n=window.URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`order-image-${Date.now()}.png`,document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(n)}catch(t){console.error(`Error downloading image:`,t),window.open(e,`_blank`)}},G=({isOpen:e,onClose:t,imageUrl:n})=>{let r=(0,w.useRef)(null),i=(0,w.useRef)(null);return(0,w.useEffect)(()=>{e&&(u.fromTo(r.current,{opacity:0},{opacity:1,duration:.2}),u.fromTo(i.current,{scale:.85,opacity:0},{scale:1,opacity:1,duration:.4,ease:`back.out(1.5)`}))},[e,n]),!e||!n?null:(0,E.jsxs)(`div`,{ref:r,className:`oh-modal-overlay oh-img-overlay`,onClick:t,children:[(0,E.jsx)(`button`,{className:`oh-img-close`,onClick:t,children:`✕`}),(0,E.jsxs)(`div`,{className:`oh-img-container`,onClick:e=>e.stopPropagation(),children:[(0,E.jsx)(`img`,{ref:i,src:n,alt:`Full screen preview`,className:`oh-img-full`}),(0,E.jsx)(`button`,{className:`oh-img-download`,onClick:()=>W(n),children:`📥 Download Image`})]})]})},K=({isOpen:e,onClose:t,onConfirm:n,orderName:r,loading:i})=>{let a=(0,w.useRef)(null),o=(0,w.useRef)(null);return(0,w.useEffect)(()=>{e&&(u.fromTo(a.current,{opacity:0},{opacity:1,duration:.2}),u.fromTo(o.current,{scale:.9,opacity:0,y:10},{scale:1,opacity:1,y:0,duration:.3,ease:`back.out(1.5)`}))},[e]),e?(0,E.jsx)(`div`,{ref:a,className:`oh-modal-overlay oh-overlay-small`,children:(0,E.jsxs)(`div`,{ref:o,className:`oh-modal oh-modal-small`,children:[(0,E.jsx)(`div`,{className:`oh-modal-icon-danger`,children:`⚠️`}),(0,E.jsx)(`h3`,{className:`oh-modal-title`,children:`Delete Order?`}),(0,E.jsxs)(`p`,{className:`oh-modal-text`,children:[`Are you sure you want to delete the order for `,(0,E.jsx)(`strong`,{children:r}),`? This action cannot be undone.`]}),(0,E.jsxs)(`div`,{className:`oh-modal-actions`,children:[(0,E.jsx)(`button`,{className:`oh-btn-cancel`,onClick:t,disabled:i,children:`Cancel`}),(0,E.jsx)(`button`,{className:`oh-btn-danger`,onClick:n,disabled:i,children:i?`Deleting...`:`Yes, Delete`})]})]})}):null},q=({isOpen:e,onClose:t,order:n,onImageClick:r})=>{let i=(0,w.useRef)(null),a=(0,w.useRef)(null);return(0,w.useEffect)(()=>{e&&(u.fromTo(i.current,{opacity:0},{opacity:1,duration:.2}),u.fromTo(a.current,{opacity:0,y:20},{opacity:1,y:0,duration:.3,ease:`power3.out`}))},[e]),!e||!n?null:(0,E.jsx)(`div`,{ref:i,className:`oh-modal-overlay oh-overlay-large`,onClick:t,children:(0,E.jsxs)(`div`,{ref:a,className:`oh-modal oh-modal-large`,onClick:e=>e.stopPropagation(),children:[(0,E.jsx)(`button`,{className:`oh-modal-close`,onClick:t,children:`✕`}),(0,E.jsxs)(`div`,{className:`oh-d-header`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h2`,{className:`oh-d-party`,children:n.partyName}),(0,E.jsxs)(`div`,{className:`oh-d-meta`,children:[(0,E.jsx)(`span`,{children:U(n.createdAt)}),` • `,(0,E.jsxs)(`span`,{children:[`Order #`,n._id.slice(-6).toUpperCase()]})]})]}),(0,E.jsx)(H,{status:n.status})]}),(0,E.jsxs)(`div`,{className:`oh-d-body`,children:[n.status!==`pending`&&n.remark&&(0,E.jsxs)(`div`,{className:`oh-d-section`,children:[(0,E.jsxs)(`h4`,{className:`oh-d-label`,style:{color:`#b45309`,display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,E.jsx)(`span`,{children:`⚠️`}),` Admin Remark`]}),(0,E.jsx)(`div`,{className:`oh-d-remark`,children:n.remark})]}),(0,E.jsxs)(`div`,{className:`oh-d-section`,children:[(0,E.jsx)(`h4`,{className:`oh-d-label`,children:`Description`}),(0,E.jsx)(`div`,{className:`oh-d-desc`,children:n.description||(0,E.jsx)(`span`,{style:{opacity:.5},children:`No description provided.`})})]}),n.images?.length>0&&(0,E.jsxs)(`div`,{className:`oh-d-section`,children:[(0,E.jsxs)(`h4`,{className:`oh-d-label`,children:[`Images (`,n.images.length,`)`]}),(0,E.jsx)(`div`,{className:`oh-d-image-grid`,children:n.images.map((e,t)=>(0,E.jsx)(`div`,{className:`oh-d-img-link`,onClick:t=>{t.stopPropagation(),r(e.url)},children:(0,E.jsx)(`img`,{src:e.url,alt:`attachment-${t}`,className:`oh-d-img`})},t))})]})]})]})})},J=({order:e,isLatest:t,onDeleteRequest:n,onClickDetail:r,onImageClick:i})=>{let a=(0,w.useRef)(null);(0,w.useEffect)(()=>{u.fromTo(a.current,{y:20,opacity:0},{y:0,opacity:1,duration:.4,ease:`power3.out`})},[]);let o=e.status===`pending`;return(0,E.jsxs)(`div`,{ref:a,className:`oh-card${t?` oh-card-latest`:``}`,onClick:()=>r(e),children:[t&&(0,E.jsx)(`div`,{className:`oh-latest-badge`,children:`✦ Latest`}),(0,E.jsxs)(`div`,{className:`oh-card-header`,children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`div`,{className:`oh-party`,children:e.partyName}),(0,E.jsx)(`div`,{className:`oh-date`,children:U(e.createdAt)})]}),(0,E.jsx)(H,{status:e.status})]}),e.description&&(0,E.jsx)(`div`,{className:`oh-desc`,children:e.description}),e.images?.length>0&&(0,E.jsxs)(`div`,{className:`oh-thumbs`,children:[e.images.slice(0,4).map((e,t)=>(0,E.jsx)(`div`,{className:`oh-thumb-wrapper`,onClick:t=>{t.stopPropagation(),i(e.url)},children:(0,E.jsx)(`img`,{src:e.url,alt:`order-img-${t}`,className:`oh-thumb`})},t)),e.images.length>4&&(0,E.jsxs)(`div`,{className:`oh-thumb-more`,onClick:t=>{t.stopPropagation(),r(e)},children:[`+`,e.images.length-4]})]}),(0,E.jsxs)(`div`,{className:`oh-card-footer`,children:[(0,E.jsxs)(`span`,{className:`oh-order-id`,children:[`#`,e._id.slice(-6).toUpperCase()]}),(0,E.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,E.jsx)(`button`,{className:`oh-view-btn`,onClick:t=>{t.stopPropagation(),r(e)},children:`👁 View`}),o&&(0,E.jsx)(`button`,{className:`oh-del-btn`,onClick:t=>{t.stopPropagation(),n(e)},title:`Delete order`,children:`🗑 Delete`})]})]})]})},Y=()=>{let{fetchMyOrders:e,searchOrders:t,deleteOrder:n}=L(),{myOrders:i,ordersPagination:a,orderLoading:o,searchResults:s}=r(e=>e.sales),[c,l]=(0,w.useState)(``),[d,f]=(0,w.useState)(!1),[p,m]=(0,w.useState)(1),[h,g]=(0,w.useState)(null),[_,v]=(0,w.useState)(null),[y,b]=(0,w.useState)(!1),[x,S]=(0,w.useState)(null),C=B(c,400),T=(0,w.useRef)(null),D=(0,w.useRef)(null),O=(0,w.useRef)(null),k=(0,w.useRef)(null);(0,w.useEffect)(()=>{let e=u.context(()=>{u.fromTo([D.current,O.current],{y:20,opacity:0},{y:0,opacity:1,duration:.5,ease:`power3.out`,stagger:.1})},T);return()=>e.revert()},[]),(0,w.useEffect)(()=>{e({page:p,limit:10})},[p]),(0,w.useEffect)(()=>{C.trim()?(f(!0),t(C.trim())):f(!1)},[C]);let A=async()=>{if(_){b(!0);try{await n(_._id),v(null)}catch(e){alert(e.message)}finally{b(!1)}}},j=d?s:i;return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`style`,{children:`
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
        
        @media (max-width: 600px) {
          /* Specific overlay alignments */
          .oh-overlay-large { padding: 20px 0 0 0; align-items: flex-end; }
          .oh-overlay-small { padding: 20px; align-items: center; }

          /* Detail Modal adjustments */
          .oh-modal-large { 
            border-radius: 24px 24px 0 0; 
            margin-top: auto; 
            max-height: 85vh; 
            border-bottom: none; 
            width: 100%; 
            padding-bottom: env(safe-area-inset-bottom, 20px); 
          }
          .oh-d-header { 
            padding: 24px 48px 16px 20px; /* Right padding 48px to prevent overlap with close button */
            flex-direction: column; 
            gap: 12px;
          }
          .oh-d-body { padding: 16px 20px 40px; }
          .oh-modal-close { top: 16px; right: 16px; background: var(--color-surface-container-high); }
          .oh-d-party { font-size: 20px; margin-bottom: 2px; }
          .oh-d-desc { font-size: 14px; padding: 14px; }
          .oh-d-image-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 10px; }

          /* Confirm Modal adjustments */
          .oh-modal-small {
            padding: 28px 20px 24px;
            width: 100%;
            margin: 0 auto;
          }
          .oh-modal-icon-danger { font-size: 34px; margin-bottom: 12px; }
          .oh-modal-title { font-size: 20px; }
          .oh-modal-text { font-size: 13.5px; margin-bottom: 24px; }
          .oh-modal-actions { flex-direction: column; gap: 10px; }
          .oh-btn-cancel, .oh-btn-danger { width: 100%; padding: 14px; font-size: 14.5px; }
          /* Image Preview Modal adjustments */
          .oh-img-close { top: 12px; right: 12px; width: 36px; height: 36px; font-size: 16px; }
          .oh-img-full { max-height: calc(90vh - 70px); }
          .oh-img-download { width: 100%; text-align: center; }
        }
      `}),(0,E.jsxs)(`div`,{ref:T,className:`oh-wrap`,children:[(0,E.jsxs)(`div`,{ref:D,className:`oh-header`,children:[(0,E.jsx)(`div`,{className:`oh-eyebrow`,children:`Order History`}),(0,E.jsx)(`div`,{className:`oh-title`,children:`My Orders`}),(0,E.jsx)(`div`,{className:`oh-sub`,children:`Track and manage all your submitted orders.`})]}),(0,E.jsxs)(`div`,{ref:O,className:`oh-search-wrap`,children:[(0,E.jsx)(`span`,{className:`oh-search-icon`,children:`🔍`}),(0,E.jsx)(`input`,{className:`oh-search`,type:`text`,placeholder:`Search by party name...`,value:c,onChange:e=>l(e.target.value)}),c&&(0,E.jsx)(`button`,{className:`oh-search-clear`,onClick:()=>l(``),title:`Clear`,children:`✕`})]}),o&&j.length===0?(0,E.jsx)(`div`,{className:`oh-loader`,children:`Loading orders…`}):j.length===0?(0,E.jsxs)(`div`,{className:`oh-empty`,children:[(0,E.jsx)(`div`,{className:`oh-empty-icon`,children:d?`🔎`:`📋`}),(0,E.jsx)(`div`,{className:`oh-empty-title`,children:d?`No results found`:`No orders yet`}),(0,E.jsx)(`div`,{className:`oh-empty-sub`,children:d?`No orders match "${c}". Try a different name.`:`Your submitted orders will appear here.`})]}):(0,E.jsxs)(E.Fragment,{children:[d&&(0,E.jsxs)(`div`,{className:`oh-search-label`,children:[`Showing results for `,(0,E.jsx)(`span`,{children:c}),` — `,j.length,` found`]}),(0,E.jsx)(`div`,{ref:k,children:j.map((e,t)=>(0,E.jsx)(J,{order:e,isLatest:!d&&t===0,onDeleteRequest:v,onClickDetail:g,onImageClick:S},e._id))}),!d&&a&&a.totalPages>1&&(0,E.jsxs)(`div`,{className:`oh-pagination`,children:[(0,E.jsxs)(`span`,{className:`oh-pg-info`,children:[`Page `,a.currentPage,` of `,a.totalPages,`\xA0· `,a.total,` orders total`]}),(0,E.jsxs)(`div`,{className:`oh-pg-btns`,children:[(0,E.jsx)(`button`,{className:`oh-pg-btn`,disabled:!a.hasPrevPage,onClick:()=>m(e=>e-1),children:`← Prev`}),(0,E.jsx)(`button`,{className:`oh-pg-btn`,disabled:!a.hasNextPage,onClick:()=>m(e=>e+1),children:`Next →`})]})]})]})]}),(0,E.jsx)(K,{isOpen:!!_,onClose:()=>v(null),onConfirm:A,orderName:_?.partyName,loading:y}),(0,E.jsx)(q,{isOpen:!!h,onClose:()=>g(null),order:h,onImageClick:S}),(0,E.jsx)(G,{isOpen:!!x,onClose:()=>S(null),imageUrl:x})]})},X=({activeTab:e,onTabChange:t})=>{let n=r(e=>e.auth.user),{logout:a}=C(),o=i(),[s,c]=(0,w.useState)(!1),l=(0,w.useRef)(null),d=(0,w.useRef)(null),f=(0,w.useRef)(null),p=(0,w.useRef)({}),m=[{id:`overview`,label:`Dashboard`,icon:(0,E.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,E.jsx)(`path`,{d:`m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`}),(0,E.jsx)(`polyline`,{points:`9 22 9 12 15 12 15 22`})]})},{id:`company`,label:`Co. Stock`,icon:(0,E.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,E.jsx)(`path`,{d:`M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z`}),(0,E.jsx)(`polyline`,{points:`3.27 6.96 12 12.01 20.73 6.96`}),(0,E.jsx)(`line`,{x1:`12`,y1:`22.08`,x2:`12`,y2:`12`})]})},{id:`bosch`,label:`Bosch`,icon:(0,E.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,E.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,E.jsx)(`path`,{d:`M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20`}),(0,E.jsx)(`path`,{d:`M2 12h20`})]})},{id:`orders`,label:`Punch`,icon:(0,E.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,E.jsx)(`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`}),(0,E.jsx)(`path`,{d:`M8 12h8`}),(0,E.jsx)(`path`,{d:`M12 8v8`})]})},{id:`history`,label:`History`,icon:(0,E.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,style:{width:`20px`,height:`20px`},children:[(0,E.jsx)(`path`,{d:`M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z`}),(0,E.jsx)(`path`,{d:`M14 2v6h6`}),(0,E.jsx)(`path`,{d:`M16 13H8`}),(0,E.jsx)(`path`,{d:`M16 17H8`}),(0,E.jsx)(`path`,{d:`M10 9H8`})]})}];(0,w.useEffect)(()=>{d.current&&u.fromTo(d.current,{y:-80,opacity:0},{y:0,opacity:1,duration:.7,ease:`power4.out`,onComplete:()=>u.set(d.current,{clearProps:`transform,y`})})},[]),(0,w.useEffect)(()=>{let t=p.current[e];if(!t||!f.current)return;let{offsetLeft:n,offsetWidth:r}=t;u.to(f.current,{x:n,width:r,duration:.38,ease:`power3.inOut`})},[e]),(0,w.useEffect)(()=>{let e=e=>{l.current&&!l.current.contains(e.target)&&c(!1)};return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[]);let h=async()=>{await a(),o(`/login`)},g=n?.name?n.name.split(` `).map(e=>e[0]).join(``).toUpperCase().slice(0,2):`SL`;return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`style`,{children:`
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
      `}),(0,E.jsx)(`nav`,{className:`snav`,ref:d,children:(0,E.jsxs)(`div`,{className:`snav-inner`,children:[(0,E.jsxs)(`a`,{className:`snav-brand`,href:`/`,children:[(0,E.jsx)(`div`,{className:`snav-logo`,children:(0,E.jsx)(`svg`,{viewBox:`0 0 16 16`,children:(0,E.jsx)(`path`,{d:`M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z`})})}),(0,E.jsxs)(`span`,{className:`snav-brand-name`,children:[`B.K `,(0,E.jsx)(`span`,{children:`Eng`})]})]}),(0,E.jsxs)(`div`,{className:`snav-tabs`,children:[m.map(n=>(0,E.jsxs)(`button`,{ref:e=>p.current[n.id]=e,className:`snav-tab${e===n.id?` active`:``}`,onClick:()=>t(n.id),id:`snav-tab-${n.id}`,children:[(0,E.jsx)(`span`,{className:`snav-tab-icon`,children:n.icon}),n.label]},n.id)),(0,E.jsx)(`div`,{className:`snav-tab-indicator`,ref:f})]}),(0,E.jsxs)(`div`,{className:`snav-right`,children:[(0,E.jsxs)(`div`,{className:`snav-user-info`,children:[(0,E.jsx)(`div`,{className:`snav-user-name`,children:n?.name||`Sales User`}),(0,E.jsx)(`div`,{className:`snav-user-email`,children:n?.email||``})]}),(0,E.jsxs)(`div`,{className:`snav-avatar-wrap`,ref:l,children:[(0,E.jsxs)(`div`,{className:`snav-avatar`,onClick:()=>c(e=>!e),title:`Account`,children:[g,(0,E.jsx)(`span`,{className:`snav-avatar-pulse`})]}),s&&(0,E.jsxs)(`div`,{className:`snav-dropdown`,children:[(0,E.jsxs)(`div`,{className:`snav-drop-header`,children:[(0,E.jsx)(`div`,{className:`snav-drop-name`,children:n?.name||`Sales User`}),(0,E.jsx)(`div`,{className:`snav-drop-email`,children:n?.email||``})]}),(0,E.jsxs)(`button`,{className:`snav-drop-item`,children:[(0,E.jsx)(`span`,{className:`snav-drop-item-icon`,children:`👤`}),` Profile`]}),(0,E.jsxs)(`button`,{className:`snav-drop-item`,children:[(0,E.jsx)(`span`,{className:`snav-drop-item-icon`,children:`⚙️`}),` Settings`]}),(0,E.jsx)(`div`,{className:`snav-drop-divider`}),(0,E.jsxs)(`button`,{className:`snav-drop-item danger`,onClick:h,children:[(0,E.jsx)(`span`,{className:`snav-drop-item-icon`,children:`🚪`}),` Sign out`]})]})]})]})]})}),(0,T.createPortal)((0,E.jsx)(`div`,{className:`snav-bottom`,children:m.map(n=>(0,E.jsxs)(`button`,{className:`snav-bot-tab${e===n.id?` active`:``}`,onClick:()=>t(n.id),id:`snav-bot-${n.id}`,children:[(0,E.jsx)(`span`,{className:`snav-bot-icon`,children:n.icon}),(0,E.jsx)(`span`,{className:`snav-bot-dot`}),(0,E.jsx)(`span`,{className:`snav-bot-label`,children:n.label})]},n.id))}),document.body)]})},Z={out:{bg:`rgba(231,76,60,0.07)`,border:`rgba(231,76,60,0.22)`,color:`#C0392B`,dot:`#E74C3C`,label:`Out of Stock`,strip:`#E74C3C`},low:{bg:`rgba(245,166,35,0.08)`,border:`rgba(245,166,35,0.24)`,color:`#A05C00`,dot:`#F5A623`,label:`Low Stock`,strip:`#F5A623`},good:{bg:`rgba(39,174,96,0.07)`,border:`rgba(39,174,96,0.22)`,color:`#1E8449`,dot:`#27AE60`,label:`In Stock`,strip:`#27AE60`}},Q=e=>{let t=parseInt(e);return isNaN(t)||t===0?`out`:t<=5?`low`:`good`},ee=w.memo(({item:e})=>{let t=(0,w.useRef)(null),n=(0,w.useRef)(null),r=(0,w.useRef)(null),i=Z[Q(e.quantity)];(0,w.useEffect)(()=>{u.fromTo(t.current,{y:24,opacity:0},{y:0,opacity:1,duration:.48,ease:`power3.out`,onComplete:()=>u.set(t.current,{clearProps:`transform`})})},[]);let a=e=>{let r=t.current.getBoundingClientRect(),i=e.clientX-r.left,a=e.clientY-r.top,o=(a-r.height/2)/r.height*5,s=(i-r.width/2)/r.width*-5;if(u.to(t.current,{rotateX:o,rotateY:s,transformPerspective:900,boxShadow:`0 16px 40px rgba(0,0,0,0.10), ${s*-1.2}px ${o*-1.2}px 20px rgba(107,96,212,0.08)`,duration:.22,ease:`power2.out`}),n.current){let e=i/r.width*100,t=a/r.height*100;n.current.style.background=`radial-gradient(circle at ${e}% ${t}%, rgba(255,255,255,0.55) 0%, transparent 65%)`}},o=()=>{u.to(t.current,{rotateX:0,rotateY:0,y:0,boxShadow:`0 1px 12px rgba(0,0,0,0.06)`,duration:.55,ease:`elastic.out(1, 0.6)`}),n.current&&(n.current.style.background=`transparent`)},s=()=>{u.to(t.current,{y:-4,duration:.28,ease:`power2.out`}),r.current&&u.fromTo(r.current,{scale:.92},{scale:1,duration:.35,ease:`back.out(2.5)`})},c=e.mrp!==void 0&&e.mrp!==null&&e.mrp!==``;return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

        .pc-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          cursor: default;
          transform-style: preserve-3d;
          will-change: transform;
          box-shadow: 0 1px 12px rgba(0,0,0,0.06);
          transition: border-color 0.22s ease;
          font-family: 'Instrument Sans', sans-serif;
        }
        .pc-card:hover {
          border-color: rgba(0,0,0,0.13);
        }

        /* Shimmer */
        .pc-shimmer {
          position: absolute; inset: 0; pointer-events: none;
          border-radius: 20px; z-index: 1; transition: background 0.08s;
        }

        /* ── Top accent strip ── */
        .pc-accent-strip {
          height: 3px;
          flex-shrink: 0;
        }

        /* ── Header: partno + stock badge ── */
        .pc-header {
          padding: 16px 18px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        /* Part No — now prominent */
        .pc-partno-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pc-partno-eyebrow {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #B0A9A3;
        }
        .pc-partno {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #1A1714;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 180px;
        }

        /* Stock badge */
        .pc-stock-pill {
          display: flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.03em;
          padding: 4px 10px 4px 8px; border-radius: 20px;
          white-space: nowrap; flex-shrink: 0;
          border: 1px solid;
        }
        .pc-stock-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
          animation: pcDotPulse 2.2s ease infinite;
        }
        @keyframes pcDotPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }

        /* ── Body ── */
        .pc-body {
          padding: 12px 18px 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Item name */
        .pc-name {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #1A1714;
          letter-spacing: -0.3px;
          line-height: 1.25;
          margin-bottom: 8px;
        }

        /* Sheet name */
        .pc-sheet-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #F5F3EF;
          color: #7A7370;
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 8px;
          margin-bottom: 16px;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border: 1px solid #EDE9E4;
          align-self: flex-start;
        }
        .pc-sheet-icon {
          flex-shrink: 0;
          opacity: 0.55;
        }

        /* Divider */
        .pc-divider {
          height: 1px;
          background: #F0EDE9;
          margin-bottom: 14px;
        }

        /* ── Metrics row ── */
        .pc-metrics {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        /* QTY block */
        .pc-qty-block {
          flex: 1;
          border-radius: 14px;
          padding: 12px 14px 11px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          border: 1px solid;
          position: relative;
          overflow: hidden;
        }
        .pc-qty-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.65;
        }
        .pc-qty-value {
          font-family: 'Syne', sans-serif;
          font-size: 30px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -1.5px;
        }
        .pc-qty-unit {
          font-size: 10px;
          font-weight: 500;
          opacity: 0.55;
          margin-top: 2px;
        }

        /* MRP block */
        .pc-mrp-block {
          flex: 1;
          background: #F9F7FD;
          border: 1px solid rgba(107,96,212,0.15);
          border-radius: 14px;
          padding: 12px 14px 11px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pc-mrp-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6B60D4;
          opacity: 0.75;
        }
        .pc-mrp-value {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #1A1714;
          line-height: 1;
          letter-spacing: -0.8px;
          display: flex;
          align-items: baseline;
          gap: 2px;
        }
        .pc-mrp-symbol {
          font-size: 15px;
          font-weight: 700;
          color: #6B60D4;
        }
        .pc-mrp-sub {
          font-size: 10px;
          color: #6B60D4;
          font-weight: 500;
          opacity: 0.6;
          margin-top: 2px;
        }

        /* ── Description ── */
        .pc-desc {
          margin-top: 12px;
          background: #F9F7F5;
          border: 1px solid #EDE9E4;
          border-radius: 12px;
          padding: 10px 13px;
        }
        .pc-desc-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #B0A9A3;
          margin-bottom: 4px;
        }
        .pc-desc-text {
          font-size: 12.5px;
          font-weight: 400;
          color: #6B6560;
          line-height: 1.55;
        }

        /* ── SNO watermark ── */
        .pc-sno {
          position: absolute;
          bottom: 11px; right: 14px;
          font-size: 10px;
          color: #C5BFB8;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          z-index: 2;
          letter-spacing: 0.04em;
        }
        .pc-card:hover .pc-sno { opacity: 1; }

        @media (max-width: 768px) {
          .pc-qty-value  { font-size: 26px; }
          .pc-mrp-value  { font-size: 20px; }
          .pc-name       { font-size: 15px; }
          .pc-partno     { font-size: 13px; }
        }
      `}),(0,E.jsxs)(`div`,{className:`pc-card`,ref:t,onMouseMove:a,onMouseLeave:o,onMouseEnter:s,children:[(0,E.jsx)(`div`,{className:`pc-shimmer`,ref:n}),e.sno&&(0,E.jsxs)(`span`,{className:`pc-sno`,children:[`#`,e.sno]}),(0,E.jsx)(`div`,{className:`pc-accent-strip`,style:{background:i.strip}}),(0,E.jsxs)(`div`,{className:`pc-header`,children:[(0,E.jsxs)(`div`,{className:`pc-partno-wrap`,children:[(0,E.jsx)(`span`,{className:`pc-partno-eyebrow`,children:`Part No.`}),(0,E.jsx)(`span`,{className:`pc-partno`,title:e.partno,children:e.partno||`N/A`})]}),(0,E.jsxs)(`span`,{className:`pc-stock-pill`,style:{background:i.bg,color:i.color,borderColor:i.border},children:[(0,E.jsx)(`span`,{className:`pc-stock-dot`,style:{background:i.dot}}),i.label]})]}),(0,E.jsxs)(`div`,{className:`pc-body`,children:[(0,E.jsx)(`div`,{className:`pc-name`,children:e.itemName||`Unnamed Item`}),e.sheetName&&(0,E.jsxs)(`span`,{className:`pc-sheet-tag`,children:[(0,E.jsxs)(`svg`,{className:`pc-sheet-icon`,width:`11`,height:`11`,viewBox:`0 0 11 11`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`rect`,{x:`1`,y:`1`,width:`9`,height:`9`,rx:`1.8`,stroke:`currentColor`,strokeWidth:`1.3`}),(0,E.jsx)(`path`,{d:`M3 4.5h5M3 6.5h3`,stroke:`currentColor`,strokeWidth:`1.3`,strokeLinecap:`round`})]}),e.sheetName]}),(0,E.jsx)(`div`,{className:`pc-divider`}),(0,E.jsxs)(`div`,{className:`pc-metrics`,ref:r,children:[(0,E.jsxs)(`div`,{className:`pc-qty-block`,style:{background:i.bg,borderColor:i.border,color:i.color},children:[(0,E.jsx)(`span`,{className:`pc-qty-label`,children:`Quantity`}),(0,E.jsx)(`span`,{className:`pc-qty-value`,children:e.quantity??`—`}),(0,E.jsx)(`span`,{className:`pc-qty-unit`,children:`units available`})]}),c&&(0,E.jsxs)(`div`,{className:`pc-mrp-block`,children:[(0,E.jsx)(`span`,{className:`pc-mrp-label`,children:`MRP`}),(0,E.jsxs)(`div`,{className:`pc-mrp-value`,children:[(0,E.jsx)(`span`,{className:`pc-mrp-symbol`,children:`₹`}),e.mrp]}),(0,E.jsx)(`span`,{className:`pc-mrp-sub`,children:`incl. tax`})]})]}),e.description&&(0,E.jsxs)(`div`,{className:`pc-desc`,children:[(0,E.jsx)(`div`,{className:`pc-desc-label`,children:`Description`}),(0,E.jsx)(`div`,{className:`pc-desc-text`,children:e.description})]})]})]})]})});function $(e,t=380){let[n,r]=(0,w.useState)(e);return(0,w.useEffect)(()=>{let n=setTimeout(()=>r(e),t);return()=>clearTimeout(n)},[e,t]),n}var te=w.memo(()=>(0,E.jsxs)(`div`,{style:{background:`var(--color-surface-container-lowest)`,border:`1px solid var(--color-outline-variant)`,borderRadius:`16px`,padding:`0`,overflow:`hidden`,animation:`sdSkeletonPulse 1.4s ease-in-out infinite`},children:[(0,E.jsx)(`div`,{style:{height:`56px`,background:`var(--color-surface-container)`,borderBottom:`1px solid var(--color-outline-variant)`}}),(0,E.jsxs)(`div`,{style:{padding:`16px 20px`},children:[(0,E.jsx)(`div`,{style:{height:`18px`,background:`var(--color-surface-container)`,borderRadius:`6px`,marginBottom:`10px`,width:`70%`}}),(0,E.jsx)(`div`,{style:{height:`13px`,background:`var(--color-surface-container)`,borderRadius:`6px`,marginBottom:`16px`,width:`45%`}}),(0,E.jsxs)(`div`,{style:{display:`flex`,gap:`10px`},children:[(0,E.jsx)(`div`,{style:{height:`48px`,flex:1,background:`var(--color-surface-container)`,borderRadius:`8px`}}),(0,E.jsx)(`div`,{style:{height:`48px`,flex:1,background:`var(--color-surface-container)`,borderRadius:`8px`}})]})]}),(0,E.jsx)(`div`,{style:{padding:`0 20px 16px`},children:(0,E.jsx)(`div`,{style:{height:`40px`,background:`var(--color-surface-container)`,borderRadius:`10px`}})})]})),ne=w.memo(({search:e})=>{let t=(0,w.useRef)(null);return(0,w.useEffect)(()=>{u.fromTo(t.current,{y:20,opacity:0},{y:0,opacity:1,duration:.5,ease:`power3.out`})},[]),(0,E.jsxs)(`div`,{ref:t,style:{gridColumn:`1 / -1`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,padding:`80px 20px`,color:`var(--color-on-surface-variant)`,fontFamily:`'DM Sans', sans-serif`,textAlign:`center`},children:[(0,E.jsx)(`div`,{style:{width:`80px`,height:`80px`,borderRadius:`24px`,marginBottom:`20px`,background:`var(--color-surface-container)`,display:`grid`,placeItems:`center`,fontSize:`36px`,boxShadow:`0 8px 24px rgba(0,0,0,0.06)`},children:`🔍`}),(0,E.jsx)(`div`,{style:{fontFamily:`'Bricolage Grotesque',sans-serif`,fontSize:`20px`,fontWeight:700,color:`var(--color-on-surface)`,marginBottom:`8px`,letterSpacing:`-0.3px`},children:e?`No results found`:`No items available`}),(0,E.jsx)(`div`,{style:{fontSize:`14px`,maxWidth:`320px`,lineHeight:1.6},children:e?`We couldn't find anything matching "${e}". Try different keywords.`:`There are no items to display in this category.`})]})}),re=w.memo(({pagination:e,onPageChange:t})=>{if(!e||e.totalPages<=1)return null;let{currentPage:n,totalPages:r,totalDocuments:i,pageSize:a}=e,o=(n-1)*a+1,s=Math.min(n*a,i),c=[];for(let e=1;e<=r;e++)e===1||e===r||Math.abs(e-n)<=1?c.push(e):c[c.length-1]!==`…`&&c.push(`…`);return(0,E.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,marginTop:`24px`,padding:`0 4px`,fontFamily:`'DM Sans', sans-serif`,flexWrap:`wrap`,gap:`12px`},children:[(0,E.jsxs)(`span`,{style:{fontSize:`12.5px`,color:`var(--color-on-surface-variant)`},children:[o,`–`,s,` of `,(0,E.jsx)(`strong`,{children:i})]}),(0,E.jsxs)(`div`,{style:{display:`flex`,gap:`6px`,alignItems:`center`},children:[(0,E.jsx)(`button`,{onClick:()=>t(n-1),disabled:!e.hasPrevPage,id:`pagination-prev`,style:{padding:`7px 14px`,borderRadius:`8px`,border:`1.5px solid var(--color-outline-variant)`,background:`var(--color-surface-container-lowest)`,cursor:`pointer`,fontSize:`13px`,color:`var(--color-on-surface-variant)`,opacity:e.hasPrevPage?1:.4},children:`← Prev`}),c.map((e,r)=>e===`…`?(0,E.jsx)(`span`,{style:{padding:`7px 4px`,color:`var(--color-outline)`,fontSize:`13px`},children:`…`},`e${r}`):(0,E.jsx)(`button`,{onClick:()=>t(e),id:`pagination-page-${e}`,style:{width:`36px`,height:`36px`,borderRadius:`8px`,border:e===n?`none`:`1.5px solid var(--color-outline-variant)`,background:e===n?`var(--color-primary)`:`var(--color-surface-container-lowest)`,color:e===n?`var(--color-on-primary)`:`var(--color-on-surface-variant)`,cursor:`pointer`,fontSize:`13px`,fontWeight:e===n?700:400},children:e},e)),(0,E.jsx)(`button`,{onClick:()=>t(n+1),disabled:!e.hasNextPage,id:`pagination-next`,style:{padding:`7px 14px`,borderRadius:`8px`,border:`1.5px solid var(--color-outline-variant)`,background:`var(--color-surface-container-lowest)`,cursor:`pointer`,fontSize:`13px`,color:`var(--color-on-surface-variant)`,opacity:e.hasNextPage?1:.4},children:`Next →`})]})]})}),ie=w.memo(({sheets:e,sheetsLoading:t,masterQuery:n,setMasterQuery:r,masterResults:i,masterLoading:a,handleTabChange:o,handleSheetSelect:s,setSearchInput:c})=>{let l=(0,w.useRef)(null),d=(0,w.useRef)(null),f=(0,w.useRef)(null);(0,w.useEffect)(()=>{let e=u.context(()=>{u.fromTo(l.current,{y:30,opacity:0},{y:0,opacity:1,duration:.7,ease:`power4.out`,onComplete:()=>u.set(l.current,{clearProps:`transform`})}),u.fromTo(l.current.children,{y:16,opacity:0},{y:0,opacity:1,duration:.5,ease:`power3.out`,stagger:.08,delay:.2,onComplete:()=>u.set(l.current.children,{clearProps:`transform`})}),f.current&&u.fromTo(f.current,{x:-16,opacity:0},{x:0,opacity:1,duration:.5,ease:`power3.out`,delay:.35,onComplete:()=>u.set(f.current,{clearProps:`transform`})});let e=d.current?.querySelectorAll(`.sd-stat-card`);e?.length&&u.fromTo(e,{y:24,opacity:0},{y:0,opacity:1,duration:.5,ease:`power3.out`,stagger:.08,delay:.4,onComplete:()=>u.set(e,{clearProps:`transform`})})});return()=>e.revert()},[]);let p=[{id:`company`,icon:`🏢`,label:`Company Sheets`,value:t?`…`:e.length||0,bg:`var(--color-secondary-container)`,color:`var(--color-on-secondary-container)`},{id:`bosch`,icon:`⚙️`,label:`Bosch Parts`,value:`Live`,bg:`color-mix(in srgb, #ba1a1a 18%, transparent)`,color:`#ba1a1a`},{id:`history`,icon:`📦`,label:`Pending Orders`,value:`0`,bg:`var(--color-tertiary-fixed, #d0f0e8)`,color:`var(--color-on-tertiary-fixed, #0a3d2e)`}];return(0,E.jsxs)(`div`,{children:[(0,E.jsxs)(`div`,{className:`sd-hero-card`,ref:l,children:[(0,E.jsx)(`div`,{className:`sd-hero-eyebrow`,children:`B.K Engineering · Sales Portal`}),(0,E.jsx)(`h1`,{className:`sd-hero-title`,children:`Sales Gateway`}),(0,E.jsx)(`p`,{className:`sd-hero-sub`,children:`Search instantly across Bosch and Company inventory all in one place.`}),(0,E.jsxs)(`div`,{className:`sd-global-search-wrap`,ref:f,style:{position:`relative`,maxWidth:`580px`,width:`100%`,marginTop:`4px`},children:[(0,E.jsx)(`input`,{type:`text`,className:`sd-search`,placeholder:`Search part numbers, item names...`,value:n,onChange:e=>r(e.target.value),style:{padding:`15px 20px 15px 50px`,fontSize:`15px`,borderRadius:`14px`,boxShadow:`0 8px 32px rgba(0,0,0,0.14)`,background:`rgba(255,255,255,0.13)`,border:`1.5px solid rgba(255,255,255,0.25)`,color:`#fff`,backdropFilter:`blur(12px)`,width:`100%`,boxSizing:`border-box`,outline:`none`,fontFamily:`'DM Sans', sans-serif`},onFocus:e=>{e.target.style.background=`rgba(255,255,255,0.2)`,e.target.style.borderColor=`rgba(255,255,255,0.5)`},onBlur:e=>{e.target.style.background=`rgba(255,255,255,0.13)`,e.target.style.borderColor=`rgba(255,255,255,0.25)`}}),(0,E.jsx)(`span`,{style:{position:`absolute`,zIndex:100,left:`17px`,top:`50%`,transform:`translateY(-50%)`,fontSize:`17px`,pointerEvents:`none`},children:`🔍`}),n&&(0,E.jsx)(`button`,{onClick:()=>r(``),style:{position:`absolute`,right:`14px`,top:`50%`,transform:`translateY(-50%)`,background:`rgba(255,255,255,0.2)`,border:`none`,borderRadius:`6px`,width:`26px`,height:`26px`,cursor:`pointer`,color:`#fff`,fontSize:`11px`,display:`grid`,placeItems:`center`},children:`✕`}),n&&(0,E.jsx)(`div`,{className:`sd-global-results`,children:a?(0,E.jsx)(`div`,{className:`sd-global-empty`,children:`Searching…`}):i.length===0?(0,E.jsx)(`div`,{className:`sd-global-empty`,children:`No results found`}):i.map(e=>(0,E.jsxs)(`div`,{className:`sd-result-item`,onClick:()=>{o(e.source===`bosch`?`bosch`:`company`),e.source===`company`&&s(e.sheetName),c(e.partno||e.itemName),r(``)},children:[(0,E.jsxs)(`div`,{style:{overflow:`hidden`,paddingRight:`12px`},children:[(0,E.jsx)(`div`,{className:`sd-result-title`,children:e.itemName||`Unnamed`}),(0,E.jsxs)(`div`,{className:`sd-result-sub`,children:[`PN: `,e.partno||`N/A`]})]}),(0,E.jsx)(`div`,{className:`sd-result-badge ${e.source===`bosch`?`bosch`:`company`}`,children:e.source===`bosch`?`Bosch`:e.sheetName||`Company`})]},e._id))})]})]}),(0,E.jsx)(`div`,{className:`sd-overview-grid`,ref:d,children:p.map(({id:e,icon:t,label:n,value:r,bg:i,color:a})=>(0,E.jsxs)(`div`,{className:`sd-stat-card`,onClick:()=>o(e),children:[(0,E.jsx)(`div`,{className:`sd-stat-icon`,style:{background:i,color:a},children:t}),(0,E.jsxs)(`div`,{className:`sd-stat-content`,children:[(0,E.jsx)(`div`,{className:`sd-stat-label`,children:n}),(0,E.jsx)(`div`,{className:`sd-stat-value`,children:r})]}),(0,E.jsx)(`span`,{className:`sd-stat-arrow`,children:`→`})]},e))})]})}),ae=({hideNavbar:e=!1,adminTab:n=null})=>{let{tab:r}=c(),a=i(),[o,s]=t(),l=n||r||`overview`,[u,d]=(0,w.useState)([]),[f,p]=(0,w.useState)(!1),m=o.get(`sheet`),h=m?u.find(e=>(e.sheetName||e)===m)||m:u.length>0?u[0]:null,[g,_]=(0,w.useState)([]),[v,y]=(0,w.useState)(null),[b,x]=(0,w.useState)(!1),[S,C]=(0,w.useState)(1),[T,D]=(0,w.useState)(``),M=$(T),[N,P]=(0,w.useState)(``),F=$(N,350),[I,L]=(0,w.useState)([]),[R,B]=(0,w.useState)(!1),[V,H]=(0,w.useState)(`grid`),U=(0,w.useRef)(null);(0,w.useEffect)(()=>{if(!F.trim()){L([]);return}(async()=>{B(!0);try{L((await j({search:F,limit:12})).results||[])}catch(e){console.error(e)}finally{B(!1)}})()},[F]),(0,w.useEffect)(()=>{(async()=>{p(!0);try{d((await O()).companySheets||[])}catch(e){console.error(e)}finally{p(!1)}})()},[]),(0,w.useEffect)(()=>{C(1)},[M,h,l]),(0,w.useEffect)(()=>{l===`company`||l===`bosch`?(async()=>{x(!0),_([]);try{let e;if(l===`company`&&h)e=await k(typeof h==`string`?h:h.sheetName,{page:S,limit:12,search:M});else if(l===`bosch`)e=await A({page:S,limit:12,search:M});else{x(!1);return}_(e.boschStock||e.companyStock||[]),y(e.pagination||null)}catch(e){console.error(e)}finally{x(!1)}})():x(!1)},[l,h,S,M]);let W=(0,w.useCallback)(e=>{a(n?`/admin/${e}`:`/sales/${e}`),D(``),C(1)},[n,a]),G=(0,w.useCallback)(e=>{s({sheet:typeof e==`string`?e:e.sheetName}),D(``),C(1)},[s]);return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes sdSkeletonPulse { 0%,100%{opacity:1} 50%{opacity:0.55} }

        .sd-root { min-height:100svh; background:var(--color-background); font-family:'DM Sans',sans-serif; }
        .sd-content { max-width:1400px; margin:0 auto; padding:28px 28px 60px; }

        .sd-page-header { margin-bottom:24px; }
        .sd-page-title { font-family:'Bricolage Grotesque',sans-serif; font-size:26px; font-weight:800; color:var(--color-on-surface); letter-spacing:-0.7px; margin-bottom:4px; }
        .sd-page-sub { font-size:13.5px; color:var(--color-on-surface-variant); }

        /* Controls */
        .sd-controls { display:flex; align-items:center; gap:12px; margin-bottom:20px; flex-wrap:wrap; }
        .sd-search-wrap { flex:1; min-width:220px; max-width:480px; position:relative; }
        .sd-search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--color-outline); font-size:14px; pointer-events:none; }
        .sd-search { width:100%; padding:11px 14px 11px 40px; background:var(--color-surface-container-lowest); border:1.5px solid var(--color-outline-variant); border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13.5px; color:var(--color-on-surface); outline:none; transition:all 0.18s; box-sizing:border-box; }
        .sd-search::placeholder { color:var(--color-outline); }
        .sd-search:focus { border-color:var(--color-primary); box-shadow:0 0 0 3px var(--color-primary-fixed-dim); }
        .sd-search-clear { position:absolute; right:10px; top:50%; transform:translateY(-50%); background:var(--color-surface-container); border:none; border-radius:6px; width:22px; height:22px; cursor:pointer; font-size:11px; color:var(--color-on-surface-variant); display:grid; place-items:center; }
        .sd-result-count { font-size:12.5px; color:var(--color-on-surface-variant); white-space:nowrap; }

        /* View toggle button */
        .sd-view-toggle { display:none; align-items:center; gap:4px; background:var(--color-surface-container); border:1.5px solid var(--color-outline-variant); border-radius:10px; padding:4px; flex-shrink:0; }
        .sd-view-btn { width:32px; height:32px; border:none; border-radius:7px; background:transparent; cursor:pointer; display:grid; place-items:center; color:var(--color-on-surface-variant); transition:all 0.15s; font-size:15px; }
        .sd-view-btn.active { background:var(--color-primary); color:var(--color-on-primary); }

        /* Sheet bar */
        .sd-sheet-bar { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px; }
        .sd-sheet-chip { padding:7px 16px; border-radius:20px; border:1.5px solid var(--color-outline-variant); background:var(--color-surface-container-lowest); font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:500; color:var(--color-on-surface-variant); cursor:pointer; transition:all 0.16s; white-space:nowrap; }
        .sd-sheet-chip:hover { border-color:var(--color-primary); color:var(--color-primary); }
        .sd-sheet-chip.active { background:var(--color-primary); border-color:var(--color-primary); color:var(--color-on-primary); font-weight:600; }

        /* Grid */
        .sd-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px,1fr)); gap:16px; }

        /* List view */
        .sd-grid.list-view { grid-template-columns:1fr; gap:8px; }
        .sd-grid.list-view > * { border-radius:12px !important; }

        /* Overview */
        .sd-overview-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:20px; margin-top:24px; }
        .sd-hero-card { background:linear-gradient(135deg,var(--color-primary) 0%,color-mix(in srgb,var(--color-primary) 70%,var(--color-secondary,#1e40af)) 100%); border-radius:28px; padding:40px 36px; color:var(--color-on-primary); display:flex; flex-direction:column; justify-content:center; position:relative; z-index:10; grid-column:1/-1; }
        .sd-hero-card::before { content:''; position:absolute; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle,rgba(255,255,255,0.12) 0%,rgba(255,255,255,0) 70%); pointer-events:none; }
        .sd-hero-card::after { content:''; position:absolute; bottom:-60px; left:20%; width:200px; height:200px; border-radius:50%; background:radial-gradient(circle,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0) 70%); pointer-events:none; }
        .sd-hero-eyebrow { font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; opacity:0.75; margin-bottom:12px; font-family:'DM Sans',sans-serif; }
        .sd-hero-title { font-family:'Bricolage Grotesque',sans-serif; font-size:36px; font-weight:800; margin-bottom:14px; letter-spacing:-1.2px; line-height:1.1; }
        .sd-hero-sub { font-size:15px; opacity:0.8; max-width:420px; line-height:1.6; margin-bottom:28px; font-family:'DM Sans',sans-serif; }
        .sd-stat-card { background:var(--color-surface-container-lowest); border:1px solid var(--color-outline-variant); border-radius:22px; padding:24px 22px; display:flex; align-items:center; gap:18px; cursor:pointer; position:relative; overflow:hidden; transition:border-color 0.25s,box-shadow 0.25s,transform 0.25s; }
        .sd-stat-card:hover { transform:translateY(-5px); box-shadow:0 16px 40px rgba(0,0,0,0.10); border-color:color-mix(in srgb,var(--color-primary) 35%,var(--color-outline-variant)); }
        .sd-stat-icon { width:54px; height:54px; border-radius:16px; display:grid; place-items:center; font-size:22px; flex-shrink:0; transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .sd-stat-card:hover .sd-stat-icon { transform:scale(1.12) rotate(-6deg); }
        .sd-stat-content { flex:1; min-width:0; }
        .sd-stat-label { font-size:11px; color:var(--color-on-surface-variant); font-weight:700; text-transform:uppercase; letter-spacing:0.07em; margin-bottom:6px; font-family:'DM Sans',sans-serif; }
        .sd-stat-value { font-family:'Bricolage Grotesque',sans-serif; font-size:30px; font-weight:800; color:var(--color-on-surface); letter-spacing:-0.5px; line-height:1; }
        .sd-stat-arrow { font-size:16px; color:var(--color-outline); transition:transform 0.25s,color 0.25s; flex-shrink:0; }
        .sd-stat-card:hover .sd-stat-arrow { transform:translateX(4px); color:var(--color-primary); }

        /* Global search dropdown */
        .sd-global-search-wrap { position:relative; z-index:500; }
        .sd-global-results { position:absolute; top:calc(100% + 8px); left:0; right:0; background:var(--color-surface-container-lowest); backdrop-filter:blur(20px); border-radius:18px; box-shadow:0 20px 60px rgba(0,0,0,0.22); border:1px solid var(--color-outline-variant); max-height:420px; overflow-y:auto; z-index:99999; padding:8px; animation:sdDropIn 0.2s cubic-bezier(0.34,1.4,0.64,1) both; }
        @keyframes sdDropIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .sd-result-item { padding:12px 16px; border-radius:10px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; transition:background 0.15s; font-family:'DM Sans',sans-serif; color:var(--color-on-surface); }
        .sd-result-item:hover { background:var(--color-surface-container); }
        .sd-result-title { font-size:15px; font-weight:600; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; }
        .sd-result-sub { font-size:12px; color:var(--color-on-surface-variant); margin-top:4px; }
        .sd-result-badge { font-size:10px; font-weight:700; padding:5px 10px; border-radius:20px; text-transform:uppercase; white-space:nowrap; flex-shrink:0; border:1px solid currentColor; }
        .sd-result-badge.bosch { background:#ffdad6; color:#ba1a1a; }
        .sd-result-badge.company { background:#c8f5d4; color:#1a6b2e; }
        .sd-global-empty { padding:24px; text-align:center; color:var(--color-on-surface-variant); font-size:14px; }

        .sd-placeholder { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:100px 20px; color:var(--color-on-surface-variant); text-align:center; gap:12px; }
        .sd-placeholder-icon { font-size:56px; }
        .sd-placeholder-title { font-family:'Bricolage Grotesque',sans-serif; font-size:22px; font-weight:700; color:var(--color-on-surface); letter-spacing:-0.4px; }
        .sd-placeholder-sub { font-size:14px; max-width:360px; line-height:1.6; }

        /* ════════════════════════════════════════
           MOBILE OVERRIDES
        ════════════════════════════════════════ */
        @media (max-width: 768px) {
          .sd-root { padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px)); }
          .sd-content { padding: 0 0 16px; }

          /* Page header inside content */
          .sd-page-header { padding: 14px 14px 0; margin-bottom: 0; }
          .sd-page-title { font-size: 20px; }
          .sd-page-sub { font-size: 12.5px; }

          /* ── Sheet bar: sticky, single-row horizontal scroll ── */
          .sd-sheet-bar {
            position: sticky;
            top: 56px; /* SalesNavbar height on mobile */
            z-index: 40;
            background: var(--color-background);
            margin: 0;
            padding: 10px 14px;
            border-bottom: 1px solid var(--color-outline-variant);
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 8px;
            /* fade-out right edge to hint scroll */
            -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
            mask-image: linear-gradient(to right, black 85%, transparent 100%);
          }
          .sd-sheet-bar::-webkit-scrollbar { display: none; }
          .sd-sheet-chip { flex-shrink: 0; padding: 6px 14px; font-size: 12px; }

          /* ── Controls bar — sticky below sheet bar ── */
          .sd-controls {
            position: sticky;
            top: calc(56px + 53px); /* navbar(56) + sheet-bar(53) */
            z-index: 39;
            background: var(--color-background);
            padding: 10px 14px;
            border-bottom: 1px solid var(--color-outline-variant);
            flex-wrap: nowrap;
            gap: 8px;
            margin-bottom: 10px;
          }
          /* bosch tab has no sheet bar — controls sit right under navbar */
          .sd-controls.no-sheet-bar {
            top: 56px;
          }
          .sd-search-wrap { min-width: 0; max-width: 100%; flex: 1; }
          .sd-search { padding: 9px 36px 9px 36px; font-size: 13px; border-radius: 10px; }
          .sd-result-count { font-size: 11px; white-space: nowrap; flex-shrink: 0; }

          /* Show view toggle on mobile */
          .sd-view-toggle { display: flex; }

          /* Grid inside sd-content padding */
          .sd-grid { padding: 0 14px; grid-template-columns: 1fr 1fr; gap: 10px; }
          .sd-grid.list-view { grid-template-columns: 1fr; gap: 8px; }

          /* Pagination */
          .sd-pagination-wrap { padding: 0 14px; margin-top: 20px; }
          #pagination-prev, #pagination-next { padding: 6px 10px !important; font-size: 12px !important; }

          /* Overview */
          .sd-hero-card { padding: 24px 20px; border-radius: 20px; margin: 14px 14px 0; }
          .sd-hero-title { font-size: 24px; letter-spacing: -0.8px; }
          .sd-hero-sub { font-size: 13.5px; margin-bottom: 18px; max-width: 100%; }
          .sd-hero-eyebrow { font-size: 10px; margin-bottom: 8px; }
          .sd-overview-grid { grid-template-columns: 1fr; gap: 10px; margin-top: 14px; padding: 0 14px 14px; }
          .sd-stat-card { padding: 16px 14px; border-radius: 16px; }
          .sd-stat-value { font-size: 26px; }
          .sd-stat-icon { width: 44px; height: 44px; font-size: 18px; }
        }

        @media (max-width: 400px) {
          .sd-grid { grid-template-columns: 1fr; }
        }
      `}),(0,E.jsxs)(`div`,{className:`sd-root`,style:e?{minHeight:`auto`}:{},children:[!e&&(0,E.jsx)(X,{activeTab:l,onTabChange:W}),(0,E.jsxs)(`div`,{className:`sd-content`,children:[l!==`overview`&&(0,E.jsxs)(`div`,{className:`sd-page-header`,children:[(0,E.jsxs)(`h1`,{className:`sd-page-title`,children:[l===`company`&&`Company Stock`,l===`bosch`&&`Bosch Stock`,l===`orders`&&`New Order`,l===`history`&&`Order History`]}),(0,E.jsxs)(`p`,{className:`sd-page-sub`,children:[l===`company`&&`Browse company inventory sheets`,l===`bosch`&&`Search Bosch parts`,l===`orders`&&`Punch a new sales order`,l===`history`&&`View all past orders`]})]}),l===`overview`&&(0,E.jsx)(ie,{sheets:u,sheetsLoading:f,masterQuery:N,setMasterQuery:P,masterResults:I,masterLoading:R,handleTabChange:W,handleSheetSelect:G,setSearchInput:D}),(l===`company`||l===`bosch`)&&(0,E.jsxs)(E.Fragment,{children:[l===`company`&&(0,E.jsx)(`div`,{className:`sd-sheet-bar`,children:f?[1,2,3].map(e=>(0,E.jsx)(`div`,{style:{width:`80px`,height:`32px`,flexShrink:0,background:`var(--color-surface-container)`,borderRadius:`20px`,animation:`sdSkeletonPulse 1.4s ease-in-out infinite`}},e)):u.map(e=>{let t=typeof e==`string`?e:e.sheetName;return(0,E.jsx)(`button`,{className:`sd-sheet-chip${t===(typeof h==`string`?h:h?.sheetName)?` active`:``}`,onClick:()=>G(e),id:`sheet-chip-${t}`,children:t},t)})}),(0,E.jsxs)(`div`,{className:`sd-controls${l===`bosch`?` no-sheet-bar`:``}`,children:[(0,E.jsxs)(`div`,{className:`sd-search-wrap`,children:[(0,E.jsx)(`span`,{className:`sd-search-icon`,children:`🔍`}),(0,E.jsx)(`input`,{ref:U,id:`sd-search-input`,className:`sd-search`,type:`text`,placeholder:`Search part no, name…`,value:T,onChange:e=>D(e.target.value)}),T&&(0,E.jsx)(`button`,{className:`sd-search-clear`,onClick:()=>{D(``),U.current?.focus()},id:`sd-search-clear`,children:`✕`})]}),v&&(0,E.jsxs)(`span`,{className:`sd-result-count`,children:[v.totalDocuments,M?` for "${M}"`:` items`]}),(0,E.jsxs)(`div`,{className:`sd-view-toggle`,children:[(0,E.jsx)(`button`,{className:`sd-view-btn${V===`grid`?` active`:``}`,onClick:()=>H(`grid`),title:`Grid view`,children:(0,E.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`currentColor`,children:[(0,E.jsx)(`rect`,{x:`1`,y:`1`,width:`6`,height:`6`,rx:`1.5`}),(0,E.jsx)(`rect`,{x:`9`,y:`1`,width:`6`,height:`6`,rx:`1.5`}),(0,E.jsx)(`rect`,{x:`1`,y:`9`,width:`6`,height:`6`,rx:`1.5`}),(0,E.jsx)(`rect`,{x:`9`,y:`9`,width:`6`,height:`6`,rx:`1.5`})]})}),(0,E.jsx)(`button`,{className:`sd-view-btn${V===`list`?` active`:``}`,onClick:()=>H(`list`),title:`List view`,children:(0,E.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`currentColor`,children:[(0,E.jsx)(`rect`,{x:`1`,y:`2`,width:`14`,height:`3`,rx:`1.5`}),(0,E.jsx)(`rect`,{x:`1`,y:`6.5`,width:`14`,height:`3`,rx:`1.5`}),(0,E.jsx)(`rect`,{x:`1`,y:`11`,width:`14`,height:`3`,rx:`1.5`})]})})]})]}),(0,E.jsx)(`div`,{className:`sd-grid${V===`list`?` list-view`:``}`,children:b?Array.from({length:12}).map((e,t)=>(0,E.jsx)(te,{},t)):g.length===0?(0,E.jsx)(ne,{search:M}):g.map(e=>(0,E.jsx)(ee,{item:e},e._id))}),!b&&(0,E.jsx)(`div`,{className:`sd-pagination-wrap`,children:(0,E.jsx)(re,{pagination:v,onPageChange:C})})]}),l===`orders`&&(0,E.jsx)(z,{onSuccess:()=>W(`history`)}),l===`history`&&(0,E.jsx)(Y,{})]})]})]})};export{ae as default,z as t};