import{r as c,a as p,j as o}from"./jsx-runtime.d9826e37.js";import{B as h}from"./index.8ddc56cc.js";import{I as m}from"./index.c1594a73.js";import{R as C}from"./index.f16554e6.js";import{t as $,C as y}from"./tag.d9e21d07.js";import{s as r}from"./animation.dc5b8a24.js";const b=246,a=$(y.CARD),x=r(a("section"),{display:"inline-flex",flexDirection:"column",width:b,border:"1px solid #f1f1f1",borderRadius:"$2",boxSizing:"content-box",overflow:"hidden",backgroundColor:"$lightGrey",[`& ${m.Background.Base}`]:{height:150},[`& ${h.Container}`]:{width:"100%",color:"$primary",backgroundColor:"$white",boxShadow:"0 5px 8px -8px $shadow12, 0 2px 4px -3px $shadow12, 0 0 0 1px $shadow3, 0 1px 3px 1px $shadow1",marginBottom:"$2",trans:["color","box-shadow"],"&:hover":{color:"$darkPrimary",backgroundColor:"$white",boxShadow:"0 5px 8px -8px $shadow12, 0 2px 4px -3px $shadow12, 0 0 0 1px $shadow4, 0 1px 4px 1px $shadow4"},"&:first-of-type":{marginTop:"$3"},"&:last-of-type":{marginBottom:0}}}),k=r(a("main","content"),{padding:"$3"}),_=r(a("h3","header"),{margin:"0 0 $1 0",typo:{weight:"$2"},color:"$black",wordBreak:"break-all"}),S=r(a("p","description"),{margin:0,typo:{size:"$1"},color:"$darkGrey",whiteSpace:"normal",wordBreak:"break-all"}),R=r(a("a","link"),{margin:0,typo:{size:"$1"},whiteSpace:"normal",overflow:"hidden",textOverflow:"ellipsis",color:"rgb(93, 157, 245)",textDecoration:"underline",pointerEvents:"all",wordBreak:"break-all"}),A=t=>{let e;try{e=new URL(t)}catch{return!1}return e.protocol==="http:"||e.protocol==="https:"},n=({title:t,description:e,image:i,actions:d=[]})=>{const f=c.exports.useContext(C),u=A(e),g=c.exports.useMemo(()=>d.filter(({name:s})=>!!s),[d]);return p(x,{children:[!!i&&o(m.Default,{image:i}),p(k,{children:[!!t&&o(_,{children:t}),!!e&&(u?o(R,{rel:"noopener noreferrer",href:e,target:"_blank",children:e}):o(S,{children:e})),g.map(({request:s,name:l},w)=>o(h,{onClick:()=>f.interact(s,l),children:l},w))]})]})},D=Object.assign(n,{Container:x});try{n.displayName="Card",n.__docgenInfo={description:"A titled card with content and optional controls.",displayName:"Card",props:{title:{defaultValue:null,description:"The title of the card.",name:"title",required:!0,type:{name:"string"}},description:{defaultValue:null,description:`Text content of the card.
If the string is a valid URL it will be rendered in a {@link Link}.`,name:"description",required:!0,type:{name:"string"}},image:{defaultValue:null,description:"An image URL that will render at the top of the card if provided.",name:"image",required:!1,type:{name:"string"}},actions:{defaultValue:{value:"[]"},description:"A list of actions that will appear as button controls at the bottom of the card.",name:"actions",required:!1,type:{name:"CardActionProps[]"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/Card/index.tsx#Card"]={docgenInfo:n.__docgenInfo,name:"Card",path:"src/components/Card/index.tsx#Card"})}catch{}export{D as C,b as a};
//# sourceMappingURL=index.6c314e5b.js.map
