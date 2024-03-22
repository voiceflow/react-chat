import{M as q}from"./fixtures.79220d47.js";import{C as S}from"./index.d7516c38.js";import"./index.25ad6385.js";import"./index.3293552c.js";import"./variants.1b0b2ced.js";import"./jsx-runtime.264ec44b.js";import"./animation.fdae6ac9.js";import"./tag.acfbb551.js";import"./index.8dc73ce9.js";import"./index.33bc379d.js";import"./_createSet.6d7dfaaa.js";import"./_baseToString.b9e23acf.js";import"./index.484a71f2.js";import"./is-plain-object.3669604d.js";const E={title:"Components/Card",component:S,args:{title:"Card Header",image:"",description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa et aliquam sunt necessitatibus molestiae amet ipsum ut.",actions:[]}},e={},t={args:{image:q}},r={args:{...t.args,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"},{request:{},name:"Third Button"}]}},a={args:{...t.args,title:"Long card title to wrap inside the card. Some more text to test the growth of card.",actions:[{request:{},name:"First Button"}]}};var s,o,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var i,m,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    image: MOCK_IMAGE
  }
}`,...(c=(m=t.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var p,u,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    ...WithImage.args,
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
  }
}`,...(d=(u=r.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var g,l,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...WithImage.args,
    title: 'Long card title to wrap inside the card. Some more text to test the growth of card.',
    actions: [{
      request: ({} as any),
      name: 'First Button'
    }]
  }
}`,...(h=(l=a.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};export{r as Actionable,e as Simple,t as WithImage,a as WithLongTitle,E as default};
