import{r as n,j as r,a as C}from"./jsx-runtime.f47a6578.js";import{B as g}from"./index.fcd48750.js";import{I as A}from"./index.12696e48.js";import{t as v,C as w,s}from"./theme.6ba17ec2.js";const y=n.exports.createContext({scrollToBottom:()=>{}}),{Consumer:f}=y,x=({target:e,children:t})=>{const o=n.exports.useCallback(()=>{requestAnimationFrame(()=>{const i=e.current;if(!i)return;const{scrollTop:u,scrollHeight:m,clientHeight:a}=i,l=m-a;l!==u&&i.scrollTo({top:l})})},[]),c=n.exports.useMemo(()=>({scrollToBottom:o}),[o]);return r(y.Provider,{value:c,children:t})};try{f.displayName="AutoScrollConsumer",f.__docgenInfo={description:"",displayName:"AutoScrollConsumer",props:{}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/contexts/AutoScrollContext.tsx#AutoScrollConsumer"]={docgenInfo:f.__docgenInfo,name:"AutoScrollConsumer",path:"src/contexts/AutoScrollContext.tsx#AutoScrollConsumer"})}catch{}try{x.displayName="AutoScrollProvider",x.__docgenInfo={description:"",displayName:"AutoScrollProvider",props:{target:{defaultValue:null,description:"",name:"target",required:!0,type:{name:"React.RefObject<T>"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/contexts/AutoScrollContext.tsx#AutoScrollProvider"]={docgenInfo:x.__docgenInfo,name:"AutoScrollProvider",path:"src/contexts/AutoScrollContext.tsx#AutoScrollProvider"})}catch{}var S=function(){};const R=n.exports.createContext({send:S,setStatus:S}),_=({children:e,...t})=>{const o=n.exports.useMemo(()=>t,[]);return r(R.Provider,{value:o,children:e})};try{_.displayName="RuntimeAPIProvider",_.__docgenInfo={description:"",displayName:"RuntimeAPIProvider",props:{}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/contexts/RuntimeAPIContext.tsx#RuntimeAPIProvider"]={docgenInfo:_.__docgenInfo,name:"RuntimeAPIProvider",path:"src/contexts/RuntimeAPIContext.tsx#RuntimeAPIProvider"})}catch{}const I=246,d=v(w.CARD),O=s(d("section"),{display:"inline-flex",flexDirection:"column",width:I,border:"1px solid #f1f1f1",borderRadius:"$2",boxSizing:"content-box",overflow:"hidden",backgroundColor:"$lightGrey",[`& ${A.Background.Base}`]:{height:150},[`& ${g.Container}`]:{width:"100%",color:"$primary",backgroundColor:"$white",boxShadow:"0 5px 8px -8px $shadow12, 0 2px 4px -3px $shadow12, 0 0 0 1px $shadow3, 0 1px 3px 1px $shadow1",marginBottom:"$2",trans:["color","box-shadow"],"&:hover":{color:"$darkPrimary",backgroundColor:"$white",boxShadow:"0 5px 8px -8px $shadow12, 0 2px 4px -3px $shadow12, 0 0 0 1px $shadow4, 0 1px 4px 1px $shadow4"},"&:first-of-type":{marginTop:"$3"},"&:last-of-type":{marginBottom:0}}}),P=s(d("main","content"),{padding:"$3"}),$=s(d("h3","header"),{margin:"0 0 $1 0",typo:{weight:"$2"},color:"$black"}),b=s(d("p","description"),{margin:0,typo:{size:"$1"},color:"$darkGrey",whiteSpace:"normal"}),E=s(d("a","link"),{margin:0,typo:{size:"$1"},whiteSpace:"normal",overflow:"hidden",textOverflow:"ellipsis",color:"rgb(93, 157, 245)",textDecoration:"underline",pointerEvents:"all"}),B=e=>{let t;try{t=new URL(e)}catch{return!1}return t.protocol==="http:"||t.protocol==="https:"},h=e=>{var t;return!!e.title||!!e.description||!!e.image||!!((t=e.actions)!=null&&t.filter(({name:o})=>!!o).length)},p=({title:e,description:t,image:o,actions:c=[]})=>{const i=n.exports.useContext(R),u=B(t),m=n.exports.useMemo(()=>c.filter(({name:a})=>!!a),[c]);return C(O,{children:[!!o&&r(A.Background,{image:o}),C(P,{children:[!!e&&r($,{children:e}),!!t&&(u?r(E,{rel:"noopener noreferrer",href:t,target:"_blank",children:t}):r(b,{children:t})),m.map(({name:a,request:l},T)=>r(g,{onClick:()=>i.send(a,l),children:a},T))]})]})},q=Object.assign(p,{Container:O});try{h.displayName="isValidCard",h.__docgenInfo={description:"",displayName:"isValidCard",props:{title:{defaultValue:null,description:"The title of the card.",name:"title",required:!0,type:{name:"string"}},description:{defaultValue:null,description:`Text content of the card.
If the string is a valid URL it will be rendered in a {@link Link}.`,name:"description",required:!0,type:{name:"string"}},image:{defaultValue:null,description:"An image URL that will render at the top of the card if provided.",name:"image",required:!1,type:{name:"string"}},actions:{defaultValue:{value:"[]"},description:"A list of actions that will appear as button controls at the bottom of the card.",name:"actions",required:!1,type:{name:"CardActionProps[]"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/Card/index.tsx#isValidCard"]={docgenInfo:h.__docgenInfo,name:"isValidCard",path:"src/components/Card/index.tsx#isValidCard"})}catch{}try{p.displayName="Card",p.__docgenInfo={description:"A titled card with content and optional controls.",displayName:"Card",props:{title:{defaultValue:null,description:"The title of the card.",name:"title",required:!0,type:{name:"string"}},description:{defaultValue:null,description:`Text content of the card.
If the string is a valid URL it will be rendered in a {@link Link}.`,name:"description",required:!0,type:{name:"string"}},image:{defaultValue:null,description:"An image URL that will render at the top of the card if provided.",name:"image",required:!1,type:{name:"string"}},actions:{defaultValue:{value:"[]"},description:"A list of actions that will appear as button controls at the bottom of the card.",name:"actions",required:!1,type:{name:"CardActionProps[]"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/Card/index.tsx#Card"]={docgenInfo:p.__docgenInfo,name:"Card",path:"src/components/Card/index.tsx#Card"})}catch{}export{y as A,q as C,R,I as a,x as b,_ as c,h as i};
//# sourceMappingURL=index.c304df4b.js.map
