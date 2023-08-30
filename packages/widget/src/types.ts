import type { ChatConfig } from '@voiceflow/react-chat';
import type { RuntimeAction } from '@voiceflow/sdk-runtime';

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        open: VoidFunction;
        close: VoidFunction;
        hide: VoidFunction;
        show: VoidFunction;
        load: (config: ChatConfig) => void;
        destroy: (action: RuntimeAction) => void;
        interact: (action: RuntimeAction) => void;
      };
    };
  }
}
