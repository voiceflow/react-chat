import type { RuntimeAction } from '@voiceflow/sdk-runtime';

import type { ChatConfig } from '@/common';

declare module 'madge';

declare global {
  export const __USE_SHADOW_ROOT__: boolean;

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
