import{r as n,R as D,a as E,j as i}from"./jsx-runtime.4e69a34c.js";import{A as Y}from"./index.e81d2554.js";import{u as x,T as l,i as J,c as K,C as N,a as X,S as O,b as L,K as Q,U as Z,o as H,d as w,e as A}from"./index.c93cdaee.js";import{V as ee}from"./fixtures.e9667a2d.js";import{b as te,t as oe,C as re,s as v}from"./theme.268398bc.js";import"./index.484a71f2.js";import{L as j}from"./index.979f2404.js";import{n as p}from"./index.f9419066.js";import"./index.9205fcd5.js";import"./index.aac59043.js";import{c as se}from"./index.2c45e19f.js";import"./index.6a326862.js";import"./index.28c8ac93.js";import"./index.cc526bcb.js";import"./index.f0291f75.js";import"./index.946d6420.js";import"./index.1649a56b.js";import"./index.12c4d3de.js";import"./index.610bd336.js";import"./index.8e145334.js";import"./iframe.8d5811bf.js";import"./index.f34f696c.js";import"./variants.5377df27.js";import"./top-caret.8c6076f2.js";import"./is-plain-object.ed97bcae.js";const W=e=>{const[t,s]=n.exports.useState("");return n.exports.useEffect(()=>{e!=null&&e.color&&s(te({color:e.color}))},[e==null?void 0:e.color]),t},ne=async e=>{const t=document.createElement("link"),s=new Promise((o,d)=>{t.onload=o,t.onerror=d});t.rel="stylesheet",t.href=e,document.head.appendChild(t),await s},F=e=>{const[t,s]=n.exports.useState(!1);return n.exports.useEffect(()=>{if(!(!e||t)){if(!e.stylesheet){s(!0);return}(async()=>(await ne(e.stylesheet).catch(o=>{console.error(`failed to load stylesheet: ${e.stylesheet}`),console.error(o)}),s(!0)))()}},[e]),t},ie=380,ae=800,M=oe(re.WIDGET),u=v(M("div","chat"),{width:ie,overflow:"hidden",borderRadius:"$2",boxShadow:"0 2px 48px rgba(19,33,68,0.16), 0 0 0 1px $shadow4",height:"90%",maxHeight:ae,"@mobile":{position:"fixed",height:"unset",maxHeight:"unset",width:"unset",left:0,right:0,top:0,bottom:0,borderRadius:0,boxShadow:"none"}}),h=v(M("div","launcher"),{}),$={opacity:1,pointerEvents:"auto",transform:"translateY(0%)",transition:"transform 300ms cubic-bezier(0, 0.95, 0.1, 1), opacity 150ms linear"},_={opacity:0,pointerEvents:"none",transform:"translateY(100%)",transition:"transform 300ms cubic-bezier(0.85, 0, 0.6, 1), opacity 150ms linear"},P=v(M("div"),{position:"fixed",inset:0,"-webkit-font-smoothing":"antialiased","-moz-osx-font-smoothing":"grayscale",pointerEvents:"none",zIndex:1e4,[`
    & > ${h},
    & > ${u}
  `]:{position:"absolute"},variants:{withChat:{true:{[`& > ${u}`]:{...$},[`& > ${h}`]:{..._}},false:{[`& > ${u}`]:{..._},[`& > ${h}`]:{...$}}},isHidden:{true:{display:"none"}}}}),ce=({children:e,chatAPI:t,sendMessage:s,assistant:o})=>{var a;const[d,C]=n.exports.useState(!1),[f,S]=n.exports.useState(!1),r=n.exports.useMemo(()=>window.matchMedia("(max-width: 768px)").matches,[]),y=W(o);x(l.CLOSE,()=>C(!1)),x(l.OPEN,()=>C(!0));const g=D.useCallback(()=>s({type:l.OPEN}),[]),R=D.useCallback(()=>s({type:l.CLOSE}),[]);n.exports.useEffect(()=>{if(!!J(t))return Object.assign(t,{open:g,close:R,hide:()=>S(!0),show:()=>S(!1),interact:m=>s({type:l.INTERACT,payload:m})}),()=>{Object.assign(t,{open:p,hide:p,show:p,close:p,interact:p})}},[]);const T=(a=o==null?void 0:o.position)!=null?a:K.ChatPosition.RIGHT,k={bottom:o==null?void 0:o.spacing.bottom,[T]:o==null?void 0:o.spacing.side},c=F(o);return E(P,{withChat:d,isHidden:f,className:y,children:[!!o&&c&&i(h,{style:k,children:i(j,{onClick:g,image:o.launcher})}),i(u,{style:r?{}:k,children:e})]})},le=Object.assign(ce,{Launcher:j,Container:P,ChatContainer:u,LauncherContainer:h});const U=v("div",{height:"100%",[`& ${N.Container}`]:{height:"100%"}}),I=e=>{const t=JSON.stringify(e);window.postMessage(t),window.parent.postMessage(t,"*")},de=({assistant:e,versionID:t,verify:s,user:o,url:d,session:C})=>{const f=n.exports.useCallback(()=>I({type:l.CLOSE}),[]),S=n.exports.useCallback(c=>I({type:l.SAVE_SESSION,payload:c}),[]),r=X({versionID:t,verify:s,url:d,user:o,session:C,saveSession:S},[s.projectID]);x(l.INTERACT,({payload:c})=>r.interact(c)),x(l.OPEN,async()=>{r.isStatus(O.IDLE)&&await y()});const y=async()=>{await r.launch()},g=n.exports.useCallback(()=>{r.setStatus(O.ENDED),f()},[]),R=W(e),T=n.exports.useCallback(c=>{const a=r.session.turns[c-1];return(a==null?void 0:a.type)===L.USER?a:null},[r.session.turns]);return F(e)?i(se,{...r,children:i(U,{className:R,children:E(N,{title:e.title,description:e.description,image:e.image,avatar:e.avatar,withWatermark:e.watermark,startTime:r.session.startTime,hasEnded:r.isStatus(O.ENDED),isLoading:!r.session.turns.length,onStart:y,onEnd:g,onSend:r.reply,onMinimize:f,children:[r.session.turns.map((c,a)=>Q(c).with({type:L.USER},({id:m,...b})=>n.exports.createElement(Z,{...H(b,["type"]),key:m})).with({type:L.SYSTEM},({id:m,...b})=>i(w,{...H(b,["type"]),feedback:e.feedback?{onClick:V=>{r.feedback(V,b.messages,T(a))}}:void 0,avatar:e.avatar,isLast:a===r.session.turns.length-1},m)).exhaustive()),r.indicator&&i(w.Indicator,{avatar:e.avatar})]})})}):null};Object.assign(de,{sendMessage:I,Container:U});const q="https://source.unsplash.com/featured/248x150",z={title:"First Card",description:"Lorem ipsum dolor sit amet",image:q,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"},{request:{},name:"Third Button"}]},B=[z,{title:"Second Card",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!",image:q},{title:"Third Card",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",actions:[{request:{},name:"Fourth Button"},{request:{},name:"Fifth Button"}]}],Fe={title:"Components/Carousel",component:A},G=e=>i(A,{...e}),me=G.bind({});me.args={cards:[z]};const pe=G.bind({});pe.args={cards:B};const ue=e=>{const t=n.exports.useRef(null),s=n.exports.useRef(null);return i(le.ChatContainer,{children:E(N.Dialog,{children:[i(w.Controls,{ref:s}),E(w.Container,{ref:t,withImage:!0,scrollable:!0,children:[i(Y,{avatar:ee}),i(A,{...e,controlsRef:s,containerRef:t})]})]})})},he=ue.bind({});he.args={cards:B};export{pe as MultipleCards,me as SingleCard,he as WithControls,Fe as default};
//# sourceMappingURL=Carousel.story.a5f1c5f1.js.map
