import{t as p,C as d,s as a,p as g}from"./animation.e934a63f.js";import{j as t}from"./jsx-runtime.b86b4a7d.js";const i=1e3,s=p(d.TYPING_INDICATOR),r=a(s("span"),{display:"inline-flex"}),e=a(s("span","dot"),{height:8,width:8,margin:"0 2px",borderRadius:"$round",backgroundColor:"#adadb3",opacity:.2,animation:`${g} ${i}ms`,animationIterationCount:"infinite"}),y=Math.floor(i/3),n=()=>t(r,{children:Array.from({length:3}).map((c,o)=>t(e,{css:{animationDelay:`${y*(o+1)}ms`}},o))}),T=Object.assign(n,{Container:r,Dot:e});try{n.displayName="TypingIndicator",n.__docgenInfo={description:"An animated indicator to show that the system is preparing a response.",displayName:"TypingIndicator",props:{}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/TypingIndicator/index.tsx#TypingIndicator"]={docgenInfo:n.__docgenInfo,name:"TypingIndicator",path:"src/components/TypingIndicator/index.tsx#TypingIndicator"})}catch{}export{T};
//# sourceMappingURL=index.01de96e6.js.map
