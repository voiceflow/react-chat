import{C as x,S as y,U as j}from"./index.d587619d.js";import{V as g,M as m}from"./fixtures.79220d47.js";import{j as e}from"./jsx-runtime.264ec44b.js";import"./index.25ad6385.js";import"./index.020d6ec1.js";import"./tag.acfbb551.js";import"./animation.fdae6ac9.js";import"./index.3293552c.js";import"./variants.1b0b2ced.js";import"./index.14a87462.js";import"./index.484a71f2.js";import"./index.cc2dc698.js";import"./index.a988b399.js";import"./top-caret.6b52ad3c.js";import"./index.85e49540.js";import"./functional.2e4761c3.js";import"./index.3cf22372.js";import"./index.819c1879.js";import"./index.99a2d237.js";import"./index.8dc73ce9.js";import"./index.33bc379d.js";import"./_createSet.6d7dfaaa.js";import"./_baseToString.b9e23acf.js";import"./is-plain-object.3669604d.js";import"./index.6ea3386c.js";import"./index.4d2fc52f.js";import"./index.0cf33758.js";import"./index.067252bc.js";import"./index.73f35dfe.js";const J={title:"Templates/Chat",component:x,args:{isLoading:!1,actions:[],title:"Assistant Name",withWatermark:!0,image:g,description:"Voiceflow's virtual assistant is here to help.",startTime:Date.now(),hasEnded:!1}},s=({messages:t,...a})=>e.exports.jsx(y,{...a,messages:t,avatar:g,timestamp:Date.now()}),c=({message:t,...a})=>e.exports.jsx(j,{timestamp:Date.now(),message:t||"Lorem ipsum dolor",...a}),o={},r={render:t=>e.exports.jsxs(x,{...t,children:[e.exports.jsx(s,{messages:[{type:"text",text:"Lorem ipsum dolor"}]}),e.exports.jsx(s,{messages:[{type:"image",url:m}]}),e.exports.jsx(c,{}),e.exports.jsx(s,{messages:[{type:"text",text:"Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor consecteturaconsect turaconse lorem teturaconsecteturaconsecteturaconsectetura consectetura"}]}),e.exports.jsx(c,{message:"Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor consecteturaconsect turaconse lorem teturaconsecteturaconsecteturaconsectetura consecteturac onsecteturaconsecteturaconsecteturaco nsecteturaconsectetura"}),e.exports.jsx(s,{messages:[{type:"card",title:"Card Message",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptas perspiciatis est quis dolores!",image:m}]})]})};var p,n,i;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(i=(n=o.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var u,l,d;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};export{o as Empty,r as Exhaustive,J as default};
