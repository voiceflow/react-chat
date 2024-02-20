import type { Trace } from '@voiceflow/base-types';
import type { RuntimeAction } from '@voiceflow/sdk-runtime';

import type { ChatConfig } from '@/common';

declare global {
  export const __USE_SHADOW_ROOT__: boolean;

  interface VoiceflowChat {
    load: (config: ChatConfig) => void;
    destroy: () => void;

    interact: (action: RuntimeAction) => void;

    /* bubble mode controls */
    open: VoidFunction;
    close: VoidFunction;
    hide: VoidFunction;
    show: VoidFunction;

    proactive: {
      clear: () => void;
      push: (...messages: Trace.AnyTrace[]) => void;
    };
  }

  interface Window {
    voiceflow?: {
      chat?: VoiceflowChat;
    };
  }
}
