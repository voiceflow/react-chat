import { lazy } from 'react';
import { createRoot, Root } from 'react-dom/client';

import { ChatConfig, RenderMode } from '@/common/types';
import { stitches } from '@/styles/theme';
import { mergeAssistant } from '@/utils/assistant';
import { sanitizeConfig } from '@/utils/config';
import { noop } from '@/utils/functional';

const LazyEntrypoint = lazy(async () => {
  const { Entrypoint } = await import('./entrypoints');

  return { default: Entrypoint };
});

let root;

const initBubbleMode = () => {
  const VOICEFLOW_ID = 'voiceflow-chat';
  const rootEl = document.createElement('div');
  rootEl.id = VOICEFLOW_ID;
  document.body.appendChild(rootEl);

  const shadowRoot = rootEl.attachShadow({ mode: 'open' });
  root = createRoot(shadowRoot);
  console.log(stitches.sheet.sheet);
  // stitches.reset(shadowRoot);
  return { shadowRoot, root };
};

const createChatRoot = (config: any): { shadowRoot: ShadowRoot; root: Root } => {
  let shadowRoot;

  if (config.render?.mode === RenderMode.EMBEDDED) {
    try {
      shadowRoot = config.render!.target!.attachShadow({ mode: 'open' });
      root = createRoot(shadowRoot);

      // console.log(stitches.sheet.sheet.ownerNode);
      const { cssRules } = stitches.sheet.sheet;
      // shadowRoot.adoptedStyleSheets = [stitches.sheet.sheet];
      // console.log(shadowRoot);
      const style: HTMLStyleElement = shadowRoot.appendChild(stitches.sheet.sheet.ownerNode);
      const { sheet } = style;
      // cssRules.forEach((rule) => {
      //   style.sheet.
      // })
      // console.log(cssRules);
      // console.log(style.sheet.cssRules);

      Array.from(cssRules).forEach((rule, index) => {
        // console.log(rule);
        sheet?.insertRule(rule.cssText, index);
      });

      ['themed', 'global', 'styled', 'onevar', 'resonevar', 'allvar', 'inline'].forEach((name, index) => {
        stitches.sheet.rules[name].group = sheet?.cssRules[index * 2 + 1];
      });

      // console.log(style.sheet.cssRules);
      // console.log(stitches.sheet);
      // stitches.reset(shadowRoot);
    } catch (e) {
      console.error(`${e}. \nTarget: ${config.render!.target}`);
    }
  } else {
    const { root: bubbleRoot, shadowRoot: bubbleShadowRoot } = initBubbleMode();
    root = bubbleRoot;
    shadowRoot = bubbleShadowRoot;
  }

  return { shadowRoot, root };
};

window.voiceflow ??= {};
window.voiceflow.chat ??= {
  open: noop,
  hide: noop,
  show: noop,
  close: noop,
  interact: noop,

  load: async (loadConfig: Partial<ChatConfig>) => {
    const config = sanitizeConfig(loadConfig);
    const assistant = await mergeAssistant(config);

    const { shadowRoot, root: chatRoot } = createChatRoot(config);

    // set root here
    await new Promise<void>((resolve) => {
      chatRoot.render(<LazyEntrypoint config={config} assistant={assistant} shadowRoot={shadowRoot} resolve={resolve} />);
    });
  },

  destroy: () => root.render(null),
};
