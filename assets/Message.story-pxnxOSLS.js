import{M as a}from"./index-C7PXvV03.js";import"./variants-BbyesEZ0.js";import"./jsx-runtime-DRTy3Uxn.js";import"./index-BBkUAzwr.js";import"./animation-I98MwHEk.js";import"./constants-CnzOgqsw.js";import"./tag-CD_1nE8q.js";import"./top-caret-CFqa3nzJ.js";const H={title:"Core/Message",component:a,argTypes:{variant:{options:Object.values(a.Variant),control:{type:"radio"},defaultValue:a.Variant.CHAT},from:{if:{arg:"variant",eq:a.Variant.CHAT},options:["system","user"],control:{type:"radio"},defaultValue:"system"},orientation:{if:{arg:"variant",eq:a.Variant.DEBUG},options:["left","right"],control:{type:"radio"},defaultValue:"left"}},args:{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}},r={args:{variant:a.Variant.CHAT,from:"system"}},e={args:{variant:a.Variant.CHAT,from:"user"}},t={args:{variant:a.Variant.DEBUG,orientation:"left"}},s={args:{variant:a.Variant.DEBUG,orientation:"right"}};var o,n,i;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    variant: Message.Variant.CHAT,
    from: 'system'
  }
}`,...(i=(n=r.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var m,c,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: Message.Variant.CHAT,
    from: 'user'
  }
}`,...(p=(c=e.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var g,u,l;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: Message.Variant.DEBUG,
    orientation: 'left'
  }
}`,...(l=(u=t.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};var d,f,V;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: Message.Variant.DEBUG,
    orientation: 'right'
  }
}`,...(V=(f=s.parameters)==null?void 0:f.docs)==null?void 0:V.source}}};export{t as DebugLeft,s as DebugRight,r as SystemChat,e as UserChat,H as default};
