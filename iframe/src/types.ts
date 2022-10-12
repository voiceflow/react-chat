import { ChatConfig } from '@/common';

declare global {
  interface Window {
    voiceflowChatConfig?: ChatConfig;

    voiceflow: {
      chat: {
        open: VoidFunction;
        close: VoidFunction;
        hide: VoidFunction;
        show: VoidFunction;
        load: (config: ChatConfig) => void;
      };
    };
  }
}
