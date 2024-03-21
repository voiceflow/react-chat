import{d as h}from"./index.b38f6aa4.js";const{useMemo:f,useEffect:_}=__STORYBOOK_MODULE_PREVIEW_API__,{global:B}=__STORYBOOK_MODULE_GLOBAL__,{logger:x}=__STORYBOOK_MODULE_CLIENT_LOGGER__;var p="backgrounds",{document:l,window:O}=B,S=()=>O.matchMedia("(prefers-reduced-motion: reduce)").matches,w=(r,e=[],a)=>{if(r==="transparent")return"transparent";if(e.find(n=>n.value===r))return r;let d=e.find(n=>n.name===a);if(d)return d.value;if(a){let n=e.map(o=>o.name).join(", ");x.warn(h`
        Backgrounds Addon: could not find the default color "${a}".
        These are the available colors for your story based on your configuration:
        ${n}.
      `)}return"transparent"},E=r=>{(Array.isArray(r)?r:[r]).forEach(A)},A=r=>{var a;let e=l.getElementById(r);e&&((a=e.parentElement)==null||a.removeChild(e))},L=(r,e)=>{let a=l.getElementById(r);if(a)a.innerHTML!==e&&(a.innerHTML=e);else{let d=l.createElement("style");d.setAttribute("id",r),d.innerHTML=e,l.head.appendChild(d)}},T=(r,e,a)=>{var n;let d=l.getElementById(r);if(d)d.innerHTML!==e&&(d.innerHTML=e);else{let o=l.createElement("style");o.setAttribute("id",r),o.innerHTML=e;let i=`addon-backgrounds-grid${a?`-docs-${a}`:""}`,t=l.getElementById(i);t?(n=t.parentElement)==null||n.insertBefore(o,t):l.head.appendChild(o)}},C=(r,e)=>{var c;let{globals:a,parameters:d}=e,n=(c=a[p])==null?void 0:c.value,o=d[p],i=f(()=>o.disable?"transparent":w(n,o.values,o.default),[o,n]),t=f(()=>i&&i!=="transparent",[i]),s=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",u=f(()=>`
      ${s} {
        background: ${i} !important;
        ${S()?"":"transition: background-color 0.3s;"}
      }
    `,[i,s]);return _(()=>{let g=e.viewMode==="docs"?`addon-backgrounds-docs-${e.id}`:"addon-backgrounds-color";if(!t){E(g);return}T(g,u,e.viewMode==="docs"?e.id:null)},[t,u,e]),r()},I=(r,e)=>{var y,v,k;let{globals:a,parameters:d}=e,n=d[p].grid,o=((y=a[p])==null?void 0:y.grid)===!0&&n.disable!==!0,{cellAmount:i,cellSize:t,opacity:s}=n,u=e.viewMode==="docs",c=d.layout===void 0||d.layout==="padded"?16:0,g=(v=n.offsetX)!=null?v:u?20:c,m=(k=n.offsetY)!=null?k:u?20:c,$=f(()=>{let b=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",M=[`${t*i}px ${t*i}px`,`${t*i}px ${t*i}px`,`${t}px ${t}px`,`${t}px ${t}px`].join(", ");return`
      ${b} {
        background-size: ${M} !important;
        background-position: ${g}px ${m}px, ${g}px ${m}px, ${g}px ${m}px, ${g}px ${m}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${s}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${s}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${s/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${s/2}) 1px, transparent 1px) !important;
      }
    `},[t]);return _(()=>{let b=e.viewMode==="docs"?`addon-backgrounds-grid-docs-${e.id}`:"addon-backgrounds-grid";if(!o){E(b);return}L(b,$)},[o,$,e]),r()},G=[I,C],H={[p]:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}},Y={[p]:null};export{G as decorators,Y as globals,H as parameters};
