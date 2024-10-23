import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{C as g,S as y,U as j}from"./index-ud4dS2Zj.js";import{V as x,M as m}from"./fixtures-BG8dVRKH.js";import"./index-BBkUAzwr.js";import"./index-B0bdE4-u.js";import"./constants-CnzOgqsw.js";import"./tag-CD_1nE8q.js";import"./animation-I98MwHEk.js";import"./index-BMZibWur.js";import"./variants-BbyesEZ0.js";import"./index-DqzWDvut.js";import"./device-WPWeBsw9.js";import"./index-60JQpial.js";import"./index-D1YpC07r.js";import"./top-caret-CFqa3nzJ.js";import"./index-CcHdfiB1.js";import"./functional-ii7S4iDS.js";import"./index-DNVrYBWV.js";import"./index-BOwkVC01.js";import"./index-CTxelje9.js";import"./index-Ct8JKvm2.js";import"./index-CXNoADHz.js";import"./_createSet-zuc-p8Rl.js";import"./_baseToString-BV3LLLfG.js";import"./is-plain-object-BrWfeXm7.js";import"./index-5hZA7nZO.js";import"./index-C7PXvV03.js";import"./index-BK1IyiUZ.js";import"./index-PqR-_bA4.js";import"./index-NQ2LSDJG.js";const P={title:"Templates/Chat",component:g,args:{isLoading:!1,actions:[],title:"Assistant Name",withWatermark:!0,image:x,description:"Voiceflow's virtual assistant is here to help.",startTime:Date.now(),hasEnded:!1}},s=({messages:t,...a})=>e.jsx(y,{...a,messages:t,avatar:x,timestamp:Date.now()}),c=({message:t,...a})=>e.jsx(j,{timestamp:Date.now(),message:t||"Lorem ipsum dolor",...a}),o={},r={render:t=>e.jsxs(g,{...t,children:[e.jsx(s,{messages:[{type:"text",text:"Lorem ipsum dolor"}]}),e.jsx(s,{messages:[{type:"image",url:m}]}),e.jsx(c,{}),e.jsx(s,{messages:[{type:"text",text:"Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor consecteturaconsect turaconse lorem teturaconsecteturaconsecteturaconsectetura consectetura"}]}),e.jsx(c,{message:"Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor consecteturaconsect turaconse lorem teturaconsecteturaconsecteturaconsectetura consecteturac onsecteturaconsecteturaconsecteturaco nsecteturaconsectetura"}),e.jsx(s,{messages:[{type:"card",title:"Card Message",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!",image:m}]})]})};var n,i,p;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(p=(i=o.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var u,l,d;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    return <Chat {...args}>
        <SystemResponseTemplate messages={[{
        type: 'text',
        text: 'Lorem ipsum dolor'
      }]} />
        <SystemResponseTemplate messages={[{
        type: 'image',
        url: MOCK_IMAGE
      }]} />
        <UserResponseTemplate />
        <SystemResponseTemplate messages={[{
        type: 'text',
        text: 'Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor consecteturaconsect turaconse lorem teturaconsecteturaconsecteturaconsectetura consectetura'
      }]} />
        <UserResponseTemplate message="Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor consecteturaconsect turaconse lorem teturaconsecteturaconsecteturaconsectetura consecteturac onsecteturaconsecteturaconsecteturaco nsecteturaconsectetura" />
        <SystemResponseTemplate messages={[{
        type: 'card',
        title: 'Card Message',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
        image: MOCK_IMAGE
      }]} />
      </Chat>;
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};export{o as Empty,r as Exhaustive,P as default};
