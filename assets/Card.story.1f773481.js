import{M as y}from"./fixtures.79220d47.js";import{C}from"./index.7a200551.js";import"./index.25ad6385.js";import"./index.5216862f.js";import"./variants.1b0b2ced.js";import"./jsx-runtime.264ec44b.js";import"./animation.fdae6ac9.js";import"./tag.acfbb551.js";import"./index.8dc73ce9.js";import"./index.33bc379d.js";import"./_createSet.6d7dfaaa.js";import"./_baseToString.b9e23acf.js";import"./index.484a71f2.js";import"./is-plain-object.3669604d.js";const O={title:"Components/Card",component:C,args:{title:"Card Header",image:"",description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa et aliquam sunt necessitatibus molestiae amet ipsum ut.",actions:[]}},e={},t={args:{image:y}},r={args:{...t.args,actions:[{request:{},name:"First Button"},{request:{},name:"Second Button"},{request:{},name:"Third Button"}]}},a={args:{...t.args,actions:[{request:{},name:"First Button with a very long long long wrapping label"},{request:{},name:"Second Button with a shorter text"},{request:{},name:"Third button, also with a shorter text"}]}},s={args:{...t.args,title:"Long card title to wrap inside the card. Some more text to test the growth of card.",actions:[{request:{},name:"First Button"}]}};var n,o,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var m,c,u;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    image: MOCK_IMAGE
  }
}`,...(u=(c=t.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var p,g,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(d=(g=r.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var l,h,q;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    ...WithImage.args,
    actions: [{
      request: ({} as any),
      name: 'First Button with a very long long long wrapping label'
    }, {
      request: ({} as any),
      name: 'Second Button with a shorter text'
    }, {
      request: ({} as any),
      name: 'Third button, also with a shorter text'
    }]
  }
}`,...(q=(h=a.parameters)==null?void 0:h.docs)==null?void 0:q.source}}};var w,B,S;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...WithImage.args,
    title: 'Long card title to wrap inside the card. Some more text to test the growth of card.',
    actions: [{
      request: ({} as any),
      name: 'First Button'
    }]
  }
}`,...(S=(B=s.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};export{r as Actionable,e as Simple,t as WithImage,a as WithLongLabels,s as WithLongTitle,O as default};
