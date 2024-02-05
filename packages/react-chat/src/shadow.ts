// create shadow dom

// const VOICEFLOW_ID = 'voiceflow-chat';

// const rootEl = document.createElement('div');
// rootEl.id = VOICEFLOW_ID;

// document.body.appendChild(rootEl);
// export const shadowRoot = rootEl.attachShadow({ mode: 'open' });

// ------ for chat modes support we need to make shadow dom flexible ------
interface RenderOptions {
  mode: 'embedded' | 'bubble';
  target: HTMLElement; // e.g: document.getElementById('vf-id')
}

// export const setShadowRoot = (target: any) => {
//   return target.attachShadow({ mode: 'open' });
// };

// const shadowRootFactory = (id = VOICEFLOW_ID) => {
//   return ({ mode, target }: RenderOptions) => {
//     // ignore target when mode is bubble
//     if (mode === 'bubble') {
//       const rootEl = document.createElement('div');

//       rootEl.id = id;
//       document.body.appendChild(rootEl);
//     }

//     // if target elm and mode is embedded, return target
//     if (target && mode === 'embedded') {
//       return target.attachShadow({ mode: 'open' });
//     }

//     return rootEl.attachShadow({ mode: 'open' });
//   };
// };

// export const createShadowRoot = shadowRootFactory(VOICEFLOW_ID);
