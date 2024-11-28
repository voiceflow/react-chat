import{j as g}from"./jsx-runtime-DRTy3Uxn.js";import{S as x,C as S}from"./index-BhSsCh1i.js";import{V as Y,M as Z}from"./fixtures-BG8dVRKH.js";import"./index-BBkUAzwr.js";import"./index-B0bdE4-u.js";import"./constants-CnzOgqsw.js";import"./tag-CD_1nE8q.js";import"./animation-I98MwHEk.js";import"./index-BMZibWur.js";import"./variants-BbyesEZ0.js";import"./index-DqzWDvut.js";import"./device-WPWeBsw9.js";import"./index-60JQpial.js";import"./index-D1YpC07r.js";import"./top-caret-CFqa3nzJ.js";import"./index-CcHdfiB1.js";import"./functional-ii7S4iDS.js";import"./index-DNVrYBWV.js";import"./index-BOwkVC01.js";import"./index-CTxelje9.js";import"./index-Ct8JKvm2.js";import"./index-CXNoADHz.js";import"./_createSet-zuc-p8Rl.js";import"./_baseToString-BV3LLLfG.js";import"./is-plain-object-BrWfeXm7.js";import"./index-5hZA7nZO.js";import"./index-C7PXvV03.js";import"./index-BK1IyiUZ.js";import"./index-PqR-_bA4.js";import"./index-NQ2LSDJG.js";const s=Z,e={type:"text",text:"Lorem ipsum dolor sit amet consectetur voluptas perspiciatis est quis dolores"},d={type:"card",title:"Card Message",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!",image:s},_e={title:"Components/Chat/SystemResponse",component:x,args:{timestamp:Date.now(),avatar:Y,isLast:!1},argTypes:{timestamp:{control:{type:"date"}}},excludeStories:["RawTemplate"],render:U=>g.jsx(S.Container,{children:g.jsx(S.Dialog,{css:{padding:"64px 0",display:"flex",flexDirection:"column",justifyContent:"center"},children:g.jsx(x,{...U})})})},t={args:{messages:[{type:"text",text:"Lorem ipsum dolor"}]}},r={args:{messages:[{type:"text",text:"All supported types of links include email links using [mailto](mailto:youremail@example.com), phone calls with [tel](tel:+14165551234), text messages via [sms](sms:+14165551234), location links with [geo](geo:37.7749,-122.4194), as well as regular web links like [http](http://example.com) and [https](https://example.com)."}]}},a={args:{messages:[{type:"text",text:"consecteturaconsecteturaconsecteturaconsecteturaconsecteturaconsectetura"}]}},n={args:{messages:[e]}},o={args:{messages:[e,e,e],isLast:!0,actions:[{request:{},name:"Button One"},{request:{},name:"Button Two"},{request:{},name:"Button Three"}]}},i={args:{messages:[{type:"image",url:s}]}},m={args:{messages:[d]}},c={args:{messages:[{...d,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"},{request:{},name:"Third Button"}]}]}},p={args:{messages:[{type:"carousel",cards:[{title:"First Card",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!",image:s,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"},{request:{},name:"Third Button"}]},{title:"Second Card",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",image:s,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"}]},{title:"Third Card",description:"Lorem ipsum dolor sit amet",image:s}]}]}},u={args:{messages:[d,e]}},l={args:{feedback:{onClick:()=>null},messages:[d,e]}};var y,E,T;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    messages: [{
      type: 'text',
      text: 'Lorem ipsum dolor'
    }]
  }
}`,...(T=(E=t.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var C,h,A;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    messages: [{
      type: 'text',
      text: 'All supported types of links include email links using [mailto](mailto:youremail@example.com), phone calls with [tel](tel:+14165551234), text messages via [sms](sms:+14165551234), location links with [geo](geo:37.7749,-122.4194), as well as regular web links like [http](http://example.com) and [https](https://example.com).'
    }]
  }
}`,...(A=(h=r.parameters)==null?void 0:h.docs)==null?void 0:A.source}}};var q,B,M;a.parameters={...a.parameters,docs:{...(q=a.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    messages: [{
      type: 'text',
      text: 'consecteturaconsecteturaconsecteturaconsecteturaconsecteturaconsectetura'
    }]
  }
}`,...(M=(B=a.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var k,L,R;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    messages: [TEXT_MESSAGE]
  }
}`,...(R=(L=n.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var _,D,G;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(G=(D=o.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var f,w,F;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    messages: [{
      type: 'image',
      url: CARD_IMAGE
    }]
  }
}`,...(F=(w=i.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};var I,b,v;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    messages: [CARD]
  }
}`,...(v=(b=m.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var X,j,O;c.parameters={...c.parameters,docs:{...(X=c.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(O=(j=c.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var W,V,K;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(K=(V=p.parameters)==null?void 0:V.docs)==null?void 0:K.source}}};var N,z,H;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    messages: [CARD, TEXT_MESSAGE]
  }
}`,...(H=(z=u.parameters)==null?void 0:z.docs)==null?void 0:H.source}}};var J,P,Q;l.parameters={...l.parameters,docs:{...(J=l.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    feedback: {
      onClick: () => null
    },
    messages: [CARD, TEXT_MESSAGE]
  }
}`,...(Q=(P=l.parameters)==null?void 0:P.docs)==null?void 0:Q.source}}};export{c as ActionableCard,o as ActionableText,m as Card,p as Carousel,i as Image,n as MultilineText,u as Multiple,l as MultipleWithFeedback,t as SimpleText,r as TextWithLinks,a as WrappingText,_e as default};
