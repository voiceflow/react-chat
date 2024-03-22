import{S as g,C as S}from"./index.a4da184f.js";import{V as J,M as P}from"./fixtures.79220d47.js";import{j as l}from"./jsx-runtime.264ec44b.js";import"./index.25ad6385.js";import"./index.020d6ec1.js";import"./tag.acfbb551.js";import"./animation.fdae6ac9.js";import"./index.5216862f.js";import"./variants.1b0b2ced.js";import"./index.5d897ad3.js";import"./index.484a71f2.js";import"./index.53a044d3.js";import"./index.a988b399.js";import"./top-caret.6b52ad3c.js";import"./index.85e49540.js";import"./functional.2e4761c3.js";import"./index.3cf22372.js";import"./index.819c1879.js";import"./index.7a200551.js";import"./index.8dc73ce9.js";import"./index.33bc379d.js";import"./_createSet.6d7dfaaa.js";import"./_baseToString.b9e23acf.js";import"./is-plain-object.3669604d.js";import"./index.6ea3386c.js";import"./index.4d2fc52f.js";import"./index.0cf33758.js";import"./index.067252bc.js";import"./index.4197d55f.js";const s=P,e={type:"text",text:"Lorem ipsum dolor sit amet consectetur voluptas perspiciatis est quis dolores"},d={type:"card",title:"Card Message",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!",image:s},Me={title:"Components/Chat/SystemResponse",component:g,args:{timestamp:Date.now(),avatar:J,isLast:!1},argTypes:{timestamp:{control:{type:"date"}}},excludeStories:["RawTemplate"],render:H=>l.exports.jsx(S.Container,{children:l.exports.jsx(S.Dialog,{css:{padding:"64px 0",display:"flex",flexDirection:"column",justifyContent:"center"},children:l.exports.jsx(g,{...H})})})},t={args:{messages:[{type:"text",text:"Lorem ipsum dolor"}]}},r={args:{messages:[{type:"text",text:"consecteturaconsecteturaconsecteturaconsecteturaconsecteturaconsectetura"}]}},a={args:{messages:[e]}},n={args:{messages:[e,e,e],isLast:!0,actions:[{request:{},name:"Button One"},{request:{},name:"Button Two"},{request:{},name:"Button Three"}]}},o={args:{messages:[{type:"image",url:s}]}},i={args:{messages:[d]}},m={args:{messages:[{...d,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"},{request:{},name:"Third Button"}]}]}},c={args:{messages:[{type:"carousel",cards:[{title:"First Card",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!",image:s,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"},{request:{},name:"Third Button"}]},{title:"Second Card",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",image:s,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"}]},{title:"Third Card",description:"Lorem ipsum dolor sit amet",image:s}]}]}},p={args:{messages:[d,e]}},u={args:{feedback:{onClick:()=>null},messages:[d,e]}};var C,E,T;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    messages: [{
      type: 'text',
      text: 'Lorem ipsum dolor'
    }]
  }
}`,...(T=(E=t.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var x,y,q;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
