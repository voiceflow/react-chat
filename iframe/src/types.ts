import type { ChatConfig, RuntimeAction } from '@/common';

declare global {
  interface Window {
    voiceflow: {
      chat: {
        open: VoidFunction;
        close: VoidFunction;
        hide: VoidFunction;
        show: VoidFunction;
        load: (config: ChatConfig) => void;
        interact: (action: RuntimeAction) => void;
      };
    };
  }
}
