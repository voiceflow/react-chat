import{j as l}from"./jsx-runtime-DRTy3Uxn.js";import{S as g,C as S}from"./index-CC6KWeNj.js";import{V as J,M as P}from"./fixtures-BG8dVRKH.js";import"./index-BBkUAzwr.js";import"./index-cJifsxF3.js";import"./tag-DslUz7EE.js";import"./animation-I98MwHEk.js";import"./index-CgswGT5k.js";import"./variants-BbyesEZ0.js";import"./index-D-TPDnAa.js";import"./index-BqsSZhcB.js";import"./index-Dg1kBsK5.js";import"./index-BWp-D-Q6.js";import"./top-caret-CFqa3nzJ.js";import"./index-CcHdfiB1.js";import"./functional-ii7S4iDS.js";import"./index-CrQ5MIvt.js";import"./index-2PWa66_n.js";import"./index-BZJ2QIV7.js";import"./index-GBvVpXIh.js";import"./index-CocICL3R.js";import"./_createSet-zuc-p8Rl.js";import"./_baseToString-BV3LLLfG.js";import"./is-plain-object-BrWfeXm7.js";import"./index-CLMQvdPU.js";import"./index-BNFyRyue.js";import"./index-HQ-V58eR.js";import"./index-PqR-_bA4.js";import"./index-CLC4ExZJ.js";const s=P,e={type:"text",text:"Lorem ipsum dolor sit amet consectetur voluptas perspiciatis est quis dolores"},d={type:"card",title:"Card Message",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!",image:s},Me={title:"Components/Chat/SystemResponse",component:g,args:{timestamp:Date.now(),avatar:J,isLast:!1},argTypes:{timestamp:{control:{type:"date"}}},excludeStories:["RawTemplate"],render:H=>l.jsx(S.Container,{children:l.jsx(S.Dialog,{css:{padding:"64px 0",display:"flex",flexDirection:"column",justifyContent:"center"},children:l.jsx(g,{...H})})})},t={args:{messages:[{type:"text",text:"Lorem ipsum dolor"}]}},r={args:{messages:[{type:"text",text:"consecteturaconsecteturaconsecteturaconsecteturaconsecteturaconsectetura"}]}},a={args:{messages:[e]}},n={args:{messages:[e,e,e],isLast:!0,actions:[{request:{},name:"Button One"},{request:{},name:"Button Two"},{request:{},name:"Button Three"}]}},o={args:{messages:[{type:"image",url:s}]}},i={args:{messages:[d]}},m={args:{messages:[{...d,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"},{request:{},name:"Third Button"}]}]}},c={args:{messages:[{type:"carousel",cards:[{title:"First Card",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!",image:s,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"},{request:{},name:"Third Button"}]},{title:"Second Card",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",image:s,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"}]},{title:"Third Card",description:"Lorem ipsum dolor sit amet",image:s}]}]}},p={args:{messages:[d,e]}},u={args:{feedback:{onClick:()=>null},messages:[d,e]}};var E,C,T;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    messages: [{
      type: 'text',
      text: 'Lorem ipsum dolor'
    }]
  }
}`,...(T=(C=t.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var x,y,q;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    messages: [{
      type: 'text',
      text: 'consecteturaconsecteturaconsecteturaconsecteturaconsecteturaconsectetura'
    }]
  }
}`,...(q=(y=r.parameters)==null?void 0:y.docs)==null?void 0:q.source}}};var A,B,M;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    messages: [TEXT_MESSAGE]
  }
}`,...(M=(B=a.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var R,_,h;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    messages: [TEXT_MESSAGE, TEXT_MESSAGE, TEXT_MESSAGE],
    isLast: true,
    actions: [{
      request: ({} as any),
      name: 'Button One'
    }, {
      request: ({} as any),
      name: 'Button Two'
    }, {
      request: ({} as any),
      name: 'Button Three'
    }]
  }
}`,...(h=(_=n.parameters)==null?void 0:_.docs)==null?void 0:h.source}}};var D,G,L;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    messages: [{
      type: 'image',
      url: CARD_IMAGE
    }]
  }
}`,...(L=(G=o.parameters)==null?void 0:G.docs)==null?void 0:L.source}}};var f,F,I;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    messages: [CARD]
  }
}`,...(I=(F=i.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var X,j,b;m.parameters={...m.parameters,docs:{...(X=m.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    messages: [{
      ...CARD,
      actions: [{
        request: ({} as any),
        name: 'First Button'
      }, {
        request: ({} as any),
        name: 'Second Button'
      }, {
        request: ({} as any),
        name: 'Third Button'
      }]
    }]
  }
}`,...(b=(j=m.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var k,v,w;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    messages: [{
      type: 'carousel',
      cards: [{
        title: 'First Card',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!',
        image: CARD_IMAGE,
        actions: [{
          request: ({} as any),
          name: 'First Button'
        }, {
          request: ({} as any),
          name: 'Second Button'
        }, {
          request: ({} as any),
          name: 'Third Button'
        }]
      }, {
        title: 'Second Card',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        image: CARD_IMAGE,
        actions: [{
          request: ({} as any),
          name: 'First Button'
        }, {
          request: ({} as any),
          name: 'Second Button'
        }]
      }, {
        title: 'Third Card',
        description: 'Lorem ipsum dolor sit amet',
        image: CARD_IMAGE
      }]
    }]
  }
}`,...(w=(v=c.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var O,V,W;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    messages: [CARD, TEXT_MESSAGE]
  }
}`,...(W=(V=p.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var K,N,z;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    feedback: {
      onClick: () => null
    },
    messages: [CARD, TEXT_MESSAGE]
  }
}`,...(z=(N=u.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};export{m as ActionableCard,n as ActionableText,i as Card,c as Carousel,o as Image,a as MultilineText,p as Multiple,u as MultipleWithFeedback,t as SimpleText,r as WrappingText,Me as default};
