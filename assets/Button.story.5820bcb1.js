import{B as a}from"./index.3293552c.js";import"./variants.1b0b2ced.js";import"./index.25ad6385.js";import"./jsx-runtime.264ec44b.js";import"./animation.fdae6ac9.js";import"./tag.acfbb551.js";const I={title:"Core/Button",component:a,argTypes:{variant:{options:Object.values(a.Variant),control:{type:"radio"},defaultValue:a.Variant.PRIMARY},type:{if:{arg:"variant",eq:a.Variant.PRIMARY},options:["info","warn","subtle"],control:{type:"radio"},defaultValue:"info"}},args:{children:"Button Label"}},r={args:{variant:a.Variant.PRIMARY,type:"info"}},t={args:{variant:a.Variant.PRIMARY,type:"warn"}},e={args:{variant:a.Variant.PRIMARY,type:"subtle"}},n={args:{variant:a.Variant.SECONDARY}};var o,s,i;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    variant: Button.Variant.PRIMARY,
    type: 'info'
  }
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var p,c,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: Button.Variant.PRIMARY,
    type: 'warn'
  }
}`,...(u=(c=t.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var m,d,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: Button.Variant.PRIMARY,
    type: 'subtle'
  }
}`,...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var R,g,y;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    variant: Button.Variant.SECONDARY
  }
}`,...(y=(g=n.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};export{r as PrimaryInfo,e as PrimarySubtle,t as PrimaryWarn,n as Secondary,I as default};
