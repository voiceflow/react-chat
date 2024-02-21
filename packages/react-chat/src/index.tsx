import { createRoot, Root } from 'react-dom/client';

import { RuntimeProvider } from './contexts';
import { ChatConfig, LoadConfig } from './dtos/ChatConfig.dto';
import { RenderMode } from './dtos/RenderOptions.dto';
import { stitches } from './styles/theme';
import { mergeAssistantOptions } from './utils/assistant';
import { createPlaceholderMethods } from './utils/chat';
import { ChatWidget, ChatWindowStandaloneView } from './views';

const BUBBLE_TARGET = 'voiceflow-chat';

let reactRoot: Root;

const initBubbleMode = () => {
  const rootEl = document.createElement('div');
  rootEl.id = BUBBLE_TARGET;
  document.body.appendChild(rootEl);

  const shadowRoot = rootEl.attachShadow({ mode: 'open' });
  reactRoot = createRoot(shadowRoot);
  stitches.transplant(shadowRoot);

  return { shadowRoot, reactRoot };
};

const initEmbeddedMode = (rootEl: HTMLElement) => {
  try {
    const shadowRoot = rootEl.attachShadow({ mode: 'open' });
    reactRoot = createRoot(shadowRoot);
    stitches.transplant(shadowRoot);

    return { shadowRoot, reactRoot };
  } catch (e) {
    console.error(`${e}. \nTarget:`, rootEl);
    throw new Error('Failed to attach embedded chat to the provided target.');
  }
};

const createChatRoot = (config: ChatConfig) => {
  if (config.render.mode === RenderMode.EMBEDDED) {
    return initEmbeddedMode(config.render.target);
  }

  return initBubbleMode();
};

const methods = createPlaceholderMethods((method: string) => `Method '${method}' will have no effect until 'load' has been called.`);

window.voiceflow ??= {};
window.voiceflow.chat ??= {
  ...methods,
  proactive: { ...methods.proactive },

  load: async (loadConfig: LoadConfig) => {
    const config = ChatConfig.parse(loadConfig);
    const assistant = await mergeAssistantOptions(config, loadConfig.assistant);

    const chatRoot = createChatRoot(config);

    // set root here
    await new Promise<void>((resolve) => {
      chatRoot.reactRoot.render(
        <RuntimeProvider assistant={assistant} config={config} shadowRoot={chatRoot.shadowRoot}>
          {config.render.mode === RenderMode.EMBEDDED && <ChatWindowStandaloneView chatAPI={window.voiceflow!.chat} ready={resolve} />}
          {config.render.mode === RenderMode.BUBBLE && <ChatWidget chatAPI={window.voiceflow!.chat} ready={resolve} />}
        </RuntimeProvider>
      );
    });
  },

  destroy: () => reactRoot.render(null),
};
