import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import { RuntimeProvider } from './contexts';
import type { LoadConfig } from './dtos/ChatConfig.dto';
import { ChatConfig } from './dtos/ChatConfig.dto';
import { RenderMode } from './dtos/RenderOptions.dto';
import { shadowRoot } from './styles/shadow';
import { stitches } from './styles/theme';
import { mergeAssistantOptions } from './utils/assistant';
import { createPlaceholderMethods } from './utils/chat';
import { ChatEmbed, ChatWidget } from './views';

let reactRoot: Root;

const initOverlayMode = () => {
  reactRoot = createRoot(shadowRoot);

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

  return initOverlayMode();
};

const methods = createPlaceholderMethods(
  (method: string) => `Method '${method}' will have no effect until 'load' has been called.`
);

window.voiceflow ??= {};
window.voiceflow.chat ??= {
  ...methods,
  proactive: { ...methods.proactive },

  load: async (loadConfig: LoadConfig) => {
    const config = ChatConfig.parse(loadConfig);
    const assistant = await mergeAssistantOptions(config, loadConfig.assistant);

    const { reactRoot, shadowRoot } = createChatRoot(config);

    // set root here
    await new Promise<void>((resolve) => {
      reactRoot.render(
        <RuntimeProvider assistant={assistant} config={config}>
          {config.render.mode === RenderMode.EMBEDDED && (
            <ChatEmbed shadowRoot={shadowRoot} chatAPI={window.voiceflow?.chat} ready={resolve} />
          )}
          {config.render.mode === RenderMode.OVERLAY && (
            <ChatWidget shadowRoot={shadowRoot} chatAPI={window.voiceflow?.chat} ready={resolve} />
          )}
        </RuntimeProvider>
      );
    });
  },

  destroy: () => reactRoot.render(null),
};
