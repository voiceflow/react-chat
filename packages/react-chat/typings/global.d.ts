import type { RuntimeAction } from '@voiceflow/sdk-runtime';

import type { ChatConfig } from '@/common';

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        open: VoidFunction;
        close: VoidFunction;
        hide: VoidFunction;
        show: VoidFunction;
        load: (config: Partial<ChatConfig>) => void;
        destroy: (action: RuntimeAction) => void;
        interact: (action: RuntimeAction) => void;
      };
    };
  }
}
